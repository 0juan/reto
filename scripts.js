function normalizeText(text) {
    // Eliminar caracteres especiales y convertir a minúsculas
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function encryptText() {
    const inputText = normalizeText(document.getElementById('inputText').value);

    if (!/^[a-z]+$/.test(inputText)) {
        alert("¡Error! Solo se aceptan letras minúsculas y sin acentos.");
        return;
    }

    // Ejemplo de encriptación simple: desplazamiento de 1 en el código ASCII
    let encryptedText = '';
    for (let i = 0; i < inputText.length; i++) {
        let charCode = inputText.charCodeAt(i);
        charCode += 1; // Desplazamiento simple (ejemplo)
        encryptedText += String.fromCharCode(charCode);
    }

    document.getElementById('outputText').value = encryptedText;

    // Mostrar el área de resultados al encriptar
    document.querySelector('.result-text').style.display = 'block';
}

function decryptText() {
    const inputText = document.getElementById('outputText').value.trim();

    // Ejemplo de desencriptación simple: deshacer el desplazamiento de 1 en el código ASCII
    let decryptedText = '';
    for (let i = 0; i < inputText.length; i++) {
        let charCode = inputText.charCodeAt(i);
        charCode -= 1; // Deshacer el desplazamiento simple (ejemplo)
        decryptedText += String.fromCharCode(charCode);
    }

    document.getElementById('inputText').value = decryptedText;
}

function copyToClipboard() {
    const outputText = document.getElementById('outputText').value.trim();

    if (outputText === "") {
        alert("No hay texto encriptado para copiar.");
        return;
    }

    navigator.clipboard.writeText(outputText).then(function() {
        alert("Texto encriptado copiado al portapapeles: " + outputText);
        document.getElementById('inputText').value = ""; // Limpiar el texto en el cuadro de entrada
        document.getElementById('outputText').value = ""; // Limpiar el texto en el cuadro de salida
        document.querySelector('.result-text').style.display = 'none'; // Ocultar el área de resultados
    }, function(err) {
        console.error('No se pudo copiar el texto: ', err);
    });
}

// Event listener para enlazar las funciones a los botones
document.getElementById('btnEncriptar').addEventListener('click', encryptText);
document.getElementById('btnDesencriptar').addEventListener('click', decryptText);
document.getElementById('btnCopiar').addEventListener('click', copyToClipboard);
