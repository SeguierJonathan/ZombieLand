export function formatSecondes(secondes) {
    const minutes = Math.floor(secondes / 60);
    const resteSecondes = secondes % 60;
    if (resteSecondes === 0) {
        return `${minutes} min`
    }
    if (minutes === 0) {
        return `${resteSecondes} s`
    }
    else {
        return `${minutes} min ${resteSecondes} s`;
    }
}

export function formatTaille(cm) {
    const metres = Math.floor(cm / 100);
    const centimetres = cm % 100;
    if (centimetres === 0) {
        return `${metres}m$`
    }
    if (metres === 0) {
        return `${centimetres.toString().padStart(2, '0')}`
    }
    else {
        return `${metres}m${centimetres.toString().padStart(2, '0')}`;
    }
}