// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import {ulid} from "ulid";

import {client} from "@/lib/redis";

import {artistID} from "@/constant/env";
import {ResumeType} from "@/repository/types";

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // valid
    const data: ResumeType = {id: ulid(), createdAt: new Date(), ...req.body}

    try {
      await client.connect()
      await client.set(`${artistID}:resume:${data.id}`, JSON.stringify(data))
      res.status(200)
      res.send(data)

    } catch (e) {
      res.status(400)
    } finally {
      await client.disconnect()
    }
  }
  res.end()
}
