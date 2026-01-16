// Массив для хранения товаров 
let products = ["Арбуз", "Книга", "Кофе", "Макароны", "Молоко", "Сахар", "Яблоки"];


products.sort();


const productsList = document.getElementById('productsList');

// Функция для отображения списка товаров
function displayProducts() {

    productsList.innerHTML = '';
    

    products.sort();
    

    for (let i = 0; i < products.length; i++) {

        const listItem = document.createElement('li');
        

        listItem.textContent = `${i + 1}) ${products[i]}`;

        if (i === products.length - 1 && window.lastAdded) {
            listItem.classList.add('new-item');
            window.lastAdded = false; 
        }
        

        productsList.appendChild(listItem);
    }
}

// Функция для добавления нового товара
function addProduct() {

    const input = prompt('Введите название товара:');
    

    if (input === null || input.trim() === '') {
        alert('Название товара не введено!');
        return;
    }
    

    const productName = input.trim();
    
    products.push(productName);
    
    window.lastAdded = true;
    
    displayProducts();
    

    const lastItem = document.querySelector('li:last-child');
    if (lastItem) {
        lastItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    

    console.log('Добавлен товар:', productName);
    console.log('Отсортированный массив:', products);
}


window.onload = function() {
    displayProducts();
    console.log('Начальный массив товаров:', products);
};