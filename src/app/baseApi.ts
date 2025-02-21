import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import * as process from 'process'
import { isErrorWithMessage } from 'common/utils/isErrorWithMessage'
import { ResultCode } from 'common/enums'
import { handleError } from 'common/utils/handleError'

export const baseApi = createApi({
  reducerPath: 'todolistsApi',
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: process.env.REACT_APP_BASE_URL,
      prepareHeaders: (headers) => {
        headers.set('API-KEY', `${process.env.REACT_APP_API_KEY}`)
        headers.set('Authorization', `Bearer ${localStorage.getItem('sn-token')}`)
      },
    })(args, api, extraOptions)

    handleError(api, result)

    return result
  },
  endpoints: () => ({}),
  tagTypes: ['Todolist', 'Task'],
})
