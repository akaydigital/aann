# Digital Store Midtrans

Fitur:
- Toko online produk digital
- Registrasi dan login user
- Dashboard admin `/admin`
- CRUD produk: nama, harga, deskripsi, foto, link file digital
- Checkout Midtrans Snap
- Webhook notifikasi Midtrans
- Database SQLite via Prisma

## Cara install lokal

```bash
npm install
cp .env.example .env
npx prisma db push
npm run seed
npm run dev
```

Buka: http://localhost:3000

Login admin bawaan:
- Email: admin@akay.web.id
- Password: admin12345

## ENV penting

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="ganti_dengan_secret_panjang"
MIDTRANS_SERVER_KEY="SB-Mid-server-xxxxx"
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY="SB-Mid-client-xxxxx"
MIDTRANS_IS_PRODUCTION="false"
NEXT_PUBLIC_APP_URL="https://domain-anda.com"
```

## Setting Midtrans

Di dashboard Midtrans, isi Payment Notification URL:

```text
https://domain-anda.com/api/midtrans/notification
```

Untuk sandbox lokal, pakai ngrok/cloudflared agar Midtrans bisa mengirim webhook ke komputer lokal.
