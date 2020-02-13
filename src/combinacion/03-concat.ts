import { fromEvent, Observable, interval, of, concat, from } from 'rxjs';
import { pluck, debounceTime, distinctUntilChanged, map, mergeAll, mergeMap, switchMap, take, concatMap, exhaustMap, tap, catchError, startWith, endWith } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';

const interval$ = interval(1000);

// concat: concatena observables, suscribiendose a medida que se vayan
// completando de uno en uno
// ademas de observables, podemos pasar arreglos (iterables)
concat(
    interval$
        .pipe(
            take(3)
        ),
    interval$
        .pipe(
            take(2)
        ),
    [1, 2, 3, 4]
).subscribe(console.log);

