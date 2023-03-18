import './spinner.css'

export function showSpinner() {
    const spinner = document.createElement('div');
    spinner.classList.add('spinner');
    document.body.appendChild(spinner);
}
 export function hideSpinner() {
    const spinner = document.querySelector('.spinner');
    spinner.parentNode.removeChild(spinner);
}
