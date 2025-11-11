'use client'

import React from 'react'
import Hero from '@/components/Hero'
import Flavors from '@/components/Flavors'
import Features from '@/components/Features'
import CTA from '@/components/CTA'

export default function HomePage() {
  return (
    <div className='min-h-screen text-black font-sans overflow-x-hidden bg-transparent'>
      <Hero />
      <Flavors />
      <Features />
      <CTA />
    </div>
  )
}
