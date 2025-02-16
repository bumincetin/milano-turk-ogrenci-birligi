'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'sonner'
import ReactMarkdown from 'react-markdown';

interface FormData {
    name: string
    email: string
    password: string
    passwordConfirm: string
    rememberMe: boolean
    telephone: string
    universityName: string
    department: string
    year: string
    privacyPolicy: boolean
}

interface Testimonial {
    quote: string
    author: string
    title: string
}

export default function RegisterSectionSignUpWhitePattern1() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
        rememberMe: false,
        telephone: '',
        universityName: '',
        department: '',
        year: '',
        privacyPolicy: false
    })

    const testimonial: Testimonial = {
        quote: "Milano'da Türk öğrencilerle bir araya gelerek sosyal, kültürel ve akademik açıdan kendimi geliştirdim. MTÖB sayesinde harika dostluklar kurdum!",
        author: "Ali Omay",
        title: "MTÖB Üyesi",
    }

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { login, login_with_token } = useAuth()
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);
    const privacyPolicyText = `Al tal scopo dichiara:
a) di condividere le finalità dello Statuto e di voler contribuire, secondo le proprie capacità e disponibilità di
tempo e mezzi, alla loro realizzazione;
b) che verserà la quota associativa annuale, secondo le modalità stabilite dal Consiglio Direttivo;
c) si impegna a non utilizzare il nome dell'Associazione "UNIONE DEGLI STUDENTI TURCHI DI MILANO"
e il materiale da essa prodotto ai fini associativi, per attività di carattere commerciale, imprenditoriale o, in
ogni caso, aventi scopo di lucro;
d) prende atto che l'adesione come Socio Effettivo è subordinata all'accettazione da parte del Consiglio
Direttivo, come previsto dall'art. 6 dello Statuto;
e) in qualità di Socio acquisirà i diritti e doveri previsti dagli artt. 15 e 16 dello Statuto.
Inoltre:
Informativa ai sensi degli artt. 12 e 13 del Regolamento generale sulla protezione dei dati personali UE
2016/679
Ai sensi degli artt. 12 e 13 del Regolamento generale sulla protezione dei dati personali UE 2016/679, in relazione
ai dati personali di cui l'Associazione "UNIONE DEGLI STUDENTI TURCHI DI MILANO" entrerà in possesso
nell'ambito delle finalità associative, La informiamo di quanto segue:
1. Titolare del trattamento.
Titolare del trattamento è il Presidente dell'Associazione Mustafa Sandirli, nato il 11/01/2001, CF
SNDMTF01A11Z243E, residente a Via Claudio Treves 41 in Trezzano Sul Naviglio, indirizzo e-mail
mustafa.sandirli@gmail.com
2. Finalità del trattamento dei dati.
Il trattamento è finalizzato unicamente alla corretta gestione delle attività associative, tra cui la gestione dei
rapporti con i soci, l'organizzazione di eventi, l'invio di comunicazioni istituzionali e l'adempimento delle finalità
statutarie.
3. Modalità del trattamento dei dati.
a) Il trattamento può essere svolto con o senza l'ausilio di strumenti elettronici o comunque automatizzati, inclusi
software o piattaforme digitali per la gestione delle attività associative;
b) Il trattamento è svolto dal titolare, dai responsabili e/o da membri dell'associazione espressamente autorizzati.
4. Conferimento dei dati.
Il conferimento di dati personali comuni è strettamente necessario ai fini dello svolgimento delle attività
associative di cui al punto 2.
5. Rifiuto di conferimento dei dati.
L'eventuale rifiuto da parte dell'interessato di conferire i dati personali comuni richiesti comporta l'impossibilità
di adempiere alle attività associative e agli obblighi di cui al punto 2.
6. Comunicazione dei dati.
I dati personali possono venire a conoscenza dei membri autorizzati dell'associazione e possono essere
comunicati, esclusivamente per le finalità associative di cui al punto 2, a:
- Collaboratori esterni coinvolti nell'organizzazione di attività associative;
- Fornitori di servizi, quali piattaforme digitali o servizi di comunicazione;
- Enti pubblici o privati, ove la comunicazione sia obbligatoria per legge o necessaria per il corretto
svolgimento delle finalità associative.
Il trattamento dei dati avverrà nel rispetto delle normative vigenti in materia di protezione dei dati personali e
delle disposizioni di legge applicabili alle associazioni.
7. Diffusione dei dati.
I dati personali non sono soggetti a diffusione, ovvero non saranno resi disponibili a soggetti indeterminati, né
attraverso la loro messa a disposizione o consultazione pubblica, salvo esplicito consenso dell'interessato o in
caso di obblighi previsti dalla legge.
8. Trasferimento dei dati all'estero.
I dati personali possono essere trasferiti verso Paesi dell'Unione Europea e verso Paesi terzi esclusivamente per
le finalità di cui al punto 2, nel rispetto delle normative vigenti in materia di protezione dei dati personali. Per i
trasferimenti verso Paesi terzi, tali trasferimenti saranno effettuati solo verso Paesi che garantiscano un livello di
protezione adeguato ai sensi dell'art. 45 del Regolamento UE 2016/679, oppure previo accordo su clausole
contrattuali standard o altre garanzie adeguate ai sensi degli artt. 46 e 47 del Regolamento.
9. Diritti dell'interessato.
A norma degli artt. 15 (Diritto di accesso), 16 (Diritto di rettifica), 17 (Diritto alla cancellazione), 18 (Diritto di
limitazione di trattamento), 20 (Diritto alla portabilità dei dati) e 21 (Diritto di opposizione) del Regolamento UE
2016/679, l'interessato può, in ogni momento, richiedere:
- l'accesso ai dati personali;
- la rettifica o la cancellazione degli stessi;
- la limitazione del trattamento che lo riguarda;
- di opporsi al loro trattamento;
- il diritto alla portabilità dei dati.
Tali richieste possono essere inoltrate mediante comunicazione scritta al Titolare del Trattamento.
L'interessato ha altresì il diritto di proporre reclamo all'Autorità Garante per la Protezione dei Dati Personali dello
stato in cui risiede o lavora, qualora ritenga che il trattamento dei dati personali violi le disposizioni del
Regolamento UE 2016/679.
10. Consenso al trattamento dei dati
Ai sensi dell'art. 6, par. 1, lett. a) del Regolamento generale sulla protezione dei dati personali UE n. 2016/679,
con la sottoscrizione del presente documento, l'interessato manifesta il proprio consenso al trattamento dei dati
personali per le finalità e con le modalità indicate nella presente informativa, nei limiti in cui il consenso sia
richiesto dalla Legge.
In particolare, presto il mio consenso per:
- l'acquisizione e il trattamento dei miei dati personali;
- la comunicazione dei miei dati personali a terzi, ove previsto dalla presente informativa.
Tale consenso rimarrà valido fino a eventuale revoca scritta, da inviare tramite raccomandata con ricevuta di
ritorno o mediante e-mail al Titolare del Trattamento, come indicato nella presente informativa.`

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!formData.privacyPolicy) {
            setError('Gizlilik sözleşmesini kabul etmelisiniz');
            toast.error('Gizlilik sözleşmesini kabul etmelisiniz');
            return;
        }

        if (formData.password !== formData.passwordConfirm) {
            setError('Şifreler eşleşmiyor');
            toast.error('Şifreler eşleşmiyor');
            return;
        }

        setIsLoading(true);

        try {
            const randomNum = Math.floor(Math.random() * 10000);
            const uniqueUsername = `${formData.name.toLowerCase().replace(/\s+/g, '-')}-${randomNum}`;
            const nameParts = formData.name.trim().split(' ');
            const lastname = nameParts.pop() || '';
            const firstname = nameParts.join(' ');

            const register_Data = {
                username: uniqueUsername,
                email: formData.email,
                password: formData.password,
                name: firstname,
                lastname: lastname,
                telephone: formData.telephone,
                universityName: formData.universityName,
                universityDepartment: formData.department,
                universityClass: formData.year
            };
            console.log(register_Data);
            const registerResponse = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/local/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(register_Data)
            })
            .then(response => response.json())
            .then(async (data) => {
                console.log('Kayıt yanıtı:', data);

                const loginResponse = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/local`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        identifier: formData.email,
                        password: formData.password,
                    }),
                });
    
                const loginData = await loginResponse.json();
                console.log('Giriş yanıtı:', loginData);
    
                if (!loginResponse.ok) {
                    throw new Error(loginData.error?.message || 'Giriş sırasında bir hata oluştu');
                }
    
                await login_with_token(loginData.jwt);
                console.log('JWT token kaydedildi:', loginData.jwt);

                window.location.href = '/dashboard/profile';
            })
            .catch(error => {
                console.error('Kayıt hatası:', error);
            });

            // const registerData = await registerResponse.json();
            // console.log('Kayıt yanıtı:', registerData);

            // if (!registerResponse.ok) {
            //     throw new Error(registerData.error?.message || 'Kayıt sırasında bir hata oluştu');
            // }
        } catch (error) {
            console.error('Kayıt veya giriş hatası:', error);
            setError(error instanceof Error ? error.message : 'Beklenmeyen bir hata oluştu');
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setFormData({ ...formData, password: newPassword });
        
        if (formData.passwordConfirm && newPassword !== formData.passwordConfirm) {
            setPasswordError('Şifreler eşleşmiyor');
        } else {
            setPasswordError(null);
        }
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const confirmPassword = e.target.value;
        setFormData({ ...formData, passwordConfirm: confirmPassword });
        
        if (formData.password && confirmPassword && formData.password !== confirmPassword) {
            setPasswordError('Şifreler eşleşmiyor');
        } else {
            setPasswordError(null);
        }
    };

    const handleOpenPrivacyModal = () => {
        setShowPrivacyModal(true);
    };

    return (
        <section 
            className="relative pt-16 md:py-32 bg-white" 
            style={{
                backgroundImage: 'url("/flex-ui-assets/elements/pattern-white.svg")', 
                backgroundPosition: 'center'
            }}
        >
            {/* Sol Taraf - Kayıt Formu */}
            <div className="container px-2 mx-auto mb-16 md:mb-0">
                <div className="w-full md:w-7/12 md:pr-4">
                    <div className="max-w-xl mx-auto">
                        {/* Logo ve Başlık */}
                        <div className="mb-6 text-center">
                            <Link href="/" className="inline-block mb-6">
                                <Image 
                                    className="h-16"
                                    src="/flex-ui-assets/logos/Milano-Turk-Ogrenci-Birligi-Logo.png"
                                    alt="MTÖB Logo"
                                    width={64}
                                    height={64}
                                />
                            </Link>
                            <h3 className="mb-4 text-2xl md:text-3xl font-bold">
                                MTÖB Topluluğuna Katılın
                            </h3>
                            <p className="text-lg text-gray-500 font-medium">
                                Milano'daki Türk öğrencilere katılarak bir arada güçlenin
                            </p>
                        </div>

                        {/* Kayıt Formu */}
                        <form onSubmit={handleSubmit}>
                            {/* Hata Mesajı */}
                            {error && (
                                <div className="mb-6 p-4 text-red-700 bg-red-100 rounded-lg">
                                    {error}
                                </div>
                            )}

                            {/* İki sütunlu grid yapısı */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Sol Sütun */}
                                <div>
                                    {/* İsim */}
                                    <div className="mb-6">
                                        <label className="block mb-2 text-black-800 font-medium" htmlFor="name">
                                            İsim - Soyisim*
                                        </label>
                                        <input 
                                            id="name"
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            className="appearance-none block w-full p-3 leading-5 text-black-900 border border-black-200 rounded-lg shadow-md placeholder-black-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                            placeholder="İsim Soyisim"
                                            required
                                        />
                                    </div>

                                    {/* Şifre */}
                                    <div className="mb-6">
                                        <label className="block mb-2 text-black-800 font-medium" htmlFor="password">
                                            Şifre*
                                        </label>
                                        <input 
                                            id="password"
                                            type="password"
                                            value={formData.password}
                                            onChange={handlePasswordChange}
                                            className={`appearance-none block w-full p-3 leading-5 text-black-900 border ${
                                                passwordError ? 'border-red-500' : 'border-black-200'
                                            } rounded-lg shadow-md placeholder-black-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50`}
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>

                                    {/* Üniversite ve Sınıf alanlarını sağ sütuna taşıyalım */}
                                    <div className="mb-6">
                                        <label className="block mb-2 text-black-800 font-medium" htmlFor="university">
                                            Üniversite*
                                        </label>
                                        <input 
                                            id="university"
                                            type="text"
                                            value={formData.universityName}
                                            onChange={(e) => setFormData({...formData, universityName: e.target.value})}
                                            className="appearance-none block w-full p-3 leading-5 text-black-900 border border-black-200 rounded-lg shadow-md placeholder-black-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                            placeholder="Universite Adı"
                                        />
                                    </div>

                                    {/* Sınıf */}
                                    <div className="mb-6">
                                        <label className="block mb-2 text-black-800 font-medium" htmlFor="year">
                                            Sınıf*
                                        </label>
                                        <select 
                                            id="year"
                                            value={formData.year}
                                            onChange={(e) => setFormData({...formData, year: e.target.value})}
                                            className="appearance-none block w-full p-3 leading-5 text-black-900 border border-black-200 rounded-lg shadow-md placeholder-black-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                        >
                                            <option value="hazırlık">Hazırlık</option>
                                            <option value="1.sınıf">1. Sınıf</option>
                                            <option value="2.sınıf">2. Sınıf</option>
                                            <option value="3.sınıf">3. Sınıf</option>
                                            <option value="4.sınıf">4. Sınıf</option>
                                            <option value="Yüksek Lisans">Yüksek Lisans</option>
                                            <option value="Doktora">Doktora</option>
                                            <option value="Mezun">Mezun</option>
                                            <option value="Diğer">Diğer</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Sağ Sütun */}
                                <div>
                                    

                                    {/* E-posta */}
                                    <div className="mb-6">
                                        <label className="block mb-2 text-black-800 font-medium" htmlFor="email">
                                            E-posta*
                                        </label>
                                        <input 
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            className="appearance-none block w-full p-3 leading-5 text-black-900 border border-black-200 rounded-lg shadow-md placeholder-black-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                            placeholder="ornek@gmail.com"
                                            required
                                        />
                                    </div>

                                    {/* Şifre Tekrar */}
                                    <div className="mb-6">
                                        <label className="block mb-2 text-black-800 font-medium" htmlFor="passwordConfirm">
                                            Şifre Tekrar*
                                        </label>
                                        <input 
                                            id="passwordConfirm"
                                            type="password"
                                            value={formData.passwordConfirm}
                                            onChange={handleConfirmPasswordChange}
                                            className={`appearance-none block w-full p-3 leading-5 text-black-900 border ${
                                                passwordError ? 'border-red-500' : 'border-black-200'
                                            } rounded-lg shadow-md placeholder-black-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50`}
                                            placeholder="••••••••"
                                            required
                                        />
                                        {passwordError && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {passwordError}
                                            </p>
                                        )}
                                    </div>
                                    
                                     {/* Telefon */}
                                     <div className="mb-6">
                                        <label className="block mb-2 text-black-800 font-medium" htmlFor="phone">
                                            Telefon
                                        </label>
                                        <input 
                                            id="phone"
                                            type="tel"
                                            value={formData.telephone}
                                            onChange={(e) => setFormData({...formData, telephone: e.target.value})}
                                            className="appearance-none block w-full p-3 leading-5 text-black-900 border border-black-200 rounded-lg shadow-md placeholder-black-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                            placeholder="0535 123 23 34"
                                        />
                                    </div>

                                    {/* Bölüm */}
                                    <div className="mb-6">
                                        <label className="block mb-2 text-black-800 font-medium" htmlFor="department">
                                            Bölüm*
                                        </label>
                                        <input 
                                            id="department"
                                            type="text"
                                            value={formData.department}
                                            onChange={(e) => setFormData({...formData, department: e.target.value})}
                                            className="appearance-none block w-full p-3 leading-5 text-black-900 border border-black-200 rounded-lg shadow-md placeholder-black-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                            placeholder="Bölüm Adı"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Gizlilik Sözleşmesi Checkbox ve Modal */}
                            <div className="mb-6">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input 
                                        type="checkbox"
                                        checked={formData.privacyPolicy}
                                        onChange={(e) => setFormData({...formData, privacyPolicy: e.target.checked})}
                                        className="form-checkbox w-4 h-4 text-primary-500 border border-gray-300 rounded focus:ring-primary-500"
                                        required
                                    />
                                    <span className="ml-2 text-sm text-gray-600">
                                        <button
                                            type="button"
                                            onClick={handleOpenPrivacyModal}
                                            className="text-primary-500 hover:text-primary-600 hover:underline focus:outline-none"
                                        >
                                            Gizlilik Sözleşmesini
                                        </button>
                                        {' '}okudum ve kabul ediyorum
                                    </span>
                                </label>
                            </div>

                            {/* Kayıt Ol Butonu - Grid dışında */}
                            <button 
                                type="submit"
                                disabled={isLoading}
                                className="inline-block py-3 px-7 mb-4 w-full text-base text-primary-50 font-medium text-center leading-6 bg-primary-500 hover:bg-primary-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm disabled:opacity-50"
                            >
                                {isLoading ? 'Kaydediliyor...' : 'Kayıt Ol'}
                            </button>

                            {/* Google ile Giriş */}
                            {/* <button 
                                type="button"
                                className="inline-flex items-center justify-center py-3 px-7 mb-6 w-full text-base text-gray-500 font-medium text-center leading-6 bg-white border border-black-100 hover:border-black-200 rounded-md shadow-sm"
                            >
                                <Image 
                                    className="mr-2"
                                    src="/flex-ui-assets/elements/sign-up/google-icon-sign-up.svg"
                                    alt="Google"
                                    width={20}
                                    height={20}
                                />
                                <span>Google ile Kayıt Ol</span>
                            </button> */}

                            {/* Giriş Yap Linki */}
                            <p className="text-center">
                                <span className="text-xs font-medium">
                                    Zaten üye misiniz?
                                </span>
                                <Link 
                                    href="/giris"
                                    className="inline-block ml-1 text-xs font-medium text-primary-500 hover:text-primary-600 hover:underline"
                                >
                                    Giriş yapın
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>

            {/* Sağ Taraf - Referans */}
            <div className="md:absolute md:top-0 md:right-0 md:w-1/2 md:h-full md:pl-4">
                <div className="flex items-center justify-center h-full px-0 py-14 bg-black-50">
                    <div className="md:max-w-xl mx-auto text-center">
                        <span className="relative z-10 inline-block py-px px-2 mb-4 text-xs leading-5 text-primary-500 bg-primary-100 font-medium uppercase rounded-full shadow-sm">
                            Referanslar
                        </span>
                        <div className="relative mb-16">
                            <Image 
                                className="absolute -top-10 left-0 2xl:-left-12"
                                src="/flex-ui-assets/elements/sign-up/quotes-top.svg"
                                alt="Üst tırnak"
                                width={40}
                                height={40}
                            />
                            <Image 
                                className="absolute -bottom-16 right-0"
                                src="/flex-ui-assets/elements/sign-up/quotes-bottom.svg"
                                alt="Alt tırnak"
                                width={40}
                                height={40}
                            />
                            <h3 className="relative text-2xl md:text-3xl leading-tight font-medium text-black-800">
                                {testimonial.quote}
                            </h3>
                        </div>
                        <div className="relative text-center">
                            <h4 className="mb-2 text-lg text-black-800 font-semibold">
                                {testimonial.author}
                            </h4>
                            <span className="block mb-8 text-lg text-gray-500">
                                {testimonial.title}
                            </span>
                            <div className="flex items-center justify-center">
                                <Link href="#" className="w-3 h-3 mr-3 bg-black-100 rounded-full" />
                                <Link href="#" className="w-3 h-3 mr-3 bg-primary-500 rounded-full" />
                                <Link href="#" className="w-3 h-3 bg-black-100 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gizlilik Sözleşmesi Modal */}
            {showPrivacyModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div 
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                            onClick={() => setShowPrivacyModal(false)}
                        ></div>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4" id="modal-title">
                                            Gizlilik Sözleşmesi
                                        </h3>
                                        <div className="mt-2 max-h-96 overflow-y-auto">
                                            <div className="text-sm text-gray-500 prose max-w-none px-4">
                                                <ReactMarkdown>
                                                    {privacyPolicyText}
                                                </ReactMarkdown>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-500 text-base font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => setShowPrivacyModal(false)}
                                >
                                    Kapat
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
