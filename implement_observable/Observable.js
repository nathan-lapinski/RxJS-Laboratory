function Observable(forEach) {
  this._forEach = forEach;
}

Observable.prototype = {
  forEach: function(onNext, onError, onCompleted) {
    if (typeof onNext === 'function') {
      return this._forEach({
        onNext: onNext,
        onError: onError || function(){},
        onCompleted: onCompleted || function(){}
      });
    } else {
      return this._forEach(onNext); // onNext is already an object in this case
    }
  } // end forEach
};

Observable.of = function(...args) {
  return new Observable(observer => {
    
    args.forEach(val => {
      observer.onNext(val);
    });

    observer.onCompleted();

    return {
      dispose: function() {
        // TODO: anything to do here?
      }
    };
  });
}

// Takes in an object which implements the iterable interface
Observable.from = function(iterable) {
  return new Observable( observer => {
    const iterator = iterable[Symbol.iterator]();

    for (let val of iterator) {
      observer.onNext(val);
    }

    observer.onCompleted();
  });
};

Observable.just = function(value) {
  return new Observable( observer => {
    observer.onNext(value);
    observer.onCompleted();
  });
}

Observable.fromEvent = function(dom, eventName) {
  return new Observable(function(observer){
    const handler = (e) => observer.onNext(e);
    dom.addEventListener(eventName, handler);
    
    return {
      dispose: function() {
        dom.removeEventListener(eventName, handler);
      }
    };
  });
}

Observable.prototype.map = function(projFn) {
  const $this = this;
  return new Observable(function(observer){
    // this 'implicitly' gives you the correct unsubscribe object. clever
    return $this.forEach( 
      (val) => observer.onNext(projFn(val)),
      (e) => observer.onError(e),
      () => observer.onCompleted()
    );
  });
}

Observable.prototype.filter = function(predicateFn) {
  const $this = this;
  return new Observable(function(observer){
    return $this.forEach(
      val => {
        if (predicateFn(val)) observer.onNext(val);
      },
      (e) => observer.onError(e),
      () => observer.onCompleted()
    );
  });
}

module.exports = {
  Observable
};