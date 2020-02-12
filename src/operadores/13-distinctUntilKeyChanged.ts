import { of, fromEvent, interval, from } from 'rxjs';
import { take, tap, first, map, takeWhile, takeUntil, skip, distinct, distinctUntilChanged, distinctUntilKeyChanged } from 'rxjs/operators';

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

// distinctUntilKeyChanged bloquea objetos a emitir cuando la propiedad objetivo tiene el mismo
// valor que la del objeto anterior
from(personajes)
    .pipe(
        distinctUntilKeyChanged('nombre')
    )
    .subscribe(console.log);
