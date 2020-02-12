import { fromEvent } from 'rxjs';
import { tap, map } from 'rxjs/operators';

// texto de relleno
const text = document.createElement('div');

text.innerHTML = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque maximus nibh placerat urna placerat, vitae tincidunt libero lobortis. Vestibulum mattis quam et urna viverra lacinia. Ut id urna interdum, consectetur sem interdum, lacinia elit. Pellentesque vestibulum nunc eros. Praesent egestas tincidunt risus a sollicitudin. Donec arcu lacus, rutrum ac arcu ut, sagittis congue mi. Maecenas imperdiet nunc et nunc suscipit, egestas gravida dui eleifend. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
<br><br>
In nunc sapien, aliquet sed sem vitae, accumsan venenatis est. Nam leo ante, vulputate et ipsum eu, fermentum convallis massa. Vivamus neque nunc, bibendum a facilisis nec, pharetra id purus. Sed non turpis iaculis, elementum justo non, faucibus mauris. Nam vitae ex ultrices, volutpat lorem a, porttitor elit. Suspendisse leo nulla, congue non fermentum eu, elementum gravida sapien. Fusce urna turpis, dictum in gravida in, luctus eu massa. Aenean et dui urna. Cras vel mauris purus.
<br><br>
Quisque rhoncus condimentum orci quis dapibus. In ultrices ante in auctor posuere. Vivamus at sodales augue, eget hendrerit enim. Mauris ligula nulla, fringilla at gravida ut, laoreet hendrerit eros. Proin quis pellentesque lorem. Fusce nec tincidunt velit. Donec ac molestie nunc. Phasellus eu lacinia enim. Nullam sagittis, ligula vel vestibulum pulvinar, ipsum eros auctor nibh, et tempor ante tortor imperdiet libero. Vivamus ultricies tincidunt massa, et luctus diam dictum sed. Aliquam dictum consequat nisi sed pulvinar. Cras dignissim, nunc a pharetra condimentum, est orci convallis lacus, ac tincidunt turpis diam a tellus. Morbi tincidunt, dolor ut sagittis finibus, dui nulla dapibus nibh, vitae scelerisque enim orci non ligula. Aliquam erat volutpat. Sed faucibus ac orci nec vulputate. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
<br><br>
Suspendisse potenti. Aliquam mattis volutpat nibh sit amet euismod. Curabitur tincidunt hendrerit turpis, ut dictum orci tempus et. Phasellus imperdiet orci vitae velit molestie varius. Fusce sed sem at sem tincidunt molestie ut id mi. Suspendisse sollicitudin aliquet eros, vitae aliquet augue mollis nec. Sed varius auctor semper. Pellentesque rutrum felis sed magna hendrerit gravida. Sed vitae justo elit. Phasellus interdum felis elit, eget lobortis dui rhoncus posuere.
<br><br>
Quisque sagittis nunc ac congue gravida. In et sem leo. Cras eleifend, risus at pretium imperdiet, leo nisi fermentum mi, a malesuada erat felis ut orci. Integer vestibulum dui quis maximus mollis. Sed egestas purus pharetra, pellentesque augue sed, pharetra turpis. Donec ut fermentum mauris. Integer nec rutrum quam, id molestie lectus. In consequat ornare ex, quis tincidunt enim semper a. Nulla id orci elit. Aliquam erat volutpat. Nam vel quam ac mi mattis rutrum. Sed rhoncus bibendum tellus, in tempor dui elementum nec. Suspendisse sed purus vel eros pretium congue et quis justo. Vestibulum volutpat ut risus quis efficitur. Morbi eget dolor aliquet, eleifend nisl condimentum, rutrum metus.
`;

// pegando texto
const body = document.querySelector('body');
body.append(text);

// pegando progress bar
const progressBar = document.createElement('div');
progressBar.setAttribute('class', 'progress-bar');
body.append(progressBar);

// interfaz que define las propiedades requeridas para calcular
// el porcentaje de scroll del usuario
interface ScrollData {
    clientHeight: number;
    scrollHeight: number;
    scrollTop: number;
}

// funcion que recibe los datos de scroll y retorna un porcentaje de ancho
// para la barra de progreso
const obtenerAncho = (scrollData: ScrollData): string => {

    const { scrollTop, scrollHeight, clientHeight } = scrollData;

    const percentage = (100 * scrollTop) / (scrollHeight - clientHeight);
    return `${percentage}%`;

};

// el evento scroll produce un evento
// se tuvo que declarar como `any` ya que `documentElement` no esta tipificado
// map: transforma el objeto del evento en datos conforme a ScrollData
// tap: se corre codigo secundario para setear el ancho de la barra de progreso a lo que
// devuelva la funcion auxiliar
const scroll$ = 
    fromEvent<any>(document, 'scroll')
        .pipe(
            map<any, ScrollData>(
                e => ({
                    scrollTop: e.target.documentElement.scrollTop,
                    clientHeight: e.target.documentElement.clientHeight,
                    scrollHeight: e.target.documentElement.scrollHeight
                })
            ),
            tap<ScrollData>(
                (scrollData: ScrollData) => progressBar.style.width = obtenerAncho(scrollData)
            )
        );

scroll$.subscribe();

