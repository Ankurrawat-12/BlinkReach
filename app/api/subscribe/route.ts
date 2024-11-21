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
        pass: process.env.EMAIL_PASS,
      },
    })

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: 'crew@theemailmafia.co',
      subject: 'New Newsletter Subscription',
      text: `New subscriber's email: ${email}`,
      html: `<p>New subscriber's email: <strong>${email}</strong></p>`,
    })

    return NextResponse.json({message: 'Subscription successful'})
  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 })
  }
}