import { createContext, Dispatch, SetStateAction, useContext } from 'react'

export interface EditType {
  edit: boolean
  setEdit: Dispatch<SetStateAction<boolean>>
}

export const EditContext = createContext<EditType>({} as EditType)

export const useEditContext = () => useContext(EditContext)
