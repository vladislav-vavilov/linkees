import { zodResolver } from '@hookform/resolvers/zod'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
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
import { getApiError, getApiErrorMessage } from '@/lib/utils'
import { useUpdatePasswordMutation } from '@/services/accountService'
import { type BaseResponse } from '@/types/api'

export const formSchema = z
  .object({
    currentPassword: z.string().min(6),
    newPassword: z.string().min(6),
    confirmNewPassword: z.string()
  })
  .refine(
    ({ currentPassword, newPassword }) => currentPassword !== newPassword,
    {
      message: 'The new password cannot match the old one',
      path: ['newPassword']
    }
  )
  .refine(
    ({ newPassword, confirmNewPassword }) => newPassword === confirmNewPassword,
    { message: "Passwords don't match", path: ['confirmNewPassword'] }
  )

const defaultValues = {
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: ''
}

type UpdatePasswordError = { name?: keyof typeof defaultValues } & BaseResponse

interface PasswordFormProps {
  handleClose: () => void
}

export const PasswordForm: FC<PasswordFormProps> = ({ handleClose }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  })
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation()

  const handleError = (error: FetchBaseQueryError | SerializedError) => {
    const apiError = getApiError<UpdatePasswordError>(error)

    if (apiError?.name)
      form.setError(apiError.name, { message: apiError.message })
    else toast.error(getApiErrorMessage(error))
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { data, error } = await updatePassword({
      currentPassword: values.currentPassword,
      newPassword: values.newPassword
    })

    if (data) {
      toast.success(data.message)
      handleClose()
    }
    if (error) handleError(error)
  }

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-4'
      >
        <FormField
          control={form.control}
          name='currentPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current password</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  placeholder='Enter your current password'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='newPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  placeholder='Enter your new password'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirmNewPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm new password</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  placeholder='Confirm your new password'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' disabled={isLoading}>
          Update
        </Button>
      </form>
    </Form>
  )
}
