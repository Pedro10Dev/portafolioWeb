document.addEventListener('DOMContentLoaded', () => {
    // Funcionalidad Flip Card
    const card = document.querySelector('.card');
    const flipButtons = document.querySelectorAll('.flip-button');

    if (card && flipButtons.length > 0) {
        flipButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                card.classList.toggle('flipped');
            });
        });
    }


    const birthDate = new Date('1998-06-10');
    const ageElement = document.getElementById('edad');
    const ageCardElement = document.getElementById('edad-card');

    if (ageElement || ageCardElement) {

        const fechaNacimiento = new Date(1998, 5, 10);
        const hoy = new Date();
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        const mes = hoy.getMonth() - fechaNacimiento.getMonth();

        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
            edad--;
        }

        const edadElements = document.querySelectorAll("#edad, #edad-card");
        edadElements.forEach(el => el.textContent = edad);


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
            }, 300);
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


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });


                if (card.classList.contains('flipped') && window.innerWidth <= 768) {

                }
            }
        });
    });
});