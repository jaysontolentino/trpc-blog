import nodemailer from 'nodemailer'

interface ILoginEmail {
    email: string, 
    url: string, 
    token: string
}

export default async function sendLoginEmail(payload: ILoginEmail) {

    const {email, url, token} = payload

    const testAccount = await nodemailer.createTestAccount()

    const transforter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    })

    const info = await transforter.sendMail({
        from: '"jane Doe" <j.doe@example.com>',
        to: email,
        subject: 'Login to your account',
        html: `
            Click <a href='${url}/login#token=${token}' >here</a> to login
        `
    })

    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`)
}