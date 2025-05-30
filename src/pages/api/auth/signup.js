// src/pages/api/auth/signup.js
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { email, password } = req.body

  // 1) Check if user already exists
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return res.status(400).json({ error: 'Email already registered' })
  }

  // 2) Hash the password
  const hashedPassword = await bcrypt.hash(password, 10)

  // 3) Create the user record
  const user = await prisma.user.create({
    data: { email, hashedPassword }
  })

  // 4) Return success (you might redirect to /login on the client)
  res.status(201).json({ id: user.id, email: user.email })
}
