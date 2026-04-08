export class Delivery {
  constructor(name, address, distance) {
    this._name = name;
    this._address = address;
    this._distance = distance;
    this._cardElement = null;
    this._nameSpan = null;
    this._addressSpan = null;
    this._distanceSpan = null;
  }

  get name() {
    return this._name;
  }
  set name(newName) {
    this._name = newName;
    if (this._nameSpan) this._nameSpan.textContent = newName;
  }

  get address() {
    return this._address;
  }
  set address(newAddress) {
    this._address = newAddress;
    if (this._addressSpan) this._addressSpan.textContent = newAddress;
  }

  get distance() {
    return this._distance;
  }
  set distance(newDistance) {
    this._distance = newDistance;
    if (this._distanceSpan) this._distanceSpan.textContent = newDistance + ' км';
  }

  render() {
    const card = document.createElement('div');
    card.className = 'delivery-card';

    const nameDiv = document.createElement('div');
    nameDiv.className = 'card-name';
    this._nameSpan = document.createElement('span');
    this._nameSpan.textContent = this._name;
    nameDiv.appendChild(document.createTextNode('Имя: '));
    nameDiv.appendChild(this._nameSpan);

    const addressDiv = document.createElement('div');
    addressDiv.className = 'card-address';
    this._addressSpan = document.createElement('span');
    this._addressSpan.textContent = this._address;
    addressDiv.appendChild(document.createTextNode('Адрес: '));
    addressDiv.appendChild(this._addressSpan);

    const distanceDiv = document.createElement('div');
    distanceDiv.className = 'card-distance';
    this._distanceSpan = document.createElement('span');
    this._distanceSpan.textContent = this._distance + ' км';
    distanceDiv.appendChild(document.createTextNode('Расстояние: '));
    distanceDiv.appendChild(this._distanceSpan);

    card.appendChild(nameDiv);
    card.appendChild(addressDiv);
    card.appendChild(distanceDiv);

    this._cardElement = card;
    return card;
  }
}