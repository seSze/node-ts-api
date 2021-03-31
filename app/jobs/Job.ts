import Queue, { Queue as QueueInterface} from 'bull'
import config from 'config'

class Job {
  protected payload
  protected queue: QueueInterface

  constructor(payload: unknown) {
    this.payload = payload
    this.queue = new Queue(this.queueName, {
      redis: config.get('server.redis'),
      defaultJobOptions: { removeOnComplete: true },
    })
  }

  protected get queueName() {
    return config.get('server.queues.default') as string
  }

  public dispatch(payload?: unknown) {
    this.queue.add({
      job: this.constructor.name,
      payload: payload || this.payload
    })
  }

  public static dispatch(payload: unknown) {
    const instance = new this(payload)
    instance.dispatch()
  }

  public static async handle(data: unknown): Promise<boolean> {
    throw new Error('This method needs to be implemented inside Job Class')
  }
}

export default Job
