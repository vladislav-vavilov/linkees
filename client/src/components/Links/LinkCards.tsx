import { FC, useState } from 'react'
import { DropResult } from 'react-beautiful-dnd'
import { toast } from 'sonner'

import { useAppSelector } from '@/hooks/redux'
import { getApiErrorMessage } from '@/lib/utils'
import { useReorderLinksMutation } from '@/services/api'
import { selectCurrentUser } from '@/store/slices/userSlice'

import { DragDrop } from '../DragDrop'
import { LinkCard } from './LinkCard'

export const LinkCards: FC = () => {
  const { links } = useAppSelector(selectCurrentUser)
  const [data, setData] = useState(links)
  const [reorderLinks] = useReorderLinksMutation()

  const handleDragEnd = async (result: DropResult) => {
    const source = result.source.index
    const destination = result.destination?.index

    if (destination !== undefined && source !== destination) {
      const { error } = await reorderLinks({
        id: result.draggableId,
        destination
      })
      error && toast.error(getApiErrorMessage(error))
    }
  }

  return (
    <DragDrop onDragEnd={handleDragEnd}>
      <DragDrop.Droppable id='droppable'>
        {data?.map(({ platform, URI, id }, index) => (
          <DragDrop.Draggable key={id} id={id} index={index}>
            <LinkCard platform={platform} URI={URI} id={id} />
          </DragDrop.Draggable>
        ))}
      </DragDrop.Droppable>
    </DragDrop>
  )
}
