'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default function Home() {
  const [components, setComponents] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadComponents = async () => {
      try {
        console.log('Bileşenler yükleniyor...');
        const HeroSection = (await import('@/components/common/hero-section/HeroSection')).default;
        const IndexSectionNavigationsWhite1 = (await import('@/components/common/navigations-white/IndexSectionNavigationsWhite1')).default;
        const IndexSectionHeadersWhitePattern2 = (await import('@/components/common/headers-white-pattern/IndexSectionHeadersWhitePattern2')).default;
        const EventsSlider = (await import('@/components/EventsList/EventsSlider')).default;
        const IndexSectionFeaturesWhitePattern3 = (await import('@/components/common/features-white-pattern/IndexSectionFeaturesWhitePattern3')).default;
        const IndexSectionHowItWorksWhitePattern4 = (await import('@/components/common/how-it-works-white-pattern/IndexSectionHowItWorksWhitePattern4')).default;
        const IndexSectionLogoCloudsWhitePattern6 = (await import('@/components/common/logo-clouds-white-pattern/IndexSectionLogoCloudsWhitePattern6')).default;
        const IndexSectionTestimonialsWhitePattern5 = (await import('@/components/common/testimonials-white-pattern/IndexSectionTestimonialsWhitePattern5')).default;
        const IndexSectionBlogWhitePattern7 = (await import('@/components/common/blog-white-pattern/IndexSectionBlogWhitePattern7')).default;
        const IndexSectionFaqsWhitePattern8 = (await import('@/components/common/faqs-white-pattern/IndexSectionFaqsWhitePattern8')).default;
        const IndexSectionTeamWhitePattern9 = (await import('@/components/common/team-white-pattern/IndexSectionTeamWhitePattern9')).default;
        const IndexSectionCareersWhitePattern10 = (await import('@/components/common/careers-white-pattern/IndexSectionCareersWhitePattern10')).default;
        const IndexSectionNumbersWhitePattern12 = (await import('@/components/common/numbers-white-pattern/IndexSectionNumbersWhitePattern12')).default;
        const IndexSectionCookiesWhite13 = (await import('@/components/common/cookies-white/IndexSectionCookiesWhite13')).default;
        const IndexSectionNewsletterWhitePattern11 = (await import('@/components/common/newsletter-white-pattern/IndexSectionNewsletterWhitePattern11')).default;
        const IndexSectionFootersWhitePattern14 = (await import('@/components/common/footers-white-pattern/IndexSectionFootersWhitePattern14')).default;

        setComponents([
          { Component: IndexSectionNavigationsWhite1, key: 'nav' },
          { Component: IndexSectionHeadersWhitePattern2, key: 'headers' },
          { Component: HeroSection, key: 'hero' },
          { Component: EventsSlider, key: 'events-slider' },
          { Component: IndexSectionFeaturesWhitePattern3, key: 'features' },
          { Component: IndexSectionHowItWorksWhitePattern4, key: 'howItWorks' },
          { Component: IndexSectionLogoCloudsWhitePattern6, key: 'logoClouds' },
          { Component: IndexSectionTestimonialsWhitePattern5, key: 'testimonials' },
          { Component: IndexSectionBlogWhitePattern7, key: 'blog' },
          { Component: IndexSectionFaqsWhitePattern8, key: 'faqs' },
          { Component: IndexSectionTeamWhitePattern9, key: 'team' },
          { Component: IndexSectionCareersWhitePattern10, key: 'careers' },
          { Component: IndexSectionNumbersWhitePattern12, key: 'numbers' },
          { Component: IndexSectionCookiesWhite13, key: 'cookies' },
          { Component: IndexSectionNewsletterWhitePattern11, key: 'newsletter' },
          { Component: IndexSectionFootersWhitePattern14, key: 'footers' }
        ]);

        console.log('Bileşenler başarıyla yüklendi');
      } catch (error) {
        console.error('Bileşenler yüklenirken hata:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadComponents();

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <>
      {components.slice(0, 2).map(({ Component, key }, index) => (
        <Component key={key} />
      ))}

      {components.slice(2).map(({ Component, key }, index) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ 
            once: true,
            amount: 0.3
          }}
          transition={{ 
            duration: 0.8,
            ease: "easeOut"
          }}
        >
          <Component />
        </motion.div>
      ))}
    </>
  );
}
