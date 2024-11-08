import { fetchAPI } from '@/utils/api';

async function getData() {
  try {
    const response = await fetchAPI('/coupons');
    return response;
  } catch (error) {
    console.error('Veri çekme hatası:', error);
    return null;
  }
}

export default async function Home() {
  const data = await getData();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Kuponlar</h1>
      <pre className="bg-black p-4 rounded">
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  );
}