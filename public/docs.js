// Funcionalidad para la documentación

// Generar API key de demo
function generateDemoKey() {
    const demoKey = 'ak_demo_' + Math.random().toString(36).substr(2, 16);
    document.getElementById('apiKeyInput').value = demoKey;

    // Guardar en localStorage para persistir en la sesión
    localStorage.setItem('expertai_demo_key', demoKey);

    // Mostrar notificación
    showNotification('API Key de demo generada', 'success');
}

// Cargar key guardada al inicio
document.addEventListener('DOMContentLoaded', () => {
    const savedKey = localStorage.getItem('expertai_demo_key');
    if (savedKey) {
        document.getElementById('apiKeyInput').value = savedKey;
    }

    // Inicializar navegación
    initDocsNavigation();

    // Resaltar sintaxis en bloques de código
    highlightCode();

    // Copiar al portapapeles
    initCopyButtons();
});

// Navegación de la documentación
function initDocsNavigation() {
    const navLinks = document.querySelectorAll('.docs-nav a');
    const sections = document.querySelectorAll('.docs-main section[id]');

    // Actualizar navegación activa al hacer scroll
    function updateActiveNav() {
        let currentSection = '';

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Scroll event
    window.addEventListener('scroll', updateActiveNav);

    // Click en links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Actualizar inicialmente
    updateActiveNav();
}

// Resaltado de sintaxis básico
function highlightCode() {
    const codeBlocks = document.querySelectorAll('.code-block pre');

    codeBlocks.forEach(block => {
        const code = block.textContent;
        let highlightedCode = code;

        // Resaltar palabras clave
        const keywords = ['const', 'let', 'var', 'function', 'async', 'await', 'if', 'else', 'for', 'while', 'class', 'import', 'from', 'export', 'default'];
        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'g');
            highlightedCode = highlightedCode.replace(regex, `<span class="keyword">${keyword}</span>`);
        });

        // Resaltar strings
        highlightedCode = highlightedCode.replace(/(['"`])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span class="string">$&</span>');

        // Resaltar comentarios
        highlightedCode = highlightedCode.replace(/\/\/.*$/gm, '<span class="comment">$&</span>');
        highlightedCode = highlightedCode.replace(/\/\*[\s\S]*?\*\//g, '<span class="comment">$&</span>');

        // Resaltar números
        highlightedCode = highlightedCode.replace(/\b(\d+)\b/g, '<span class="number">$1</span>');

        // Resaltar propiedades y métodos
        highlightedCode = highlightedCode.replace(/(\w+)\(/g, '<span class="function">$1</span>(');
        highlightedCode = highlightedCode.replace(/(\.)(\w+)/g, '$1<span class="property">$2</span>');

        block.innerHTML = highlightedCode;
    });
}

// Botones de copiar
function initCopyButtons() {
    // Añadir botones de copiar a los bloques de código
    const codeBlocks = document.querySelectorAll('.code-block');

    codeBlocks.forEach(block => {
        // Crear botón de copiar
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.textContent = '📋';
        copyBtn.title = 'Copiar código';

        // Posicionar el botón
        block.style.position = 'relative';
        block.appendChild(copyBtn);

        // Evento de clic
        copyBtn.addEventListener('click', async () => {
            const code = block.querySelector('pre').textContent;

            try {
                await navigator.clipboard.writeText(code);
                copyBtn.textContent = '✅';
                copyBtn.title = '¡Copiado!';

                setTimeout(() => {
                    copyBtn.textContent = '📋';
                    copyBtn.title = 'Copiar código';
                }, 2000);
            } catch (err) {
                console.error('Error al copiar:', err);
                showNotification('Error al copiar el código', 'error');
            }
        });
    });
}

// Sistema de notificaciones (reutilizado del script principal)
function showNotification(message, type = 'info') {
    // Eliminar notificación existente si hay una
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
        <span class="notification-message">${message}</span>
    `;

    // Estilos para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Animación de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Búsqueda en la documentación (bonus feature)
function initSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = '🔍 Buscar en la documentación...';
    searchInput.className = 'docs-search';

    // Estilos del buscador
    searchInput.style.cssText = `
        width: 100%;
        padding: 0.75rem;
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        font-size: 1rem;
        margin-bottom: 1.5rem;
        outline: none;
        transition: border-color 0.2s ease;
    `;

    searchInput.addEventListener('focus', () => {
        searchInput.style.borderColor = '#3b82f6';
    });

    searchInput.addEventListener('blur', () => {
        searchInput.style.borderColor = '#e5e7eb';
    });

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const sections = document.querySelectorAll('.docs-main section');

        sections.forEach(section => {
            const text = section.textContent.toLowerCase();

            if (text.includes(searchTerm) || searchTerm === '') {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });

        // Resaltar el término buscado
        if (searchTerm) {
            highlightSearchTerm(searchTerm);
        } else {
            removeSearchHighlight();
        }
    });

    // Insertar el buscador al principio del contenido principal
    const docsMain = document.querySelector('.docs-main');
    if (docsMain) {
        docsMain.insertBefore(searchInput, docsMain.firstChild);
    }
}

// Resaltar término de búsqueda
function highlightSearchTerm(term) {
    removeSearchHighlight();

    const walker = document.createTreeWalker(
        document.querySelector('.docs-main'),
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    const textNodes = [];
    let node;

    while (node = walker.nextNode()) {
        if (node.parentElement.tagName !== 'SCRIPT' &&
            node.parentElement.tagName !== 'STYLE' &&
            node.textContent.trim()) {
            textNodes.push(node);
        }
    }

    textNodes.forEach(textNode => {
        const text = textNode.textContent;
        const regex = new RegExp(`(${term})`, 'gi');

        if (regex.test(text)) {
            const span = document.createElement('span');
            span.innerHTML = text.replace(regex, '<mark>$1</mark>');
            textNode.parentNode.replaceChild(span, textNode);
        }
    });
}

// Eliminar resaltado de búsqueda
function removeSearchHighlight() {
    const marks = document.querySelectorAll('mark');
    marks.forEach(mark => {
        const parent = mark.parentNode;
        parent.replaceChild(document.createTextNode(mark.textContent), mark);
        parent.normalize();
    });
}

// Inicializar búsqueda cuando se carga la página
if (document.querySelector('.docs-main')) {
    initSearch();
}

// Contador de caracteres para inputs con límites
function initCharCounters() {
    const inputs = document.querySelectorAll('input[maxlength], textarea[maxlength]');

    inputs.forEach(input => {
        const maxLength = input.getAttribute('maxlength');
        const counter = document.createElement('small');
        counter.className = 'char-counter';
        counter.textContent = `0 / ${maxLength}`;

        // Estilos del contador
        counter.style.cssText = `
            color: #64748b;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            display: block;
        `;

        input.parentNode.appendChild(counter);

        input.addEventListener('input', () => {
            const currentLength = input.value.length;
            counter.textContent = `${currentLength} / ${maxLength}`;

            if (currentLength >= maxLength * 0.9) {
                counter.style.color = '#ef4444';
            } else {
                counter.style.color = '#64748b';
            }
        });
    });
}

// Inicializar contadores de caracteres
document.addEventListener('DOMContentLoaded', initCharCounters);

// Tooltips para elementos con atributo title
function initTooltips() {
    const elementsWithTooltip = document.querySelectorAll('[title]');

    elementsWithTooltip.forEach(element => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = element.getAttribute('title');

        // Estilos del tooltip
        tooltip.style.cssText = `
            position: absolute;
            background: #1e293b;
            color: white;
            padding: 0.5rem 0.75rem;
            border-radius: 6px;
            font-size: 0.875rem;
            white-space: nowrap;
            z-index: 1000;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.2s ease;
            transform: translateY(-5px);
        `;

        // Eliminar el title original para evitar duplicados
        element.removeAttribute('title');

        // Posicionar el tooltip
        element.style.position = 'relative';
        document.body.appendChild(tooltip);

        // Mostrar/ocultar tooltip
        element.addEventListener('mouseenter', (e) => {
            const rect = element.getBoundingClientRect();
            tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            tooltip.style.opacity = '1';
        });

        element.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
        });
    });
}

// Inicializar tooltips
document.addEventListener('DOMContentLoaded', initTooltips);