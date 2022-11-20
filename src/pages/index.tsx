import dynamic from "next/dynamic";
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import ButtonLink from "@/components/links/ButtonLink";
import UnderlineLink from '@/components/links/UnderlineLink';
import DownloadButton from "@/components/resume/DownloadButton";
import SampleResume from '@/components/resume/SampleResume';
import Seo from '@/components/Seo';
const Volume = dynamic(() => import('@/components/resume/Volume'), {ssr: false});

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  return (
    <Layout>
      <Seo templateTitle='Home' />

      <main>
        <section className='bg-white'>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center'>
            <h1 className='mt-4 text-3xl'>Music & Resume</h1>
            <Volume />
            <div className='my-10 w-96 text-base md:text-xl text-left'>
              <p><UnderlineLink href='https://music-resume.vercel.app'>music-resume</UnderlineLink> で</p>
              <p>あなただけの好きなバンドの履歴書を</p>
              <p>ポチポチ入力するだけで簡単に作成できます。</p>
            </div>
            <ButtonLink href='/resume/new' variant='outline'>自分の音楽履歴書を作成する</ButtonLink>

            <div className='mt-4 text-base md:text-xl'>サンプルはこちら</div>
            <SampleResume />
            <DownloadButton selector='#resume' />
          </div>
        </section>
      </main>
    </Layout>
  );
}
