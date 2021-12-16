import bcrypt from 'bcrypt'

export const encyptPassword = (pass) => bcrypt.hash(pass, 11)

export const comparePassword = (pass, encypted) => bcrypt.compare(pass, encypted)
