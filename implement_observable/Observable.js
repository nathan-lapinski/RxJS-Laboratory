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
  return new Observable(function(obs){
    const handle = dom.addEventListener(eventName, function(evt){
      obs.onNext(evt);
    });
    
    return {
      dispose: function() {
        dom.removeEventListener(eventName, handle);
      }
    };
  });
}
