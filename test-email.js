require('dotenv').config({ path: '.env.local' })
const nodemailer = require('nodemailer')

async function testEmail() {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  try {
    await transporter.verify()
    console.log('SMTP connection successful')
    
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: 'crew@theemailmafia.co',
      subject: 'Test Email',
      text: 'This is a test email',
      html: '<p>This is a test email</p>',
    })
    console.log('Test email sent:', info.messageId)
  } catch (error) {
    console.error('Error:', error)
  }
}

testEmail()