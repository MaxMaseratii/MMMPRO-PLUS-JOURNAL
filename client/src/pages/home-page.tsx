import React from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/sections/hero-section';
import FeaturesSection from '@/components/sections/features-section';
import TradingViewSection from '@/components/sections/tradingview-section';
import BenefitsSection from '@/components/sections/benefits-section';
import TestimonialsSection from '@/components/sections/testimonials-section';
import PricingSection from '@/components/sections/pricing-section';
import CourseSection from '@/components/sections/course-section';
import FaqSection from '@/components/sections/faq-section';
import ContactSection from '@/components/sections/contact-section';
import CtaSection from '@/components/sections/cta-section';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <TradingViewSection />
        <BenefitsSection />
        <TestimonialsSection />
        <CourseSection />
        <PricingSection />
        <FaqSection />
        <ContactSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
