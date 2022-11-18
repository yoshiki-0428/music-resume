import axios from "axios";
import html2canvas from "html2canvas";
import {useRouter} from "next/router";
import * as React from "react";
import {useEffect, useState} from "react";

import Button from "@/components/buttons/Button";
import Layout from "@/components/layout/Layout";
import Resume from "@/components/resume/Resume";
import Seo from "@/components/Seo";

export default function ResumeId() {
  const router = useRouter()
  const { id } = router.query
  const [resume, setResume] = useState<any>(null);

  useEffect(() => {
    if (resume === null && id) {
      axios.get(`/api/resume/${id}`).then(response => {
        setResume(response.data)
      })
    }
  }, [id])

  return (
    <Layout>
      <Seo templateTitle='Survey' />
      <main>
        <section className='bg-white'>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center'>
            {resume && <Resume values={resume} />}
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
