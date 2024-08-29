"use client";
import Head from "next/head";
import RandomMealButton from "./RandomButton";

export default function Home() {
  return (
    <div className='min-h-screen'>
      <Head>
        <title>Random Meal Generator</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='container mx-auto py-8'>
        <h1 className='text-4xl font-bold text-center mb-8'>
          Random Meal Generator
        </h1>
        <RandomMealButton />
      </main>
    </div>
  );
}
