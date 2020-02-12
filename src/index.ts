import { range, from } from 'rxjs';
import { filter } from 'rxjs/operators';

// filter: filtra emisiones que llegan a suscriptores por medio de un criterio booleano
// ademas de recibir el dato que se va a probar, tambien se recibe el indice del elemento que se
// esta probando
range(1, 10)
    .pipe(
        filter(
            (num: number, index: number) => num % 2 === 1
        )
    )
    .subscribe(console.log);

export interface Personaje {
    tipo: string;
    nombre: string;
}

const personajes: Personaje[] = [
    {
        tipo: 'heroe',
        nombre: 'Batman'
    },
    {
        tipo: 'heroe',
        nombre: 'Robin'
    },
    {
        tipo: 'villano',
        nombre: 'Joker'
    }
];

// barriendo arreglo de personajes, filtrando solo los personajes que son de tipo `heroe`
from(personajes)
    .pipe(
        filter<Personaje>((personaje: Personaje, index: number) => personaje.tipo === 'heroe')
    )
    .subscribe(console.log);
