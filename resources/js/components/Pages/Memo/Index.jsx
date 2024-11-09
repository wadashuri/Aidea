import React, { useEffect, useState } from 'react';
import FetchAll from "../../Services/Api/FetchAll";
import { route } from 'ziggy-js';

function Memos() {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const result = await FetchAll(route('memo.index'));
            setData(result.data || []);
        } catch (error) {
            console.error("Error loading data", error);
        }
    };

    useEffect(() => {
        fetchData();
    });

    return (
        <ul>
            {data.map((memo) => (
                <li key={memo.id} className="px-4 py-2 text-white hover:text-white hover:bg-gray-700">
                    {memo.title || "新規メモ"}
                </li>
            ))}
        </ul>
    );
}
export default Memos;
