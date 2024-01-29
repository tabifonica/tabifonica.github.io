import conjugar from './conjugador.js';
import andamiaje from './andamiaje_de_preguntas.js';

export default function construirPregunta() {
    // Elijir un verbo al azar del andamiaje
    const verbos = Object.keys(andamiaje);
    let verbo = verbos[Math.floor(Math.random() * verbos.length)];

    // Elijir el sujeto al azar
    const sujetos = ['Sg1', 'Sg2.casual', 'Sg2.formal', 'Sg3', 'Pl1', 'Pl2', 'Pl3'];
    let sujeto = sujetos[Math.floor(Math.random() * sujetos.length)];

    // Convertir el sujeto semántico en sujeto morfológico
    let sujetoMorfológico = sujeto === 'Sg2.formal' ? 'Sg3'
        : sujeto === 'Sg2.casual' ? 'Sg2'
        : sujeto === 'Pl2' ? 'Pl3'
        : sujeto;

    // Al principio, el TAM va a ser siempre 'PRES_IND'
    let TAM = 'PRES_IND';

    // Obtener la correcta conjugación del verbo
    let verboConjugado = conjugar(verbo, TAM, sujetoMorfológico);

    // Obtener el pronombre que corresponde al sujeto
    const pronombresSg3 = ['(él)', '(ella)'];
    const pronombresPl3 = ['(ellos)', '(ellas)'];
    const pronombresOtros = {'Sg1': '(yo)', 'Sg2.casual': '(tú)', 'Sg2.formal': '(usted)', 'Pl1': '(nosotros)', 'Pl2': '(ustedes)'};

    let pronombre = ''
    if (sujeto === 'Sg3') {
        pronombre = pronombresSg3[Math.floor(Math.random() * 2)];
    }
    else if (sujeto === 'Pl3') {
        pronombre = pronombresPl3[Math.floor(Math.random() * 2)];
    }
    else {
        pronombre = pronombresOtros[sujeto];
    }

    // Elijir una frase al azar del andamiaje
    let frasesVerbales = andamiaje[verbo];
    let fraseVerbal = frasesVerbales[Math.floor(Math.random() * frasesVerbales.length)];

    // Construir la frase completa y la pregunta
    let pregunta = '';
    if (sujeto.includes('2')) {
        pregunta = '¿___ ' + fraseVerbal + ' ' + pronombre + '?';
    }
    else {
        pregunta = pronombre + ' ___ ' + fraseVerbal + '.';
    }

    return [pregunta, verbo, verboConjugado];
};