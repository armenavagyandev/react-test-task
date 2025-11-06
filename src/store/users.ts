import { createEffect, createEvent, createStore } from 'effector'
import type { TableDataType } from '@/components/table'

export const fetchData = createEffect((): Promise<TableDataType[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, firstName: 'Anna', lastName: 'Petrosyan', email: 'anna.petrosyan@example.com', age: 30 },
        { id: 2, firstName: 'David', lastName: 'Mkrtchyan', email: 'david.mk@example.com', age: 28 },
        { id: 3, firstName: 'Lilit', lastName: 'Harutyunyan', email: 'lilit.harutyunyan@example.com', age: 25 },
        { id: 4, firstName: 'Vahan', lastName: 'Grigoryan', email: 'vahan.grigoryan@example.com', age: 32 },
        { id: 5, firstName: 'Mariam', lastName: 'Sargsyan', email: 'mariam.sargsyan@example.com', age: 27 },
        { id: 6, firstName: 'Aram', lastName: 'Karapetyan', email: 'aram.karapetyan@example.com', age: 29 },
        { id: 7, firstName: 'Narine', lastName: 'Stepanyan', email: 'narine.stepanyan@example.com', age: 26 },
        { id: 8, firstName: 'Tigran', lastName: 'Hovhannisyan', email: 'tigran.h@example.com', age: 31 },
        { id: 9, firstName: 'Seda', lastName: 'Hakobyan', email: 'seda.hakobyan@example.com', age: 23 },
        { id: 10, firstName: 'Karen', lastName: 'Khachatryan', email: 'karen.kh@example.com', age: 34 },
        { id: 11, firstName: 'Anahit', lastName: 'Avanesyan', email: 'anahit.avanesyan@example.com', age: 28 },
        { id: 12, firstName: 'Levon', lastName: 'Baghdasaryan', email: 'levon.b@example.com', age: 27 },
        { id: 13, firstName: 'Gayane', lastName: 'Vardanyan', email: 'gayane.v@example.com', age: 29 },
        { id: 14, firstName: 'Suren', lastName: 'Danielyan', email: 'suren.d@example.com', age: 33 },
      ])
    }, 500)
  })
})

export const remove = createEvent<{ val: string | number; keyField: string }>()

export const reorder = createEvent<{ from: number; to: number }>()

export const $data = createStore<TableDataType[]>([])
  .on(fetchData.doneData, (_, data) => data)
  .on(remove, (state, { val, keyField }) =>
    state.filter(item => item[keyField] !== val),
  )
  .on(reorder, (state, { from, to }) => {
    const updated = [...state]
    const dragging = updated[from]
    updated[from] = updated[to]
    updated[to] = dragging

    return updated
  })

export const $isFetching = createStore(true)
  .on(fetchData.finally, () => false)
  .on(fetchData, () => true)
