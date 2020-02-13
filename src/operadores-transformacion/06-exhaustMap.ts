import { fromEvent, Observable, interval } from 'rxjs';
import { pluck, debounceTime, distinctUntilChanged, map, mergeAll, mergeMap, switchMap, take, concatMap, exhaustMap } from 'rxjs/operators';

const interval$ = 
    interval(500)
        .pipe(
            take(3)
        );

const click$ = fromEvent(document, 'click');

// exhaustMap: solo una suscripcion a la vez
// si el Observable padre emite mientras el Observable hijo aun no completa, es ignorado
click$
    .pipe(
        exhaustMap(
            () => interval$
        )
    )
    .subscribe(console.log);