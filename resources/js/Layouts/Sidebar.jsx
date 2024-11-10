import React, { useEffect, useState } from 'react';
import IndexMemo from '@/Components/Memo/Index';

export default function Sidebar() {
    return (
        <div className="flex-shrink-0 w-64 bg-gray-800 overflow-y-auto transition-all duration-300 hidden sm:block">
            <div className="h-full mt-6">
                <IndexMemo />
            </div>
        </div>
    );
}
