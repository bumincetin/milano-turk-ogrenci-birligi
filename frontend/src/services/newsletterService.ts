import type { NextApiRequest, NextApiResponse } from 'next'

interface NewsletterResponse {
  success: boolean;
  message: string;
}

interface NewsletterSubscription {
  email: string;
}

// Client tarafı için servis fonksiyonu
export async function subscribeToNewsletter(email: string): Promise<NewsletterResponse> {
  const response = await fetch('/api/newsletter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  return response.json();
}

// Strapi servis fonksiyonları
export const newsletterService = {
  async subscribe(email: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/news-subscriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          email,
          publishedAt: new Date(),
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Kayıt işlemi başarısız oldu.');
    }

    return response.json();
  }
};

// API route handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'E-posta adresi gereklidir' 
      });
    }

    // Strapi servisini kullan
    await newsletterService.subscribe(email);

    return res.status(200).json({
      success: true,
      message: 'Bültene başarıyla abone oldunuz!'
    });

  } catch (error: any) {
    console.error('Newsletter subscription error:', error);
    
    if (error.message === 'Bu e-posta adresi zaten kayıtlı.') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.'
    });
  }
}