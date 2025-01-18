import React, { useMemo } from 'react';
import UseFetchAll from '../../Hooks/UseFetchAll';
import { Link } from '@inertiajs/react';
import { useIndexedDB } from "@/Hooks/UseIndexedDB";

export default function IndexMemo() {
    const { data, loading, error } = UseFetchAll(route('memo.index'));

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <ul>
            {data.map((memo) => (
                <MemoListItem key={memo.id} memo={memo} />
            ))}
        </ul>
    );
}

function MemoListItem({ memo }) {
    const { IndexDBTitle } = useIndexedDB(memo.id);
    console.log(IndexDBTitle);

    return (
        <Link href={route("memo.show", { memoId: memo.id })}>
            <li className="px-4 py-2 text-white hover:text-white hover:bg-gray-700">
                {IndexDBTitle ? IndexDBTitle : memo.title || "新規メモ"}
            </li>
        </Link>
    );
}
