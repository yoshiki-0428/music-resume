import * as React from 'react';

import Header from "@/components/layout/Header";
import UnderlineLink from "@/components/links/UnderlineLink";

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return <>
    <Header />
    {children}
    <footer className='m-4 text-gray-700 flex justify-between items-center'>
      <div>
        © {new Date().getFullYear()} By{' '}
        <UnderlineLink href='https://tech-blog.yoshikiohashi.dev'>
          yoshiki-0428
        </UnderlineLink>
      </div>
    </footer>
  </>;

}
