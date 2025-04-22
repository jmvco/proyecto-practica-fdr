// Función mejorada para actualizar los números de línea
function updateLineNumbers(textareaId, lineNumbersId) {
    const textarea = document.getElementById(textareaId);
    const lineNumbers = document.getElementById(lineNumbersId);
    
    // Contar líneas
    const lines = textarea.value.split('\n');
    const lineCount = lines.length;
    
    // Generar números de línea
    let lineNumbersHTML = '';
    for(let i = 1; i <= lineCount; i++) {
        lineNumbersHTML += i + '<br>';
    }
    
    // Asegurar al menos una línea
    if (lineCount === 0 || (lineCount === 1 && lines[0] === '')) {
        lineNumbersHTML = '1';
    }
    
    lineNumbers.innerHTML = lineNumbersHTML;
    
    // Ajustar la altura del contenedor de números de línea
    const textareaHeight = textarea.scrollHeight;
    lineNumbers.style.height = textarea.clientHeight + 'px';
}

// Sincronizar scroll entre textarea y números de línea
function syncScroll(textareaId, lineNumbersId) {
    const textarea = document.getElementById(textareaId);
    const lineNumbers = document.getElementById(lineNumbersId);
    
    textarea.addEventListener('scroll', function() {
        lineNumbers.scrollTop = textarea.scrollTop;
    });
}

// Observador de cambios en el tamaño del textarea
function observeResize(textareaId, lineNumbersId) {
    const textarea = document.getElementById(textareaId);
    const lineNumbers = document.getElementById(lineNumbersId);
    
    // Crear un ResizeObserver para observar cambios en el tamaño
    const resizeObserver = new ResizeObserver(() => {
        lineNumbers.style.height = textarea.clientHeight + 'px';
    });
    
    // Observar el textarea
    resizeObserver.observe(textarea);
}

// Configuración inicial para todos los editores
function setupEditor(textareaId, lineNumbersId) {
    const textarea = document.getElementById(textareaId);
    
    // Actualizar números de línea cuando se edita el texto
    textarea.addEventListener('input', () => {
        updateLineNumbers(textareaId, lineNumbersId);
    });
    
    // Actualizar números de línea al presionar Enter
    textarea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            setTimeout(() => {
                updateLineNumbers(textareaId, lineNumbersId);
            }, 0);
        }
    });
    
    // Inicializar números de línea
    updateLineNumbers(textareaId, lineNumbersId);
    
    // Sincronizar scroll
    syncScroll(textareaId, lineNumbersId);
    
    // Observar cambios de tamaño
    observeResize(textareaId, lineNumbersId);
}

// Configurar todos los editores
window.addEventListener('DOMContentLoaded', () => {
    setupEditor('html-code', 'html-line-numbers');
    setupEditor('css-code', 'css-line-numbers');
    setupEditor('js-code', 'js-line-numbers');
    
    // También actualizar al cargar la página
    setTimeout(() => {
        updateLineNumbers('html-code', 'html-line-numbers');
        updateLineNumbers('css-code', 'css-line-numbers');
        updateLineNumbers('js-code', 'js-line-numbers');
    }, 100);
});

// Ejecutar código
document.getElementById('run-btn').addEventListener('click', function() {
    const htmlCode = document.getElementById('html-code').value;
    const cssCode = document.getElementById('css-code').value;
    const jsCode = document.getElementById('js-code').value;
    
    const outputFrame = document.getElementById('output-frame');
    const frameDoc = outputFrame.contentDocument || outputFrame.contentWindow.document;
    
    frameDoc.open();
    frameDoc.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <style>${cssCode}</style>
        </head>
        <body>
            ${htmlCode}
            <script>${jsCode}</script>
        </body>
        </html>
    `);
    frameDoc.close();
    
    // Animación del botón para feedback visual
    this.classList.add('running');
    setTimeout(() => {
        this.classList.remove('running');
    }, 300);
});

// Mostrar/ocultar la imagen de actividad
document.getElementById('show-image-btn').addEventListener('click', function() {
    const imagePreview = document.getElementById('image-preview');
    if (imagePreview.style.display === 'none') {
        imagePreview.style.display = 'block';
        this.innerHTML = '<i class="fas fa-eye-slash"></i> Ocultar Actividad';
    } else {
        imagePreview.style.display = 'none';
        this.innerHTML = '<i class="fas fa-image"></i> Ver Actividad';
    }
});

// Personalización
document.getElementById('bg-color').addEventListener('input', function() {
    document.body.style.backgroundColor = this.value;
});

document.getElementById('font-size').addEventListener('input', function() {
    const fontSize = this.value;
    document.getElementById('font-size-value').textContent = fontSize + 'px';
    
    // Aplicar el tamaño de fuente a los editores
    document.getElementById('html-code').style.fontSize = fontSize + 'px';
    document.getElementById('css-code').style.fontSize = fontSize + 'px';
    document.getElementById('js-code').style.fontSize = fontSize + 'px';
    
    // Aplicar también a los números de línea
    document.getElementById('html-line-numbers').style.fontSize = fontSize + 'px';
    document.getElementById('css-line-numbers').style.fontSize = fontSize + 'px';
    document.getElementById('js-line-numbers').style.fontSize = fontSize + 'px';
    
    // Actualizar la numeración para mantener la alineación
    updateLineNumbers('html-code', 'html-line-numbers');
    updateLineNumbers('css-code', 'css-line-numbers');
    updateLineNumbers('js-code', 'js-line-numbers');
});

// Ejecutar código automáticamente al cargar para mostrar ejemplo si existe
window.addEventListener('load', function() {
    // Pequeño retraso para asegurar que todo esté cargado
    setTimeout(() => {
        document.getElementById('run-btn').click();
    }, 500);
});