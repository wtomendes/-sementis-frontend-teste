// ===== Home Page JavaScript =====

// View management state
let currentView = 'home'; // 'home', 'modules', 'trilhas', 'trail-detail'
let currentModule = null;
let currentTrilha = null;

// Define trilhas data for each module
const moduleTrilhasData = {
    'basico': [
        {
            id: 'basico-introducao',
            title: 'Introdução à Sustentabilidade',
            description: 'Conceitos básicos e fundamentos',
            icon: 'assets/tarefas/tarefa_basico1.png',
            progress: 100,
            completed: true,
            lessons: 5
        },
        {
            id: 'basico-meio-ambiente',
            title: 'Meio Ambiente',
            description: 'Entendendo nosso planeta',
            icon: 'assets/tarefas/tarefa_basico1.png',
            progress: 100,
            completed: true,
            lessons: 5
        },
        {
            id: 'basico-acoes',
            title: 'Ações Sustentáveis',
            description: 'Práticas do dia a dia',
            icon: 'assets/tarefas/tarefa_basico1.png',
            progress: 100,
            completed: true,
            lessons: 5
        }
    ],
    'agua': [
        {
            id: 'agua-importancia',
            title: 'Importância da Água',
            description: 'Por que a água é essencial',
            icon: 'assets/tarefas/tarefa_agua.png',
            progress: 100,
            completed: true,
            lessons: 5
        },
        {
            id: 'agua-ciclo',
            title: 'Ciclo da Água',
            description: 'Como a água circula',
            icon: 'assets/tarefas/tarefa_agua.png',
            progress: 100,
            completed: true,
            lessons: 5
        },
        {
            id: 'agua-conservacao',
            title: 'Conservação',
            description: 'Uso consciente da água',
            icon: 'assets/tarefas/tarefa_agua.png',
            progress: 60,
            active: true,
            lessons: 5
        },
        {
            id: 'agua-poluicao',
            title: 'Poluição da Água',
            description: 'Problemas e soluções',
            icon: 'assets/tarefas/tarefa_agua.png',
            progress: 0,
            available: true,
            lessons: 5
        }
    ],
    'clima': [
        {
            id: 'clima-introducao',
            title: 'Introdução ao Clima',
            description: 'O que é mudança climática',
            icon: 'assets/tarefas/tarefa_clima.png',
            progress: 0,
            available: true,
            lessons: 5
        },
        {
            id: 'clima-aquecimento',
            title: 'Aquecimento Global',
            description: 'Causas e consequências',
            icon: 'assets/tarefas/tarefa_clima.png',
            progress: 0,
            locked: true,
            lessons: 5
        },
        {
            id: 'clima-acoes',
            title: 'Ações Climáticas',
            description: 'Como podemos ajudar',
            icon: 'assets/tarefas/tarefa_clima.png',
            progress: 0,
            locked: true,
            lessons: 5
        }
    ],
    'consumo': [
        {
            id: 'consumo-introducao',
            title: 'Consumo Consciente',
            description: 'O que é consumo responsável',
            icon: 'assets/tarefas/tarefa_consumo_consciente.png',
            progress: 0,
            locked: true,
            lessons: 5
        }
    ],
    'horta': [
        {
            id: 'horta-introducao',
            title: 'Horta em Casa',
            description: 'Começando sua horta',
            icon: 'assets/tarefas/tarefa_horta.png',
            progress: 0,
            locked: true,
            lessons: 5
        }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    initBottomNav();
    initTrailInteractions();
    initGameCards();
    initAchievements();
    animateProgressBars();
    initModulesView();
    initTrailDetailView();
});

// ===== Bottom Navigation =====
function initBottomNav() {
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));

            // Add active class to clicked item
            item.classList.add('active');

            // Get the navigation type
            const span = item.querySelector('span');
            const section = span ? span.textContent : '';

            // Handle navigation (you can add routing logic here)
            handleNavigation(section);
        });
    });
}

function handleNavigation(section) {
    console.log('Navigating to:', section);

    // You can add actual navigation logic here
    // For example, showing/hiding sections or redirecting to different pages

    switch(section) {
        case 'Trilhas':
            // Show modules view
            showModulesView();
            break;
        case 'Ligas':
            console.log('Navigate to leagues page');
            // window.location.href = 'ligas.html';
            break;
        case 'Missões':
            console.log('Navigate to missions page');
            // window.location.href = 'missoes.html';
            break;
        case 'Perfil':
            console.log('Navigate to profile page');
            // window.location.href = 'perfil.html';
            break;
    }
}

// ===== Trail Interactions =====
function initTrailInteractions() {
    const trailCards = document.querySelectorAll('.trail-card, .trail-step, .trilha-step');

    trailCards.forEach(card => {
        const titleElement = card.querySelector('.trail-title, .trail-step-title, .trilha-step-title');
        const trailTitle = titleElement ? titleElement.textContent : 'Trilha';
        const moduleName = card.getAttribute('data-module');
        const trilhaId = card.getAttribute('data-trilha');

        card.addEventListener('click', () => {
            if (card.classList.contains('locked')) {
                showNotification('Complete as trilhas anteriores para desbloquear!', 'info');
                return;
            }

            if (moduleName) {
                showTrilhasView(moduleName, trailTitle);
                return;
            }

            if (trilhaId) {
                showTrailDetailView(trilhaId, trailTitle);
                return;
            }

            showNotification(`Explorando ${trailTitle}...`, 'info');
        });
    });
}

function handleContinueTrail(trailTitle) {
    console.log('Continue trail:', trailTitle);
    showNotification(`Continuando ${trailTitle}...`, 'info');

    // Simulate loading and redirect to lesson
    setTimeout(() => {
        // window.location.href = 'lesson.html?trail=' + encodeURIComponent(trailTitle);
        console.log('Load lesson for trail:', trailTitle);
    }, 500);
}

function handleStartTrail(trailTitle) {
    console.log('Start trail:', trailTitle);
    showNotification(`Iniciando ${trailTitle}...`, 'success');

    // Simulate loading and redirect to lesson
    setTimeout(() => {
        // window.location.href = 'lesson.html?trail=' + encodeURIComponent(trailTitle);
        console.log('Load first lesson for trail:', trailTitle);
    }, 500);
}

function showTrailDetails(trailTitle) {
    console.log('Show details for:', trailTitle);
    // You can implement a modal or expand the trail item here
}

// ===== Game Cards =====
function initGameCards() {
    const gameCards = document.querySelectorAll('.game-quick-card');

    gameCards.forEach(card => {
        card.addEventListener('click', () => {
            const gameTitle = card.querySelector('h3').textContent;
            handlePlayGame(gameTitle);
        });

        // Add hover sound effect or animation
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function handlePlayGame(gameTitle) {
    console.log('Play game:', gameTitle);
    showNotification(`Carregando ${gameTitle}...`, 'info');

    // Simulate loading and redirect to game
    setTimeout(() => {
        // window.location.href = 'game.html?name=' + encodeURIComponent(gameTitle);
        console.log('Load game:', gameTitle);
    }, 500);
}

// ===== Achievements =====
function initAchievements() {
    const achievementCards = document.querySelectorAll('.achievement-card:not(.locked-achievement)');

    achievementCards.forEach(card => {
        card.addEventListener('click', () => {
            const achievementName = card.querySelector('p').textContent;
            showAchievementDetails(achievementName);
        });
    });

    // Add locked achievement click handler
    const lockedAchievements = document.querySelectorAll('.achievement-card.locked-achievement');
    lockedAchievements.forEach(card => {
        card.addEventListener('click', () => {
            showNotification('Complete mais lições para desbloquear esta conquista!', 'info');
        });
    });
}

function showAchievementDetails(achievementName) {
    console.log('Show achievement:', achievementName);
    // You can implement a modal with achievement details here
    showNotification(`Conquista: ${achievementName}`, 'success');
}

// ===== Progress Bar Animations =====
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill, .goal-progress-fill, .progress-fill-small, .trail-mini-progress-fill');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';

                setTimeout(() => {
                    bar.style.width = width;
                }, 100);

                observer.unobserve(bar);
            }
        });
    }, {
        threshold: 0.5
    });

    progressBars.forEach(bar => observer.observe(bar));
}

// ===== Daily Goal Interaction =====
function initDailyGoal() {
    const goalCard = document.querySelector('.goal-card');

    if (goalCard) {
        goalCard.addEventListener('click', () => {
            showDailyGoalDetails();
        });
    }
}

function showDailyGoalDetails() {
    console.log('Show daily goal details');
    showNotification('Complete 2 lições para alcançar sua meta diária!', 'info');
}

// ===== Profile Button =====
const profileBtn = document.querySelector('.profile-btn');
if (profileBtn) {
    profileBtn.addEventListener('click', () => {
        console.log('Open profile');
        // window.location.href = 'perfil.html';
    });
}

// ===== Stat Items Interaction =====
function initStatItems() {
    const statItems = document.querySelectorAll('.stat-item');

    statItems.forEach(item => {
        item.addEventListener('click', () => {
            const statValue = item.querySelector('.stat-value').textContent;
            const statImg = item.querySelector('.stat-icon').alt;

            showStatDetails(statImg, statValue);
        });
    });
}

function showStatDetails(statName, value) {
    console.log('Stat:', statName, value);

    let message = '';
    switch(statName) {
        case 'Sequência':
            message = `Você está há ${value} dias seguidos estudando! Continue assim!`;
            break;
        case 'Moedas':
            message = `Você tem ${value} moedas. Use-as na loja!`;
            break;
        case 'Vidas':
            message = `Você tem ${value} vidas restantes. Use-as com sabedoria!`;
            break;
        default:
            message = `${statName}: ${value}`;
    }

    showNotification(message, 'info');
}

// Initialize stat items interaction
initStatItems();
initDailyGoal();

// ===== Notification System (reuse from login.js) =====
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <span class="notification__message">${message}</span>
        <button class="notification__close">&times;</button>
    `;

    // Add styles
    const styles = `
        .notification {
            position: fixed;
            top: 24px;
            right: 24px;
            padding: 16px 24px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 16px;
            font-size: 14px;
            font-weight: 500;
            z-index: 9999;
            animation: slideInRight 0.3s ease;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            max-width: 90%;
        }
        .notification--success {
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
        }
        .notification--error {
            background: linear-gradient(135deg, #ef4444, #dc2626);
            color: white;
        }
        .notification--info {
            background: linear-gradient(135deg, #3b82f6, #2563eb);
            color: white;
        }
        .notification__close {
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            opacity: 0.8;
            transition: opacity 0.2s;
        }
        .notification__close:hover {
            opacity: 1;
        }
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;

    // Add styles if not exists
    if (!document.getElementById('notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    // Add to DOM
    document.body.appendChild(notification);

    // Close button functionality
    notification.querySelector('.notification__close').addEventListener('click', () => {
        notification.remove();
    });

    // Auto remove after 4 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 4000);
}

// ===== Utility Functions =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== Welcome Animation =====
function playWelcomeAnimation() {
    const header = document.querySelector('.home-header');
    const trailItems = document.querySelectorAll('.trail-step, .trilha-step');

    // Fade in header
    header.style.opacity = '0';
    header.style.transform = 'translateY(-20px)';

    setTimeout(() => {
        header.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        header.style.opacity = '1';
        header.style.transform = 'translateY(0)';
    }, 100);

    // Animate trail items with stagger
    trailItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';

        setTimeout(() => {
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
    });
}

// Play welcome animation on load
playWelcomeAnimation();

console.log('Home page loaded successfully!');

// ===== View Management =====
function showHomeView() {
    currentView = 'home';

    // Hide all views
    document.querySelector('.modules-view').style.display = 'none';
    document.querySelector('.trilhas-view').style.display = 'none';
    document.querySelector('.trail-detail-view').style.display = 'none';

    // Show home view
    document.querySelector('.content-wrapper').style.display = 'flex';

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    console.log('Showing home view');
}

function showModulesView() {
    currentView = 'modules';

    // Hide other views
    document.querySelector('.content-wrapper').style.display = 'none';
    document.querySelector('.trilhas-view').style.display = 'none';
    document.querySelector('.trail-detail-view').style.display = 'none';

    // Show modules view
    document.querySelector('.modules-view').style.display = 'block';

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    console.log('Showing modules view');
}

function showTrilhasView(moduleName, moduleTitle) {
    currentView = 'trilhas';
    currentModule = moduleName;

    // Hide other views
    document.querySelector('.content-wrapper').style.display = 'none';
    document.querySelector('.modules-view').style.display = 'none';
    document.querySelector('.trail-detail-view').style.display = 'none';

    // Show trilhas view
    document.querySelector('.trilhas-view').style.display = 'block';

    // Update title
    if (moduleTitle) {
        document.getElementById('trilhasTitle').textContent = moduleTitle;
    }

    // Load trilhas for this module
    loadTrilhasForModule(moduleName);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    console.log('Showing trilhas view for module:', moduleName);
}

function showTrailDetailView(trilhaId, trilhaTitle) {
    currentView = 'trail-detail';
    currentTrilha = trilhaId;

    // Hide other views
    document.querySelector('.content-wrapper').style.display = 'none';
    document.querySelector('.modules-view').style.display = 'none';
    document.querySelector('.trilhas-view').style.display = 'none';

    // Show trail detail view
    document.querySelector('.trail-detail-view').style.display = 'block';

    // Update trail title
    if (trilhaTitle) {
        document.getElementById('trailDetailTitle').textContent = trilhaTitle;
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    console.log('Showing trail detail for:', trilhaId);
}

// Make functions globally accessible
window.showHomeView = showHomeView;
window.showModulesView = showModulesView;
window.showTrilhasView = showTrilhasView;
window.showTrailDetailView = showTrailDetailView;

// Helper function to go back from trail detail to trilhas view
function goBackFromTrailDetail() {
    if (currentModule) {
        // Get module title from the modules view
        const moduleCard = document.querySelector(`.module-card[data-module="${currentModule}"]`);
        const moduleTitle = moduleCard ? moduleCard.querySelector('.module-title').textContent : '';
        showTrilhasView(currentModule, moduleTitle);
    } else {
        showModulesView();
    }
}

window.goBackFromTrailDetail = goBackFromTrailDetail;

// ===== Load Trilhas for Module =====
function loadTrilhasForModule(moduleName) {
    const trilhasGrid = document.getElementById('trilhasGrid');
    const trilhas = moduleTrilhasData[moduleName] || [];

    // Clear existing trilhas
    trilhasGrid.innerHTML = '';
    trilhasGrid.classList.add('trail-map');

    // Generate trilha cards
    trilhas.forEach((trilha, index) => {
        const card = createTrilhaCard(trilha, index);
        trilhasGrid.appendChild(card);
    });
}

function createTrilhaCard(trilha, index = 0) {
    const card = document.createElement('div');
    const statusClass = trilha.completed ? 'completed' :
                       trilha.active ? 'active' :
                       trilha.locked ? 'locked' : 'available';
    const alignmentClass = index % 2 === 0 ? 'align-left' : 'align-right';

    card.className = `trilha-step ${statusClass} ${alignmentClass}`;
    card.setAttribute('data-trilha', trilha.id);

    const completedLessons = trilha.locked ? 0 : Math.floor((trilha.progress / 100) * trilha.lessons);
    const progressLabel = trilha.locked ? 'Bloqueado' : `${completedLessons}/${trilha.lessons} lições`;
    const badgeClass = trilha.locked ? 'locked' : (!trilha.active && !trilha.completed ? 'neutral' : '');
    const badgeText = trilha.completed ? 'Concluída' : trilha.active ? 'Em curso' : trilha.locked ? 'Bloqueada' : 'Pronta';
    const progressBar = trilha.locked
        ? '<div class="trail-mini-progress-bar muted"></div>'
        : `
            <div class="trail-mini-progress-bar">
                <div class="trail-mini-progress-fill" style="width: ${trilha.progress}%"></div>
            </div>
        `;

    card.innerHTML = `
        <div class="trail-node">
            <img src="${trilha.icon}" alt="${trilha.title}" class="trail-icon">
            <span class="trail-badge ${badgeClass}">${badgeText}</span>
        </div>
        <div class="trail-info">
            <h3 class="trilha-step-title">${trilha.title}</h3>
            <p class="trilha-step-description">${trilha.description}</p>
            <div class="trail-mini-progress">
                ${progressBar}
                <span class="trail-mini-progress-text ${trilha.locked ? 'locked-text' : ''}">${progressLabel}</span>
            </div>
        </div>
    `;

    // Add click handler
    card.addEventListener('click', () => {
        if (trilha.locked) {
            showNotification('Complete as trilhas anteriores para desbloquear!', 'info');
            return;
        }
        showTrailDetailView(trilha.id, trilha.title);
    });

    return card;
}

// ===== Modules View Initialization =====
function initModulesView() {
    const moduleCards = document.querySelectorAll('.module-card');

    moduleCards.forEach(card => {
        card.addEventListener('click', () => {
            // Don't navigate if locked
            if (card.classList.contains('locked')) {
                showNotification('Complete as lições anteriores para desbloquear este módulo!', 'info');
                return;
            }

            const moduleName = card.getAttribute('data-module');
            const moduleTitle = card.querySelector('.module-title').textContent;

            // Show trilhas view for this module
            showTrilhasView(moduleName, moduleTitle);
        });

        // Add hover effect for non-locked cards
        if (!card.classList.contains('locked')) {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        }
    });
}

// ===== Trail Detail View Initialization =====
function initTrailDetailView() {
    // Initialize lesson buttons
    const continueButtons = document.querySelectorAll('.btn-lesson-continue');
    const startButtons = document.querySelectorAll('.btn-lesson-start');

    continueButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            handleLessonClick('continue');
        });
    });

    startButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            handleLessonClick('start');
        });
    });

    // Add click handlers to lesson items
    const lessonItems = document.querySelectorAll('.lesson-item');
    lessonItems.forEach(item => {
        if (!item.classList.contains('locked')) {
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => {
                if (item.classList.contains('completed')) {
                    showNotification('Lição já concluída! Revise quando quiser.', 'info');
                } else if (item.classList.contains('active')) {
                    handleLessonClick('continue');
                } else if (item.classList.contains('available')) {
                    handleLessonClick('start');
                }
            });
        } else {
            item.addEventListener('click', () => {
                showNotification('Complete as lições anteriores para desbloquear!', 'info');
            });
        }
    });
}

function handleLessonClick(action) {
    const message = action === 'continue' ?
        'Continuando lição...' :
        'Iniciando lição...';

    showNotification(message, 'success');

    // Simulate loading lesson
    setTimeout(() => {
        console.log('Load lesson:', action);
        // window.location.href = 'lesson.html?module=' + currentModule;
    }, 500);
}
