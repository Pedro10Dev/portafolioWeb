document.addEventListener('DOMContentLoaded', () => {
    // 1. Funcionalidad Flip Card
    const card = document.querySelector('.card');
    const flipButtons = document.querySelectorAll('.flip-button');

    if (card && flipButtons.length > 0) {
        flipButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation(); // Evitar comportamientos extraños
                card.classList.toggle('flipped');
            });
        });
    }

    // 2. Cálculo de Edad Automático
    const birthDate = new Date('1998-06-10');
    const ageElement = document.getElementById('edad');
    const ageCardElement = document.getElementById('edad-card');

    if (ageElement || ageCardElement) {
        // --- CÁLCULO DE EDAD ---
        const fechaNacimiento = new Date(1998, 5, 10); // Mes 5 es Junio (0-indexado)
        const hoy = new Date();
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        const mes = hoy.getMonth() - fechaNacimiento.getMonth();

        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
            edad--;
        }

        const edadElements = document.querySelectorAll("#edad, #edad-card");
        edadElements.forEach(el => el.textContent = edad);

        // --- SCROLL INTERSECTION OBSERVER ---
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });

        // --- MODAL LOGIC ---
        const modal = document.getElementById("project-modal");
        const modalBody = document.getElementById("modal-body-content");
        const closeBtn = document.querySelector(".close-modal");
        const btnsVerMas = document.querySelectorAll(".btn-ver-mas");

        btnsVerMas.forEach(btn => {
            btn.addEventListener("click", () => {
                const projectId = btn.getAttribute("data-id");
                const hiddenContent = document.getElementById(`modal-${projectId}`);

                if (hiddenContent) {
                    modalBody.innerHTML = hiddenContent.innerHTML;
                    modal.style.display = "block";
                    // Pequeño timeout para permitir que el display block suceda antes de añadir la clase show para la transición
                    setTimeout(() => {
                        modal.classList.add("show");
                    }, 10);
                }
            });
        });

        closeBtn.addEventListener("click", () => {
            modal.classList.remove("show");
            setTimeout(() => {
                modal.style.display = "none";
            }, 300); // Esperar a que termine la transición
        });

        window.addEventListener("click", (event) => {
            if (event.target == modal) {
                modal.classList.remove("show");
                setTimeout(() => {
                    modal.style.display = "none";
                }, 300);
            }
        });
    }

    // 3. Smooth Scroll para navegación (opcional si CSS scroll-behavior no es suficiente)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // Si estamos en móvil y venimos de la tarjeta trasera, voltear la carta de nuevo
                if (card.classList.contains('flipped') && window.innerWidth <= 768) {
                    // Opcional: regresar la carta a su estado original después de navegar
                    // card.classList.remove('flipped');
                }
            }
        });
    });
});