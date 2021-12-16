import jwt from 'jsonwebtoken'
import pkg from '@prisma/client'
const { PrismaClient } = pkg

import { SECRET } from '../config.js'
import { encyptPassword, comparePassword } from '../helpers/password.js'

const prisma = new PrismaClient()


const index = async (req, res) => {
  const allGuides = await prisma.guides.findMany() 
  
  res.send(allGuides)
}

const create = async (req, res) => {
  const { body } = req

  const {password, ...guide} = await prisma.guides.create({
    data: {
      name: body.name,
      email: body.email,
      password: await encyptPassword(body.password),
      cpf: body.cpf,
      rg: body.rg,
      photo: body.photo || ''
    }
  }) 
  
  res.send(guide)
}

const update = async (req, res) => {
  const { body } = req
  const { id } = req.params

  const guide = await prisma.guides.update({
    where: {
      id: parseInt(id)
    },
    data: {
      name: body.name,
      password: await encyptPassword(body.password),
      photo: body.photo || ''
    }
  }).catch(err => {
    return res.status(404).send({message: `Guia não encontrado. Error: ${err.message}`})
  })

  res.send(guide)
}

const destroy = async (req, res) => {
  const { id } = req.params

  const guide = await prisma.guides.delete({
    where: {
      id: parseInt(id)
    }
  }).catch(err => {
    return res.status(404).send({message: `Guia não encontrado. Error: ${err.message}`})
  })
  
  res.send(guide)
}

const login = async (req, res) => {
  const { body } = req

  try{
    const {password, ...guide} = await prisma.guides.findUnique({
      where: {
        email: body.email
      }
    })
    
    if(!await comparePassword(body.password, password)){
      return res.status(401).send({message: 'Senha Incorreta'})
    }
    
    return res.send({
      guide,
      token: jwt.sign({guide}, SECRET, {
        expiresIn: '5h'
      })
    })
  }catch(err){
    return res.status(404).send({message: 'Guia não encontrado.'})
  }
}

export default {
  index,
  create,
  login,
  update,
  destroy
}