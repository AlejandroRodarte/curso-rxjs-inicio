import { from, of } from 'rxjs';

// of: toma argumentos y genera secuencia de valores
// from: array, promise, iterable y observable

const observer = {
    next: val => console.log('next: ', val),
    error: err => console.log('error: ', err),
    complete: () => console.log('completado')
};

// numeros
// const sourceFrom$ = from([1, 2, 3, 4, 5]);
// const sourceOf$ = of(1, 2, 3, 4, 5);

// strings: con from() de hecho devuelve una lista de caracteres individuales
// const sourceFrom$ = from('Fernando');
// const sourceOf$ = of('Fernando');

// from con Promesas
const sourceFrom$ = from<Promise<Response>>(fetch('https://api.github.com/users/AlejandroRodarte'));

// en la suscripcion recibimos la promesa resuelta
sourceFrom$.subscribe(async (res: Response) => {
    const json = await res.json();
    console.log(json);
});

// from con generadores e iteradores
const miGenerador = function*() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
};

const miIterable = miGenerador();

from(miIterable).subscribe(observer);

sourceFrom$.subscribe(observer);
// sourceOf$.subscribe(observer);
