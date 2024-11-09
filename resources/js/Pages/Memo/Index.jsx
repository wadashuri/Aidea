import React, { useEffect, useState } from 'react';
import FetchAll from "../../Services/Api/FetchAll";

function Memos() {
    const [data, setData] = useState([]);

    useEffect(() => {
        FetchAll(route('memo.index')).then(setData);
    }, []);

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
