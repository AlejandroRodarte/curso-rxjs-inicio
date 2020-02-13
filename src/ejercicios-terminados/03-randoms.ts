import { interval, Subject } from 'rxjs';
import { map, filter, reduce, take } from 'rxjs/operators';

/**
 * Ejercicio: Realizar que los dos observables finales, 
 * emitan exactamente el mismo valor
 * 
 * Tip: Hot Observable? subjects?
 */

const subject$ = new Subject<number>();

const reloj$ = 
    interval(1000)
        .pipe(
            take(5),
            map( val => Math.round(Math.random() * 100) )
        );

reloj$.subscribe(subject$);
                
subject$.subscribe( val => console.log('obs1', val) );
subject$.subscribe( val => console.log('obs2', val) );