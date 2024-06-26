import { FC } from 'react'
import { DropResult } from 'react-beautiful-dnd'
import { toast } from 'sonner'

import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { getApiErrorMessage } from '@/lib/utils'
import { useReorderLinksMutation } from '@/services/linksService'
import { reorder, selectLinks } from '@/store/slices/linksSlice'

import { DragDrop } from '../DragDrop'
import { LinksCard } from './LinksCard'

export const LinksCards: FC = () => {
  const links = useAppSelector(selectLinks)
  const dispatch = useAppDispatch()
  const [reorderLinks] = useReorderLinksMutation()

  const handleDragEnd = async (result: DropResult) => {
    const source = result.source.index
    const destination = result.destination?.index

    if (destination !== undefined && source !== destination) {
      dispatch(reorder({ from: source, to: destination }))
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
        {links.map(({ platform, URI, id }, index) => (
          <DragDrop.Draggable key={id} id={id} index={index}>
            <LinksCard platform={platform} URI={URI} id={id} />
          </DragDrop.Draggable>
        ))}
      </DragDrop.Droppable>
    </DragDrop>
  )
}
