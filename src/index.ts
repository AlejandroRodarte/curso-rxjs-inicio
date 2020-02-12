import { interval, timer, Observer } from 'rxjs';

const observer: Observer<number> = {
    next: val => console.log('next: ', val),
    error: err => console.log('error: ', err),
    complete: () => console.log('complete')
};

// emitir numeros cada 1000 ms
const interval$ = interval(1000);

const timer$ = timer(2000);

// interval es asincrono por naturaleza
console.log('inicio');
interval$.subscribe(observer);
console.log('fin');

console.log('inicio');
timer$.subscribe(observer);
console.log('fin');
