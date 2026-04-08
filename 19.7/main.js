import { Delivery } from './Delivery.js';

const deliveryArr = [
  new Delivery("Ольга", "ул. Вымыслов, д. 12", 8),
  new Delivery("Дмитрий", "ул. Задачная, д. 7", 3),
  new Delivery("Оля", "ул. Ткачей, д. 43", 11)
];

const app = document.getElementById('app');
const container = document.createElement('div');
container.className = 'delivery-list';
app.appendChild(container);

deliveryArr.forEach(delivery => {
  const card = delivery.render();
  container.appendChild(card);

  // Кнопка для демонстрации работы сеттера (изменение расстояния)
  const btn = document.createElement('button');
  btn.textContent = '+1 км';
  btn.style.marginTop = '10px';
  btn.addEventListener('click', () => {
    delivery.distance = delivery.distance + 1;
  });
  card.appendChild(btn);
});