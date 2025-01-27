export type ThemeMode = 'dark' | 'light'
export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialState = typeof initialState

const initialState = {
  themeMode: 'light' as ThemeMode,
  status: 'idle' as RequestStatus,
  error: null as string | null,
}

export const appReducer = (state: InitialState = initialState, action: AppActionsType): InitialState => {
  switch (action.type) {
    case 'CHANGE-THEME':
      return { ...state, themeMode: action.themeMode === 'light' ? 'light' : 'dark' }
    case 'SET-STATUS':
      return { ...state, status: action.payload.status }
    case 'APP/SET-ERROR':
      return { ...state, error: action.payload.error }
    default:
      return state
  }
}

export type ChangeThemeActionType = ReturnType<typeof changeThemeAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>

type AppActionsType = ChangeThemeActionType | SetAppStatusActionType | SetAppErrorActionType

export const changeThemeAC = (themeMode: ThemeMode) => ({ type: 'CHANGE-THEME', themeMode }) as const
export const setAppStatusAC = (status: RequestStatus) => ({ type: 'SET-STATUS', payload: { status } }) as const
export const setAppErrorAC = (error: string | null) => ({ type: 'APP/SET-ERROR', payload: { error } }) as const
