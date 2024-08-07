class RickAndMortyAPI {
    constructor() {
        if (!RickAndMortyAPI.instance) {
            this.apiURL = 'https://rickandmortyapi.com/api/character';
            RickAndMortyAPI.instance = this;
        }
        return RickAndMortyAPI.instance;
    }

    async fetchCharacters(page = 1, name = '') {
        try {
            const url = `${this.apiURL}?page=${page}&name=${name}`;
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching characters:', error);
            return { results: [], info: { pages: 0 } };
        }
    }
}

const API = new RickAndMortyAPI();

let currentPage = 1;
let currentSearch = '';

async function displayCharacters(page = 1, name = '') {
    const characterContainer = document.getElementById('character-container');
    characterContainer.innerHTML = '<p>Cargando...</p>';
    
    const data = await API.fetchCharacters(page, name);
    const characters = data.results;
    const info = data.info;

    characterContainer.innerHTML = '';

    characters.forEach(character => {
        const characterCard = document.createElement('div');
        characterCard.classList.add('character-card');

        characterCard.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <h2>${character.name}</h2>
            <p>Status: ${character.status}</p>
            <p>Species: ${character.species}</p>
            <p>Gender: ${character.gender}</p>
        `;

        characterContainer.appendChild(characterCard);
    });

    updatePagination(info.pages);
}

function updatePagination(totalPages) {
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
    pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');

    displayCharacters(currentPage, currentSearch);

    searchButton.addEventListener('click', () => {
        currentSearch = searchInput.value;
        currentPage = 1;
        displayCharacters(currentPage, currentSearch);
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            currentSearch = searchInput.value;
            currentPage = 1;
            displayCharacters(currentPage, currentSearch);
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayCharacters(currentPage, currentSearch);
        }
    });

    nextButton.addEventListener('click', () => {
        currentPage++;
        displayCharacters(currentPage, currentSearch);
    });
});

function createStar() {
    const star = document.createElement('div');
    star.className = 'star';
    
    const size = Math.random() * 3;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    
    const duration = 3 + Math.random() * 7;
    star.style.animation = `twinkle ${duration}s infinite`;
    
    return star;
}

function addStars(count) {
    const starsContainer = document.getElementById('stars');
    for (let i = 0; i < count; i++) {
        starsContainer.appendChild(createStar());
    }
}

function createNebula() {
    const nebula = document.createElement('div');
    nebula.className = 'nebula';
    
    const size = Math.random() * 200 + 100;
    nebula.style.width = `${size}px`;
    nebula.style.height = `${size}px`;
    
    nebula.style.left = `${Math.random() * 100}%`;
    nebula.style.top = `${Math.random() * 100}%`;
    
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    nebula.style.backgroundColor = `rgb(${r},${g},${b})`;
    
    return nebula;
}

function addNebulas(count) {
    const starsContainer = document.getElementById('stars');
    for (let i = 0; i < count; i++) {
        starsContainer.appendChild(createNebula());
    }
}

// Crear estrellas y nebulosas cuando la página cargue
window.onload = function() {
    addStars(400); 
    addNebulas(5); 
};

// Añadir animación de brillo a las estrellas
const style = document.createElement('style');
style.textContent = `
    @keyframes twinkle {
        0%, 100% { opacity: 0.5; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.2); }
    }
`;
document.head.appendChild(style);