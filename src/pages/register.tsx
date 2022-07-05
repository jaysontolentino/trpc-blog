import Link from "next/link"
import { useRouter } from "next/router"
import {useForm} from 'react-hook-form'
import { CreateUserInput } from "../schema/user.schema"
import { trpc } from "../utils/trpc"


function RegisterPage() {

    const router = useRouter()

    const {mutate, error, isLoading} = trpc.useMutation(['users.register-user'], {
        onSuccess() {
            router.push('/login')
        }
    })

    const {register, handleSubmit} = useForm<CreateUserInput>()

    function submitForm(data: CreateUserInput) {
        mutate(data)
    }

    return (
        <div>
            <span>{error && error.message}</span>
            <form onSubmit={handleSubmit(submitForm)}>

                <input type="email" {...register('email')} /> <br />
                <input type="text" {...register('name')} /> <br />

                <button type="submit">{isLoading ? 'loading...': 'Register'}</button>
                
            </form>
            
            <Link href="/login">Login</Link>
        </div>
    )
}

export default RegisterPage