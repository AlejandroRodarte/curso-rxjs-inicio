import { fromEvent, Observable, interval, of, concat, from, merge, combineLatest, forkJoin } from 'rxjs';
import { pluck, debounceTime, distinctUntilChanged, map, mergeAll, mergeMap, switchMap, take, concatMap, exhaustMap, tap, catchError, startWith, endWith, delay } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';

const numeros$ = of(1, 2, 3, 4);
const interval$ = interval(1000).pipe(take(3));
const letras$ = of('a', 'b', 'c').pipe(delay(3500));

// forkJoin: emite los ultimos valores emitidos de los observables una vez que todos hayan completado
forkJoin(numeros$, interval$, letras$)
    .subscribe(console.log);

forkJoin(numeros$, interval$, letras$)
    .subscribe(([numero, intervalo, letra]: [number, number, string]) => {
        console.log('numero: ', numero);
        console.log('intervalo: ', intervalo);
        console.log('letras: ', letra)
    });

// obteniendo los datos en formato de objeto con propiedades personalizadas
forkJoin({
    num: numeros$,
    int: interval$,
    let: letras$
})
    .subscribe(console.log);