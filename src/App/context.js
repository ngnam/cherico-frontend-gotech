import * as React from 'react'
import { useAuthReducer } from 'hooks/useAuth'
import { useRequestReducer } from 'hooks/useRequest'
import { useHeaderReducer } from 'hooks/useHeader'
import { useTopReducer } from 'hooks/useTop'
import { useDiysReducer } from 'hooks/useDiys'
import { useNewsReducer } from 'hooks/useNews'
import { useProblemsReducer } from 'hooks/useProblems'
import { useDictionariesReducer } from 'hooks/useDictionaries'

const ReducerContext = React.createContext(undefined)

export const Provider = ({ children }) => {
  const value = {
    auth: useAuthReducer(),
    header: useHeaderReducer(),
    request: useRequestReducer(),
    top: useTopReducer(),
    diys: useDiysReducer(),
    news: useNewsReducer(),
    problems: useProblemsReducer(),
    dictionaries: useDictionariesReducer(),
  }
  return <ReducerContext.Provider value={value}>{children}</ReducerContext.Provider>
}

export const useProvider = () => {
  const context = React.useContext(ReducerContext)

  if (context === undefined) {
    throw new Error('useProvider must be used within a BOAppProvider')
  }
  return context
}
