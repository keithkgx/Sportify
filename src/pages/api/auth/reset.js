// src/pages/api/auth/reset.js
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end() // Method Not Allowed
  }

  const { email, newPassword } = req.body

  if (!email || !newPassword) {
    return res.status(400).json({ error: 'Email and new password are required.' })
  }

  // 1) Find the user
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return res.status(400).json({ error: 'No account found for that email.' })
  }

  // 2) Prevent resetting to the same password
  const isSame = await bcrypt.compare(newPassword, user.hashedPassword)
  if (isSame) {
    return res.status(400).json({ error: 'New password must be different from the old one.' })
  }

  // 3) Hash & update
  const hashed = await bcrypt.hash(newPassword, 10)
  await prisma.user.update({
    where: { email },
    data: { hashedPassword: hashed }
  })

  return res.status(200).json({ message: 'Password reset successful.' })
}
