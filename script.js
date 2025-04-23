// Variables para los editores de código
const htmlCode = document.getElementById('html-code');
const cssCode = document.getElementById('css-code');
const jsCode = document.getElementById('js-code');
const outputFrame = document.getElementById('output-frame');
const bgColorInput = document.getElementById('bg-color');
const showImageBtn = document.getElementById('show-image-btn');
const imagePreview = document.getElementById('image-preview');
const showColorsBtn = document.getElementById('show-colors-btn'); // Botón de colores
const colorBar = document.getElementById('color-bar'); // Cinta de colores
const lineNumbersContainers = {
    html: document.getElementById('html-line-numbers'),
    css: document.getElementById('css-line-numbers'),
    js: document.getElementById('js-line-numbers')
};

// Función para cambiar el color de fondo de la página
bgColorInput.addEventListener('input', function () {
    document.body.style.backgroundColor = bgColorInput.value;
});

// Función para ejecutar el código y actualizar la vista previa en el iframe
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

// Función para mostrar/ocultar la imagen de la actividad y cambiar el texto del botón con icono
showImageBtn.addEventListener('click', function () {
    const icon = showImageBtn.querySelector('i');  // Seleccionamos el ícono dentro del botón

    if (imagePreview.style.display === 'none') {
        imagePreview.style.display = 'block';
        showImageBtn.textContent = "Ocultar Actividad";  // Cambia el texto del botón
        const iconHTML = '<i class="fas fa-eye-slash"></i>'; // Icono de ocultar
        showImageBtn.innerHTML = iconHTML + " Ocultar Actividad"; // Actualiza el contenido del botón con el icono
    } else {
        imagePreview.style.display = 'none';
        showImageBtn.textContent = "Ver Actividad";  // Cambia el texto del botón
        const iconHTML = '<i class="fas fa-eye"></i>'; // Icono de ver
        showImageBtn.innerHTML = iconHTML + " Ver Actividad"; // Actualiza el contenido del botón con el icono
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
    updateLineNumbers(htmlCode, lineNumbersContainers.html);
});

cssCode.addEventListener('input', function () {
    updateLineNumbers(cssCode, lineNumbersContainers.css);
});

jsCode.addEventListener('input', function () {
    updateLineNumbers(jsCode, lineNumbersContainers.js);
});

// Inicializa los números de línea al cargar la página
window.onload = function () {
    updateLineNumbers(htmlCode, lineNumbersContainers.html);
    updateLineNumbers(cssCode, lineNumbersContainers.css);
    updateLineNumbers(jsCode, lineNumbersContainers.js);
};

// Función para mostrar/ocultar la cinta de colores al hacer clic en el botón
showColorsBtn.addEventListener('click', function () {
    // Alternamos la visibilidad de la cinta de colores
    colorBar.style.display = colorBar.style.display === 'none' || colorBar.style.display === '' ? 'block' : 'none';
});

// Función para aplicar el color seleccionado a fondo de la página
const colorSwatches = document.querySelectorAll('.color-swatch');
colorSwatches.forEach(swatch => {
    swatch.addEventListener('click', function () {
   
    });
});
