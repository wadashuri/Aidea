<!DOCTYPE html>
<html class="h-full" lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    </head>
    <body class="h-full font-sans antialiased">
        <div class="flex h-full bg-gray-100">
            <!-- サイドバー -->
            @include('layouts.sidebar')
            <div class="flex-1 flex flex-col overflow-y-auto transition-all duration-300">
                <!-- ナビゲーション -->
                @include('layouts.navigation')
    
                <!-- ヘッダー -->
                {{-- @isset($header)
                    <header class="bg-white shadow">
                        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            {{ $header }}
                        </div>
                    </header>
                @endisset --}}
    
                <!-- コンテンツ -->
                <main>
                    {{ $slot }}
                </main>
            </div>
        </div>
    </body>
</html>
