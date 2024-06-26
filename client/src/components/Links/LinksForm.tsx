import { zodResolver } from '@hookform/resolvers/zod'
import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
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
import { platforms } from '@/constants'
import { type Platform } from '@/types'

import { PlatformSelect } from '../PlatformSelect/PlatformSelect'

export const formSchema = z.object({
  platform: z.enum(Object.keys(platforms) as [Platform]),
  URI: z.string().url()
})

interface LinkFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void
  autoSubmit?: boolean
  isLoading: boolean
  defaultValues?: Partial<z.infer<typeof formSchema>>
}

export const LinksForm: FC<LinkFormProps> = ({
  onSubmit,
  autoSubmit = false,
  isLoading,
  defaultValues
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? { URI: '' }
  })

  useEffect(() => {
    if (!autoSubmit || isLoading) return

    const subscription = form.watch(() => form.handleSubmit(onSubmit)())
    return () => subscription.unsubscribe()
  }, [])

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-4'
      >
        <FormField
          control={form.control}
          name='platform'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Platform</FormLabel>
              <FormControl>
                <PlatformSelect onChange={field.onChange} value={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='URI'
          render={({ field }) => (
            <FormItem>
              <FormLabel>URI</FormLabel>
              <FormControl>
                <Input type='url' placeholder='Enter URI' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-end gap-2'>
          {!autoSubmit && (
            <Button type='submit' disabled={isLoading}>
              Save
            </Button>
          )}
        </div>
      </form>
    </Form>
  )
}
