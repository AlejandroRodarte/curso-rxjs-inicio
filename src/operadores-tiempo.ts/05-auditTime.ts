import { asyncScheduler, interval, fromEvent } from 'rxjs';
import { debounceTime, map, tap, pluck, distinctUntilChanged, throttleTime, sampleTime, sample, auditTime } from 'rxjs/operators';

const click$ = fromEvent<MouseEvent>(document, 'click');

// auditTime: una vez que el observable emite, auditTime cuenta por un intervalo de tiempo
// cuando concluya, tomara el ultimo valor del observable
click$
    .pipe(
        map(({ x }) => ({ x })),
        tap(val => console.log('tap', val)),
        auditTime(2000)
    )
    .subscribe(console.log);
