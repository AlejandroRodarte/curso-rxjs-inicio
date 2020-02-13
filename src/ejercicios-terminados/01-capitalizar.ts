import { from } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Ejercicio: 
 * El objetivo de es realizar la misma impresión, pero usando observables
 * Nota: NO hay que usar el ciclo "FOR OF", usar un observable y llamar la función capitalizar
 */

/**
 * Salida esperada:
 * Batman
 * Joker
 * Doble Cara
 * Pingüino
 * Hiedra Venenosa
 */

const capitalizar = (nombre: string): string => nombre.split(' ').map((s: string) => s.charAt(0).toUpperCase() + s.substr(1).toLowerCase()).join(' ');

const nombres = ['batman', 'joker', 'doble cara', 'pingüino', 'hiedra venenosa'];

from<string[]>(nombres)
    .pipe(
        map<string, string>(capitalizar)
    )
    .subscribe(console.log);
