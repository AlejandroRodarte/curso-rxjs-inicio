import { Observer, Observable, Subscriber, Subscription, interval, Subject } from 'rxjs';

const observer: Observer<number> = {
    next: (value: number) => console.log(`next: ${value}`),
    error: (err: Error) => console.warn(`error: ${err.message}`),
    complete: () => console.info('completado')
};

const interval$ = new Observable<number>((sub: Subscriber<number>) => {

    const interval = setInterval(() => sub.next(Math.random()), 3000);

    return () => {
        clearInterval(interval);
        console.log('interval destruido');
    };

});

// subject: un tipo de observable especial
// caracteristicas
// 1. casteo multiple: muchas suscripciones estaran sujetas a este mismo Subject; sirve para transmitir la misma info
// 2. tambien es un observer
// 3. next, error y complete 
const subject$ = new Subject<number>();

// ejemplo de 2. el subject puede funcionar como un observer
// para que nos sirve?
const intervalSubscription = interval$.subscribe(subject$);

// en vez de subscribirnos al observable directamente, nos subscribimos al subject
// para recibir la misma informacion
const subscription1 = subject$.subscribe((num: number) => console.log(`[subscription1]: ${num}`));
const subscription2 = subject$.subscribe((num: number) => console.log(`[subscription2]: ${num}`));

// const subscription1 = interval$.subscribe((num: number) => console.log(`[subscription1]: ${num}`));
// const subscription2 = interval$.subscribe((num: number) => console.log(`[subscription2]: ${num}`));


// como el subject es un Observer (implementacion de interfaz), podemos llamar
// next, error y complete; esto permite introducir informacion al flujo del observable original

// cuando la data es producida por el observable en si mismo es considerado un `Cold Observable`
// cuando la data se produce FUERA del Observable se le llama `Hot Observable`

// un Subject transforma un `Cold Observable` en `Hot`
setTimeout(() => {
    subject$.next(10);
    subject$.complete();
    intervalSubscription.unsubscribe();
}, 3500);
