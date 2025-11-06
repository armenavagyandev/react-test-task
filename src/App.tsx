import { Table, type TableDataType } from '@/components/table'
import { useCallback, useEffect, useState } from 'react'

export const App = () => {
  const [data, setData] = useState<TableDataType[]>([])
  const [isFetching, setIsFetching] = useState(true)

  const onDelete = useCallback(
    (val: string | number, keyField: string) => setData(prev => prev.filter((item) => item[keyField] !== val)),
    [],
  )

  const onDragAndDrop = useCallback((draggingIndex: number, targetIndex: number) => {
    setData(prev => {
      const updated = [...prev]

      const draggingItem = updated[draggingIndex]
      updated[draggingIndex] = updated[targetIndex]
      updated[targetIndex] = draggingItem

      return updated
    })
  }, [])

  useEffect(() => {
    const fetchData: () => Promise<TableDataType[]> = () => {
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
    }

    fetchData()
      .then((result) => setData(result))
      .then(() => setIsFetching(false))
  }, [])

  if (isFetching) {
    return 'Loading...'
  }

  return (
    <>
      <Table
        data={data}
        keyField="id"
        sortable
        onDelete={onDelete}
        onDragAndDrop={onDragAndDrop}
      />
    </>
  )
}
