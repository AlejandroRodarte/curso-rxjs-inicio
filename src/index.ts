import { range, fromEvent } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

// map: transforma secuencia de numeros multiplicandolos por 10 y convirtiendo a string
// el tipado de map indica el tipo de objeto que entra y el tipo de objeto que sale
range(1, 5)
    .pipe(
        map<number, string>(
            (num: number) => `El siguiente numero es ${num * 10}`
        )
    )
    .subscribe(console.log);

const keyup$ = fromEvent<KeyboardEvent>(document, 'keyup');

// usando map para transformar KeyboardEvent a un string del codigo de la tecla presionada
keyup$
    .pipe(
        map<KeyboardEvent, string>(
            (event: KeyboardEvent) => event.code
        )
    )
    .subscribe((code: string) => console.log('map', code));

// pluck permite extraer una sola propiedad de un objecto
// se pasa una secuencia de strings como `path` a la propiedad que buscamos obtener
const keyUpPluck$ = 
    keyup$
        .pipe(
            pluck<KeyboardEvent, string>('target', 'baseURI')
        )
        .subscribe((key: string) => console.log('pluck', key));
