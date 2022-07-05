import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from './../utils/prisma'

interface IContext {
    req: NextApiRequest,
    res: NextApiResponse   
}

export function createContext({req, res}: IContext) {
    return {
        req, 
        res,
        prisma
    }
}

export type Context = ReturnType<typeof createContext>