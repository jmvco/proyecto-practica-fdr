// Variables para los editores de código
const htmlCode = document.getElementById('html-code');
const cssCode = document.getElementById('css-code');
const jsCode = document.getElementById('js-code');
const outputFrame = document.getElementById('output-frame');
const bgColorInput = document.getElementById('bg-color');
const fontSizeInput = document.getElementById('font-size');
const fontSizeValue = document.getElementById('font-size-value');
const showImageBtn = document.getElementById('show-image-btn');
const imagePreview = document.getElementById('image-preview');

// Función para actualizar el tamaño de la fuente en tiempo real
fontSizeInput.addEventListener('input', function () {
    const fontSize = fontSizeInput.value + 'px';
    fontSizeValue.textContent = fontSize;
    document.body.style.fontSize = fontSize; // Aplica el tamaño de fuente al cuerpo de la página
});

// Función para cambiar el color de fondo de la página
bgColorInput.addEventListener('input', function () {
    document.body.style.backgroundColor = bgColorInput.value;
});

// Función para ejecutar el código y actualizar la vista previa
document.getElementById('run-btn').addEventListener('click', function () {
    const htmlContent = htmlCode.value;
    const cssContent = cssCode.value;
    const jsContent = jsCode.value;

    // Creamos un documento con el contenido HTML, CSS y JS proporcionado
    const doc = outputFrame.contentDocument || outputFrame.contentWindow.document;
    doc.open();
    doc.write(`
        <html>
            <head>
                <style>
                    ${cssContent}
                </style>
            </head>
            <body>
                ${htmlContent}
                <script>
                    ${jsContent}
                </script>
            </body>
        </html>
    `);
    doc.close();
});

// Función para mostrar/ocultar la imagen de la actividad
showImageBtn.addEventListener('click', function () {
    if (imagePreview.style.display === 'none') {
        imagePreview.style.display = 'block';
    } else {
        imagePreview.style.display = 'none';
    }
});

// Función para manejar los números de línea en los editores
function updateLineNumbers(editor, lineNumbersContainer) {
    const lines = editor.value.split('\n').length;
    let lineNumbers = '';
    for (let i = 1; i <= lines; i++) {
        lineNumbers += `<div>${i}</div>`;
    }
    lineNumbersContainer.innerHTML = lineNumbers;
}

// Actualiza los números de línea cada vez que se edite el código
htmlCode.addEventListener('input', function () {
    updateLineNumbers(htmlCode, document.getElementById('html-line-numbers'));
});

cssCode.addEventListener('input', function () {
    updateLineNumbers(cssCode, document.getElementById('css-line-numbers'));
});

jsCode.addEventListener('input', function () {
    updateLineNumbers(jsCode, document.getElementById('js-line-numbers'));
});

// Inicializa los números de línea al cargar la página
window.onload = function () {
    updateLineNumbers(htmlCode, document.getElementById('html-line-numbers'));
    updateLineNumbers(cssCode, document.getElementById('css-line-numbers'));
    updateLineNumbers(jsCode, document.getElementById('js-line-numbers'));
};
