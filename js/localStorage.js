// save to localStorage
function saveToStorage(key, value) {
    localStorage.setItem(key, value);
}

// get from localStorage
function getFromStorage(key) {
    return localStorage.getItem(key);
}

function removeFromStorage(key) {
    localStorage.removeItem(key);
}