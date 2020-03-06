import * as dotenv from 'dotenv'
dotenv.config()
import client from '@sendgrid/mail'
import Queue, {Job, DoneCallback} from 'bull'

import {createVerifyFresh} from './templates/verifyFresh'
import {createProSuccess} from './templates/proSuccess'
import {createProNAM} from './templates/proNoAccountMatch'

type EmailVariations =
  | 'Pro_NoAccountMatch'
  | 'Pro_Success'
  | 'Verify_Expired'
  | 'Verify_Fresh'

type JobData = {
  account: any
  type: EmailVariations
  url?: string
  paymentEmail?: string
}

type EmailContext = {
  to: string
  from: string
  subject: string
  html: string
  replyTo: string
}

const DEFAULT_FROM = 'Evan from typvp <support@typvp.xyz>'
const DEFAULT_REPLY_TO = 'evan@kysley.com'

client.setApiKey(process.env.SG_API_KEY)

const emailQueue = new Queue('email', {
  redis: {
    port: process.env.REDIS_PORT as any,
    password: process.env.REDIS_PASSWORD,
  },
})

function composeEmailFromType(type: EmailVariations, data: JobData) {
  let mjmlObject
  let context: EmailContext
  let args

  switch (type) {
    case 'Verify_Fresh':
      args = {
        username: data.account.username,
        url: data.url,
      }
      mjmlObject = createVerifyFresh(args)
      context = {
        from: DEFAULT_FROM,
        to: data.account.email,
        subject: 'Verify your typvp Account',
        html: mjmlObject.html,
        replyTo: DEFAULT_REPLY_TO,
      }
      break
    case 'Pro_Success':
      args = {
        username: data.account.username,
      }
      mjmlObject = createProSuccess(args)
      context = {
        from: DEFAULT_FROM,
        to: data.account.email,
        subject: 'Welcome to typvp Pro!',
        html: mjmlObject.html,
        replyTo: DEFAULT_REPLY_TO,
      }
    case 'Pro_NoAccountMatch':
      args = {
        paymentEmail: data.paymentEmail,
      }
      mjmlObject = createProNAM(args)
      context = {
        from: DEFAULT_FROM,
        to: data.paymentEmail,
        subject: 'Something went wrong while upgrading your typvp Account!',
        html: mjmlObject.html,
        replyTo: DEFAULT_REPLY_TO,
      }
  }
  return {template: mjmlObject.html, context}
}

emailQueue.process(async (job: Job<JobData>, done: DoneCallback) => {
  const {data} = job

  const {context} = composeEmailFromType(data.type, data)

  await client.send({
    ...context,
  })

  done()
})

emailQueue.on('completed', job => {
  console.log(`Job with id ${job.id} has been completed`)
})
