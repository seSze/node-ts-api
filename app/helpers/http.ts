import { Response } from 'express'

export const httpError = ( message: string, code: number, res: Response) => {
  res.status(code)
  res.json({
    message,
    code
  })
}
