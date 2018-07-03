var Observable = require('../../Observable').Observable;

describe('Observable', () => {
    // creational methods
    describe('Observable.just', () => {
        it('returns its input wrapped in an observable', () => {
            const val = 1;
            const obs = Observable.just(val);

            obs.forEach(v => expect(v).toBe(val));
        });

        it('emits only one value, even when passed a collection', () => {
            const val = [1,2,3];
            const obs = Observable.just(val);

            obs.forEach(v => expect(v).toEqual(val));
        });
    });

    describe('Observable.of', () => {
        it('returns an observable which emits each argument separately, then completes', () => {
            const obs = Observable.of(1,'2',[1,2,3]);
            const results = [];
            obs.forEach(res => results.push(res));
            expect(results[0]).toBe(1);
            expect(results[1]).toBe('2');
            expect(results[2]).toEqual([1,2,3]);
        });
    });

    describe('Observable.from', () => {

    });

    describe('Observable.empty', () => {
        it('returns an observable which completed immediately', () => {
            const obs = Observable.empty();

            const onNext = () => {};
            const onError = () => {};
            const onCompleted = () => {};

            const observer = {
                onNext: onNext,
                onError: onError,
                onCompleted: onCompleted
            };

            spyOn(observer, 'onCompleted');
            spyOn(observer, 'onNext');

            obs.forEach(observer);
            expect(observer.onCompleted).toHaveBeenCalled();
            expect(observer.onNext).not.toHaveBeenCalled();
        });
    });

    describe('Observable.never', () => {

    });

    describe('Observable.throw', () => {

    });
});
