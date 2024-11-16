import { useForm } from "@inertiajs/react";

export default function UpdateTitleForm({ memo }) {

    const { data, setData, patch } = useForm({
        title: memo.data.title || '新規メモ',
        content: memo.data.content || 'メモがありません',
    });

    const handleTitleBlur = () => {
        patch(route('memo.update', { memoId: memo.data.id }), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
            <input
                type="text"
                className="text-xl border-none focus:ring-0 font-semibold leading-tight text-gray-800 w-full p-2 border border-gray-300 rounded"
                value={data.title}
                onChange={(e) => setData("title", e.target.value)}
                onBlur={handleTitleBlur}
            />
        </h2>
    );
}