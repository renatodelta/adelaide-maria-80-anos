// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
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

    // Timeline Modal logic
    const btnOpenTimeline = document.getElementById('btn-open-timeline');
    const btnCloseTimelineModal = document.getElementById('btn-close-timeline-modal');
    const timelineModal = document.getElementById('timeline-modal');

    if (btnOpenTimeline && timelineModal) {
        btnOpenTimeline.addEventListener('click', () => {
            timelineModal.classList.remove('hidden');
        });
    }

    if (btnCloseTimelineModal && timelineModal) {
        btnCloseTimelineModal.addEventListener('click', () => {
            timelineModal.classList.add('hidden');
        });
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

            // Show success details
            const successText = document.getElementById('success-text-detail');
            if (rsvpData.attendance === 'sim') {
                successText.textContent = `Sua presença foi confirmada com sucesso para ${rsvpData.guests} pessoa(s). Agradecemos o carinho e nos vemos no dia 8 de Agosto!`;
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

        // Show Success card initially but allow editing
        rsvpForm.classList.add('hidden');
        rsvpSuccess.classList.remove('hidden');
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

    // Initialize Mural view
    renderMemories();
});
