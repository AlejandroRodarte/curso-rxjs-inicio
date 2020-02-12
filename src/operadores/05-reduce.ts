import { fromEvent, interval } from 'rxjs';
import { tap, map, take, reduce } from 'rxjs/operators';

// reduce en javascript
const numbers = [1, 2, 3, 4, 5];

const totalReducer = (acc: number, cv: number) => acc + cv;

const sum = numbers.reduce(totalReducer, 0);
console.log(sum);

// reduce en rxjs
// emitir 4 valores cada 1000 ms y completar observable
// reducer iniciar acumulador a partir de 5
interval(1000)
    .pipe(
        take(4),
        reduce(totalReducer, 5)
    )
    .subscribe({
        next: (next: number) => console.log('next: ', next),
        complete: () => console.log('complete')
    });
