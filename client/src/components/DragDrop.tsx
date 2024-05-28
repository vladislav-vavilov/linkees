import { ReactNode } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult
} from 'react-beautiful-dnd'

interface DragDropProps {
  children: ReactNode
  onDragEnd: (e: DropResult) => void
}

interface DragDropDroppableProps {
  children: ReactNode
  id: string
}

interface DragDropDraggableProps {
  children: ReactNode
  index: number
  id: string
}

export const DragDrop = ({ children, onDragEnd }: DragDropProps) => {
  return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>
}

DragDrop.Droppable = ({ children }: DragDropDroppableProps) => {
  return (
    <Droppable droppableId='droppable'>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className='flex h-full flex-col overflow-y-auto'
        >
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

DragDrop.Draggable = ({ children, index, id }: DragDropDraggableProps) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className='my-2 select-none'
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {children}
        </div>
      )}
    </Draggable>
  )
}
