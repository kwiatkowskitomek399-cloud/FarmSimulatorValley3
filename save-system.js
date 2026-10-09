class SaveSystem {
    static save(data) {
        const request = indexedDB.open("FarmingSimDB", 1);
        request.onsuccess = (event) => {
            const db = event.target.result;
            const tx = db.transaction("savegame", "readwrite");
            tx.objectStore("savegame").put(data, "current");
        };
    }

    static load(callback) {
        const request = indexedDB.open("FarmingSimDB", 1);
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            db.createObjectStore("savegame");
        };
        request.onsuccess = (event) => {
            const db = event.target.result;
            const tx = db.transaction("savegame", "readonly");
            const req = tx.objectStore("savegame").get("current");
            req.onsuccess = () => callback(req.result);
        };
    }
}
