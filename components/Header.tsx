"use client";

import React, { useEffect, useRef } from 'react'
import { FizziLogo } from './logo'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (headerRef.current) {
      gsap.from(headerRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }
  }, []);

  return (
    <header ref={headerRef} className='fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-3 backdrop-blur-sm bg-transparent'>
      <Link href="/" className="z-10">
        <FizziLogo className='h-12 cursor-pointer text-white drop-shadow-lg transition-transform hover:scale-110' />
      </Link>
      <nav ref={navRef} className="flex gap-6 items-center">
        <Link href="/" className="text-sm text-white font-semibold hover:text-amber-200 transition-colors drop-shadow-md">Home</Link>
        <Link href="/about" className="text-sm text-white font-semibold hover:text-amber-200 transition-colors drop-shadow-md">About</Link>
        <Link href="/contact" className="text-sm text-white font-semibold hover:text-amber-200 transition-colors drop-shadow-md">Contact</Link>
        <Link
          href="/#flavors"
          className="px-5 py-1.5 text-sm bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full font-semibold hover:scale-105 hover:bg-white/30 transition-all shadow-lg"
        >
          Shop
        </Link>
      </nav>
    </header>
  )
}

export default Header