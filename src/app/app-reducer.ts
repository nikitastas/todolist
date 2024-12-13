export type ThemeMode = 'dark' | 'light'

type InitialState = typeof initialState

const initialState = {
    themeMode: 'light' as ThemeMode,
}

export const appReducer = (state: InitialState = initialState, action: Actions): InitialState => {
    switch (action.type) {
        case 'CHANGE-THEME':
            return {...state, themeMode: action.themeMode === 'light' ? 'light' : 'dark'}
        default:
            return state
    }
}

export type ChangeThemeActionType = ReturnType<typeof changeThemeAC>

type Actions = ChangeThemeActionType

export const changeThemeAC = (themeMode: ThemeMode) => {
    return {
        type: 'CHANGE-THEME',
        themeMode
    } as const
}