import Queue, { DoneCallback, Job } from 'bull'
import config from 'config'
import jobs from './jobs'

const queues: Record<string, any> = {}

for (const queue of config.get('server.queues.list') as string[]) {
  queues[queue] = new Queue(queue, {
    redis: config.get('server.redis'),
    defaultJobOptions: { removeOnComplete: true },
  })
}

for (const queueKey in queues) {
  queues[queueKey].process(async (jobObject: Job, done: DoneCallback) => {
    const { job, payload } = jobObject.data
    const JobClass = jobs[job]
    if (!JobClass) {
      throw Error(`Job '${job} was not found`)
    }

    const jobStatus = await JobClass.handle(payload)

    if (jobStatus) {
      done()
    }
  })
}

// test.process((job, done) => {
//   // eslint-disable-next-line no-console
//   console.log('job', job.data)
//   job.progress(42)
//   done()
// })
