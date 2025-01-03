import type { NextApiRequest, NextApiResponse } from 'next'

interface NewsletterResponse {
  success: boolean;
  message: string;
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

// Mevcut handler fonksiyonu API route olarak kalacak
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' })
  }

  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'E-posta adresi gereklidir' 
      })
    }

    // Strapi'ye kaydetme işlemi
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/news-subscriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          email: email
        }
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      
      // Eğer email zaten kayıtlıysa
      if (errorData.error?.message?.includes('unique')) {
        return res.status(400).json({
          success: false,
          message: 'Bu e-posta adresi zaten kayıtlı.'
        })
      }

      throw new Error(errorData.error?.message || 'Strapi kayıt hatası')
    }

    return res.status(200).json({
      success: true,
      message: 'Bültene başarıyla abone oldunuz!'
    })

  } catch (error: any) {
    console.error('Newsletter subscription error:', error)
    return res.status(500).json({
      success: false,
      message: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.'
    })
  }
}