import { of } from 'rxjs';

// of: crea observable a partir de una lista de datos
// los emite en secuencia y completa cuando termina
const obs$ = of<number>(1, 2, 3, 4, 5, 6);

// const obs$ = of([1, 2], { a: 1, b: 2 }, function(){}, true, Promise.resolve(true));

console.log('inicio del observable');

// of es SINCRONO
obs$.subscribe(
    next => console.log('[next]: ', next),
    null,
    () => console.log('observable completado')
);

console.log('fin del observable');
