var Observable = require('./Observable').Observable;


const o1 = Observable.of(1,2,3).map(x => x * 2);

o1.forEach(val => console.log(val));