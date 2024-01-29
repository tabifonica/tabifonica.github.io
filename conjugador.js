import terminaciones from './terminaciones.js';
export default function conjugar(infinitivo, TAM, sujeto) {

    // Obtener la terminación del verbo según su infinitivo
    const verbo = infinitivo.toLowerCase();
    const terminación_INF = verbo.endsWith('ar') ? 'ar'
        : verbo.endsWith('er') ? 'er'
        : verbo.endsWith('ir') ? 'ir'
        : null;

    if (!terminación_INF) {
        throw new Error('El verbo ingresado no es válido');
    }

    // Obtener la conjugación según el TAM y el sujeto
    const conjugación = terminaciones[terminación_INF][TAM][sujeto];

    if (!conjugación) {
        throw new Error('El TAM o el sujeto ingresado no es válido');
    }

    // Retornar el verbo conjugado
    return verbo.slice(0, -2) + conjugación;
}

