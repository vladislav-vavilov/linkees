import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
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
import { useRegisterMutation } from '@/services/api'

const formSchema = z
  .object({
    email: z.string().email(),
    username: z.string().min(3).max(50),
    password: z.string().min(6).max(50),
    confirmPassword: z.string()
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  })

export const Register: FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    }
  })
  const [register, { isLoading }] = useRegisterMutation()
  const navigate = useNavigate()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { data, error } = await register(values)

    if (data) {
      navigate('/links')
      toast.success(data.message)
    }
    if (error) toast.error(getApiErrorMessage(error))
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex w-full flex-col gap-4'
      >
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='Enter your username' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Enter your email' {...field} />
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
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  placeholder='Confirm your password'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' disabled={isLoading}>
          Register
        </Button>
        <div className='w-full'>
          <span>Already have an account? </span>
          <Link to='/login' className='text-violet-600 underline'>
            Login
          </Link>
        </div>
      </form>
    </Form>
  )
}
