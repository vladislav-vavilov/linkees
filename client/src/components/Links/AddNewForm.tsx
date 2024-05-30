import { zodResolver } from '@hookform/resolvers/zod'
import { PopoverClose } from '@radix-ui/react-popover'
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
import { platforms } from '@/constants'
import { getApiError } from '@/lib/utils'
import { useCreateLinkMutation } from '@/services/linksService'
import { type Platform } from '@/types'

import { PlatformSelect } from '../PlatformSelect/PlatformSelect'

const formSchema = z.object({
  platform: z.enum(Object.keys(platforms) as [Platform]),
  URI: z.string().url()
})

export const AddNewForm: FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { URI: '' }
  })

  const [createLink, { isLoading }] = useCreateLinkMutation()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { data, error } = await createLink(values)
    data && toast.success(data.message)
    error && toast.error(getApiError(error))
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
          <PopoverClose asChild>
            <Button variant='secondary'>Cancel</Button>
          </PopoverClose>
          <Button type='submit' disabled={isLoading}>
            Add
          </Button>
        </div>
      </form>
    </Form>
  )
}
