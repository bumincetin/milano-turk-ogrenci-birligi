// Static mode newsletter service

interface NewsletterResponse {
  success: boolean;
  message: string;
}

// Client-side newsletter subscription (static mode)
export async function subscribeToNewsletter(email: string): Promise<NewsletterResponse> {
  // Simulate async behavior
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In static mode, we'll just show a success message
  // In production, you could integrate with a third-party service like Mailchimp
  console.log('Newsletter subscription request for:', email);
  
  return {
    success: true,
    message: 'Bültene başarıyla abone oldunuz! (Demo modu)'
  };
}

export const newsletterService = {
  async subscribe(email: string) {
    // Simulate async behavior
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Geçerli bir e-posta adresi giriniz.');
    }
    
    console.log('Newsletter subscription for:', email);
    
    // Return success (in production, integrate with email service)
    return {
      data: {
        id: Date.now(),
        attributes: {
          email,
          createdAt: new Date().toISOString()
        }
      }
    };
  }
};
