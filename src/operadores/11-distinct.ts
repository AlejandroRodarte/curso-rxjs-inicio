import { of, fromEvent, interval, from } from 'rxjs';
import { take, tap, first, map, takeWhile, takeUntil, skip, distinct } from 'rxjs/operators';

const numeros$ = of<number | string>(1, 1, '1', 3, 3, 2, 2, 4, 4, 5, 3, 1, '1');

// distinct(): solo emite datos cuando no hayan sido previamente emitidos
// distinct usa el === para hacer comparaciones (checado de tipo)
numeros$
    .pipe(
        distinct()
    )
    .subscribe(console.log);

interface Personaje {
    nombre: string;
}

const personajes: Personaje[] = [
    {
        nombre: 'Megaman'
    },
    {
        nombre: 'X'
    },
    {
        nombre: 'Zero'
    },
    {
        nombre: 'Dr. Willy'
    },
    {
        nombre: 'X'
    },
    {
        nombre: 'Megaman'
    },
    {
        nombre: 'Zero'
    }
];

// distinct con objetos; se le debe informar a distinct cual es la propiedad por la cual
// hara la comparacion
from(personajes)
    .pipe(
        distinct(p => p.nombre)
    )
    .subscribe(console.log);
