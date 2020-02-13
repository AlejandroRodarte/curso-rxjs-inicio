import { fromEvent, Observable, interval, of } from 'rxjs';
import { pluck, debounceTime, distinctUntilChanged, map, mergeAll, mergeMap, switchMap, take, concatMap, exhaustMap, tap, catchError, startWith, endWith } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';

// startWith: permite emitir un valor inicial de manera sincrona antes de
// que el Observable comience a emitir
// endWith: emite un ultimo valor antes de completar el Observables
const numeros$ = 
    of(1, 2, 3)
        .pipe(
            startWith('a', 'b', 'c'),
            endWith('x', 'y', 'z')
        );

numeros$
    .subscribe(console.log);
