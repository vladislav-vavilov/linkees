import { FC } from 'react'
import { DropResult } from 'react-beautiful-dnd'
import { toast } from 'sonner'

import { getApiErrorMessage } from '@/lib/utils'
import { useLinksQuery, useReorderLinksMutation } from '@/services/api'

import { DragDrop } from '../DragDrop'
import { Spinner } from '../Spinner'
import { LinkCard } from './LinkCard'
import { LinksFetchingError } from './LinksFetchingError'

export const LinkCards: FC = () => {
  const { data, isLoading, isError, refetch, isFetching } = useLinksQuery()
  const [reorderLinks] = useReorderLinksMutation()

  if (isLoading) return <Spinner.Centered />
  if (isError)
    return <LinksFetchingError isFetching={isFetching} refetch={refetch} />

  const handleDragEnd = async (result: DropResult) => {
    const source = result.source.index
    const destination = result.destination?.index

    if (destination !== undefined && source !== destination) {
      // dispatch(reorder({ from: source, to: destination }))
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
