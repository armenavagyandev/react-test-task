import { type DragEvent, useState } from 'react'

export const useDragAndDrop = () => {
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null)

  const onDragStart = (index: number) => {
    setDraggingIndex(index)
  }

  const onDragOver = (e: DragEvent<HTMLTableRowElement>) => {
    e.preventDefault()
  }

  const onDrop = (targetIndex: number, handler: (index1: number, index2: number) => void) => {
    if (draggingIndex === null || draggingIndex === targetIndex) return

    handler(draggingIndex, targetIndex)

    setDraggingIndex(null)
  }

  return {
    draggingIndex,
    onDrop,
    onDragStart,
    onDragOver,
  }
}
