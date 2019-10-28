const errorBox = document.querySelector("#errorBox");

export function showError(message) {
    errorBox.style.display = !message ? "none" : "block";
    errorBox.innerText = message;
}

export function clearError() {
    showError('');
}