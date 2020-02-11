import { Observable, Subscriber, Subscription, Observer } from 'rxjs';

// otra forma de manejar datos, errores y completado de observables como suscriptores
// usando Observers
const observer: Observer<string> = {
    next: (value: string) => console.log(`siguiente [next]: ${value}`),
    error: (err: Error) => console.warn(`error [obs]: ${err.message}`),
    complete: () => console.info('completado [obs]')
};

// creando un observable con metodo estatico
// const obs$ = Observable.create();

// creando un observable con una clase
// se debe indicar el tipo de informacion que maneja el observable
// el argumento del constructor es la funcion a correr para comenzar a emitir datos
const obs$ = new Observable<string>((sub: Subscriber<string>) => {

    // observable emite datos y suscriptores reciben los datos
    // llamada a primer callback declarado en obs$.subscribe
    sub.next('Hola');
    sub.next('Mundo!');

    // forzando un error
    // llamada a segundo callback declarado en obs$.subscribe
    // const a = undefined;
    // a.nombre = 'Alejandro';

    // observable anuncia que ya no emitira datos
    // llamada a tercer callback declarado en obs$.subscribe
    sub.complete();

    // estas emisiones ya no se emiten porque el observable ya termino
    sub.next('Hola');
    sub.next('Mundo!');

});

// callbacks a pasar al suscriptor
const nextHandler = (res: string) => console.log(`next: ${res}`);
const errorHandler = (err: Error) => console.warn(`error: ${err.message}`);
const completeHandler = () => console.log('observer completado');

// la suscripcion construida con los callbacks
const subscription: Subscription = obs$.subscribe(nextHandler, errorHandler, completeHandler);

const subscription2 = obs$.subscribe(observer);