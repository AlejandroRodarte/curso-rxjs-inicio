import { interval, Subject, combineLatest, timer } from 'rxjs';
import { map, filter, reduce, take, takeWhile, tap } from 'rxjs/operators';

/**
 * Ejercicio: Combinar ambos observables (letras$, numeros$)
 * para que las emisiones sean la concatenación de los últimos
 * valores emitidos
 */

//  Ejemplo de la tada esperada:
// a1
// a2
// b2
// b3
// c3
// c4
// d4
// d5
// e5

const letras  = ['a', 'b', 'c', 'd', 'e'];
const numeros = [1, 2, 3, 4, 5];

const letras$ = 
    interval(1000)
        .pipe(
            map(i => letras[i]),
            take(letras.length)
        );

const numeros$ = 
    timer(500, 1000)
        .pipe(
            map(i => numeros[i]),
            take(numeros.length)
        );

combineLatest(letras$, numeros$)
    .pipe(
        map(([letra, num]: [string, number]) => `${letra}${num}`)
    )
    .subscribe(console.log);
