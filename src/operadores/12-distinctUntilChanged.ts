import { of, fromEvent, interval, from } from 'rxjs';
import { take, tap, first, map, takeWhile, takeUntil, skip, distinct, distinctUntilChanged } from 'rxjs/operators';

const numeros$ = of<number | string>(1, 1, '1', 3, 3, 2, 2, 4, 4, 5, 3, 1, '1');

// distinctUntilChanged: emite el valor actual si el valor anterior no es el mismo
numeros$
    .pipe(
        distinctUntilChanged()
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
        nombre: 'X'
    },
    {
        nombre: 'Megaman'
    },
    {
        nombre: 'Zero'
    }
];

// distinctUntilChanged con objetos: se admite una funcion comparadora que debe retornar un booleano
// si retorna true, se bloqueara la emision actual; si es false, no emite
from(personajes)
    .pipe(
        distinctUntilChanged((p1, p2) => p1.nombre === p2.nombre)
    )
    .subscribe(console.log);
