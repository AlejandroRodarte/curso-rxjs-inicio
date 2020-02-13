import { fromEvent, Observable } from 'rxjs';
import { pluck, debounceTime, distinctUntilChanged, map, mergeAll } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { GithubUser } from '../interfaces/github-user.interface';
import { GithubUsersResponse } from '../interfaces/github-users.interface';

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

// mergeAll: fusiona Observable padre y Observable hijos en un solo flujo
input$
    .pipe(

        debounceTime<KeyboardEvent>(500),
        
        pluck<KeyboardEvent, string>('target', 'value'),

        distinctUntilChanged<string>(),

        // map retorna un Observable, por lo que se le considera un Observable hijo
        map<string, Observable<GithubUsersResponse>>(text => ajax.getJSON(`https://api.github.com/search/users?q=${text}`)),

        // mergeAll se suscribira a los Observables hijos y unira su informacion al flujo
        mergeAll<GithubUsersResponse>(),

        pluck<GithubUsersResponse, GithubUser[]>('items')

    )
    .subscribe(mostrarUsuarios);
