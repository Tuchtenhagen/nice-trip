import env from 'dotenv'

env.config()

export const PORT = process.env.PORT || 3000
export const DATABASE_URL = process.env.DATABASE_URL || 3000
export const SECRET = process.env.SECRET

