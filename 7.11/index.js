// Массив 
let libraryBooks = [
    "Мастер и Маргарита",
    "Гарри Поттер",
    "Над пропастью во ржи",
    "Властелин колец",
    "Дон Кихот",
    "Отцы и дети"
];

// Элементы DOM
const booksListElement = document.getElementById('booksList');
const addBookBtn = document.getElementById('addBookBtn');
const searchBookBtn = document.getElementById('searchBookBtn');
const booksCountElement = document.getElementById('booksCount');

// Функция для отображения списка книг
function displayBooks() {

    booksListElement.innerHTML = '';
    

    libraryBooks.forEach((book, index) => {
        const bookItem = document.createElement('li');
        bookItem.className = 'book-item';
        bookItem.dataset.index = index;
        
        const bookNumber = document.createElement('span');
        bookNumber.className = 'book-number';
        bookNumber.textContent = `${index + 1})`;
        
        const bookTitle = document.createElement('span');
        bookTitle.className = 'book-title';
        bookTitle.textContent = book;
        
        bookItem.appendChild(bookNumber);
        bookItem.appendChild(bookTitle);
        booksListElement.appendChild(bookItem);
    });
    

    updateBooksCount();
}

// Функция для обновления счетчика книг
function updateBooksCount() {
    booksCountElement.textContent = libraryBooks.length;
}

// Функция для добавления новой книги
function addNewBook() {

    const bookTitle = prompt('Введите название новой книги:');
    

    if (!bookTitle) {
        alert('Название книги не введено!');
        return;
    }
    

    if (bookTitle.trim() === '') {
        alert('Название книги не введено!');
        return;
    }
    

    libraryBooks.push(bookTitle.trim());
    

    displayBooks();
    

    const lastBookItem = document.querySelector('.book-item:last-child');
    if (lastBookItem) {
        lastBookItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        

        lastBookItem.style.animation = 'highlight 2s ease';
        setTimeout(() => {
            lastBookItem.style.animation = '';
        }, 2000);
    }
}


function searchBook() {

    removeHighlights();

    const searchQuery = prompt('Введите название книги для поиска:');
    

    if (!searchQuery) {
        alert('Введите название для поиска!');
        return;
    }
    
    if (searchQuery.trim() === '') {
        alert('Введите название для поиска!');
        return;
    }
    
    const searchTerm = searchQuery.trim().toLowerCase();
    let foundIndex = -1;
    
    for (let i = 0; i < libraryBooks.length; i++) {
        if (libraryBooks[i].toLowerCase().includes(searchTerm)) {
            foundIndex = i;
            break;
        }
    }
    
    if (foundIndex === -1) {
        alert('Книга не найдена!');
        return;
    }
    

    const bookItem = document.querySelector(`.book-item[data-index="${foundIndex}"]`);
    if (bookItem) {
        bookItem.classList.add('highlighted');
        

        bookItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        

        setTimeout(() => {
            bookItem.classList.remove('highlighted');
        }, 3000);
    }
}


function removeHighlights() {
    const highlightedBooks = document.querySelectorAll('.book-item.highlighted');
    highlightedBooks.forEach(book => {
        book.classList.remove('highlighted');
    });
}


document.addEventListener('DOMContentLoaded', () => {

    displayBooks();
    

    addBookBtn.addEventListener('click', addNewBook);
    searchBookBtn.addEventListener('click', searchBook);
    

    console.log('Начальный массив книг:', libraryBooks);
});


window.libraryBooks = libraryBooks;