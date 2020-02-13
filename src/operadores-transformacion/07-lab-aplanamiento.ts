import { fromEvent, Observable, interval, of } from 'rxjs';
import { pluck, debounceTime, distinctUntilChanged, map, mergeAll, mergeMap, switchMap, take, concatMap, exhaustMap, tap, catchError } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';

const form = document.createElement('form');

const inputEmail = document.createElement('input');
const inputPassword = document.createElement('input');

const submitBtn = document.createElement('button');

inputEmail.type = 'email';
inputEmail.placeholder = 'Email';
inputEmail.value = 'eve.holt@reqres.in';

inputPassword.type = 'password';
inputPassword.placeholder = 'Password';
inputPassword.value = 'cityslicka';

submitBtn.innerHTML = 'Ingresar';

form.append(inputEmail, inputPassword, submitBtn);
document.querySelector('body').append(form);

const loginHttpRequest = 
    (payload: LoginRequest) => 
        ajax
            .post('https://reqres.in/api/login?delay=1', payload)
            .pipe(

                pluck<AjaxResponse, string>('response', 'token'),

                catchError(() => of('no-token'))

            );

interface LoginRequest {
    email: string;
    password: string;
}

const submitForm$ = 
    fromEvent<Event>(form, 'submit')
        .pipe(

            tap<Event>((e: Event) => e.preventDefault()),

            map<Event, LoginRequest>((e: Event) => ({
                email: e.target[0].value as string,
                password: e.target[1].value as string
            })),

            exhaustMap<LoginRequest, Observable<string>>(loginHttpRequest)

        );

submitForm$
    .subscribe(console.log);
