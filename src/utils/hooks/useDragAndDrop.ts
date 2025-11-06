import { type DragEvent } from 'react'
import { createStore, createEvent } from 'effector'
import { useUnit } from 'effector-react'

const $draggingIndex = createStore<number | null>(null)

const dragStart = createEvent<number>()

const dragOver = createEvent()

const drop = createEvent<{ targetIndex: number; handler: (from: number, to: number) => void }>()

$draggingIndex
  .on(dragStart, (_, index) => index)
  .reset(dragOver)

drop.watch(({ targetIndex, handler }) => {
  const from = $draggingIndex.getState()
  if (from === null || from === targetIndex) return

  handler(from, targetIndex)
  dragOver()
})

export const useDragAndDrop = () => {
  const [draggingIndex, onDragStart, onDrop] = useUnit([
    $draggingIndex,
    dragStart,
    drop,
  ])

  const onDragOver = <T>(e: DragEvent<T>) => {
    e.preventDefault()
  }

  return { draggingIndex, onDragStart, onDragOver, onDrop }
}

// If you want to use React state instead of Effector

// export const useDragAndDrop = () => {
//   const [draggingIndex, setDraggingIndex] = useState<number | null>(null)
//
//   const onDragStart = (index: number) => {
//     setDraggingIndex(index)
//   }
//
//   const onDragOver = (e: DragEvent<HTMLTableRowElement>) => {
//     e.preventDefault()
//   }
//
//   const onDrop = (targetIndex: number, handler: (index1: number, index2: number) => void) => {
//     if (draggingIndex === null || draggingIndex === targetIndex) return
//
//     handler(draggingIndex, targetIndex)
//
//     setDraggingIndex(null)
//   }
//
//   return {
//     draggingIndex,
//     onDrop,
//     onDragStart,
//     onDragOver,
//   }
// }
