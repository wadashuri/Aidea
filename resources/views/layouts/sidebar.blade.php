<div id="sidebar" class="flex-shrink-0 w-64 bg-gray-800 overflow-y-auto transition-all duration-300">
    <div class="flex items-center gap-2 h-16 px-4 text-white">
        <a href="{{ route('dashboard') }}">
            <x-application-logo class="block h-9 w-auto fill-current text-xl" />
        </a>
        <span class="text-xl font-bold">
            {{ env('APP_NAME', 'laravel') }}
        </span>
    </div>
    <div class="h-full">
        <ul id="memoIndex" class="mt-6"></ul>
    </div>
</div>