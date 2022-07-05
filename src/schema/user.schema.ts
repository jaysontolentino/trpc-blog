import { z } from "zod";

export const createUserInput = z.object({
    name: z.string(),
    email: z.string().email()
})

export const requestOtpInput = z.object({
    email: z.string().email(),
    redirect: z.string().default('/')
})

export type CreateUserInput = z.TypeOf<typeof createUserInput>
export type RequestOtpInput = z.TypeOf<typeof requestOtpInput>