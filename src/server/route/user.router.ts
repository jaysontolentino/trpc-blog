import { Prisma } from "@prisma/client";
import { createUserInput, requestOtpInput } from "../../schema/user.schema";
import { createRouter } from "../createRouter";
import { TRPCError } from "@trpc/server";
import sendLoginEmail from "../../utils/mailer";
import { url } from "../../constants";
import { encode } from "../../utils/base64";

export const userRouter = createRouter()
.query('get-all', {
    resolve: async ({ctx}) => {

        const users = await ctx.prisma.user.findMany()

        return users
    }
})
.mutation('register-user', {
    input: createUserInput,
    resolve: async ({ctx, input}) => {

        const {name, email} = input

        try {
            const user = await ctx.prisma.user.create({
                data: {
                    name,
                    email
                }
            })

            return user  
        } catch (error) {

            if(error instanceof Prisma.PrismaClientKnownRequestError) {
                if(error.code === 'P2002') {
                    throw new TRPCError({
                        code: 'CONFLICT',
                        message: 'email already exist'
                    })
                }
            }

            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Something went wrong'
            })
            
        }
        
    }
})
.mutation('request-otp', {
    input: requestOtpInput,
    async resolve({ctx, input}) {
        const {email, redirect} = input
        
        const user = await ctx.prisma.user.findUnique({
            where: {email}
        })

        if(!user) {
            throw new TRPCError({
                code: 'NOT_FOUND',
                message: 'User not found'
            })
        }

        const token = await ctx.prisma.loginToken.create({
            data: {
                redirect,
                user: {
                    connect: {
                        id: user.id
                    }
                }
            }
        })

        //send email

        sendLoginEmail({
            token: encode(`${token.id}:${user.email}`),
            url,
            email: user.email
        })

        return true
    }
})