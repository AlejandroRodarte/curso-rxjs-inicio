import { Observer, Observable, Subscriber, Subscription } from 'rxjs';

const observer: Observer<number> = {
    next: (value: number) => console.log(`next: ${value}`),
    error: (err: Error) => console.warn(`error: ${err.message}`),
    complete: () => console.info('completado')
};

const intervalo$ = new Observable<number>((sub: Subscriber<number>) => {

    let counter = 0;

    const interval: NodeJS.Timeout = setInterval(() => {
        sub.next(counter++);
        console.log(counter);
    }, 1000);

    // cuando se llama complete, se llama a la funcion de purga
    setTimeout(() => sub.complete(), 2500)

    // cuando el observable muera, podemos correr un procedimiento para hacer la
    // 'limpia' del observable; util para evitar fugas de memoria
    return () => clearInterval(interval);

});

const subscription1: Subscription = intervalo$.subscribe(observer);
const subscription2: Subscription = intervalo$.subscribe(observer);
const subscription3: Subscription = intervalo$.subscribe(observer);

// add() permite encadenar observables para la desuscripcion mas sencilla
subscription1.add(subscription2).add(subscription3);

// cancelar la subscripcion
setTimeout(() => {

    // observables en cadena permiten solo tener que desuscribirnos de la primera
    // suscripcion para desuscribirnos de todas
    subscription1.unsubscribe();

    // subscription2.unsubscribe();
    // subscription3.unsubscribe();

    console.log('Completado timeout');

}, 6000);
