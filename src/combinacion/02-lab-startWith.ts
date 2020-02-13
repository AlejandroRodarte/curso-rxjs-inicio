import { fromEvent, Observable, interval, of } from 'rxjs';
import { pluck, debounceTime, distinctUntilChanged, map, mergeAll, mergeMap, switchMap, take, concatMap, exhaustMap, tap, catchError, startWith, endWith } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';

const loadingDiv = document.createElement('div');

loadingDiv.classList.add('loading');
loadingDiv.innerHTML = 'Cargando...';

const body = document.querySelector('body');

// podemos usar startWith para incluir algun tipo de pantalla de cargado
// antes de que se complete una peticion http
ajax
    .getJSON('https://reqres.in/api/users/2?delay=3')
    .pipe(
        startWith(true)
    )
    .subscribe((res) => {

        if (typeof res === 'boolean' && res) {
            body.append(loadingDiv);
        } else {
            document.querySelector('.loading').remove();
        }

        console.log(res);

    });
