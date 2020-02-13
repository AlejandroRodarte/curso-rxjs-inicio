import { Observable, of, interval, fromEvent } from 'rxjs';
import { pluck, debounceTime, distinctUntilChanged, map, mergeAll, mergeMap, take, takeUntil } from 'rxjs/operators';

const letras$ = of<string>('a', 'b', 'c');

// mergeMap: cada vez que el Observable padre emita informacion, se suscribira al Observable hijo
// que retorne el callback pasado a mergeMap
// podemos alterar el formato el Observable interno con un pipe
letras$
    .pipe(
        mergeMap<string, Observable<string>>(
            (letra: string) => interval(1000)
                                .pipe(
                                    map<number, string>(i => letra + i),
                                    take<string>(3)
                                )
        )
    )
    .subscribe({
        next: val => console.log('next: ', val),
        complete: () => console.log('complete')
    });

const mouseDown$ = fromEvent<MouseEvent>(document, 'mousedown');
const mouseUp$ = fromEvent<MouseEvent>(document, 'mouseup');
const interval$ = interval();

// ejemplo: cuando se de click se comenzara a emitir informacion por medio de interval$
// ya que mergeMap se suscribe a el; con el pipe se indica detener ese Observable hijo cuando
// mouseUp$ detecte un evento
mouseDown$
    .pipe(
        mergeMap(
            () => interval$
                    .pipe(
                        takeUntil(mouseUp$)
                    )
        )
    )
    .subscribe(console.log);
