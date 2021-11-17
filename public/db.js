const indexedDB = 
window.indexedDB ||
window.mozIndexedDB ||
window.webkitIndexedDB ||
window.msIndexedDB ||
window.shimIndexedDB;

let db;
const request = indexedDB.open("budget", 1); 

request.onupgradeneeded = ({ target }) => {
    let db = target.result;
    db.createObjectStore('pending', { autoIncrement: true });
};

request.onsuccess = ({ target }) => {
    db = target.result;

    if (navigator.onLine) {
        checkDb();
    }
};

request.onerror = (e) =>{
    console.log('Error')
};

function saveRecord(record) {
    const transaction = db.transaction(["pending"], "readwrite");
    const store = transaction.objectStore("pending");

    store.add(record);
}