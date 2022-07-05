import { router } from "@trpc/server"
import { Context } from "../createContext"
import superjson from 'superjson'

export function postRouter() {
    return router<Context>().transformer(superjson)
}