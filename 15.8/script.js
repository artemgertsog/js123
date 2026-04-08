const API_BASE = 'https://sb-film.skillbox.cc/films';
const EMAIL = 'ovikdevil@gmail.com';

const form = document.getElementById('film-form');
const titleInput = document.getElementById('title');
const genreInput = document.getElementById('genre');
const yearInput = document.getElementById('releaseYear');
const watchedCheck = document.getElementById('isWatched');
const formError = document.getElementById('form-error');
const tbody = document.getElementById('film-tbody');
const filterTitle = document.getElementById('filterTitle');
const filterGenre = document.getElementById('filterGenre');
const filterYear = document.getElementById('filterYear');
const filterWatched = document.getElementById('filterWatched');
const applyFiltersBtn = document.getElementById('applyFilters');
const resetFiltersBtn = document.getElementById('resetFilters');
const deleteAllBtn = document.getElementById('deleteAllBtn');

// Вспомогательная функция запроса
async function apiRequest(url, options = {}) {
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'email': EMAIL
        },
        ...options
    });
    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Ошибка запроса');
    }
    if (options.method === 'DELETE' && url === API_BASE) return null;
    return response.json();
}

// Загрузка фильмов с фильтрами
async function loadFilms() {
    const params = new URLSearchParams();
    if (filterTitle.value) params.append('title', filterTitle.value);
    if (filterGenre.value) params.append('genre', filterGenre.value);
    if (filterYear.value) params.append('releaseYear', filterYear.value);
    if (filterWatched.checked) params.append('isWatched', true);
    const url = params.toString() ? `${API_BASE}?${params}` : API_BASE;
    const films = await apiRequest(url);
    renderTable(films);
}

// Отрисовка таблицы
function renderTable(films) {
    tbody.innerHTML = '';
    if (!films || films.length === 0) {
        const row = tbody.insertRow();
        row.insertCell(0).colSpan = 5;
        row.insertCell(0).textContent = 'Нет фильмов';
        return;
    }
    films.forEach(film => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = film.title;
        row.insertCell(1).textContent = film.genre;
        row.insertCell(2).textContent = film.releaseYear;
        row.insertCell(3).textContent = film.isWatched ? 'Да' : 'Нет';
        const actionsCell = row.insertCell(4);
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Удалить';
        delBtn.onclick = () => deleteFilm(film.id);
        actionsCell.appendChild(delBtn);
    });
}

// Валидация формы
function validateForm(title, genre, year) {
    if (!title.trim()) {
        formError.textContent = 'Название фильма обязательно';
        return false;
    }
    if (!genre.trim()) {
        formError.textContent = 'Жанр обязателен';
        return false;
    }
    const yearNum = Number(year);
    const currentYear = new Date().getFullYear();
    if (!year || isNaN(yearNum) || yearNum < 1895 || yearNum > currentYear + 5) {
        formError.textContent = `Введите корректный год (от 1895 до ${currentYear + 5})`;
        return false;
    }
    formError.textContent = '';
    return true;
}

// Добавление фильма
async function addFilm(film) {
    await apiRequest(API_BASE, {
        method: 'POST',
        body: JSON.stringify(film)
    });
    loadFilms();
}

// Удаление одного фильма
async function deleteFilm(id) {
    await apiRequest(`${API_BASE}/${id}`, { method: 'DELETE' });
    loadFilms();
}

// Удаление всех фильмов
async function deleteAllFilms() {
    if (confirm('Вы уверены, что хотите удалить все фильмы?')) {
        await apiRequest(API_BASE, { method: 'DELETE' });
        loadFilms();
    }
}

// Обработчик отправки формы
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = titleInput.value;
    const genre = genreInput.value;
    const year = yearInput.value;
    const isWatched = watchedCheck.checked;

    if (!validateForm(title, genre, year)) return;

    const newFilm = {
        title: title.trim(),
        genre: genre.trim(),
        releaseYear: Number(year),
        isWatched
    };
    await addFilm(newFilm);
    // Очистка формы
    titleInput.value = '';
    genreInput.value = '';
    yearInput.value = '';
    watchedCheck.checked = false;
    formError.textContent = '';
});

// Фильтры
applyFiltersBtn.addEventListener('click', () => loadFilms());
resetFiltersBtn.addEventListener('click', () => {
    filterTitle.value = '';
    filterGenre.value = '';
    filterYear.value = '';
    filterWatched.checked = false;
    loadFilms();
});
deleteAllBtn.addEventListener('click', deleteAllFilms);

// Загрузка при старте
loadFilms();