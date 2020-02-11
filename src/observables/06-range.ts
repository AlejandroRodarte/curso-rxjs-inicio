import { of, range, asyncScheduler } from 'rxjs';

// equivalente a of(1, 2, 3, ..., 18, 19, 20)
// 1: queremos que empiece de -5
// 20: queremos la SIGUIENTES 10 EMISIONES (hasta 4)
// asyncScheduler convierte el observable en asincrono
const src$ = range(-5, 10, asyncScheduler);

// similar a of, es sincrono
console.log('inicio');
src$.subscribe(console.log);
console.log('fin');
