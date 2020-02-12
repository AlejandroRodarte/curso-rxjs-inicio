import { asyncScheduler, Subscription } from 'rxjs';

// asyncScheduler permite ejecutar funciones como setTimeout o setInterval
// setTimeout(() => {}, 3000);
// setInterval(() => {}, 3000);

const saludar = () => console.log('Hola mundo!');

// si la funcion se llamara con asyncScheduler, solo se podra pasar un argumento:
// el state
const saludarConNombre = ({ nombre, apellido }) => console.log(`Hola ${nombre} ${apellido}`);

// asyncScheduler como setTimeout: correr funcion despues de 5000ms
asyncScheduler.schedule(saludar, 5000);

// asyncScheduler como setTimeout con argumentos
asyncScheduler.schedule(saludarConNombre, 5000, {
    nombre: 'Alejandro',
    apellido: 'Rodarte'
});

// asyncScheduler como setInterval: debe recibir una funcion normal (no de flecha)
// para poder iniciar el intervalo por medio de this.schedule
// comenzara a correr a los 3000 ms con un estado inicial de 0
const subscription: Subscription = asyncScheduler.schedule(function(state) {

    console.log('state', state);

    // se crea el intervalo con el nuevo estado, se ejecuta cada 1000 ms
    this.schedule(state + 1, 1000);

}, 3000, 0);

// desuscribirse del intervalo
asyncScheduler.schedule(() => subscription.unsubscribe(), 6000);
