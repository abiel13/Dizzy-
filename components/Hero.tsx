"use client";
import Image from "next/image";
import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Bounded } from "./Bounded";
import { TextSplitter } from "./TextSplitter";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Hero = () => {
  useGSAP(() => {
    const introlTl = gsap.timeline();

    introlTl
      .set(".hero", {
        opacity: 1,
      })
      .from(".hero-header-text", {
        scale: 3,
        opacity: 0,
        ease: "power4.in",
        delay: 0.3,
        stagger: 1,
      })
      .from(".hero-subheading", {
        opacity: 0,
        y: 30,
        delay: 0.8,
      })
      .from(".hero-body", {
        opacity: 0,
        y: 10,
      })
      .from(".hero-btn", {
        opacity: 0,
        y: 10,
        delay: 0.7,
      });

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".ero",
        start: "top top",
        end: "bottom bottom ",
        scrub: 1.5,
      },
    });

    scrollTl.fromTo(
      "body",
      {
        background: "#fde047",
      },
      {
        background: "#d9f99d",
      },
      1,
    ).from('.text-side-heading .split-char', {
      scale:1.3,
      rotate:25,
      y:10,
      ease:"back.out(3)",
      stagger:.1,
      opacity:0,
      duration:.5
    }).from('.text-side-body', {
      opacity:0,
      y:10,
    })

    // scrollTl.
  }, []);

  return (
    <>
      <Bounded>
        <div className="grid hero opacity-0">
          <div className="  grid h-screen place-items-center gap-4 text-center">
            <div className="grid auto-rows-min place-items-center text-center">
              <p className="hero-header text-7xl leading-[.8] font-black text-orange-500 uppercase md:text-[9rem] lg:text-[13rem]">
                <TextSplitter
                  className="hero-header-text"
                  wordDisplayStyle="block"
                  text="Live Gutsy"
                />
              </p>
              <p className="hero-subheading mt-12 text-5xl font-semibold text-sky-950">
                Soda Perfected
              </p>
              <p className="hero-body text-2xl font-normal text-sky-950">
                3.4kg Sugar fibre 5 delicious flavours
              </p>

              <button className="hero-btn mt-12 rounded-xl bg-sky-950 px-6 py-4 text-xl font-bold tracking-wide text-white transition-colors hover:bg-sky-900">
                Shop Now
              </button>
            </div>{" "}
          </div>

          <div className="text-side relative z-80 grid h-screen items-center gap-4 md:grid-cols-2">
            <div className="relative min-h-[90vh] w-full md:hidden">
              <Image
                src={"/assets/all-cans-bunched.png"}
                alt="all-cans-bunched"
                fill
                objectFit="contain"
              />
            </div>

            <h2 className="text-side-heading text-6xl font-black text-balance text-sky-950 uppercase lg:text-8xl">
              <TextSplitter text="Try all the flavors." />
            </h2>
            <p className="text-side-body max-w -xl mt-4 text-xl font-normal text-balance text-sky-950">
              Our soda is made with real fruit juice and a touch of cane sugar
              we never use artificial sweetners or high fuctose corn syrup . Try
              all five flavours and find your favoriete
            </p>
          </div>
        </div>
      </Bounded>
    </>
  );
};

export default Hero;
