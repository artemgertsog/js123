import { addItem } from './storage.js';
import { navigateTo } from './router.js';

export function renderAddPage(app) {
    app.innerHTML = '';
    const pageDiv = document.createElement('div');
    pageDiv.className = 'page';
    pageDiv.innerHTML = `
        <h1>Добавить запись</h1>
        <form id="addForm">
            <div class="form-group">
                <label for="name">Название *</label>
                <input type="text" id="name" required>
                <div class="error" id="nameError"></div>
            </div>
            <div class="form-group">
                <label for="shelf">Полка *</label>
                <input type="text" id="shelf" required>
                <div class="error" id="shelfError"></div>
            </div>
            <div class="form-group">
                <label for="weight">Вес (кг) *</label>
                <input type="number" step="0.1" id="weight" required>
                <div class="error" id="weightError"></div>
            </div>
            <div class="form-group">
                <label for="shelfLife">Время хранения (дни) *</label>
                <input type="number" id="shelfLife" required>
                <div class="error" id="shelfLifeError"></div>
            </div>
            <button type="submit" class="btn">Добавить</button>
            <button type="button" id="cancelBtn" class="btn btn-danger">Отмена</button>
        </form>
    `;
    app.appendChild(pageDiv);
    
    const form = document.getElementById('addForm');
    const nameInput = document.getElementById('name');
    const shelfInput = document.getElementById('shelf');
    const weightInput = document.getElementById('weight');
    const shelfLifeInput = document.getElementById('shelfLife');
    const nameError = document.getElementById('nameError');
    const shelfError = document.getElementById('shelfError');
    const weightError = document.getElementById('weightError');
    const shelfLifeError = document.getElementById('shelfLifeError');
    
    function validate() {
        let isValid = true;
        nameError.textContent = '';
        shelfError.textContent = '';
        weightError.textContent = '';
        shelfLifeError.textContent = '';
        
        if (!nameInput.value.trim()) {
            nameError.textContent = 'Название обязательно';
            isValid = false;
        }
        if (!shelfInput.value.trim()) {
            shelfError.textContent = 'Полка обязательна';
            isValid = false;
        }
        const weight = parseFloat(weightInput.value);
        if (isNaN(weight) || weight <= 0) {
            weightError.textContent = 'Введите положительное число';
            isValid = false;
        }
        const shelfLife = parseInt(shelfLifeInput.value);
        if (isNaN(shelfLife) || shelfLife <= 0) {
            shelfLifeError.textContent = 'Введите положительное целое число';
            isValid = false;
        }
        return isValid;
    }
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!validate()) return;
        const newItem = {
            name: nameInput.value.trim(),
            shelf: shelfInput.value.trim(),
            weight: parseFloat(weightInput.value),
            shelfLife: parseInt(shelfLifeInput.value)
        };
        addItem(newItem);
        navigateTo('list');
    });
    
    document.getElementById('cancelBtn').addEventListener('click', () => {
        navigateTo('list');
    });
}