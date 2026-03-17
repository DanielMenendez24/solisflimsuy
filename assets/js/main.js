// Scroll Reveal Animation
const revealElements = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToReveal = document.querySelectorAll('.team__contain, .contact__form, h1');
    elementsToReveal.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    initSlider();
    initForm();
    initModal();
    if (document.body.id === 'us') {
        revealElements();
    }
});

function initModal() {
    const modal = document.getElementById("video-modal");
    const iframe = document.getElementById("video-frame");
    const closeBtn = document.querySelector(".close-modal");
    const triggers = document.querySelectorAll(".video-trigger");

    if (!modal || !iframe || !closeBtn) return;

    triggers.forEach(trigger => {
        trigger.addEventListener("click", function (e) {
            e.preventDefault();
            const videoId = this.getAttribute("data-video-id");
            if (videoId) {
                const videoUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0`;
                iframe.src = videoUrl;
                modal.style.display = "block";
                document.body.style.overflow = "hidden"; // Prevent background scrolling
            }
        });
    });

    closeBtn.addEventListener("click", closeModal);

    window.addEventListener("click", function (event) {
        if (event.target == modal) {
            closeModal();
        }
    });

    function closeModal() {
        modal.style.display = "none";
        iframe.src = ""; // Stop video
        document.body.style.overflow = ""; // Restore scrolling
    }
}

// Close mobile menu on link click
document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('check').checked = false;
    });
});

function initSlider() {
    const cdSlider = document.querySelector('.cd-slider');
    if (!cdSlider) return;

    const item = cdSlider.querySelectorAll("li");
    const nav = cdSlider.querySelector("nav");
    let autoUpdate = false;
    const timeTrans = 4000;

    if (item.length > 0) {
        item[0].className = "current_slide";
        for (let i = 0; i < item.length; i++) {
            const color = item[i].getAttribute("data-color");
            if (color) item[i].style.backgroundColor = color;
        }
    }

    if (item.length <= 1) {
        if (nav) nav.style.display = "none";
    }

    function prevSlide() {
        const currentSlide = cdSlider.querySelector("li.current_slide");
        const prevElement = currentSlide.previousElementSibling;
        const prevSlide = (prevElement !== null) ? prevElement : item[item.length - 1];
        const prevColor = prevSlide.getAttribute("data-color");
        const el = document.createElement('span');

        currentSlide.className = "";
        prevSlide.className = "current_slide";

        nav.children[0].appendChild(el);

        const size = (cdSlider.clientWidth >= cdSlider.clientHeight) ? cdSlider.clientWidth * 2 : cdSlider.clientHeight * 2;
        const ripple = nav.children[0].querySelector("span");

        ripple.style.height = size + 'px';
        ripple.style.width = size + 'px';
        ripple.style.backgroundColor = prevColor;

        ripple.addEventListener("webkitTransitionEnd", function () {
            if (this.parentNode) this.parentNode.removeChild(this);
        });

        ripple.addEventListener("transitionend", function () {
            if (this.parentNode) this.parentNode.removeChild(this);
        });
    }

    function nextSlide() {
        const currentSlide = cdSlider.querySelector("li.current_slide");
        const nextElement = currentSlide.nextElementSibling;
        const nextSlide = (nextElement !== null) ? nextElement : item[0];
        const nextColor = nextSlide.getAttribute("data-color");
        const el = document.createElement('span');

        currentSlide.className = "";
        nextSlide.className = "current_slide";

        nav.children[1].appendChild(el);

        const size = (cdSlider.clientWidth >= cdSlider.clientHeight) ? cdSlider.clientWidth * 2 : cdSlider.clientHeight * 2;
        const ripple = nav.children[1].querySelector("span");

        ripple.style.height = size + 'px';
        ripple.style.width = size + 'px';
        ripple.style.backgroundColor = nextColor;

        ripple.addEventListener("webkitTransitionEnd", function () {
            if (this.parentNode) this.parentNode.removeChild(this);
        });

        ripple.addEventListener("transitionend", function () {
            if (this.parentNode) this.parentNode.removeChild(this);
        });
    }

    function updateNavColor() {
        if (!nav) return;
        const currentSlide = cdSlider.querySelector("li.current_slide");
        const nextColor = (currentSlide.nextElementSibling !== null) ? currentSlide.nextElementSibling.getAttribute("data-color") : item[0].getAttribute("data-color");
        const prevColor = (currentSlide.previousElementSibling !== null) ? currentSlide.previousElementSibling.getAttribute("data-color") : item[item.length - 1].getAttribute("data-color");

        if (item.length > 2) {
            const prevBtn = nav.querySelector(".prev");
            const nextBtn = nav.querySelector(".next");
            if (prevBtn) prevBtn.style.backgroundColor = prevColor;
            if (nextBtn) nextBtn.style.backgroundColor = nextColor;
        }
    }

    updateNavColor();

    if (nav) {
        const nextBtn = nav.querySelector(".next");
        const prevBtn = nav.querySelector(".prev");

        if (nextBtn) {
            nextBtn.addEventListener('click', function (event) {
                event.preventDefault();
                nextSlide();
                updateNavColor();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener("click", function (event) {
                event.preventDefault();
                prevSlide();
                updateNavColor();
            });
        }
    }

    setInterval(function () {
        if (autoUpdate) {
            nextSlide();
            updateNavColor();
        }
    }, timeTrans);
}

function initForm() {
    const form = document.querySelector('#form');
    const btnMailto = document.querySelector('#hack');

    if (!form || !btnMailto) return;

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(this);
        const subject = formData.get('subject');
        const email = formData.get('email');
        const msg = formData.get('msg');

        if (!email || !msg) {
            alert('Por favor, completa los campos requeridos.');
            return;
        }

        btnMailto.setAttribute('href', `mailto:info@solisfilmsuruguay.com?subject=${encodeURIComponent(subject)} || Email: ${encodeURIComponent(email)}&body=${encodeURIComponent(msg)}`);
        btnMailto.click();
    });
}

// Add Escape key support for modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById("video-modal");
        if (modal && modal.style.display === "block") {
            const closeBtn = document.querySelector(".close-modal");
            if (closeBtn) closeBtn.click();
        }
    }
});
