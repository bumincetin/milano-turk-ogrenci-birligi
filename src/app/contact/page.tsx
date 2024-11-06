import type { Metadata } from 'next'
import React from 'react'
import ContactSectionNavigationsWhite2 from '@/components/common/navigations-white/ContactSectionNavigationsWhite2'
import ContactSectionContactsWhitePattern1 from '@/components/common/contacts-white-pattern/ContactSectionContactsWhitePattern1'
import ContactSectionContactsWhitePattern3 from '@/components/common/contacts-white-pattern/ContactSectionContactsWhitePattern3'
import ContactSectionCtaWhitePattern5 from '@/components/common/cta-white-pattern/ContactSectionCtaWhitePattern5'
import ContactSectionNewsletterWhitePattern4 from '@/components/common/newsletter-white-pattern/ContactSectionNewsletterWhitePattern4'

// Next.js metadata tanımı
export const metadata: Metadata = {
  title: 'İletişim',
  description: 'İletişim sayfası açıklaması',
}

// Contact bileşeni
const Contact: React.FC = () => {
  return (
    <>
      <ContactSectionNavigationsWhite2 />
      <ContactSectionContactsWhitePattern1 />
      <ContactSectionContactsWhitePattern3 />
      <ContactSectionCtaWhitePattern5 />
      <ContactSectionNewsletterWhitePattern4 />
    </>
  )
}

export default Contact