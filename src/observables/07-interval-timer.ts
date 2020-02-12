import { interval, timer, Observer } from 'rxjs';

const observer: Observer<number> = {
    next: val => console.log('next: ', val),
    error: err => console.log('error: ', err),
    complete: () => console.log('complete')
};

const hoyEn5 = new Date(); // ahora
hoyEn5.setSeconds(hoyEn5.getSeconds() + 5); // 5 seg en el futuro

// timer se ejecutara 5 segundos en el futuro respecto a la fecha actual
const timerDate$ = timer(hoyEn5);
timerDate$.subscribe(observer);

// emitir numeros cada 1000 ms
const interval$ = interval(1000);

// emitir dato despues de 2000 ms
// timer(0) ejecuta el observable hasta que el stack de callbacks se libere
// timer(2000, 1000) inicia la secuencia a partir de 2 segundos, pero vuelve a emitir
// despues de cada segundo (similar a interval)
const timer$ = timer(2000, 1000);

// interval es asincrono por naturaleza
console.log('inicio');
interval$.subscribe(observer);
console.log('fin');

// timer es asincrono por naturaleza
console.log('inicio');
timer$.subscribe(observer);
console.log('fin');
