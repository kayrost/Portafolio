/**
 * ==========================================================================
 * PORTAFOLIO PROFESIONAL - SANTIAGO HIGUERA (kayrost)
 * Archivo: main.js
 * Funcionalidad interactiva moderna y sin dependencias externas
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ----------------------------------------------------------------------
    // 1. SELECTORES DEL DOM
    // ----------------------------------------------------------------------
    const header = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const drawerOverlay = document.getElementById('drawerOverlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const scrollProgressBar = document.getElementById('scrollProgressBar');
    const backToTopBtn = document.getElementById('backToTop');

    // Filtros de proyectos
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // Modal de proyectos
    const projectModal = document.getElementById('projectModal');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const modalClose = document.getElementById('modalClose');
    const modalBody = document.getElementById('modalBody');
    const openModalButtons = document.querySelectorAll('.open-modal-btn');

    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    const btnSubmit = document.getElementById('btnSubmit');
    const formSuccessFeedback = document.getElementById('formSuccessFeedback');

    // Copia rápida de usuario
    const copyBtn = document.getElementById('copyBtn');
    const copyUsername = document.getElementById('copyUsername');
    const copyTooltip = document.getElementById('copyTooltip');

    // ----------------------------------------------------------------------
    // 2. HEADER SCROLL & BARRA DE PROGRESO DE LECTURA
    // ----------------------------------------------------------------------
    function handleScroll() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        // Barra de progreso superior
        if (scrollProgressBar) {
            scrollProgressBar.style.width = `${scrollPercent}%`;
        }

        // Efecto visual en Header al hacer scroll
        if (header) {
            if (scrollTop > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ----------------------------------------------------------------------
    // 3. MENÚ DE NAVEGACIÓN MÓVIL (DRAWER)
    // ----------------------------------------------------------------------
    function openMobileMenu() {
        navMenu.classList.add('open');
        drawerOverlay.classList.add('active');
        navToggle.classList.add('open');
        navToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden'; // Evita scroll de fondo
    }

    function closeMobileMenu() {
        navMenu.classList.remove('open');
        drawerOverlay.classList.remove('active');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.contains('open');
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    if (drawerOverlay) {
        drawerOverlay.addEventListener('click', closeMobileMenu);
    }

    // Cerrar menú al hacer clic en cualquier enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // ----------------------------------------------------------------------
    // 4. INTERSECTION OBSERVER PARA ACTIVE NAVIGATION SPY
    // ----------------------------------------------------------------------
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === `#${currentId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(sec => sectionObserver.observe(sec));

    // ----------------------------------------------------------------------
    // 5. FILTROS DINÁMICOS DE PROYECTOS
    // ----------------------------------------------------------------------
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Actualizar botones de filtro
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });
            button.classList.add('active');
            button.setAttribute('aria-selected', 'true');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'flex';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.transition = 'all 0.3s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ----------------------------------------------------------------------
    // 6. DATOS Y MODAL INTERACTIVO DE PROYECTOS
    // ----------------------------------------------------------------------
    const projectDetails = {
        taskflow: {
            title: "TaskFlow Pro - Gestor de Metas & Productividad",
            subtitle: "Aplicación Web Nativa con JavaScript ES6+",
            description: "TaskFlow Pro es un proyecto enfocado en la manipulación reactiva del DOM y la persistencia de datos del lado del cliente. Permite a los usuarios organizar sus tareas diarias mediante estados (Pendientes, En Curso, Completadas), con filtrado instantáneo y guardado automático.",
            highlights: [
                "Arquitectura modular en JavaScript nativo sin frameworks externos.",
                "Sincronización bidireccional con LocalStorage para guardar información entre sesiones.",
                "Filtrado instantáneo en tiempo real sin recargar la página.",
                "Manejo fluido de eventos del teclado y gestos táctiles."
            ],
            tech: ["JavaScript ES6+", "DOM Manipulation", "CSS3 Grid", "LocalStorage API"],
            codeSnippet: `// Ejemplo de persistencia modular en TaskFlow
function syncTasksToStorage(tasks) {
    try {
        localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
        renderTaskMetrics();
    } catch (e) {
        console.error('Error al guardar datos:', e);
    }
}`
        },
        devmetrics: {
            title: "DevMetrics - Suite de Utilidades para Desarrolladores",
            subtitle: "Herramienta Frontend Interactiva",
            description: "DevMetrics reúne utilidades esenciales para diseñadores y desarrolladores web. Incluye conversor dinámico de píxeles a unidades relativas (rem/em) basado en el tamaño raíz configurable, verificador de contraste WCAG y estimador de tiempo de lectura.",
            highlights: [
                "Cálculo matemático instantáneo al escribir (evento 'input').",
                "Integración con el portapapeles para copiar códigos CSS con un solo clic.",
                "Estructura accesible con teclado y foco visual bien definido.",
                "Validación estricta de números y formatos hexadecimales."
            ],
            tech: ["HTML5", "CSS Custom Properties", "JavaScript Vanilla", "Cálculo en Vivo"],
            codeSnippet: `// Conversión reactiva de px a rem
const pxInput = document.querySelector('#pxValue');
pxInput.addEventListener('input', (e) => {
    const px = parseFloat(e.target.value) || 0;
    const rem = (px / 16).toFixed(3);
    document.querySelector('#remOutput').textContent = \`\${rem}rem\`;
});`
        }
    };

    function openProjectModal(projectKey) {
        const data = projectDetails[projectKey];
        if (!data) return;

        modalBody.innerHTML = `
            <div style="margin-bottom: 1.5rem;">
                <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--color-accent); font-weight: 600; text-transform: uppercase;">
                    ${data.subtitle}
                </span>
                <h2 id="modalTitle" style="font-size: 1.6rem; color: var(--color-text-primary); margin-top: 0.25rem;">
                    ${data.title}
                </h2>
            </div>
            
            <p style="color: var(--color-text-secondary); line-height: 1.6; margin-bottom: 1.5rem; font-size: 0.95rem;">
                ${data.description}
            </p>

            <h4 style="font-size: 1rem; color: var(--color-text-primary); margin-bottom: 0.75rem;">
                Características Destacadas:
            </h4>
            <ul style="list-style: none; margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.4rem;">
                ${data.highlights.map(item => `<li style="font-size: 0.88rem; color: var(--color-text-muted); display: flex; gap: 0.5rem;"><span style="color: var(--color-accent); font-weight: bold;">✓</span> ${item}</li>`).join('')}
            </ul>

            <h4 style="font-size: 1rem; color: var(--color-text-primary); margin-bottom: 0.75rem;">
                Tecnologías Implementadas:
            </h4>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
                ${data.tech.map(t => `<span style="font-family: var(--font-mono); font-size: 0.75rem; background: rgba(245, 158, 11, 0.1); color: var(--color-accent-light); padding: 0.25rem 0.65rem; border-radius: 4px;">${t}</span>`).join('')}
            </div>

            <h4 style="font-size: 0.9rem; color: var(--color-text-dim); margin-bottom: 0.5rem; font-family: var(--font-mono);">
                Snippet de Código Representativo:
            </h4>
            <pre style="background: #06080c; border: 1px solid var(--color-border); border-radius: 8px; padding: 1rem; overflow-x: auto; font-family: var(--font-mono); font-size: 0.8rem; color: #e2e8f0; line-height: 1.5;"><code>${escapeHtml(data.codeSnippet)}</code></pre>
        `;

        projectModal.classList.add('active');
        projectModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeProjectModal() {
        if (!projectModal) return;
        projectModal.classList.remove('active');
        projectModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function escapeHtml(text) {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    openModalButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectKey = btn.getAttribute('data-project');
            openProjectModal(projectKey);
        });
    });

    if (modalClose) modalClose.addEventListener('click', closeProjectModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeProjectModal);

    // Tecla Escape cierra modal y menú móvil
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProjectModal();
            closeMobileMenu();
        }
    });

    // ----------------------------------------------------------------------
    // 7. COPIAR USUARIO AL PORTAPAPELES
    // ----------------------------------------------------------------------
    if (copyBtn && copyUsername && copyTooltip) {
        copyBtn.addEventListener('click', async () => {
            const textToCopy = copyUsername.textContent.trim();
            try {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(textToCopy);
                } else {
                    // Fallback
                    const tempInput = document.createElement('textarea');
                    tempInput.value = textToCopy;
                    document.body.appendChild(tempInput);
                    tempInput.select();
                    document.execCommand('copy');
                    document.body.removeChild(tempInput);
                }

                copyTooltip.classList.add('show');
                setTimeout(() => {
                    copyTooltip.classList.remove('show');
                }, 2200);
            } catch (err) {
                console.error('Error al copiar al portapapeles:', err);
            }
        });
    }

    // ----------------------------------------------------------------------
    // 8. VALIDACIÓN Y ENVÍO DEL FORMULARIO DE CONTACTO
    // ----------------------------------------------------------------------
    if (contactForm) {
        const nombreInput = document.getElementById('nombre');
        const correoInput = document.getElementById('correo');
        const comentarioInput = document.getElementById('comentario');

        const errorNombre = document.getElementById('errorNombre');
        const errorCorreo = document.getElementById('errorCorreo');
        const errorComentario = document.getElementById('errorComentario');

        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(String(email).toLowerCase());
        }

        // Limpiar errores al escribir
        [nombreInput, correoInput, comentarioInput].forEach(input => {
            if (input) {
                input.addEventListener('input', () => {
                    input.parentElement.classList.remove('has-error');
                });
            }
        });

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;

            // Validación Nombre
            if (!nombreInput.value.trim()) {
                nombreInput.parentElement.classList.add('has-error');
                isValid = false;
            } else {
                nombreInput.parentElement.classList.remove('has-error');
            }

            // Validación Correo
            if (!validateEmail(correoInput.value.trim())) {
                correoInput.parentElement.classList.add('has-error');
                isValid = false;
            } else {
                correoInput.parentElement.classList.remove('has-error');
            }

            // Validación Comentario
            if (comentarioInput.value.trim().length < 10) {
                comentarioInput.parentElement.classList.add('has-error');
                isValid = false;
            } else {
                comentarioInput.parentElement.classList.remove('has-error');
            }

            if (!isValid) return;

            // Simulación de envío con feedback visual moderno
            btnSubmit.disabled = true;
            const originalBtnHtml = btnSubmit.innerHTML;
            btnSubmit.innerHTML = `
                <span>Enviando...</span>
                <span style="display:inline-block; animation: pulseDot 1s infinite;">●</span>
            `;

            setTimeout(() => {
                contactForm.reset();
                btnSubmit.disabled = false;
                btnSubmit.innerHTML = originalBtnHtml;

                if (formSuccessFeedback) {
                    formSuccessFeedback.style.display = 'flex';
                    formSuccessFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    setTimeout(() => {
                        formSuccessFeedback.style.display = 'none';
                    }, 6000);
                }
            }, 1000);
        });
    }

    // ----------------------------------------------------------------------
    // 9. BOTÓN VOLVER ARRIBA
    // ----------------------------------------------------------------------
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    console.log('%c Santiago Higuera (@kayrost) | Portafolio cargado con éxito 🚀', 'color: #f59e0b; font-weight: bold; font-size: 13px;');
});
