// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';

import {client} from "@/lib/redis";

import {artistID} from "@/constant/env";

export default async function resumeId(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (req.method === 'GET') {
    try {
      await client.connect()
      const data = await client.get(`${artistID}:${id}`)
      if (data) {
        res.status(200).json(JSON.parse(data));
      } else {
        res.status(404)
      }
    } catch (e) {
      res.status(400)
    } finally {
      await client.disconnect()
    }
  }
  res.end()
}
