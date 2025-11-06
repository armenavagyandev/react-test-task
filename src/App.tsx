import { useEffect } from 'react'
import { useUnit } from 'effector-react'
import { Table } from '@/components/table'
import { $data, $isFetching, fetchData, remove, reorder } from '@/store/users'

export const App = () => {
  const [data, isFetching, onDelete, onReorder, loadData] = useUnit([
    $data,
    $isFetching,
    remove,
    reorder,
    fetchData,
  ])

  useEffect(() => {
    loadData().then()
  }, [loadData])

  if (isFetching) {
    return 'Loading...'
  }

  if (!data.length) {
    return 'There’s nothing to display yet'
  }

  return (
    <>
      <Table
        data={data}
        keyField="id"
        sortable
        onDelete={(val, keyField) => onDelete({ val, keyField })}
        onDragAndDrop={(from, to) => onReorder({ from, to })}
      />
    </>
  )
}
