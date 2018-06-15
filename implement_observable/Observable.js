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