import React, { useMemo } from 'react';
import UseFetchAll from '../../Hooks/UseFetchAll';
import { Link } from '@inertiajs/react';

export default function IndexMemo() {
    const { data, loading, error } = UseFetchAll(route('memo.index'));

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <ul>
            {data.map((memo) => (
                <Link key={memo.id} href={route('memo.show', { memoId: memo.id })}>
                    <li className="px-4 py-2 text-white hover:text-white hover:bg-gray-700">
                        {memo.title || "新規メモ"}
                    </li>
                </Link>
            ))}
        </ul>
    );
}
