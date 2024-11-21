import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  const { email } = await request.json()

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  try {
    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: "zykw bnoq oqur xhlc"
      },
    })

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: 'crew@theemailmafia.co',
      subject: 'New Free Audit Request',
      text: `New audit request from: ${email}`,
      html: `<p>New audit request from: <strong>${email}</strong></p>`,
    })

    return NextResponse.json({ message: 'Audit request successful' })
  } catch (error) {
    console.error('Audit request error:', error)
    return NextResponse.json({ error: 'Audit request failed' }, { status: 500 })
  }
}