import { Outlet } from 'react-router-dom'

import { ChangeBackgroundDialog } from '@/components/Dialogs/ChangeBackgroundDialog'
import { ShareLinkDialog } from '@/components/Dialogs/ShareLinkDialog'
import { Header } from '@/components/Header'
import { MobilePreview } from '@/components/MobilePreview'
import { Section } from '@/components/Section'

export const MainLayout = () => {
  return (
    <div className='flex flex-col bg-gray-200 p-4 text-black md:h-dvh'>
      <Header />
      <div className='flex flex-auto flex-col-reverse gap-4 pt-4 md:flex-row md:overflow-hidden'>
        <Section className='flex basis-1/3 flex-col items-center justify-center gap-4'>
          <MobilePreview />
          <div className='flex flex-col gap-2'>
            <ChangeBackgroundDialog />
            <ShareLinkDialog />
          </div>
        </Section>
        <Section className='flex-auto basis-2/3'>
          <Outlet />
        </Section>
      </div>
    </div>
  )
}
