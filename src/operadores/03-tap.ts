import { range, Observer, PartialObserver } from 'rxjs';
import { tap, map } from 'rxjs/operators';

const observer: PartialObserver<string> = {
    next: (val: string) => console.log('tap2', val),
    complete: () => console.log('se termino todo')
};

const numeros$ = range(1, 5);

// tap: ejecuta codigo secundario que no altera el flujo de informacion
// puede recibir handlers next, error, complete o una implementacion de Observer
// por lo que tap puede simular errores o correr codigo cuando el observable termina
numeros$
    .pipe(
        tap<number>((val: number) => console.log('tap1', val)),
        map<number, string>((val: number) => `El numero es ${val}`),
        tap<string>(observer)
    )
    .subscribe((val: string) => console.log('subs', val));
