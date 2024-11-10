import React, { useEffect, useState } from 'react';
import FetchAll from "../../Services/Api/FetchAll";
import { Link } from '@inertiajs/react';

export default function IndexMemo() {
    const [data, setData] = useState([]);

    useEffect(() => {
        FetchAll(route('memo.index')).then(setData);
    }, []);

    return (
        <ul>
            {data.map((memo) => (
                <Link key={memo.id} href={route('memo.show', {memoId : memo.id})}>
                    <li className="px-4 py-2 text-white hover:text-white hover:bg-gray-700">
                        {memo.title || "新規メモ"}
                    </li>
                </Link>
            ))}
        </ul>
    );
}