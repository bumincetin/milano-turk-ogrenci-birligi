# Milano Türk Öğrenci Topluluğu - Kurulum Dokümantasyonu

Bu proje, **Strapi** (backend/CMS) ve **Next.js** (frontend) teknolojileri kullanılarak geliştirilmiştir. Bu dokümantasyon, projenin kurulumu ve yapılandırması hakkında detaylı bilgiler içermektedir.

## 📋 İçindekiler

- [Gereksinimler](#gereksinimler)
- [Proje Yapısı](#proje-yapısı)
- [Strapi Kurulumu](#strapi-kurulumu)
- [Frontend Kurulumu](#frontend-kurulumu)
- [Bağlantı Yapılandırması](#bağlantı-yapılandırması)
- [Çalıştırma](#çalıştırma)
- [Sorun Giderme](#sorun-giderme)

---

## 🔧 Gereksinimler

### Sistem Gereksinimleri

- **Node.js**: 18.x - 20.x
- **npm**: >= 6.0.0
- **PostgreSQL**: 12.x veya üzeri
- **Git**: Projeyi klonlamak için

### Yazılım Gereksinimleri

- PostgreSQL veritabanı sunucusu (yerel veya uzak)
- Terminal/Command Line erişimi

---

## 📁 Proje Yapısı

```
milano-turk-ogrenci-toplulugu/
├── strapi/          # Strapi backend/CMS
│   ├── config/      # Strapi konfigürasyon dosyaları
│   ├── src/         # API ve içerik tipleri
│   └── package.json
│
└── frontend/        # Next.js frontend uygulaması
    ├── src/         # Kaynak kodlar
    ├── public/      # Statik dosyalar
    └── package.json
```

---

## 🚀 Strapi Kurulumu

### 1. Strapi Klasörüne Geçiş

```bash
cd strapi
```

### 2. Bağımlılıkları Yükleme

```bash
npm install
```

### 3. Ortam Değişkenlerini Yapılandırma

Strapi klasöründe `.env` dosyası oluşturun veya mevcut `.env.example` dosyasını kopyalayın:

```bash
cp .env.example .env
```

`.env` dosyasında aşağıdaki değişkenleri yapılandırın:

```env
# Sunucu Ayarları
HOST=0.0.0.0
PORT=1337

# Uygulama Anahtarları (güvenli rastgele string'ler oluşturun)
APP_KEYS=your-app-key-1,your-app-key-2,your-app-key-3,your-app-key-4
ADMIN_JWT_SECRET=your-admin-jwt-secret
API_TOKEN_SALT=your-api-token-salt
TRANSFER_TOKEN_SALT=your-transfer-token-salt

# Veritabanı Ayarları
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=mtob-strapi
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your-database-password
DATABASE_SSL=false

# CORS Ayarları (Frontend URL'i için)
CORS_ORIGIN=http://localhost:9911
```

**Önemli Notlar:**
- `APP_KEYS`, `ADMIN_JWT_SECRET`, `API_TOKEN_SALT`, `TRANSFER_TOKEN_SALT` için güvenli rastgele string'ler oluşturun
- Veritabanı bilgilerinizi PostgreSQL yapılandırmanıza göre güncelleyin
- `CORS_ORIGIN` değerini frontend'inizin çalışacağı URL'e göre ayarlayın

### 4. Veritabanını Oluşturma

PostgreSQL'de veritabanını oluşturun:

```sql
CREATE DATABASE mtob-strapi;
```

### 5. Strapi'yi Başlatma

#### Geliştirme Modu (Development)

```bash
npm run develop
```

Bu komut:
- Strapi'yi `http://localhost:1337` adresinde başlatır
- Otomatik yeniden yükleme (hot reload) özelliğini etkinleştirir
- Admin paneli: `http://localhost:1337/admin`

#### Üretim Modu (Production)

```bash
npm run build
npm run start
```

### 6. İlk Admin Kullanıcısını Oluşturma

Strapi ilk kez başlatıldığında, tarayıcıda `http://localhost:1337/admin` adresine gidin ve admin kullanıcısı oluşturun.

### 7. API Token Oluşturma

Frontend'den API'ye erişim için bir API Token oluşturun:

1. Strapi Admin Panel'e giriş yapın
2. **Settings** > **API Tokens** bölümüne gidin
3. **Create new API Token** butonuna tıklayın
4. Token adı verin (örn: "Frontend API Token")
5. Token type: **Full access** veya gerekli izinleri seçin
6. Token'ı kopyalayın ve güvenli bir yerde saklayın (frontend `.env` dosyasında kullanılacak)

---

## 🎨 Frontend Kurulumu

### 1. Frontend Klasörüne Geçiş

```bash
cd frontend
```

### 2. Bağımlılıkları Yükleme

```bash
npm install
```

### 3. Ortam Değişkenlerini Yapılandırma

Frontend klasöründe `.env.local` dosyası oluşturun:

```bash
touch .env.local
```

`.env.local` dosyasına aşağıdaki değişkenleri ekleyin:

```env
# Strapi API URL'i
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337

# Strapi API Token (Strapi admin panelinden oluşturduğunuz token)
NEXT_PUBLIC_STRAPI_API_TOKEN=your-api-token-here

# NextAuth Secret (güvenli rastgele string)
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:9911
```

**Önemli Notlar:**
- `NEXT_PUBLIC_STRAPI_API_URL`: Strapi'nin çalıştığı URL (varsayılan: `http://localhost:1337`)
- `NEXT_PUBLIC_STRAPI_API_TOKEN`: Strapi admin panelinden oluşturduğunuz API token
- `NEXTAUTH_SECRET`: NextAuth için güvenli bir secret oluşturun
- `NEXTAUTH_URL`: Frontend uygulamanızın URL'i

### 4. Frontend'i Başlatma

#### Geliştirme Modu (Development)

```bash
npm run dev
```

veya projeye özel port ile:

```bash
npm run mtob-dev
```

Bu komut frontend'i `http://localhost:3000` (veya `http://localhost:9911` mtob-dev ile) adresinde başlatır.

#### Üretim Modu (Production)

```bash
npm run build
npm run start
```

veya projeye özel port ile:

```bash
npm run build
npm run mtob-start
```

---

## 🔗 Bağlantı Yapılandırması

### Frontend ve Strapi Bağlantısı

Frontend, Strapi API'sine şu şekilde bağlanır:

1. **API URL Yapılandırması**: `NEXT_PUBLIC_STRAPI_API_URL` environment variable'ı kullanılır
2. **API İstekleri**: Frontend'deki servisler (`src/services/`) Strapi API endpoint'lerine istek gönderir
3. **Kimlik Doğrulama**: NextAuth ve Strapi'nin kullanıcı izinleri (users-permissions) plugin'i kullanılır

### API Endpoint'leri

Frontend'de kullanılan ana API endpoint'leri:

- **Kimlik Doğrulama**: `/api/auth/local` (giriş), `/api/auth/local/register` (kayıt)
- **Kullanıcılar**: `/api/users/me`, `/api/users/:id`
- **Etkinlikler**: `/api/events`
- **Blog Yazıları**: `/api/blog-posts`
- **Haber Bülteni**: `/api/news-subscriptions`
- **Hakkımızda**: `/api/hakkimizda`

### CORS Yapılandırması

Strapi'nin frontend'den gelen isteklere izin vermesi için `strapi/config/middlewares.js` dosyasında CORS ayarlarını kontrol edin:

```javascript
module.exports = [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'http://localhost:1337'],
          'media-src': ["'self'", 'data:', 'blob:', 'http://localhost:1337'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: ['http://localhost:9911', 'http://localhost:3000'],
      credentials: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

---

## ▶️ Çalıştırma

### Geliştirme Ortamında Çalıştırma

1. **Terminal 1 - Strapi'yi başlatın:**
   ```bash
   cd strapi
   npm run develop
   ```

2. **Terminal 2 - Frontend'i başlatın:**
   ```bash
   cd frontend
   npm run mtob-dev
   ```

3. **Tarayıcıda açın:**
   - Frontend: `http://localhost:9911`
   - Strapi Admin: `http://localhost:1337/admin`

### Üretim Ortamında Çalıştırma

1. **Strapi'yi build edin ve başlatın:**
   ```bash
   cd strapi
   npm run build
   npm run start
   ```

2. **Frontend'i build edin ve başlatın:**
   ```bash
   cd frontend
   npm run build
   npm run mtob-start
   ```

---

## 🐛 Sorun Giderme

### Strapi Bağlantı Sorunları

**Problem**: Frontend Strapi'ye bağlanamıyor

**Çözümler:**
1. Strapi'nin çalıştığından emin olun (`http://localhost:1337`)
2. `.env.local` dosyasındaki `NEXT_PUBLIC_STRAPI_API_URL` değerini kontrol edin
3. CORS ayarlarını kontrol edin
4. Strapi loglarını kontrol edin

### Veritabanı Bağlantı Sorunları

**Problem**: Strapi veritabanına bağlanamıyor

**Çözümler:**
1. PostgreSQL servisinin çalıştığından emin olun
2. `.env` dosyasındaki veritabanı bilgilerini kontrol edin
3. Veritabanının oluşturulduğundan emin olun
4. Kullanıcı adı ve şifrenin doğru olduğunu kontrol edin

### Port Çakışması

**Problem**: Port zaten kullanılıyor

**Çözümler:**
1. Farklı bir port kullanın (`.env` dosyasında `PORT` değişkenini değiştirin)
2. Kullanan işlemi sonlandırın:
   ```bash
   # macOS/Linux
   lsof -ti:1337 | xargs kill -9
   lsof -ti:9911 | xargs kill -9
   ```

### Environment Variable Sorunları

**Problem**: Environment variable'lar yüklenmiyor

**Çözümler:**
1. `.env.local` dosyasının `frontend` klasöründe olduğundan emin olun
2. Next.js'te `NEXT_PUBLIC_` prefix'i olan değişkenlerin client-side'da kullanılabilir olduğunu unutmayın
3. Değişikliklerden sonra development server'ı yeniden başlatın

### Bağımlılık Sorunları

**Problem**: `npm install` hataları

**Çözümler:**
1. Node.js versiyonunuzun 18.x - 20.x aralığında olduğunu kontrol edin
2. `node_modules` ve `package-lock.json` dosyalarını silip yeniden yükleyin:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

---

## 📝 Ek Notlar

### Strapi İçerik Tipleri

Projede tanımlı içerik tipleri:
- **Blog Post**: Blog yazıları
- **Event**: Etkinlikler
- **Hakkımızda**: Hakkımızda sayfası içeriği
- **News Subscription**: Haber bülteni abonelikleri

### Frontend Özellikleri

- **Next.js 16.0.8**: React framework
- **TypeScript**: Tip güvenliği
- **Material-UI**: UI bileşenleri
- **NextAuth**: Kimlik doğrulama
- **Axios**: HTTP istekleri
- **Tailwind CSS**: Stil yönetimi

### Güvenlik Notları

- `.env` ve `.env.local` dosyalarını asla commit etmeyin
- Production ortamında güçlü secret'lar kullanın
- API token'ları düzenli olarak yenileyin
- CORS ayarlarını production'da sadece gerekli domain'lere izin verecek şekilde yapılandırın

---

## 📚 Ek Kaynaklar

- [Strapi Dokümantasyonu](https://docs.strapi.io)
- [Next.js Dokümantasyonu](https://nextjs.org/docs)
- [PostgreSQL Dokümantasyonu](https://www.postgresql.org/docs/)

---

## 🤝 Katkıda Bulunma

Projeye katkıda bulunmak için:
1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

---

**Son Güncelleme**: 2024
