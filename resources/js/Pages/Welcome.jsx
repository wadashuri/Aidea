import { Head, Link } from '@inertiajs/react';

// TODO: リンクや画像のURLを実際のものに置き換える
export default function AideaLandingPage() {
    return (
        <div className="bg-gray-50 text-gray-800">
            {/* Head */}
            <Head>
                <title>Aidea | AIによる文章改善・翻訳を備えたメモアプリ</title>
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
                        <img
                            src="https://via.placeholder.com/40" // ロボットのロゴに置き換え
                            alt="Aidea ロゴ"
                            className="mr-2"
                        />
                        <span className="text-xl font-bold text-gray-900">Aidea</span>
                    </div>
                    <nav>
                        <a href="#features" className="mx-4 text-gray-600 hover:text-gray-900">
                            特徴
                        </a>
                        <a href="#pricing" className="mx-4 text-gray-600 hover:text-gray-900">
                            料金
                        </a>
                        <a href="#cta" className="mx-4 text-gray-600 hover:text-gray-900">
                            無料で始める
                        </a>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">AIで進化する日本製メモアプリ</h1>
                    <p className="text-lg mb-6">
                        AideaはAIによる文章改善や翻訳を簡単に行えるシームレスなメモシステムです。
                    </p>
                    <a
                        href="#cta"
                        className="bg-white text-indigo-600 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-gray-100"
                    >
                        Aideaを無料で入手
                    </a>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">特徴</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 bg-white shadow-md rounded-lg text-center">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/2979/2979160.png"
                                alt="AI文章改善アイコン"
                                className="mx-auto mb-4 w-20 h-20"
                            />
                            <h3 className="text-xl font-semibold mb-2">AI文章改善</h3>
                            <p>文章を自然な日本語に改善する機能を搭載。</p>
                        </div>
                        <div className="p-6 bg-white shadow-md rounded-lg text-center">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/888/888443.png"
                                alt="翻訳アイコン"
                                className="mx-auto mb-4 w-20 h-20"
                            />
                            <h3 className="text-xl font-semibold mb-2">翻訳機能</h3>
                            <p>複数の言語間での翻訳をスムーズに行えます。</p>
                        </div>
                        <div className="p-6 bg-white shadow-md rounded-lg text-center">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/2922/2922127.png"
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
                            <p className="mb-4">基本的なメモ機能を無料で利用可能</p>
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
                            <p className="mb-4">AI機能をフル活用可能</p>
                            <span className="block text-2xl font-bold mb-4">¥980/月</span>
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
                    <a
                        href="https://dummy.url"
                        className="bg-white text-indigo-600 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-gray-100"
                    >
                        Aideaを無料で入手
                    </a>
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