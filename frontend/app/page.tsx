'use client';

import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { HeroScroll } from '@/components/HeroScroll';
import Image from 'next/image';
import { About } from '@/components/About';
import { Copyright } from 'lucide-react';

export default function Home() {
  const { user } = useAuthStore();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white border-b z-50 fixed w-full">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 ">
          <Link href="/">
            <div className="flex gap-2 justify-center items-center">
              <Image src='/logo.jpg' width={50} height={50} alt={'Logo'} />
              <div className="hidden sm:block">
                <h1 className="text-sm md:text-base lg:text-base font-semibold">
                  Department of Delhi Fire Services <br />
                  <span className='lg:text-sm text-xs text-gray-700'>Government of National Capital Territory of Delhi</span>
                </h1>
              </div>
            </div>
            </Link>
            <div className="flex items-center gap-4">

              {!user ? (
                <>
                  <Button asChild variant="ghost">
                    <Link href="/auth/sign-in">Sign In</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/auth/sign-up">Sign Up</Link>
                  </Button>
                </>
              ) : (
                <Button asChild>
                  <Link href={`/user/${user.role.toLowerCase()}`}>Dashboard</Link>
                </Button>
              )}
            </div>
        </div>
      </header>
      <main className=" lg:pt-5 md:pt-10 pt-0">
        <HeroScroll />
        <About />
        {/* <div className="container px-4 py-1">
          <Button>Apply for Noc</Button>
        </div> */}

        <div className="w-full bg-slate-300 p-6 flex justify-center items-center text-base text-gray-700 font-semibold"><Copyright/>Copyright by Team AlgoPhoenix</div>
      </main>
    </div>
  );
}