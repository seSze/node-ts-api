import Job from './Job'

class ExampleJob extends Job {
  public static async handle(test: unknown): Promise<boolean> {
    return true
  }
}

export default ExampleJob
