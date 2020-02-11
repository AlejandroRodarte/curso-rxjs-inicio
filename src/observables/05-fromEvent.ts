import { Observable, fromEvent } from 'rxjs';

// eventos del DOM: emitiendo datos en observable al hacer click y soltar teclado hacia arriba
// haciendo console.log con tipo generico Event nos permite conocer el tipo de evento que dispara cada accion 
const src1$: Observable<MouseEvent> = fromEvent<MouseEvent>(document, 'click');
const src2$: Observable<KeyboardEvent> = fromEvent<KeyboardEvent>(document, 'keyup');

// esto permite acceder a propiedades particulars de cada evento como la posicion del mouse o el boton
// de teclado presionado
src1$.subscribe((e: MouseEvent) => console.log(e.x, e.y));
src2$.subscribe((e: KeyboardEvent) => console.log(e.key));
