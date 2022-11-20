// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

import {artistID} from "@/constant/env";
import {getJoining} from "@/repository/joining";


export default async function joining(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(getJoining(artistID))
  }
  res.end()
}


