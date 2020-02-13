import { interval, Subject } from 'rxjs';
import { map, filter, reduce, take, takeWhile } from 'rxjs/operators';

/**
 * Ejercicio: Realizar una cuenta regresiva
 * empezando de 7
 */

// Salida esperada ===
// 7
// 6
// 5
// 4
// 3
// 2
// 1
// 0

const inicio = 7;

interval(1000)
    .pipe(
        map(num => inicio - num),
        takeWhile(num => num > 0, true)
    )
    .subscribe({
        next: num => console.log(num),
        complete: () => console.log('complete')
    });

