// ==========================
// 1. VARIABLES DE ELEMENTOS
// ==========================

// Editores de código (HTML, CSS, JS)
const htmlCode = document.getElementById('html-code');
const cssCode = document.getElementById('css-code');
const jsCode = document.getElementById('js-code');

// Elementos de la vista previa
const outputFrame = document.getElementById('output-frame');

// Botones para mostrar/ocultar elementos
const showImageBtn = document.getElementById('show-image-btn');
const showColorsBtn = document.getElementById('show-colors-btn');

// Elementos para la visualización de la imagen y la cinta de colores
const imagePreview = document.getElementById('image-preview');
const colorBar = document.getElementById('color-bar');

// Contenedores para los números de línea en cada editor
const lineNumbersContainers = {
    html: document.getElementById('html-line-numbers'),
    css: document.getElementById('css-line-numbers'),
    js: document.getElementById('js-line-numbers')
};

// ==========================
// 2. EJECUCIÓN DEL CÓDIGO
// ==========================

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

// ==========================
// 3. MOSTRAR/OCULTAR IMAGEN DE LA ACTIVIDAD
// ==========================

showImageBtn.addEventListener('click', function () {
    const icon = showImageBtn.querySelector('i');  // Seleccionamos el ícono dentro del botón

    // Alterna la visibilidad de la imagen de la actividad y cambia el texto del botón
    if (imagePreview.style.display === 'none') {
        imagePreview.style.display = 'block';
        showImageBtn.textContent = "Ocultar Actividad";
        const iconHTML = '<i class="fas fa-eye-slash"></i>'; // Icono de ocultar
        showImageBtn.innerHTML = iconHTML + " Ocultar Actividad";
    } else {
        imagePreview.style.display = 'none';
        showImageBtn.textContent = "Ver Actividad";
        const iconHTML = '<i class="fas fa-eye"></i>'; // Icono de ver
        showImageBtn.innerHTML = iconHTML + " Ver Actividad";
    }
});

// ==========================
// 4. ACTUALIZACIÓN DE LOS NÚMEROS DE LÍNEA
// ==========================

// Función para actualizar los números de línea en el editor
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

// ==========================
// 5. MOSTRAR/OCULTAR LA CINTA DE COLORES
// ==========================

showColorsBtn.addEventListener('click', function () {
    // Alterna la visibilidad de la cinta de colores
    colorBar.style.display = colorBar.style.display === 'none' || colorBar.style.display === '' ? 'block' : 'none';
});

// ==========================
// 6. MODO OSCURO
// ==========================

// Función para activar o desactivar el modo oscuro
const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    
    // Actualiza los íconos según el estado del modo oscuro
    const darkModeCheckbox = document.getElementById('dark-mode-checkbox');
    const lightIcon = document.getElementById('light-icon');
    const darkIcon = document.getElementById('dark-icon');

    if (darkModeCheckbox.checked) {
        lightIcon.style.opacity = '0';  // Oculta el sol
        darkIcon.style.opacity = '1';   // Muestra la luna
    } else {
        lightIcon.style.opacity = '1';  // Muestra el sol
        darkIcon.style.opacity = '0';   // Oculta la luna
    }
};

// Agrega el evento al interruptor de modo oscuro
const darkModeCheckbox = document.getElementById('dark-mode-checkbox');
darkModeCheckbox.addEventListener('change', toggleDarkMode);

// Inicializa el modo oscuro según el estado del checkbox
window.onload = function () {
    if (darkModeCheckbox.checked) {
        toggleDarkMode();  // Aplica el modo oscuro si está activado
    }
};
