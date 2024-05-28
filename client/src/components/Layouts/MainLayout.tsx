import { Outlet } from 'react-router-dom'

import { ChangeBackgroundDialog } from '@/components/ChangeBackgroundDialog'
import { Header } from '@/components/Header'
import { MobilePreview } from '@/components/MobilePreview'
import { Section } from '@/components/Section'
import { ShareLinkDialog } from '@/components/ShareLinkDialog'

export const MainLayout = () => {
  return (
    <div className='flex h-full flex-col bg-gray-200 p-4 text-black md:h-dvh'>
      <Header />
      <div className='flex h-full flex-auto flex-col gap-4 overflow-hidden pt-4 md:flex-row'>
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
