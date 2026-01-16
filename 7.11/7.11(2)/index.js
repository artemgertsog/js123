// Массив для хранения роста учеников
let heights = [164, 157, 160, 143, 170];
let filterValue = null; // Значение для фильтрации

// Находим элемент списка
const heightsList = document.getElementById('heightsList');

// Функция для отображения списка
function displayHeights() {
    // Очищаем список
    heightsList.innerHTML = '';
    
    // Проходим по всем значениям в массиве
    for (let i = 0; i < heights.length; i++) {
        // Создаем элемент списка
        const listItem = document.createElement('li');
        
        // Добавляем номер и значение
        listItem.textContent = `${i + 1}) ${heights[i]}`;
        
        // Если есть фильтр и значение меньше фильтра, отмечаем его
        if (filterValue !== null && heights[i] < filterValue) {
            listItem.classList.add('filtered');
        }
        
        // Добавляем элемент в список
        heightsList.appendChild(listItem);
    }
}

// Функция для добавления нового роста
function addHeight() {
    // Запрашиваем рост у пользователя
    const input = prompt('Введите рост ученика (в см):');
    
    // Проверяем, ввел ли пользователь что-то
    if (input === null || input.trim() === '') {
        alert('Рост не введён!');
        return;
    }
    
    // Преобразуем в число
    const height = parseInt(input);
    
    // Проверяем, что это число
    if (isNaN(height)) {
        alert('Пожалуйста, введите число!');
        return;
    }
    
    // Добавляем в массив
    heights.push(height);
    
    // Обновляем список
    displayHeights();
}

// Функция для фильтрации
function filterHeights() {
    // Запрашиваем значение для фильтрации
    const input = prompt('Введите минимальный рост для фильтрации (в см):\nОставьте пустым, чтобы сбросить фильтр.');
    
    // Если пользователь ничего не ввел или нажал отмену
    if (input === null || input.trim() === '') {
        // Сбрасываем фильтр
        filterValue = null;
        // Обновляем список
        displayHeights();
        return;
    }
    
    // Преобразуем в число
    const value = parseInt(input);
    
    // Проверяем, что это число
    if (isNaN(value)) {
        alert('Пожалуйста, введите число!');
        return;
    }
    
    // Устанавливаем значение фильтра
    filterValue = value;
    
    // Обновляем список
    displayHeights();
}

// При загрузке страницы показываем начальный список
window.onload = displayHeights;