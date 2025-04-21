document.addEventListener('DOMContentLoaded', () => {
    const htmlCode = document.getElementById('html-code');
    const cssCode = document.getElementById('css-code');
    const jsCode = document.getElementById('js-code');

    const bgColorInput = document.getElementById('bg-color');
    const runButton = document.getElementById('run-btn');
    const fontSizeInput = document.getElementById('font-size');
    const fontSizeValue = document.getElementById('font-size-value');

    const outputFrame = document.getElementById('output-frame');
    const outputDoc = outputFrame.contentDocument || outputFrame.contentWindow.document;

    // Línea de números (puedes quitarlas si no usas esta funcionalidad)
    const htmlLineNumbers = document.getElementById('html-line-numbers');
    const cssLineNumbers = document.getElementById('css-line-numbers');
    const jsLineNumbers = document.getElementById('js-line-numbers');

    function updateLineNumbers(textarea, lineNumbersElement) {
        const lines = textarea.value.split('\n');
        lineNumbersElement.textContent = lines.map((_, i) => i + 1).join('\n');
    }

    function syncScroll(textarea, lineNumbersElement) {
        lineNumbersElement.scrollTop = textarea.scrollTop;
    }

    function setupTextareaEventListeners(textarea, lineNumbersElement) {
        if (textarea && lineNumbersElement) {
            textarea.addEventListener('input', () => updateLineNumbers(textarea, lineNumbersElement));
            textarea.addEventListener('scroll', () => syncScroll(textarea, lineNumbersElement));
        }
    }

    setupTextareaEventListeners(htmlCode, htmlLineNumbers);
    setupTextareaEventListeners(cssCode, cssLineNumbers);
    setupTextareaEventListeners(jsCode, jsLineNumbers);

    runButton.addEventListener('click', () => {
        const htmlContent = htmlCode.value;
        const cssContent = cssCode.value;
        const jsContent = jsCode.value;

        outputDoc.open();
        outputDoc.write(`
            <html>
                <head>
                    <style>${cssContent}</style>
                </head>
                <body>
                    ${htmlContent}
                    <script>
                        try {
                            ${jsContent}
                        } catch (error) {
                            console.error('Error al ejecutar el código JS:', error);
                        }
                    <\/script>
                </body>
            </html>
        `);
        outputDoc.close();
    });

    bgColorInput.addEventListener('input', (e) => {
        document.body.style.backgroundColor = e.target.value;
    });

    fontSizeInput.addEventListener('input', (e) => {
        const newSize = e.target.value + "px";
        fontSizeValue.textContent = newSize;
        htmlCode.style.fontSize = newSize;
        cssCode.style.fontSize = newSize;
        jsCode.style.fontSize = newSize;
    });

    const preview = document.querySelector('.output');
    preview.style.backgroundColor = '#e0f7fa';

    // Inicializar líneas de número (si existen)
    if (htmlLineNumbers && cssLineNumbers && jsLineNumbers) {
        updateLineNumbers(htmlCode, htmlLineNumbers);
        updateLineNumbers(cssCode, cssLineNumbers);
        updateLineNumbers(jsCode, jsLineNumbers);

        syncScroll(htmlCode, htmlLineNumbers);
        syncScroll(cssCode, cssLineNumbers);
        syncScroll(jsCode, jsLineNumbers);
    }

    // Mostrar/Ocultar imagen de actividad
    const showImageBtn = document.getElementById("show-image-btn");
    const imagePreview = document.getElementById("image-preview");

    showImageBtn.addEventListener("click", function () {
        imagePreview.style.display = (imagePreview.style.display === "none") ? "block" : "none";
    });
});
