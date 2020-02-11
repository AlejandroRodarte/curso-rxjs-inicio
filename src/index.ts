import { Observable, Subscriber } from 'rxjs';

// creando un observable con metodo estatico
// const obs$ = Observable.create();

// creando un observable con una clase
// se debe indicar el tipo de informacion que maneja el observable
// el argumento del constructor es la funcion a correr para comenzar a emitir datos
const obs$ = new Observable<string>((sub: Subscriber<string>) => {

    // observable emite datos y suscriptores reciben los datos
    sub.next('Hola');
    sub.next('Mundo!');

    // observable anuncia que ya no emitira datos
    sub.complete();

    // estas emisiones ya no se emiten porque el observable ya termino
    sub.next('Hola');
    sub.next('Mundo!');

});

obs$.subscribe((res: string) => console.log(res));
