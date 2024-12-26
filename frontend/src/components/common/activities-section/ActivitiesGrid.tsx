import React from 'react';
import Image from 'next/image';
import EventsSlider from '@/components/EventsList/EventsSlider';
import { motion } from 'framer-motion';

export default function EtkinliklerGrid() {
  const icons = [
    "/flex-ui-assets/elements/activities/mail-icon.svg",
    "/flex-ui-assets/elements/activities/linechart-icon.svg",
    "/flex-ui-assets/elements/activities/team-icon.svg",
    "/flex-ui-assets/elements/activities/write-icon.svg",
    "/flex-ui-assets/elements/activities/multi-square-icon.svg",
    "/flex-ui-assets/elements/activities/settings-icon.svg",
  ];

  return (
    <section className="py-24 md:pb-32 bg-white" style={{backgroundImage: "url('flex-ui-assets/elements/pattern-white.svg')", backgroundPosition: "center"}}>
      <div className="container px-4 mx-auto">
        <div className="md:max-w-4xl mb-12 mx-auto text-center">
          <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-primary-500 bg-primary-100 font-medium uppercase rounded-full shadow-sm">
            Etkinlikler
          </span>
          <h1 className="mb-4 text-3xl md:text-4xl leading-tight font-bold tracking-tighter">
            Etkinliklerimiz
          </h1>
        </div>
        
        <EventsSlider />
      </div>
    </section>
  );
}