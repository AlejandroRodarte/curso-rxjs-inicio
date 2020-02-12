import { asyncScheduler, interval, fromEvent } from 'rxjs';
import { debounceTime, map, tap, pluck, distinctUntilChanged, throttleTime, sampleTime, sample } from 'rxjs/operators';

const interval$ = interval(5000);
const click$ = fromEvent(document, 'click');

// sample: nos permite obtener el ultimo dato emitido por el observable (interval$) cuando el segundo observable
// (click$) emita informacion
// este mecanismo funciona como si el evento click$ nos permitiera obtener una `muestra` del ultimo valor emitido
// por interval$
interval$
    .pipe(
        sample(click$)
    )
    .subscribe(console.log);
