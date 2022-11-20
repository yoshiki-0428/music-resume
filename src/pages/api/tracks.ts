// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

import {artistID} from "@/constant/env";
import {delCache, getTracks} from "@/repository/track";

export default async function tracks(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const tracks = await getTracks(artistID)
    res.status(200).json(tracks);
  } else if (req.method === 'DELETE') {
    await delCache(artistID)
    res.status(201)
  }
  res.end()
}
