import { fromEvent, Observable } from 'rxjs';
import { pluck, debounceTime, distinctUntilChanged, map, mergeAll, mergeMap, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { GithubUser } from './interfaces/github-user.interface';
import { GithubUsersResponse } from './interfaces/github-users.interface';

const body = document.querySelector('body');

const textInput = document.createElement('input');
const orderList = document.createElement('ol');

body.append(textInput, orderList);

const mostrarUsuarios = (users: GithubUser[]) => {

    orderList.innerHTML = '';

    users.forEach((usuario: GithubUser) => {

        const li = document.createElement('li');
        const img = document.createElement('img');

        img.src = usuario.avatar_url;

        const anchor = document.createElement('a');

        anchor.href = usuario.html_url;
        anchor.text = 'Ver pagina';
        anchor.target = '_blank';

        li.append(img);
        li.append(usuario.login + ' ');
        li.append(anchor);

        orderList.append(li);

    });

};

const input$ = fromEvent<KeyboardEvent>(textInput, 'keyup');

// el problema con mergeMap: mergeMap suscribe cuantas emisiones en el Observable original existan
// si ese Observable hijo al que se suscribe es una peticion http, se puede generar mucha basura
// switchMap limita a tener solo una suscripcion del Observable hijo
input$
    .pipe(

        debounceTime<KeyboardEvent>(500),
        
        pluck<KeyboardEvent, string>('target', 'value'),

        distinctUntilChanged<string>(),

        switchMap<string, Observable<GithubUsersResponse>>((text: string) => ajax.getJSON<GithubUsersResponse>(`https://api.github.com/search/users?q=${text}`)),

        pluck<GithubUsersResponse, GithubUser[]>('items')

    )
    .subscribe(mostrarUsuarios);

const url = 'https://httpbin.org/delay/1?arg=';

// switchMap: solo permite una suscripcion a la vez del Observable hijo
// esto salva recursos al no enviar peticiones http innecesarias
input$
    .pipe(
        pluck<KeyboardEvent, string>('target', 'value'),
        switchMap<string, Observable<unknown>>((text: string) => ajax.getJSON(url + text))
    )
    .subscribe(console.log);
