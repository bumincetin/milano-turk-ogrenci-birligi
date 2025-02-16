import Link from 'next/link'

export default function WhyMembershipSection() {
    return (
        <main className="max-w-6xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Türk Öğrenci Birliği Üyelik Avantajları
                </h1>
                <p className="text-xl text-gray-600">
                    İtalya'daki öğrenci hayatınızı daha avantajlı ve keyifli hale getirecek fırsatlar
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* İndirimler Kartı */}
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="text-3xl mb-4">🔹</div>
                    <h3 className="text-xl font-semibold mb-3">Anlaşmalı Mekanlarda Özel İndirimler</h3>
                    <ul className="text-gray-600 space-y-2">
                        <li>• Hanedan Italia'da bireysel ziyaretlerde %10 indirim</li>
                        <li>• 10 kişi ve üzeri gruplar için %20 indirim fırsatı</li>
                    </ul>
                </div>

                {/* THY İndirimi Kartı */}
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="text-3xl mb-4">✈️</div>
                    <h3 className="text-xl font-semibold mb-3">Türk Hava Yolları İndirimi</h3>
                    <p className="text-gray-600">
                        Türk Hava Yolları ile yapılan anlaşma kapsamında özel indirim kodu ile %15 indirimden faydalanabilirsiniz.
                    </p>
                </div>

                {/* İtalyanca Kursu Kartı */}
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="text-3xl mb-4">📚</div>
                    <h3 className="text-xl font-semibold mb-3">Üyelere Özel İtalyanca Kursu</h3>
                    <p className="text-gray-600">
                        İtalya'da yaşamınızı kolaylaştıracak İtalyanca kurslarına üyelerimize özel avantajlarla katılabilirsiniz.
                    </p>
                </div>

                {/* Networking Kartı */}
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="text-3xl mb-4">🤝</div>
                    <h3 className="text-xl font-semibold mb-3">Networking Etkinlikleri</h3>
                    <p className="text-gray-600">
                        Farklı sektörlerden profesyonellerle tanışabileceğiniz ve geleceğiniz için önemli bağlantılar kurabileceğiniz networking etkinliklerine öncelikli erişim sağlarsınız.
                    </p>
                </div>

                {/* Mentorluk Kartı */}
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="text-3xl mb-4">🎓</div>
                    <h3 className="text-xl font-semibold mb-3">Mentorluk Programı</h3>
                    <p className="text-gray-600">
                        İtalya'daki akademik ve profesyonel hayatınızda size rehberlik edecek mentorlarla eşleşerek kariyerinizi daha sağlam temellere oturtabilirsiniz.
                    </p>
                </div>

                {/* Üyelik Kartı */}
                <div className="bg-blue-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="text-3xl mb-4">💳</div>
                    <h3 className="text-xl font-semibold mb-3">Nasıl Üye Olabilirsiniz?</h3>
                    <p className="text-gray-600 mb-4">
                        Üyelik için 10€ katkı payı ile başvuru formunu doldurmanız yeterlidir. Kayıt olmak herkes için açıkken, üyelik sayesinde bu özel avantajlardan faydalanabilirsiniz.
                    </p>
                    <Link href="/dashboard/membership" className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        Hemen Üye Ol
                    </Link>
                </div>
            </div>
        </main>
    )
} 