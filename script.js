/* ══════════ WINDOW MANAGER ══════════ */

var zCounter = 10;
var openWindows = {};
var dragState = null;
var iconDrag = null;

// Default window positions (offset from top-left)
var defaultPositions = {
    terminal: { top: 80, left: 140 },
    skills:   { top: 100, left: 180 },
    projects: { top: 90, left: 160 },
    archive:  { top: 110, left: 200 },
    blog:     { top: 120, left: 220 },
    contact:  { top: 140, left: 260 }
};

/* ── Open Window ── */
function openWindow(id) {
    var win = document.getElementById('win-' + id);
    if (!win) return;

    closeStartMenu();

    // If minimized, restore
    if (win.classList.contains('minimized')) {
        win.classList.remove('minimized');
        win.style.display = 'flex';
        focusWindow(id);
        updateTaskbar();
        return;
    }

    // If already open, just focus
    if (win.style.display !== 'none') {
        focusWindow(id);
        return;
    }

    // Center window on screen
    if (!win.dataset.positioned) {
        var taskbarH = 48;
        var maxH = window.innerHeight - taskbarH - 30;
        win.style.display = 'flex';
        var winW = win.offsetWidth;
        var winH = Math.min(win.offsetHeight, maxH);
        var x = Math.max(0, Math.round((window.innerWidth - winW) / 2));
        var y = Math.max(taskbarH + 8, Math.round(taskbarH + (window.innerHeight - taskbarH - winH) / 3));
        win.style.left = x + 'px';
        win.style.top = y + 'px';
        win.dataset.positioned = '1';
    }

    win.style.display = 'flex';
    win.classList.remove('minimized');
    openWindows[id] = true;
    focusWindow(id);
    updateTaskbar();
}

/* ── Close Window ── */
function closeWindow(id) {
    var win = document.getElementById('win-' + id);
    if (!win) return;

    win.style.display = 'none';
    win.classList.remove('maximized', 'minimized', 'focused');
    delete openWindows[id];
    updateTaskbar();
}

/* ── Minimize Window ── */
function minimizeWindow(id) {
    var win = document.getElementById('win-' + id);
    if (!win) return;

    win.classList.add('minimized');
    setTimeout(function() {
        win.style.display = 'none';
    }, 200);
    updateTaskbar();
}

/* ── Maximize Window ── */
function maximizeWindow(id) {
    var win = document.getElementById('win-' + id);
    if (!win) return;

    if (win.classList.contains('maximized')) {
        win.classList.remove('maximized');
    } else {
        win.classList.add('maximized');
    }
}

/* ── Focus Window ── */
function focusWindow(id) {
    // Remove focus from all
    document.querySelectorAll('.window').forEach(function(w) {
        w.classList.remove('focused');
    });

    var win = document.getElementById('win-' + id);
    if (!win) return;

    zCounter++;
    win.style.zIndex = zCounter;
    win.classList.add('focused');
    updateTaskbar();
}

/* ══════════ DRAG SYSTEM ══════════ */

function startDrag(e, id) {
    var win = document.getElementById('win-' + id);
    if (!win || win.classList.contains('maximized')) return;

    focusWindow(id);

    var desktopRect = document.getElementById('desktop').getBoundingClientRect();
    dragState = {
        id: id,
        win: win,
        offsetX: e.clientX - parseInt(win.style.left || 0),
        offsetY: e.clientY - parseInt(win.style.top || 0),
        desktopTop: desktopRect.top
    };

    e.preventDefault();
}

document.addEventListener('mousemove', function(e) {
    if (!dragState) return;

    var x = e.clientX - dragState.offsetX;
    var y = e.clientY - dragState.offsetY;

    // Clamp to desktop bounds (taskbar on top)
    var taskbarH = 48;
    x = Math.max(0, Math.min(x, window.innerWidth - 100));
    y = Math.max(0, Math.min(y, window.innerHeight - 40));

    dragState.win.style.left = x + 'px';
    dragState.win.style.top = y + 'px';
});

document.addEventListener('mouseup', function() {
    dragState = null;
});

// Touch support for mobile dragging
document.addEventListener('touchmove', function(e) {
    if (!dragState) return;
    var touch = e.touches[0];
    var x = touch.clientX - dragState.offsetX;
    var y = touch.clientY - dragState.offsetY;
    var taskbarH = 48;
    x = Math.max(0, Math.min(x, window.innerWidth - 100));
    y = Math.max(0, Math.min(y, window.innerHeight - 40));
    dragState.win.style.left = x + 'px';
    dragState.win.style.top = y + 'px';
}, { passive: true });

document.addEventListener('touchend', function() {
    dragState = null;
});

/* ── Click on window body to focus ── */
document.addEventListener('mousedown', function(e) {
    var win = e.target.closest('.window');
    if (win) {
        var id = win.dataset.window;
        if (id) focusWindow(id);
    }
});

/* ══════════ TASKBAR ══════════ */

function updateTaskbar() {
    var container = document.getElementById('taskbarTabs');
    container.innerHTML = '';

    document.querySelectorAll('.window').forEach(function(win) {
        var id = win.dataset.window;
        if (!id) return;

        // Show tab if window is open or minimized
        var isOpen = win.style.display !== 'none' || win.classList.contains('minimized');
        if (!isOpen && !openWindows[id]) return;

        var tab = document.createElement('button');
        tab.className = 'taskbar-tab';
        tab.textContent = win.querySelector('.window-title').textContent.split('—')[0].trim();

        if (win.classList.contains('focused') && win.style.display !== 'none') {
            tab.classList.add('active');
        }

        tab.onclick = function() {
            if (win.classList.contains('minimized') || win.style.display === 'none') {
                openWindow(id);
            } else if (win.classList.contains('focused')) {
                minimizeWindow(id);
            } else {
                focusWindow(id);
            }
        };

        container.appendChild(tab);
    });
}

/* ══════════ START MENU ══════════ */

function toggleStartMenu() {
    var menu = document.getElementById('startMenu');
    var btn = document.querySelector('.taskbar-start');
    menu.classList.toggle('active');
    btn.classList.toggle('active');
}

function closeStartMenu() {
    document.getElementById('startMenu').classList.remove('active');
    document.querySelector('.taskbar-start').classList.remove('active');
}

// Close start menu on outside click
document.addEventListener('click', function(e) {
    if (!e.target.closest('.start-menu') && !e.target.closest('.taskbar-start')) {
        closeStartMenu();
    }
});

/* ══════════ CLOCK ══════════ */

function updateClock() {
    var el = document.getElementById('trayClock');
    if (!el) return;
    var now = new Date();
    var h = String(now.getHours()).padStart(2, '0');
    var m = String(now.getMinutes()).padStart(2, '0');
    el.textContent = h + ':' + m;
}

setInterval(updateClock, 10000);
updateClock();

/* ══════════ LIGHTBOX ══════════ */

function openLightbox(src) {
    var lb = document.getElementById('lightbox');
    document.getElementById('lightboxImg').src = src;
    lb.classList.add('active');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLightbox();
        closeStartMenu();
    }
});

/* ══════════ DESKTOP WIDGET ══════════ */

function updateWidget() {
    var now = new Date();
    var h = String(now.getHours()).padStart(2, '0');
    var m = String(now.getMinutes()).padStart(2, '0');

    var timeEl = document.getElementById('widgetTime');
    var dateEl = document.getElementById('widgetDate');
    if (!timeEl) return;

    timeEl.textContent = h + ':' + m;

    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    dateEl.textContent = days[now.getDay()] + ', ' + months[now.getMonth()] + ' ' + now.getDate();
}

setInterval(updateWidget, 30000);

/* ══════════ DRAGGABLE DESKTOP ELEMENTS ══════════ */

function initIconDrag() {
    var icons = document.querySelectorAll('.desktop-icon, .draggable-widget');
    var moved = false;

    icons.forEach(function(icon) {
        icon.addEventListener('mousedown', function(e) {
            if (e.target.closest('a')) return;
            if (e.target.closest('.window')) return;
            if (e.button !== 0) return;
            moved = false;
            var r = icon.getBoundingClientRect();
            var pr = icon.parentElement.getBoundingClientRect();
            iconDrag = {
                el: icon,
                offsetX: e.clientX - r.left,
                offsetY: e.clientY - r.top,
                parentLeft: pr.left,
                parentTop: pr.top,
                startX: e.clientX,
                startY: e.clientY
            };
            icon.style.zIndex = 5;
            icon.style.opacity = '0.85';
            e.preventDefault();
        });

        icon.addEventListener('touchstart', function(e) {
            moved = false;
            var touch = e.touches[0];
            var r = icon.getBoundingClientRect();
            var pr = icon.parentElement.getBoundingClientRect();
            iconDrag = {
                el: icon,
                offsetX: touch.clientX - r.left,
                offsetY: touch.clientY - r.top,
                parentLeft: pr.left,
                parentTop: pr.top,
                startX: touch.clientX,
                startY: touch.clientY
            };
            icon.style.zIndex = 5;
        }, { passive: true });

        // Prevent click from firing if dragged
        icon.addEventListener('click', function(e) {
            if (moved) {
                e.stopImmediatePropagation();
                e.preventDefault();
            }
        }, true);
    });

    document.addEventListener('mousemove', function(e) {
        if (!iconDrag) return;
        var dx = e.clientX - iconDrag.startX;
        var dy = e.clientY - iconDrag.startY;
        if (Math.abs(dx) > 4 || Math.abs(dy) > 4) moved = true;
        iconDrag.el.style.left = (e.clientX - iconDrag.offsetX - iconDrag.parentLeft) + 'px';
        iconDrag.el.style.top = (e.clientY - iconDrag.offsetY - iconDrag.parentTop) + 'px';
    });

    document.addEventListener('touchmove', function(e) {
        if (!iconDrag) return;
        var touch = e.touches[0];
        var dx = touch.clientX - iconDrag.startX;
        var dy = touch.clientY - iconDrag.startY;
        if (Math.abs(dx) > 4 || Math.abs(dy) > 4) moved = true;
        iconDrag.el.style.left = (touch.clientX - iconDrag.offsetX - iconDrag.parentLeft) + 'px';
        iconDrag.el.style.top = (touch.clientY - iconDrag.offsetY - iconDrag.parentTop) + 'px';
    }, { passive: true });

    document.addEventListener('mouseup', function() {
        if (iconDrag) {
            iconDrag.el.style.zIndex = '';
            iconDrag.el.style.opacity = '';
            iconDrag = null;
        }
    });

    document.addEventListener('touchend', function() {
        if (iconDrag) {
            iconDrag.el.style.zIndex = '';
            iconDrag = null;
        }
    });
}

/* ══════════ SECRET MASCOT (Konami Code) ══════════ */

var konamiSequence = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
var konamiProgress = 0;

document.addEventListener('keydown', function(e) {
    if (e.key === konamiSequence[konamiProgress]) {
        konamiProgress++;
        if (konamiProgress === konamiSequence.length) {
            konamiProgress = 0;
            var mascot = document.getElementById('mascotArea');
            if (mascot.classList.contains('hidden')) {
                mascot.classList.remove('hidden');
                mascot.style.animation = 'none';
                void mascot.offsetWidth;
                mascot.style.animation = '';
            }
        }
    } else {
        konamiProgress = e.key === konamiSequence[0] ? 1 : 0;
    }
});

/* ══════════ MASCOT INTERACTION ══════════ */

var mascotPhrases = [
    "Meow. I mean... hello.",
    "I'm the senior developer here.",
    "Have you tried turning it off and on again?",
    "I wrote this website. Trust me.",
    "Stop clicking me and check the projects!",
    "Feed me code. Or tuna.",
    "I'm not fat, I'm well-architected.",
    "404: Treats not found.",
    "sudo give me attention",
    "My code compiles on the first try. Always.",
    "I debug by sitting on the keyboard.",
    "git commit -m 'cat was here'"
];

var mascotIndex = 0;

function mascotInteract() {
    var bubble = document.getElementById('speechBubble');
    var area = document.getElementById('mascotArea');

    mascotIndex = (mascotIndex + 1) % mascotPhrases.length;
    bubble.textContent = mascotPhrases[mascotIndex];

    area.classList.remove('excited');
    void area.offsetWidth;
    area.classList.add('excited');

    setTimeout(function() {
        area.classList.remove('excited');
    }, 600);
}

/* ══════════ BOOT TYPING ANIMATION ══════════ */

function bootSequence() {
    var el = document.getElementById('bootText');
    var overlay = document.getElementById('bootOverlay');
    if (!el || !overlay) return;

    var lines = [
        '> Initializing system...',
        '> Welcome, visitor.',
        '> Click an icon to explore.'
    ];

    var lineIdx = 0;
    var charIdx = 0;
    var deleting = false;
    var pauseAfterLine = 1200;
    var pauseAfterDelete = 300;
    var typeSpeed = 35;
    var deleteSpeed = 15;

    function tick() {
        if (lineIdx >= lines.length) {
            // Done — fade out
            setTimeout(function() {
                overlay.classList.add('done');
            }, 800);
            return;
        }

        var line = lines[lineIdx];

        if (!deleting) {
            // Typing
            charIdx++;
            el.textContent = line.substring(0, charIdx);

            if (charIdx >= line.length) {
                // Finished typing this line
                if (lineIdx === lines.length - 1) {
                    // Last line — hold then fade
                    setTimeout(function() {
                        overlay.classList.add('done');
                    }, 2000);
                    return;
                }
                // Pause then start deleting
                setTimeout(function() {
                    deleting = true;
                    tick();
                }, pauseAfterLine);
                return;
            }
            setTimeout(tick, typeSpeed);
        } else {
            // Deleting
            charIdx--;
            el.textContent = line.substring(0, charIdx);

            if (charIdx <= 0) {
                deleting = false;
                lineIdx++;
                setTimeout(tick, pauseAfterDelete);
                return;
            }
            setTimeout(tick, deleteSpeed);
        }
    }

    setTimeout(tick, 500);
}

/* ══════════ BOOT SEQUENCE ══════════ */

document.addEventListener('DOMContentLoaded', function() {
    updateWidget();
    bootSequence();

    // Init icon drag after boot animation finishes
    setTimeout(function() {
        initIconDrag();
    }, 500);

});
