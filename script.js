// Анимация загрузки
function initPreloader() {
    const preloader = document.getElementById('preloader');
    const progressBar = document.createElement('div');
    progressBar.className = 'loader-progress-bar';

    const progressContainer = document.createElement('div');
    progressContainer.className = 'loader-progress';
    progressContainer.appendChild(progressBar);

    preloader.querySelector('.loader-container').appendChild(progressContainer);

    // Симуляция загрузки
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);

            // Запускаем финальную анимацию
            setTimeout(() => {
                preloader.classList.add('explosion-active');

                // Скрываем прелоадер после анимации
                setTimeout(() => {
                    preloader.classList.add('fade-out');

                    // Полностью удаляем из DOM после скрытия
                    setTimeout(() => {
                        preloader.remove();
                        // Запускаем анимации контента после загрузки
                        initContentAnimations();
                    }, 800);
                }, 800);
            }, 500);
        }
        progressBar.style.width = progress + '%';
    }, 200);
}

// Анимации контента после загрузки
function initContentAnimations() {
    // Анимация появления хедера
    const header = document.querySelector('.header');
    header.style.opacity = '0';
    header.style.transform = 'translateY(-100%)';

    setTimeout(() => {
        header.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        header.style.opacity = '1';
        header.style.transform = 'translateY(0)';
    }, 300);

    // Анимация появления герой секции
    const hero = document.querySelector('.hero');
    hero.style.opacity = '0';
    hero.style.transform = 'translateY(50px)';

    setTimeout(() => {
        hero.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
    }, 600);

    // Запускаем параллакс эффект
    startParallax();
}

// Параллакс эффект для карточек
function startParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const cards = document.querySelectorAll('.floating-card');

        cards.forEach((card, index) => {
            const speed = 0.05 * (index + 1);
            const yPos = -(scrolled * speed);
            card.style.transform = `translateY(${yPos}px) rotate(${index % 2 === 0 ? '-' : ''}${5 + index}deg)`;
        });
    });
}

// Плавная прокрутка для навигации
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Закрываем мобильное меню если открыто
            if (window.innerWidth <= 768) {
                document.querySelector('.nav-links').style.display = 'none';
            }
        }
    });
});

// Анимация появления элементов при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Применяем анимацию к секциям
document.querySelectorAll('.section, .template-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Функционал конструктора
let currentTemplate = 1;
let currentColor = '#8B7355';

function startCreating() {
    document.getElementById('constructor').scrollIntoView({ behavior: 'smooth' });
}

function selectTemplate(templateId) {
    currentTemplate = templateId;
    updatePreview();
    startCreating();
}

function updatePreview() {
    const names = document.getElementById('coupleNames').value || 'Анна & Алексей';
    const date = document.getElementById('weddingDate').value
        ? new Date(document.getElementById('weddingDate').value).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
        : '15 августа 2024';
    const location = document.getElementById('weddingLocation').value || 'Ресторан "Венеция"';
    const font = document.getElementById('fontSelect').value;

    document.getElementById('previewNames').textContent = names;
    document.getElementById('previewDate').textContent = date;
    document.getElementById('previewLocation').textContent = location;
    document.getElementById('previewNames').style.fontFamily = font;

    // Применяем выбранный цвет
    const preview = document.getElementById('invitationPreview');
    preview.style.background = `linear-gradient(135deg, ${currentColor}, ${lightenColor(currentColor, 20)})`;
}

function lightenColor(color, percent) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

// Обработчики для цветовых опций
document.querySelectorAll('.color-option').forEach(option => {
    option.addEventListener('click', function () {
        document.querySelectorAll('.color-option').forEach(opt => {
            opt.classList.remove('active');
        });
        this.classList.add('active');
        currentColor = this.getAttribute('data-color');
        updatePreview();
    });
});

function saveInvitation() {
    const names = document.getElementById('coupleNames').value;
    if (!names) {
        alert('Пожалуйста, введите имена пары');
        return;
    }
    alert(`Приглашение для ${names} сохранено!`);
}

// Анимация портфолио
function initPortfolioAnimation() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.05)';
        });
        item.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
        });
    });
}

// Мобильное меню
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function () {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function () {
    // Запускаем прелоадер
    setTimeout(initPreloader, 500);

    // Инициализируем остальной функционал
    initPortfolioAnimation();
    initMobileMenu();
    updatePreview();

    // Активируем первый цвет по умолчанию
    document.querySelector('.color-option')?.classList.add('active');

    // Обработчик для CTA кнопки
    document.querySelector('.nav-links .cta-button')?.addEventListener('click', (e) => {
        e.preventDefault();
        startCreating();
    });
});

// Параллакс эффект для карточек (дублируем для надежности)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const cards = document.querySelectorAll('.floating-card');
    cards.forEach((card, index) => {
        const speed = 0.05 * (index + 1);
        const yPos = -(scrolled * speed);
        card.style.transform = `translateY(${yPos}px) rotate(${index % 2 === 0 ? '-' : ''}${5 + index}deg)`;
    });
});