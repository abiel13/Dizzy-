import DrinkDive from '@/components/DrinkDive'
import Hero from '@/components/Hero'
import React from 'react'

const Rootpage = () => {
  return (
    <div className=' min-h-screen text-black font-sans'>
      <Hero />
      <DrinkDive />
    </div>
  )
}

export default Rootpage