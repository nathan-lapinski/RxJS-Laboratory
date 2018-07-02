var Observable = require('./Observable').Observable;


const o1 = Observable.from([1,2,3,4,5,6]).map(x => x * 2).filter(x => x > 2);

o1.forEach(val => console.log(val));