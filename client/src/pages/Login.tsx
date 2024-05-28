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
import { useLoginMutation } from '@/services/api'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(50)
})

export const Login: FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: '',
      password: ''
    }
  })
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

  return (
    <Form {...form}>
      <form
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
