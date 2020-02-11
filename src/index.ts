import { Observer, Observable, Subscriber, Subscription, interval, Subject } from 'rxjs';

const observer: Observer<number> = {
    next: (value: number) => console.log(`next: ${value}`),
    error: (err: Error) => console.warn(`error: ${err.message}`),
    complete: () => console.info('completado')
};

const interval$ = new Observable<number>((sub: Subscriber<number>) => {
    const interval = setInterval(() => sub.next(Math.random()), 3000);
    return () => clearInterval(interval);
});

// subject: un tipo de observable especial
// caracteristicas
// 1. casteo multiple: muchas suscripciones estaran sujetas a este mismo Subject; sirve para transmitir la misma info
// 2. tambien es un observer
// 3. next, error y complete 
const subject$ = new Subject<number>();

// ejemplo de 2. el subject puede funcionar como un observer
// para que nos sirve?
interval$.subscribe(subject$);

// en vez de subscribirnos al observable directamente, nos subscribimos al subject
// para recibir la misma informacion
const subscription1 = subject$.subscribe((num: number) => console.log(`[subscription1]: ${num}`));
const subscription2 = subject$.subscribe((num: number) => console.log(`[subscription2]: ${num}`));

// const subscription1 = interval$.subscribe((num: number) => console.log(`[subscription1]: ${num}`));
// const subscription2 = interval$.subscribe((num: number) => console.log(`[subscription2]: ${num}`));
