import * as dotenv from 'dotenv'
dotenv.config()
import client from '@sendgrid/mail'
import Queue, {Job, DoneCallback} from 'bull'

client.setApiKey(process.env.SG_API_KEY)

const emailTemplate = (to: string, url: string) => {
  return {
    from: 'typvp <noreply@typvp.xyz>',
    to,
    subject: 'Verify your typvp Account!',
    text: `link to verify your account! ${url}`,
    html: `<a href=${url}>Click here to verify your typvp account!</a>`,
  }
}

const confirmEmailQueue = new Queue('confirm-email', {
  redis: {
    port: process.env.REDIS_PORT as any,
    password: process.env.REDIS_PASSWORD,
  },
})

confirmEmailQueue.process(async (job: Job, done: DoneCallback) => {
  console.log(job.data)
  await client.send(emailTemplate(job.data.email, job.data.url))
  done()
})

confirmEmailQueue.on('completed', job => {
  console.log(`Job with id ${job.id} has been completed`)
})
