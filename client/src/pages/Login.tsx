import { zodResolver } from '@hookform/resolvers/zod'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { getApiErrorMessage } from '@/lib/utils'
import { useAuthQuery, useLoginMutation } from '@/services/api'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(50)
})

export const Login: FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const { data } = useAuthQuery()
  const [login, { isLoading }] = useLoginMutation()
  const navigate = useNavigate()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { data, error } = await login(values)

    if (data) {
      navigate('/links')
      toast.success(data.message)
    }
    if (error) toast.error(getApiErrorMessage(error))
  }

  if (data) return <Navigate to='/' />

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex w-full flex-col gap-4'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type='email' placeholder='Enter your email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  placeholder='Enter your password'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' disabled={isLoading}>
          Login
        </Button>
        <div className='w-full'>
          <span>Don't have an account? </span>
          <Link to='/register' className='text-violet-600 underline'>
            Register
          </Link>
        </div>
      </form>
    </Form>
  )
}
