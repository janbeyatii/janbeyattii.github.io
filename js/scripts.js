// Tailwind Configuration
tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                dark: "#0a0a0a",
                light: "#fcfbf7",
            },
        },
    },
};

// Initialize Icons
lucide.createIcons();

// Project Data
const projects = [
    {
        title: "In Progress",
        description: "https://github.com/janbeyatii",
        url: "",
        image: ""
    }

    // {
    //     title: "HLS-Client",
    //     description: "This project implements HTTP-Live Streaming Protocol server and player in the client device, using gstreamer multimedia framework",
    //     url: "https://github.com/akashblsbrmnm/hlsclient",
    //     image: "https://opengraph.githubassets.com/1/akashblsbrmnm/hlsclient"
    // },
    // {
    //     title: "Developer Portfolio",
    //     description: "This is a developer portfolio made using Tailwind framework, and a little bit of JS",
    //     url: "https://github.com/akashblsbrmnm/akashblsbrmnm.github.io",
    //     image: "https://opengraph.githubassets.com/1/akashblsbrmnm/akashblsbrmnm.github.io"
    // },
    // {
    //     title: "Deep learning : Skin Cancer Classification",
    //     description: "This was my project for AI/ML Coursework at the University",
    //     url: "https://github.com/akashblsbrmnm/skin-cancer-classifier",
    //     image: "https://opengraph.githubassets.com/1/akashblsbrmnm/skin-cancer-classifier"
    // },
    // {
    //     title: "Project Y",
    //     description: "STILL WORK IN PROGRESS",
    //     url: "https://github.com/akashblsbrmnm",
    //     image: "https://opengraph.githubassets.com/1/"
    // }
];

// Theme Management
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

function setTheme(isDark) {
    if (isDark) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }
    updateIcon(isDark);
    localStorage.setItem('darkMode', isDark);
}

function updateIcon(isDark) {
    themeToggle.innerHTML = isDark
        ? '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>';
}

function getSystemPreference() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function setInitialTheme() {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme !== null) {
        setTheme(JSON.parse(savedTheme));
    } else {
        setTheme(getSystemPreference());
    }
}

// UI Effects
function revealSections() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('visible');
        }
    });
}

function createProjectTiles() {
    const projectsContainer = document.querySelector('#projects .grid');
    projects.forEach(project => {
        const tile = document.createElement('div');
        tile.className = 'project-tile';
        tile.innerHTML = `
            <div class="project-thumbnail mb-4">
                <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover">
                <div class="redirect-icon">
                    <i data-lucide="external-link"></i>
                </div>
            </div>
            <h3 class="text-xl font-bold mb-2">${project.title}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">${project.description}</p>
        `;
        const thumbnail = tile.querySelector('.project-thumbnail');
        thumbnail.addEventListener('click', () => window.open(project.url, '_blank'));
        projectsContainer.appendChild(tile);
    });
    lucide.createIcons();
}

function rickRoll() {
    window.open("https://www.youtube.com/watch?v=xvFZjo5PgG0", "_blank");
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    const rdkElements = document.querySelectorAll('.rdk-hover');
    rdkElements.forEach(element => {
        element.addEventListener('click', function() {
            if (this.textContent === 'RDK-B') {
                window.open('https://wiki.rdkcentral.com/display/RDK/RDK-Broadband', '_blank');
            } else if (this.textContent === 'RDK') {
                window.open('https://en.wikipedia.org/wiki/Reference_Design_Kit', '_blank');
            }
        });
    });
    createProjectTiles();
});

themeToggle.addEventListener('click', () => {
    const isDark = !html.classList.contains('dark');
    setTheme(isDark);
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (localStorage.getItem('darkMode') === null) {
        setTheme(e.matches);
    }
});

window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);

// Initialize theme on load
setInitialTheme();