import Link from "next/link"
import { useState } from "react";
import {useForm} from 'react-hook-form'
import { RequestOtpInput } from "../schema/user.schema";
import { trpc } from "../utils/trpc";


function LoginPage() {

    const [success, setSuccess] = useState<boolean>(false)

    const {register, handleSubmit} = useForm<RequestOtpInput>();

    const {mutate, error} = trpc.useMutation('users.request-otp', {
        onSuccess() {
            setSuccess(true)
        }
    })

    function submitForm(data: RequestOtpInput) {
        mutate(data)
    }

    return (
        <div>
            <span>{error && error.message}</span>

            <p>{success && 'Please check your email'}</p>
            <form onSubmit={handleSubmit(submitForm)}>

                <input type="email" {...register('email')} /> <br />

                <button type="submit">{false ? 'loading...': 'Login'}</button>
                
            </form>
            
            <Link href="/register">Register</Link>
        </div>
    )
}

export default LoginPage