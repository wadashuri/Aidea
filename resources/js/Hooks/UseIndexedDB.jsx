import { useState, useEffect } from 'react';

const dbName = 'AideaDB';
const storeName = 'MemoStore';

// IndexedDB の初期化関数
const initializeDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(storeName)) {
                db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
            }
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
};

// データを保存する関数（タイトル・コンテンツ両方対応）
const saveToDB = async (id, title, content) => {
    const db = await initializeDB();
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);

    store.put({ id, title, content, updatedAt: new Date() });

    return new Promise((resolve, reject) => {
        transaction.oncomplete = () => resolve("Data saved to IndexedDB.");
        transaction.onerror = (event) => reject(event.target.error);
    });
};

// データを取得する関数
const fetchFromDB = async (id) => {
    const db = await initializeDB();
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);

    return new Promise((resolve, reject) => {
        const request = store.get(id);
        request.onsuccess = () => resolve(request.result);
        request.onerror = (event) => reject(event.target.error);
    });
};

// データを削除する関数
const deleteFromDB = async (id) => {
    const db = await initializeDB();
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);

    store.delete(id);

    return new Promise((resolve, reject) => {
        transaction.oncomplete = () => resolve(`Data with ID ${id} deleted from IndexedDB.`);
        transaction.onerror = (event) => reject(event.target.error);
    });
};

// カスタムフック
export const useIndexedDB = (defaultId = 1) => {
    const [IndexDBTitle, setTitle] = useState(null);
    const [IndexDBContent, setContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 初期化とデータ取得
    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchFromDB(defaultId);
                setTitle(data?.title || null);
                setContent(data?.content || null);
            } catch (err) {
                console.error("Failed to fetch from IndexedDB:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [defaultId]);

    // 保存関数
    const saveIndexDBData = async (newTitle, newContent) => {
        setLoading(true);
        setTitle(newTitle);
        setContent(newContent);
        try {
            await saveToDB(defaultId, newTitle, newContent);
        } catch (err) {
            console.error('Failed to save to IndexedDB:', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    // 削除関数
    const deleteIndexDBData = async (id) => {
        setLoading(true);
        try {
            await deleteFromDB(id);
            if (id === defaultId) {
                setTitle(null);
                setContent(null);
            }
        } catch (err) {
            console.error("Failed to delete from IndexedDB:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { IndexDBTitle, IndexDBContent, saveIndexDBData, deleteIndexDBData, fetchFromDB, loading, error };
};

