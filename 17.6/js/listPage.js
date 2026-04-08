import { getItems, deleteItem } from './storage.js';
import { navigateTo } from './router.js';

let currentSort = { column: null, ascending: true };

function sortItems(items, column, ascending) {
    return [...items].sort((a, b) => {
        let valA = a[column];
        let valB = b[column];
        if (column === 'weight' || column === 'shelfLife') {
            valA = Number(valA);
            valB = Number(valB);
        } else {
            valA = String(valA).toLowerCase();
            valB = String(valB).toLowerCase();
        }
        if (valA < valB) return ascending ? -1 : 1;
        if (valA > valB) return ascending ? 1 : -1;
        return 0;
    });
}

function renderTable(items, container) {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const columns = ['name', 'shelf', 'weight', 'shelfLife'];
    const titles = { name: 'Название', shelf: 'Полка', weight: 'Вес (кг)', shelfLife: 'Время хранения (дн)' };
    
    columns.forEach(col => {
        const th = document.createElement('th');
        th.textContent = titles[col];
        th.style.cursor = 'pointer';
        th.addEventListener('click', () => {
            if (currentSort.column === col) {
                currentSort.ascending = !currentSort.ascending;
            } else {
                currentSort.column = col;
                currentSort.ascending = true;
            }
            renderTable(sortItems(items, currentSort.column, currentSort.ascending), container);
        });
        headerRow.appendChild(th);
    });
    const thActions = document.createElement('th');
    thActions.textContent = 'Действия';
    headerRow.appendChild(thActions);
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    const tbody = document.createElement('tbody');
    items.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${escapeHtml(item.name)}</td>
            <td>${escapeHtml(item.shelf)}</td>
            <td>${item.weight}</td>
            <td>${item.shelfLife}</td>
            <td><button class="btn btn-danger delete-btn" data-id="${item.id}">Удалить</button></td>
        `;
        tbody.appendChild(row);
    });
    table.appendChild(tbody);
    
    // Обработчики удаления
    table.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = Number(btn.dataset.id);
            deleteItem(id);
            renderPage(container);
        });
    });
    
    container.innerHTML = '';
    container.appendChild(table);
}

function escapeHtml(str) {
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

function renderPage(container) {
    const items = getItems();
    const sorted = sortItems(items, currentSort.column, currentSort.ascending);
    renderTable(sorted, container);
}

export function renderListPage(app) {
    app.innerHTML = '';
    const pageDiv = document.createElement('div');
    pageDiv.className = 'page';
    pageDiv.innerHTML = `
        <h1>Склад</h1>
        <div class="actions">
            <button id="addBtn" class="btn">+ Добавить запись</button>
        </div>
        <div id="tableContainer"></div>
    `;
    app.appendChild(pageDiv);
    
    const tableContainer = pageDiv.querySelector('#tableContainer');
    renderPage(tableContainer);
    
    document.getElementById('addBtn').addEventListener('click', () => {
        navigateTo('add');
    });
}