// eslint-disable-next-line import/named
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { useDispatch as useReduxDispatch } from 'react-redux'

import { RootState } from '../store/reducers'
import { AppDispatch } from '../store'

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
export const useDispatch = () => useReduxDispatch<AppDispatch>()
