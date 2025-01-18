import ApplicationLogo from '@/Components/ApplicationLogo';
import { Head, Link } from '@inertiajs/react';

// TODO: リンクや画像のURLを実際のものに置き換える
export default function Welcome({ auth }) {
    return (
        <div className="bg-gray-50 text-gray-800">
            {/* Head */}
            <Head>
                <title>Aidea | AIによるアシストで業務を効率化するメモアプリ</title>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta
                    name="description"
                    content="AideaはAIによる文章改善や翻訳などが使用できる日本製のシームレスなメモアプリです。"
                />
                <meta name="keywords" content="AI メモアプリ,日本製,AI文章改善" />
                <meta name="author" content="Aidea" />
            </Head>
            
            {/* Header */}
            <header className="bg-white shadow-md">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <Link href="/">
                            <ApplicationLogo className="mr-2 h-8 w-8" />
                        </Link>
                        <span className="text-xl font-bold text-gray-900">Aidea</span>
                    </div>
                    <nav className="-mx-3 flex flex-1 justify-end">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="mx-4 text-gray-600 hover:text-gray-900"
                        >
                            ダッシュボード
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="mx-4 text-gray-600 hover:text-gray-900"
                            >
                                ログイン
                            </Link>
                            <Link
                                href={route('register')}
                                className="mx-4 text-gray-600 hover:text-gray-900"
                            >
                                登録
                            </Link>
                        </>
                    )}
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">AIで進化する日本製メモアプリ</h1>
                    <p className="text-lg mb-6">
                        AideaはAIによるアシストで業務を効率化するシームレスなメモアプリです。
                    </p>
                    <Link
                        href={route('register')}
                        className="bg-white text-indigo-600 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-gray-100"
                    >
                        Aideaを無料で入手
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">特徴</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 bg-white shadow-md rounded-lg text-center">
                            <img
                                src="https://img.icons8.com/?size=100&id=3kPm1K7YP10J&format=png&color=7A7FD4"
                                alt="ビルディングブロックアイコン"
                                className="mx-auto mb-4 w-20 h-20"
                            />
                            <h3 className="text-xl font-semibold mb-2">ビルディングブロック</h3>
                            <p>豊富なコンテンツタイプでアイデアを自由に表現。</p>
                        </div>
                        <div className="p-6 bg-white shadow-md rounded-lg text-center">
                            <img
                                src="https://img.icons8.com/?size=100&id=NFxVrelp1paK&format=png&color=000000"
                                alt="AIアシストアイコン"
                                className="mx-auto mb-4 w-20 h-20"
                            />
                            <h3 className="text-xl font-semibold mb-2">AIアシスト</h3>
                            <p>文章を自然な日本語に改善する機能を搭載。</p>
                        </div>
                        <div className="p-6 bg-white shadow-md rounded-lg text-center">
                            <img
                                src="https://img.icons8.com/?size=100&id=OCa9KFTfUYVV&format=png&color=000000"
                                alt="メモ管理アイコン"
                                className="mx-auto mb-4 w-20 h-20"
                            />
                            <h3 className="text-xl font-semibold mb-2">シームレスなメモ管理</h3>
                            <p>タスク管理やメモを直感的に整理。</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="bg-gray-100 py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-12">料金プラン</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 bg-white shadow-md rounded-lg">
                            <h3 className="text-xl font-semibold mb-4">無料プラン</h3>
                            <p className="mb-4">基本的なメモ機能に加え一部AIアシストを無料で利用可能。</p>
                            <span className="block text-2xl font-bold mb-4">¥0/月</span>
                            <a
                                href="#cta"
                                className="bg-indigo-600 text-white py-2 px-4 rounded-full hover:bg-indigo-500"
                            >
                                無料で始める
                            </a>
                        </div>
                        <div className="p-6 bg-white shadow-md rounded-lg">
                            <h3 className="text-xl font-semibold mb-4">プレミアムプラン</h3>
                            <p className="mb-4">AIアシストをフル活用可能。</p>
                            <span className="block text-2xl font-bold mb-4">¥500/月</span>
                            <a
                                href="#cta"
                                className="bg-indigo-600 text-white py-2 px-4 rounded-full hover:bg-indigo-500"
                            >
                                登録する
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section id="cta" className="bg-indigo-600 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">いますぐ始めよう！</h2>
                    <p className="text-lg mb-6">
                        Aideaで効率的なメモ管理を体験してください。
                    </p>
                    <Link
                        href={route('register')}
                        className="bg-white text-indigo-600 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-gray-100"
                    >
                        Aideaを無料で入手
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-gray-400 py-10">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; 2025 Aidea. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}