import { of } from 'rxjs';
import { take, tap } from 'rxjs/operators';

// inclusive el observable original deja de emitir datos una vez que take() termina
const numeros$ = 
    of(1, 2, 3, 4, 5)
        .pipe(
            tap(console.log)
        );

// take(3): solo obtener tres primeros valores emitidos
// take() tiene la peculiaridad de cancelar la suscripcion y los datos emitidos del observable
// una vez que concluye
numeros$
    .pipe(
        tap((val: number) => console.log('tap: ', val)),
        take(3)
    )
    .subscribe({
        next: (val: number) => console.log('next: ', val),
        complete: () => console.log('complete')
    });

