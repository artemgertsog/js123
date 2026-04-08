const STORAGE_KEY = 'warehouse_items';

export function getItems() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

export function saveItems(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function addItem(item) {
    const items = getItems();
    const newItem = { ...item, id: Date.now() };
    items.push(newItem);
    saveItems(items);
    return newItem;
}

export function deleteItem(id) {
    const items = getItems();
    const filtered = items.filter(item => item.id !== id);
    saveItems(filtered);
}

export function updateItem(updatedItem) {
    const items = getItems();
    const index = items.findIndex(item => item.id === updatedItem.id);
    if (index !== -1) {
        items[index] = updatedItem;
        saveItems(items);
    }
}