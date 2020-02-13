import { fromEvent, Observable, interval, of, concat, from, merge } from 'rxjs';
import { pluck, debounceTime, distinctUntilChanged, map, mergeAll, mergeMap, switchMap, take, concatMap, exhaustMap, tap, catchError, startWith, endWith } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';

const keyup$ = fromEvent(document, 'keyup');
const click$ = fromEvent(document, 'click');

// merge: fusiona las emisiones de multiples observables en un flujo
// de manera simultanea
merge(
    keyup$
        .pipe(pluck('type')), 
    click$
        .pipe(pluck('type'))
)
    .subscribe(console.log);

