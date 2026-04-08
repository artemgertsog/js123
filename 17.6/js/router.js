import { showPreloader, hidePreloader } from './preloader.js';
import { renderListPage } from './listPage.js';
import { renderAddPage } from './addPage.js';

export function navigateTo(page, params = {}) {
    showPreloader();
    setTimeout(() => { // имитация загрузки
        const app = document.getElementById('app');
        if (page === 'list') {
            renderListPage(app);
        } else if (page === 'add') {
            renderAddPage(app);
        }
        hidePreloader();
    }, 300);
}