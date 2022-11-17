// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

import bump from './bbb.json'

export default function tracks(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(bump);
}
