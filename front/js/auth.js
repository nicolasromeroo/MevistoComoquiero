function isAuthenticated() {
    return localStorage.getItem('isAuthenticated') === 'true';
}

function isAdmin() {
    return localStorage.getItem('userRole') === 'admin';
}

function getUsername() {
    return localStorage.getItem('username') || 'Usuario';
}
function logout() {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    window.location.href = 'index.html';
}

function updateUI() {
    const authNav = document.getElementById('authNav');
    const userNav = document.getElementById('userNav');
    const adminPanelItem = document.getElementById('adminPanelItem');
    const usernameSpan = document.getElementById('usernameSpan');

    if (isAuthenticated()) {
        if (authNav) authNav.classList.add('d-none');
        if (userNav) userNav.classList.remove('d-none');
        if (usernameSpan) usernameSpan.textContent = getUsername();
        if (isAdmin() && adminPanelItem) {
            adminPanelItem.classList.remove('d-none');
        }
    } else {
        if (authNav) authNav.classList.remove('d-none');
        if (userNav) userNav.classList.add('d-none');
        if (adminPanelItem) adminPanelItem.classList.add('d-none');
    }
}
document.addEventListener('DOMContentLoaded', updateUI);
