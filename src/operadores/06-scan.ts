import { fromEvent, interval, from } from 'rxjs';
import { tap, map, take, reduce, scan } from 'rxjs/operators';

const numeros = [1, 2, 3, 4, 5];

const totalAcumulador = (acc: number, cv: number) => acc + cv;

// reduce: acumula pero solo emite el valor acumulado hasta que el Observable termina
from(numeros)
    .pipe(
        reduce(totalAcumulador, 0)
    )
    .subscribe(console.log);

// scan va acumulando el resultado de acuerdo a la funcion acumuladora,
// pero cada resultado acumulado en cada iteracion es emitido hacia los suscriptores
from(numeros)
    .pipe(
        scan(totalAcumulador, 0)
    )
    .subscribe(console.log);    


interface Usuario {
    id?: string;
    autenticado?: boolean;
    token?: string;
    edad?: number;
}

// emulando el patron de Redux
// considera que este arreglo de usuarios representa las acciones
// que se van despachando con su tipo y payload
const usuarios: Usuario[] = [
    {
        id: 'fer',
        autenticado: false,
        token: null
    },
    {
        id: 'fer',
        autenticado: true,
        token: 'abc'
    },
    {
        id: 'fer',
        autenticado: true,
        token: 'abc123'
    }
];

// nos suscribimos a este arreglo que representa la fuente de acciones
// y usamos scan para devolver un nuevo objecto representando el nuevo `state`
// la funcion que se pasa al scan representa la funcion `reducer` dentro del patron Redux
// scan(reducerFunction) donde reducerFunction(state, action) state seria como el acumulador
// y el action seria el valor actual o inyectado
const state$ =
    from(usuarios)
        .pipe(
            scan<Usuario>((acc: Usuario, cv: Usuario) => ({ ...acc, ...cv }), { edad: 33 })
        );

// nos suscribimos al `state` y a medida que va siendo alterado recibimos
// el nuevo valor del `state`; usamos map para solo acceder a una propiedad en particular
const id$ = 
    state$
        .pipe(
            map(
                state => state
            )
        );

id$.subscribe(console.log);
