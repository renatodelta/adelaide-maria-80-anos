// Configuração de envio automático para o Google Sheets (via Google Forms)
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSe8PifBnjpgeKr7bKiWyGeV42c0DYYKX9ASyMz_3Ipkh08Sug/formResponse";
const GOOGLE_FORM_ENTRY_MAP = {
    name: "entry.92823088",      // ID do campo Nome Completo
    contact: "entry.1848901607",   // ID do campo Telefone ou E-mail
    attendance: "entry.1300447161",// ID do campo Você poderá comparecer?
    guests: "entry.1392250045",    // ID do campo Total de pessoas (incluindo você)
    message: "entry.2135599661"    // ID do campo Uma mensagem carinhosa para Adelaide Maria
};

// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Countdown Timer Logic
    const countdownDate = new Date("Aug 15, 2026 19:30:00").getTime();
    const daysEl = document.getElementById('countdown-days');
    const hoursEl = document.getElementById('countdown-hours');
    const minutesEl = document.getElementById('countdown-minutes');
    const secondsEl = document.getElementById('countdown-seconds');

    if (daysEl && hoursEl && minutesEl && secondsEl) {
        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            if (distance < 0) {
                clearInterval(countdownInterval);
                daysEl.textContent = "00";
                hoursEl.textContent = "00";
                minutesEl.textContent = "00";
                secondsEl.textContent = "00";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            daysEl.textContent = String(days).padStart(2, '0');
            hoursEl.textContent = String(hours).padStart(2, '0');
            minutesEl.textContent = String(minutes).padStart(2, '0');
            secondsEl.textContent = String(seconds).padStart(2, '0');
        };

        updateCountdown();
        const countdownInterval = setInterval(updateCountdown, 1000);
    }

    // Background Music Logic (HTML5 Audio tag)
    const bgMusic = document.getElementById('bg-music');
    const btnMusicToggle = document.getElementById('btn-music-toggle');

    if (bgMusic && btnMusicToggle) {
        bgMusic.volume = 0.35; // Soft ambient volume

        // Try playing immediately (works if browser allows autoplay on load)
        const playPromise = bgMusic.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                btnMusicToggle.classList.add('playing');
            }).catch(error => {
                console.log("Autoplay blocked. Waiting for user interaction.");
            });
        }

        // Fallback: Start playing on first user interaction anywhere on screen
        const startAudioOnInteraction = () => {
            if (bgMusic.paused) {
                bgMusic.play().then(() => {
                    btnMusicToggle.classList.add('playing');
                }).catch(err => {
                    console.log("Playback failed on user gesture:", err);
                });
            }
            
            // Clean up interaction events
            const eventTypes = ['click', 'touchstart', 'touchend', 'pointerdown'];
            eventTypes.forEach(type => {
                document.removeEventListener(type, startAudioOnInteraction);
                window.removeEventListener(type, startAudioOnInteraction);
            });
        };

        const eventTypes = ['click', 'touchstart', 'touchend', 'pointerdown'];
        eventTypes.forEach(type => {
            document.addEventListener(type, startAudioOnInteraction, { passive: true });
            window.addEventListener(type, startAudioOnInteraction, { passive: true });
        });

        // Manual toggle button listener
        btnMusicToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering document clicks
            if (bgMusic.paused) {
                bgMusic.play().then(() => {
                    btnMusicToggle.classList.add('playing');
                }).catch(err => {
                    console.log("Play failed on button click:", err);
                });
            } else {
                bgMusic.pause();
                btnMusicToggle.classList.remove('playing');
            }
        });
    }

    // Page Tab Navigation
    const tabs = document.querySelectorAll('.tab-item');
    const sections = document.querySelectorAll('.page-section');

    function switchTab(tabId) {
        // Update active tab buttons
        tabs.forEach(tab => {
            if (tab.getAttribute('data-tab') === tabId) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        // Show active page section
        sections.forEach(section => {
            if (section.id === `page-${tabId}`) {
                section.classList.add('active');
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.classList.remove('active');
                section.style.display = 'none';
                section.style.opacity = '0';
                section.style.transform = 'translateY(15px)';
            }
        });

        // Scroll to top of content
        document.querySelector('.app-content').scrollTop = 0;
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // Navigation connections from other buttons
    document.querySelectorAll('[data-action="go-rsvp"]').forEach(btn => {
        btn.addEventListener('click', () => switchTab('rsvp'));
    });

    document.querySelectorAll('[data-action="go-local"]').forEach(btn => {
        btn.addEventListener('click', () => switchTab('local'));
    });

    // Sidebar navigation toggles
    const btnHamburger = document.getElementById('btn-hamburger');
    const btnCloseSidebar = document.getElementById('btn-close-sidebar');
    const sidebarNav = document.getElementById('sidebar-nav');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const sidebarLinks = document.querySelectorAll('.sidebar-link-btn');

    function toggleSidebar(open = true) {
        if (open) {
            sidebarNav.classList.add('active');
            sidebarOverlay.classList.add('active');
        } else {
            sidebarNav.classList.remove('active');
            sidebarOverlay.classList.remove('active');
        }
    }

    if (btnHamburger) btnHamburger.addEventListener('click', () => toggleSidebar(true));
    if (btnCloseSidebar) btnCloseSidebar.addEventListener('click', () => toggleSidebar(false));
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', () => toggleSidebar(false));

    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            const target = link.getAttribute('data-target');
            switchTab(target);
            toggleSidebar(false);
        });
    });

    // Shortcut button in header goes to Mural
    const btnMuralShortcut = document.getElementById('btn-mural-shortcut');
    if (btnMuralShortcut) {
        btnMuralShortcut.addEventListener('click', () => switchTab('mural'));
    }


    // RSVP Form interactive details
    const rsvpForm = document.getElementById('rsvp-form');
    const rsvpSuccess = document.getElementById('rsvp-success-message');
    const rsvpGuestsWrapper = document.getElementById('rsvp-guests-wrapper');
    const radioAttendanceOptions = document.querySelectorAll('input[name="rsvp-attendance"]');
    const btnRsvpReset = document.getElementById('btn-rsvp-reset');

    // Show/hide guest count field depending on attendance choice
    radioAttendanceOptions.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.value === 'sim') {
                rsvpGuestsWrapper.classList.remove('hidden');
                document.getElementById('rsvp-guests').setAttribute('required', 'required');
            } else {
                rsvpGuestsWrapper.classList.add('hidden');
                document.getElementById('rsvp-guests').removeAttribute('required');
            }
        });
    });

    // Handle form submit and save to local storage
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const rsvpData = {
                name: document.getElementById('rsvp-name').value,
                contact: document.getElementById('rsvp-contact').value,
                attendance: document.querySelector('input[name="rsvp-attendance"]:checked').value,
                guests: document.getElementById('rsvp-guests').value,
                message: document.getElementById('rsvp-message').value,
                timestamp: new Date().toISOString()
            };

            // Save to LocalStorage
            localStorage.setItem('adelaide_rsvp_submission', JSON.stringify(rsvpData));

            // Enviar para o Google Forms se a URL estiver configurada
            if (GOOGLE_FORM_URL && GOOGLE_FORM_URL !== "SUA_URL_DO_GOOGLE_FORMS_AQUI/formResponse") {
                const formData = new URLSearchParams();
                formData.append(GOOGLE_FORM_ENTRY_MAP.name, rsvpData.name);
                formData.append(GOOGLE_FORM_ENTRY_MAP.contact, rsvpData.contact);
                formData.append(GOOGLE_FORM_ENTRY_MAP.attendance, rsvpData.attendance === 'sim' ? 'Sim' : 'Não');
                formData.append(GOOGLE_FORM_ENTRY_MAP.guests, rsvpData.attendance === 'sim' ? rsvpData.guests : 0);
                formData.append(GOOGLE_FORM_ENTRY_MAP.message, rsvpData.message);

                fetch(GOOGLE_FORM_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: formData.toString()
                })
                    .then(() => console.log("Dados enviados para o Google Forms com sucesso!"))
                    .catch(err => console.error("Erro ao enviar dados para o Google Forms:", err));
            }

            // Show success details
            const successText = document.getElementById('success-text-detail');
            if (rsvpData.attendance === 'sim') {
                successText.textContent = `Sua presença foi confirmada com sucesso para ${rsvpData.guests} pessoa(s). Agradecemos o carinho e nos vemos no dia 15 de Agosto!`;
            } else {
                successText.textContent = `Agradecemos por nos informar. Sua mensagem de carinho foi enviada com sucesso para Adelaide Maria.`;
            }

            // Transition states
            rsvpForm.classList.add('hidden');
            rsvpSuccess.classList.remove('hidden');
        });
    }

    // Allow resetting / editing RSVP
    if (btnRsvpReset) {
        btnRsvpReset.addEventListener('click', () => {
            rsvpSuccess.classList.add('hidden');
            rsvpForm.classList.remove('hidden');
            switchTab('home');
        });
    }

    // Pre-populate RSVP from LocalStorage if exists
    const storedRSVP = localStorage.getItem('adelaide_rsvp_submission');
    if (storedRSVP && rsvpForm && rsvpSuccess) {
        const data = JSON.parse(storedRSVP);
        document.getElementById('rsvp-name').value = data.name;
        document.getElementById('rsvp-contact').value = data.contact;
        document.getElementById('rsvp-guests').value = data.guests;
        document.getElementById('rsvp-message').value = data.message;

        const attendanceRadio = document.querySelector(`input[name="rsvp-attendance"][value="${data.attendance}"]`);
        if (attendanceRadio) {
            attendanceRadio.checked = true;
            attendanceRadio.dispatchEvent(new Event('change'));
        }

        // Pre-populate fields, but keep the form visible so they can submit again if desired
    }

    // MURAL DE MEMÓRIAS LOGIC
    const btnOpenMuralForm = document.getElementById('btn-open-mural-form');
    const btnCloseMuralForm = document.getElementById('btn-close-mural-form');
    const muralFormContainer = document.getElementById('mural-form-container');
    const muralPostForm = document.getElementById('mural-post-form');
    const muralFeed = document.getElementById('mural-feed');

    if (btnOpenMuralForm) {
        btnOpenMuralForm.addEventListener('click', () => {
            muralFormContainer.classList.remove('hidden');
            muralFormContainer.scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (btnCloseMuralForm) {
        btnCloseMuralForm.addEventListener('click', () => {
            muralFormContainer.classList.add('hidden');
        });
    }

    // Sample/Default memories
    const defaultMemories = [
        {
            id: 1,
            author: "Ricardo Silva",
            relation: "Sobrinho",
            date: "Há 2 horas",
            text: "Lembro-me como se fosse hoje do Natal de 1985. Tia Adelaide preparou aquela ceia maravilhosa e nos contou as histórias de sua infância no interior. Sua risada sempre iluminava a sala.",
            image: "assets/memory_child.png",
            likes: 15,
            liked: false
        },
        {
            id: 2,
            isQuote: true,
            text: "A elegância de Adelaide não está apenas em seus trajes, mas na forma generosa como ela acolhe cada pessoa que entra em sua vida.",
            author: "Helena Maria",
            relation: "Irmã",
            date: "Há 5 horas",
            likes: 42,
            liked: false
        },
        {
            id: 3,
            author: "Mariana Costa",
            relation: "Neta",
            date: "Há 12 horas",
            text: "Minha maior inspiração. Vovó me ensinou que a paciência é a maior das virtudes. Adoro nossas tardes de chá e conversas sobre a vida.",
            image: "assets/memory_baking.png",
            likes: 48,
            liked: false
        },
        {
            id: 4,
            author: "Gabriel Antunes",
            relation: "Afilhado",
            date: "Ontem",
            text: "Fiquei revendo o baú e achei essa pérola! Adelaide sempre à frente do seu tempo, com aquele olhar que transborda sabedoria.",
            image: "assets/memory_portrait.png",
            likes: 29,
            liked: false
        },
        {
            id: 5,
            author: "Lúcia Ferreira",
            relation: "Amiga de infância",
            date: "Há 2 dias",
            text: "Oitenta anos de uma amizade que começou no pátio da escola. Quantas gargalhadas e confidências compartilhadas. Você é o exemplo vivo de resiliência e doçura.",
            likes: 56,
            liked: false
        },
        {
            id: 6,
            author: "Carlos Eduardo",
            relation: "Genro",
            date: "Há 3 dias",
            text: "Um brinde aos 80 anos de uma mulher extraordinária. Obrigado por nos receber sempre com tanto carinho.",
            image: "assets/memory_candle.png",
            likes: 18,
            liked: false
        }
    ];

    // Load memories from LocalStorage or use defaults
    let memories = JSON.parse(localStorage.getItem('adelaide_mural_memories'));
    if (!memories) {
        memories = defaultMemories;
        localStorage.setItem('adelaide_mural_memories', JSON.stringify(memories));
    }

    function renderMemories() {
        if (!muralFeed) return;
        muralFeed.innerHTML = '';

        memories.forEach(memory => {
            const initials = memory.author.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

            let cardHTML = '';
            if (memory.isQuote) {
                // Render quote style card
                cardHTML = `
                    <div class="memory-card-quote-special">
                        <p class="memory-quote-body">"${memory.text}"</p>
                        <p class="memory-quote-author">— ${memory.author} (${memory.relation})</p>
                        
                        <div class="memory-card-footer" style="padding: 12px 0 0 0; border: none; margin-top: 10px;">
                            <button class="btn-like-post ${memory.liked ? 'liked' : ''}" data-id="${memory.id}">
                                <i data-lucide="heart"></i>
                                <span>${memory.likes}</span>
                            </button>
                            <span class="post-date-tag">${memory.date}</span>
                        </div>
                    </div>
                `;
            } else {
                // Render standard card with/without image
                const imageHTML = memory.image ? `<img src="${memory.image}" alt="Lembrança" class="memory-card-image">` : '';
                cardHTML = `
                    <div class="memory-post-card">
                        <div class="memory-card-header">
                            <div class="author-initials-badge">${initials}</div>
                            <div class="author-info-text">
                                <span class="author-name">${memory.author}</span>
                                <span class="author-relation">${memory.relation} • ${memory.date}</span>
                            </div>
                        </div>
                        ${imageHTML}
                        <div class="memory-card-body">
                            <p class="memory-card-text">${memory.text}</p>
                        </div>
                        <div class="memory-card-footer">
                            <button class="btn-like-post ${memory.liked ? 'liked' : ''}" data-id="${memory.id}">
                                <i data-lucide="heart"></i>
                                <span>${memory.likes}</span>
                            </button>
                            <span class="post-date-tag">Homenagem</span>
                        </div>
                    </div>
                `;
            }

            muralFeed.insertAdjacentHTML('beforeend', cardHTML);
        });

        // Re-initialize dynamic Lucide icons in feed
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        // Apply random rotation to simulate realistic polaroid photos on a wall
        document.querySelectorAll('.memory-post-card').forEach(card => {
            if (!card.style.transform) {
                const randomRotate = (Math.random() * 6 - 3).toFixed(1); // -3deg to +3deg
                card.style.transform = `rotate(${randomRotate}deg)`;
            }
        });

        // Add like button handlers
        document.querySelectorAll('.btn-like-post').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(btn.getAttribute('data-id'));
                const memoryIndex = memories.findIndex(m => m.id === id);
                if (memoryIndex > -1) {
                    if (memories[memoryIndex].liked) {
                        memories[memoryIndex].likes--;
                        memories[memoryIndex].liked = false;
                    } else {
                        memories[memoryIndex].likes++;
                        memories[memoryIndex].liked = true;
                    }
                    localStorage.setItem('adelaide_mural_memories', JSON.stringify(memories));
                    renderMemories();
                }
            });
        });
    }

    // Handle new post submit
    if (muralPostForm) {
        muralPostForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const newMemory = {
                id: Date.now(),
                author: document.getElementById('mural-author').value,
                relation: document.getElementById('mural-relationship').value,
                date: "Agora mesmo",
                text: document.getElementById('mural-text').value,
                image: document.getElementById('mural-image').value || null,
                likes: 0,
                liked: false
            };

            // Prepend new memory
            memories.unshift(newMemory);
            localStorage.setItem('adelaide_mural_memories', JSON.stringify(memories));

            // Render list & reset/hide form
            renderMemories();
            muralPostForm.reset();
            muralFormContainer.classList.add('hidden');
        });
    }

    // Lightbox modal for avatars and images
    const lightbox = document.getElementById('image-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (lightbox && lightboxImg && lightboxClose) {
        const setupZoomable = (imgElement, captionText) => {
            imgElement.style.cursor = 'zoom-in';
            imgElement.addEventListener('click', (e) => {
                e.stopPropagation();
                lightbox.style.display = 'block';
                // Trigger reflow for transition
                lightbox.offsetHeight;
                lightbox.classList.add('active');
                lightboxImg.src = imgElement.src;
                lightboxCaption.textContent = captionText || imgElement.alt;
            });
        };

        // Attach to Rogério's avatar and any future member avatar images
        document.querySelectorAll('.member-avatar img').forEach(img => {
            const memberCard = img.closest('.member-card');
            const memberName = memberCard ? memberCard.querySelector('.member-name').textContent : img.alt;
            setupZoomable(img, memberName);
        });

        // Close lightbox
        const closeLightbox = () => {
            lightbox.classList.remove('active');
            setTimeout(() => {
                if (!lightbox.classList.contains('active')) {
                    lightbox.style.display = 'none';
                }
            }, 300); // match transition duration
        };

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', closeLightbox);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeLightbox();
        });
    }

    // Initialize Mural view
    renderMemories();
});
