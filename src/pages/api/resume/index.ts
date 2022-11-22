// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import AWS from 'aws-sdk'
import { NextApiRequest, NextApiResponse } from 'next';
import {ulid} from "ulid";

import {client} from "@/lib/redis";

import {artistID} from "@/constant/env";
import {ResumeType} from "@/repository/types";

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  const ses = new AWS.SES()
  const params = {
    Destination: {
      ToAddresses: [
        'success@simulator.amazonses.com',
      ],
    },
    Message: {
      Body: {
        Text: {
          Data: 'こんにちは、テストメールです',
          Charset: 'utf-8'
        },
      },
      Subject: {
        Data: 'こんにちは、こんにちは！',
        Charset: 'utf-8',
      },
    },
    // From
    Source: process.env.FROM_EMAIL || '',
  };

  ses.sendEmail(params, (err, res) => {
    if (err) {
      console.error(err);
    }
    console.log(res);
  });

  if (req.method === 'POST') {
    // valid
    const data: ResumeType = {id: ulid(), createdAt: new Date(), ...req.body}
    const email = data.email
    data.email = null

    // TODO: email repo
    // TODO: create `${artistID}:resume:${data.id}:updateKey, AAABBBCCC`
    // TODO: create `${email}, { userId: ulid(), email: email, resume: [${data.id}] }`

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
