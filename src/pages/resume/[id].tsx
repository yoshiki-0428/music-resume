import html2canvas from "html2canvas";
import * as React from "react";

import Button from "@/components/buttons/Button";
import Layout from "@/components/layout/Layout";
import Resume from "@/components/resume/Resume";
import Seo from "@/components/Seo";

export default function ResumeId() {
  const response = {"artist": "BUMP", "name":"みっちゃん", "createdAt": "2022/11/01", "username":"michaaaaan","gender":0,"songs":["2","1","3"],"trigger":"きっかけは多分よくわからないけど、好きになっていたんだ。","joining":["1"],"comment":"YEAH!! OOOH!!"}

  return (
    <Layout>
      <Seo templateTitle='Survey' />
      <main>
        <section className='bg-white'>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center'>
            <Resume values={response} />
            <Button
              onClick={() => {
                const element = document.querySelector(
                  '#resume'
                ) as HTMLHtmlElement;

                html2canvas(element).then(function (canvas) {
                  const base64 = canvas.toDataURL('image/png');
                  const a = document.createElement('a');
                  a.href = base64;
                  a.download = 'resume';
                  a.click();
                });
              }}
            >
              履歴書をダウンロードする
            </Button>
          </div>
        </section>
      </main>
    </Layout>
  )

}
