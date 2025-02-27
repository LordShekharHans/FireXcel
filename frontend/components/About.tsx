"use client";
import Image from "next/image";
import React from "react";
import { WobbleCard } from "./ui/wobble-card";

export function About() {
  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="text-3xl sm:text-4xl md:text-6xl text-zinc-700 font-bold  text-center xl:text-left mt-10  xl:max-w-sm">About{" "}
        <span className="inline-block bg-clip-text text-transparent bg-gradient-to-br from-emerald-500 to-teal-600">Us</span>
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full p-10 ">

        <WobbleCard
          containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-200 min-h-[500px] lg:min-h-[300px]"
          className=""
        >
          <div className="max-w-xs">
            <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-black">
              Real-time Monitoring and Evaluation Software
            </h2>
            <p className="mt-4 text-left text-base/6 text-gray-700">
              A cutting-edge solution designed for the Fire Department to monitor applications for inspections, follow-ups, and issuance of NOCs, ensuring an automated and efficient workflow.
            </p>
          </div>
          <Image
            src="/img4.jpg"
            width={500}
            height={500}
            alt="fire department software demo"
            className="absolute -right-4 lg:-right-[10%] -bottom-5 object-contain rounded-2xl"
          />
        </WobbleCard>
        <WobbleCard containerClassName="col-span-1 min-h-[300px]">
          <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-black">
            Streamlining Licensing Processes
          </h2>
          <p className="mt-4 max-w-[26rem] text-left text-base/6 text-gray-700">
            The system enables seamless handling of licensing requirements, eliminating manual intervention and providing real-time updates for better efficiency.
          </p>
        </WobbleCard>
        <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-300 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
          <div className="max-w-sm">
            <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-black">
              Join the Future of Fire Department Operations
            </h2>
            <p className="mt-4 max-w-[26rem] text-left text-base/6 text-gray-700">
              Empower the Government of NCT of Delhi with an automated monitoring system for inspections, follow-ups, and NOC issuance, enhancing transparency and reliability.
            </p>
          </div>
          <Image
            src="/img1.png"
            width={500}
            height={500}
            alt="fire department monitoring demo"
            className="absolute -right-10 md:-right-[20%] lg:-right-[5%] -bottom-44 object-contain rounded-2xl"
          />
        </WobbleCard>
      </div>
    </div>
  );
}
