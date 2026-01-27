// Variáveis do carrossel
let currentSlide = 0;
let slideInterval;

// Função para mostrar slide específico
function showSlide(n) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) return;
    
    // Esconde todos os slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Ajusta o índice do slide
    if (n >= slides.length) currentSlide = 0;
    if (n < 0) currentSlide = slides.length - 1;
    
    // Mostra o slide atual
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
    }
}

// Função para próximo slide
function changeSlide(direction) {
    showSlide(currentSlide += direction);
    resetInterval();
}

// Função para ir para slide específico
function goToSlide(n) {
    showSlide(currentSlide = n - 1);
    resetInterval();
}

// Função para resetar o intervalo automático
function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

// Variáveis para touch/swipe
let touchStartX = 0;
let touchEndX = 0;

// Função para detectar swipe
function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe para esquerda - próximo slide
            changeSlide(1);
        } else {
            // Swipe para direita - slide anterior
            changeSlide(-1);
        }
    }
}

// Inicializar carrossel
function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dotsContainer = document.querySelector('.carousel-dots');
    const carousel = document.querySelector('.hero-carousel');
    
    if (slides.length === 0) return;
    
    // Criar dots dinamicamente
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        slides.forEach((_, idx) => {
            const dot = document.createElement('span');
            dot.className = 'dot' + (idx === 0 ? ' active' : '');
            dot.onclick = () => goToSlide(idx + 1);
            dotsContainer.appendChild(dot);
        });
    }
    
    // Mostrar primeiro slide
    showSlide(0);
    
    // Iniciar intervalo automático
    resetInterval();
    
    // Adicionar controles de teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        }
    });
    
    // Pausar carrossel quando o mouse estiver sobre ele
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        carousel.addEventListener('mouseleave', () => {
            resetInterval();
        });
        
        // Suporte a touch/swipe para mobile
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            clearInterval(slideInterval);
        }, { passive: true });
        
        carousel.addEventListener('touchmove', (e) => {
            // Pausar durante o movimento
            clearInterval(slideInterval);
        }, { passive: true });
        
        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            // Aguardar um pouco antes de retomar o intervalo
            setTimeout(() => {
                resetInterval();
            }, 1000);
        }, { passive: true });
        
        // Pausar quando clicar nos botões ou dots
        const carouselButtons = carousel.querySelectorAll('.carousel-btn, .dot');
        carouselButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                clearInterval(slideInterval);
                setTimeout(() => {
                    resetInterval();
                }, 2000);
            });
        });
    }
}

// Função para alternar tema (claro/escuro)
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const body = document.body;

    // Verificar se há preferência salva
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    body.classList.toggle('dark-mode', savedTheme === 'dark');
    body.classList.toggle('light-mode', savedTheme === 'light');

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        body.classList.toggle('dark-mode', newTheme === 'dark');
        body.classList.toggle('light-mode', newTheme === 'light');
        body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 150);
        showThemeNotification(newTheme);
    });
}

// Função para mostrar notificação de mudança de tema
function showThemeNotification(theme) {
    const notification = document.createElement('div');
    notification.className = 'theme-notification';
    notification.innerHTML = `
        <i class="fas fa-${theme === 'dark' ? 'moon' : 'sun'}"></i>
        <span>Modo ${theme === 'dark' ? 'Escuro' : 'Claro'} ativado</span>
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Smooth scroll para navegação
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animação de scroll para elementos
function initScrollAnimations() {
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
    
    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.gallery-item, .team-member, .contact-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Header transparente no topo e sólido no scroll
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(26, 26, 26, 0.95) 100%)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Efeito de hover nas imagens da galeria
function initGalleryHover() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Contador de números para estatísticas (opcional)
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 segundos
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Validação de formulário (se houver)
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aqui você pode adicionar validação específica
            // Por enquanto, apenas mostra uma mensagem de sucesso
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        });
    });
}

// Lazy loading para imagens
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Função para adicionar efeito de parallax suave
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Função para inicializar menu mobile
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (menuToggle && nav) {
        // Toggle do menu
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Fechar menu ao clicar em um link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
        
        // Fechar menu ao clicar fora dele
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
        
        // Fechar menu ao pressionar ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }
}

// Função para adicionar efeito de digitação
function initTypewriter() {
    const typewriterElements = document.querySelectorAll('.typewriter');
    
    typewriterElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        typeWriter();
    });
}

// Função para adicionar efeitos de partículas no logo
function initLogoEffects() {
    const logoIcon = document.querySelector('.logo-icon');
    
    if (logoIcon) {
        logoIcon.addEventListener('mouseenter', () => {
            createParticles(logoIcon);
        });
    }
}

// Função para criar partículas
function createParticles(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'logo-particle';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.background = `hsl(${Math.random() * 60 + 40}, 70%, 60%)`;
        
        document.body.appendChild(particle);
        
        const angle = (i / 8) * Math.PI * 2;
        const distance = 50 + Math.random() * 30;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;
        
        setTimeout(() => {
            particle.style.transform = `translate(${endX - centerX}px, ${endY - centerY}px)`;
            particle.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

// Função principal de inicialização
function init() {
    // Aguardar o DOM estar carregado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // DOM já carregado
        initThemeToggle();
        initCarousel();
        initSmoothScroll();
        initScrollAnimations();
        initHeaderScroll();
        initGalleryHover();
        initCounters();
        initFormValidation();
        initLazyLoading();
        initParallax();
        initMobileMenu();
        initTypewriter();
        initLogoEffects();
        initLogoNavigation();
    }
}

// Inicializar quando a página carregar
init();

// Função para adicionar efeito de loading
function showLoading() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="spinner"></div>
            <p>Carregando...</p>
        </div>
    `;
    document.body.appendChild(loader);
    
    // Remover loader após 2 segundos
    setTimeout(() => {
        loader.remove();
    }, 2000);
}

// Mostrar loading na primeira visita
if (!localStorage.getItem('visited')) {
    showLoading();
    localStorage.setItem('visited', 'true');
}

// Função para adicionar efeito de confete no clique dos botões
function addConfettiEffect(element) {
    element.addEventListener('click', () => {
        // Criar partículas de confete
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.backgroundColor = ['#d4af37', '#b8860b', '#f4e4bc', '#000000'][Math.floor(Math.random() * 4)];
            document.body.appendChild(confetti);
            
            // Remover confete após animação
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }
    });
}

// Adicionar efeito de confete aos botões de contato
document.querySelectorAll('.btn-contact, .btn-whatsapp').forEach(button => {
    addConfettiEffect(button);
});

// Adicionar estilos CSS dinâmicos para notificações e partículas
const style = document.createElement('style');
style.textContent = `
    .theme-notification {
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, var(--primary-gold) 0%, var(--secondary-gold) 100%);
        color: var(--white);
        padding: 1rem 1.5rem;
        border-radius: 50px;
        box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 500;
    }
    
    .theme-notification.show {
        transform: translateX(0);
    }
    
    .logo-particle {
        position: fixed;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        pointer-events: none;
        transition: all 1s ease;
        z-index: 1000;
    }
    
    .confetti {
        position: fixed;
        width: 10px;
        height: 10px;
        background: var(--primary-gold);
        animation: confetti-fall 3s linear forwards;
        z-index: 9999;
        pointer-events: none;
    }
    
    @keyframes confetti-fall {
        0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    .loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, var(--primary-black) 0%, var(--secondary-black) 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    }
    
    .loader-content {
        text-align: center;
        color: var(--primary-gold);
    }
    
    .spinner {
        width: 50px;
        height: 50px;
        border: 3px solid var(--primary-gold);
        border-top: 3px solid transparent;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 1rem;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Menu responsivo (hambúrguer)
document.getElementById('menuToggle').addEventListener('click', function() {
    document.querySelector('.nav').classList.toggle('active');
});

// Fecha o menu ao clicar em um link (opcional, mas melhora UX)
document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 900) {
            document.querySelector('.nav').classList.remove('active');
        }
    });
});


// Função para inicializar funcionalidade do logo
function initLogoNavigation() {
    const logo = document.querySelector('.logo');
    const logoLink = document.querySelector('.logo-link');
    
    if (logo && logoLink) {
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            const inicioSection = document.querySelector('#inicio');
            if (inicioSection) {
                inicioSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
        
        logoLink.addEventListener('click', (e) => {
            e.preventDefault();
            const inicioSection = document.querySelector('#inicio');
            if (inicioSection) {
                inicioSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
} 