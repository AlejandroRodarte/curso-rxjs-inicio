import { fromEvent } from 'rxjs';
import { pluck, debounceTime, distinctUntilChanged, map, mergeAll } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

const body = document.querySelector('body');

const textInput = document.createElement('input');
const orderList = document.createElement('ol');

body.append(textInput, orderList);

const input$ = fromEvent<KeyboardEvent>(textInput, 'keyup');

// mergeAll: fusiona Observable padre y Observable hijos en un solo flujo
input$
    .pipe(

        pluck('target', 'value'),

        debounceTime(500),

        distinctUntilChanged(),

        // map retorna un Observable, por lo que se le considera un Observable hijo
        map(text => ajax.getJSON(`https://api.github.com/search/users?q=${text}`)),

        // mergeAll se suscribira a los Observables hijos y unira su informacion al flujo
        mergeAll(),

        pluck('items')

    )
    .subscribe(console.log);
