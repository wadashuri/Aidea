import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import UpdateTitleForm from './Partials/UpdateTitleForm';
import UpdateContentForm from './Partials/UpdateContentForm';

export default function Show({ memo }) {
    return (
        <AuthenticatedLayout header={ <UpdateTitleForm memo={memo}/> } >
            <Head title="Memo" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <UpdateContentForm memo={memo}/>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}