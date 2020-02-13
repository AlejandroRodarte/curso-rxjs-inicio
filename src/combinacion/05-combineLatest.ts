import { fromEvent, Observable, interval, of, concat, from, merge, combineLatest } from 'rxjs';
import { pluck, debounceTime, distinctUntilChanged, map, mergeAll, mergeMap, switchMap, take, concatMap, exhaustMap, tap, catchError, startWith, endWith } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';

// const keyup$ = fromEvent(document, 'keyup');
// const click$ = fromEvent(document, 'click');

// combineLatest(
//     keyup$
//         .pipe(pluck('type')), 
//     click$
//         .pipe(pluck('type'))
// )
//     .subscribe(console.log);

const input1 = document.createElement('input');
const input2 = document.createElement('input');

input1.placeholder = 'email@gmail.com';
input2.placeholder = '*******';

input2.type = 'password';

document.querySelector('body').append(input1, input2);

const getInputStream = 
    (el: HTMLElement) => 
        fromEvent<KeyboardEvent>(el, 'keyup')
            .pipe(
                pluck<KeyboardEvent, string>('target', 'value')
            );

// combineLatest: combina los ultimos valores emitidos por los observables a combinar en
// un arreglo
combineLatest(
    getInputStream(input1),
    getInputStream(input2)
).subscribe((data: [string, string]) => console.log(data));
