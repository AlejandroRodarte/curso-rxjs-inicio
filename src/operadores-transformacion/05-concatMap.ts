import { fromEvent, Observable, interval } from 'rxjs';
import { pluck, debounceTime, distinctUntilChanged, map, mergeAll, mergeMap, switchMap, take, concatMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { GithubUser } from './interfaces/github-user.interface';
import { GithubUsersResponse } from './interfaces/github-users.interface';

const interval$ = 
    interval(500)
        .pipe(
            take(3)
        );

const click$ = fromEvent(document, 'click');

// concatMap: solo una suscripcion en el Observable hijo a la vez, y se ejecutan uno
// despues del otro (el segundo Observable se suscribe hasta que el primero Observable termine)
click$
    .pipe(
        concatMap(
            () => interval$
        )
    )
    .subscribe(console.log);

