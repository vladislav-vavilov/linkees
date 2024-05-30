import { zodResolver } from '@hookform/resolvers/zod'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { roles } from '@/constants'
import { useAppSelector } from '@/hooks/redux'
import { getApiErrorMessage } from '@/lib/utils'
import { useUpdateProfileMutation } from '@/services/api'
import { selectCurrentUser } from '@/store/slices/userSlice'
import { type Role } from '@/types'

import { RoleSelect } from './RoleSelect'

const ROLES = Object.keys(roles) as [Role]
const formSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(50),
  description: z.string().max(100).optional(),
  role: z.enum(ROLES)
})

export const ProfileForm: FC = () => {
  const { username, email, description, role } =
    useAppSelector(selectCurrentUser)
  const [updateProfile, { isLoading }] = useUpdateProfileMutation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { username, email, description: description ?? '', role }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { data, error } = await updateProfile(values)

    if (data) {
      toast.success(data.message)
      form.reset(values)
    }
    error && toast.error(getApiErrorMessage(error))
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-4'
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
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder='Enter your description' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='role'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <RoleSelect onChange={field.onChange} value={field.value} />
              </FormControl>
              <FormDescription>
                The role doesn't matter at all, it's just a profile icon.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.isDirty && (
          <Button type='submit' disabled={isLoading}>
            Save changes
          </Button>
        )}
      </form>
    </Form>
  )
}
