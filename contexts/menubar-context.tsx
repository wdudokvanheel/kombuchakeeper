import React, {createContext, ReactNode, useContext, useState} from 'react'

export type MenuBarState = {
    page: string
    setPage: (page: string) => void
}

const MenuBarContext = createContext<MenuBarState | undefined>(undefined)

export const MenuBarProvider = ({children}: { children: ReactNode }) => {
    const [page, setPage] = useState<string>('home')

    return (
        <MenuBarContext.Provider value={{page, setPage}}>
            {children}
        </MenuBarContext.Provider>
    )
}

export const useMenu = () => {
    const ctx = useContext(MenuBarContext)
    if (!ctx) {
        throw new Error('useMenu must be used within MenuBarProvider')
    }
    return ctx
}