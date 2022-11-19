import axios from "axios";
import {useRouter} from "next/router";
import * as React from "react";
import {useEffect, useState} from "react";

import Layout from "@/components/layout/Layout";
import DownloadButton from "@/components/resume/DownloadButton";
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
          <div className='layout flex min-h-screen flex-col items-center  text-center'>
            {resume && <Resume values={resume} />}
            <DownloadButton selector='#resume' />
          </div>
        </section>
      </main>
    </Layout>
  )

}
