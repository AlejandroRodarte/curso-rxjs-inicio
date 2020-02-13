import { fromEvent, Observable, interval, of, concat, from, merge, combineLatest, forkJoin } from 'rxjs';
import { pluck, debounceTime, distinctUntilChanged, map, mergeAll, mergeMap, switchMap, take, concatMap, exhaustMap, tap, catchError, startWith, endWith, delay } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';

const GITHUB_API_URL = 'https://api.github.com/users';
const GITHUB_USER = 'AlejandroRodarte';


// uso comun de forkJoin: multiples peticiones http
// recuerda usar catchError para atrapar errores
forkJoin({

    usuario: ajax.getJSON(`${GITHUB_API_URL}/${GITHUB_USER}`),

    repos: ajax
            .getJSON(`${GITHUB_API_URL}/${GITHUB_USER}/repsos`)
            .pipe(
                catchError(err => of([]))
            ),

    gists: ajax.getJSON(`${GITHUB_API_URL}/${GITHUB_USER}/gists`),

})
    .pipe(
        catchError(err => of(err.message))
    ).subscribe(console.log);
