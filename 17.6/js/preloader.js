export function showPreloader() {
    let preloader = document.querySelector('.preloader');
    if (!preloader) {
        preloader = document.createElement('div');
        preloader.className = 'preloader';
        preloader.innerHTML = '<div class="spinner"></div>';
        document.body.appendChild(preloader);
    }
    preloader.style.display = 'flex';
}

export function hidePreloader() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.display = 'none';
    }
}