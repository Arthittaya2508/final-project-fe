import { Selection } from "@heroui/react"
import { createContext, Dispatch, SetStateAction, useContext } from 'react'

export interface TableType {
  visibleColumns: Selection
  setVisibleColumns: Dispatch<SetStateAction<Selection>>

  search: string
  setSearch: Dispatch<SetStateAction<string>>

  page: number
  setPage: Dispatch<SetStateAction<number>>
}

export const TableContext = createContext<TableType>({} as TableType)

export const useTableContext = () => useContext(TableContext)
