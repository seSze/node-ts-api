import config from 'config'

export const generateSecretString = async () => {
  const crypto = await import('crypto')
  return crypto.randomBytes(64).toString('hex')
}

export const generateToken = async (payload: string|object, ttl?: string) => {
  const jwt = await import('jsonwebtoken')

  return jwt.sign(payload, config.get('auth.secret'), { expiresIn: `${ttl}s` })
}
