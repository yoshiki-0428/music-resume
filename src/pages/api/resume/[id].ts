// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';

import {getResume} from "@/repository/resume";

export default async function resumeId(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id } = req.query
    const resume = await getResume(id as string)
    if (resume) {
      res.status(200).json(resume)
    } else {
      res.status(404)
    }
  }
  res.end()
}

