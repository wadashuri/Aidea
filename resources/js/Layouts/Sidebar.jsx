import React, { useEffect, useState } from 'react';
import FetchAll from "../Services/Api/FetchAll";
import { Link } from '@inertiajs/react';


function Sidebar() {
    const [data, setData] = useState([]);

    useEffect(() => {
        FetchAll(route('memo.index')).then(setData);
    }, []);

    return (
        <div className="flex-shrink-0 w-64 bg-gray-800 overflow-y-auto transition-all duration-300 hidden sm:block">
            <div className="h-full mt-6">
                <ul>
                    {data.map((memo) => (
                        <Link href={route('memo.show', {memoId : memo.id})}>
                            <li key={memo.id} className="px-4 py-2 text-white hover:text-white hover:bg-gray-700">
                                {memo.title || "新規メモ"}
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    );
}
export default Sidebar;
