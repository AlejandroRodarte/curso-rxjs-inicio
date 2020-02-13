import { fromEvent, Observable, interval } from 'rxjs';
import { pluck, debounceTime, distinctUntilChanged, map, mergeAll, mergeMap, switchMap } from 'rxjs/operators';

const click$ = fromEvent(document, 'click');
const interval$ = interval(1000);

click$
    .pipe(
        mergeMap(
            () => interval$
        )
    )
    .subscribe(val => console.log('mergeMap: ', val));

click$
    .pipe(
        switchMap(
            () => interval$
        )
    )
    .subscribe(val => console.log('switchMap: ', val));
