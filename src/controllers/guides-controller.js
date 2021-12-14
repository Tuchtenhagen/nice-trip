// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient()


const index = async (req, res) => {

  const allGuides = await prisma.guides.findMany() 
  
  res.send(allGuides)
}

const create = async (req, res) => {
  const { body } = req

  const guide = await prisma.guides.create({
    data: {
      name: body.name,
      email: body.email,
      password: body.password,
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
      password: body.password,
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

export default {
  index,
  create,
  update,
  destroy
}