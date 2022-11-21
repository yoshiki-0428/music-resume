// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {EmailData} from "@sendgrid/helpers/classes/email-address";
import {MailDataRequired} from "@sendgrid/helpers/classes/mail";
import sgMail from '@sendgrid/mail';
import { NextApiRequest, NextApiResponse } from 'next';
import {ulid} from "ulid";

import {client} from "@/lib/redis";

import {artistID} from "@/constant/env";
import {ResumeType} from "@/repository/types";

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // valid
    const data: ResumeType = {id: ulid(), createdAt: new Date(), ...req.body}
    const email = data.email
    data.email = null

    // TODO: email repo
    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
    const msg: MailDataRequired = {
      to: email as string,
      from: process.env.FROM_EMAIL as EmailData,
      subject: 'アプリからの問い合わせ',
      text: `アプリからの問い合わせ`,
      html: `<div>アプリからの問い合わせ</div>`
    }
    await sgMail.send(msg);
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
