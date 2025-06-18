import AsyncStorage from '@react-native-async-storage/async-storage'
import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react'

export enum Preference {
    F1 = 'f1',
    F2 = 'f2',
    NotificationTime = 'notificationTime',
}

type PreferenceValue = string | number

type PreferenceState = {
    [key in Preference]: PreferenceValue
}

const DEFAULTS: PreferenceState = {
    [Preference.F1]: 13,
    [Preference.F2]: 3,
    [Preference.NotificationTime]: 11,
}

type PreferenceContextType = {
    state: PreferenceState
    setPreference: <T extends PreferenceValue>(key: Preference, value: T) => void
}

const PreferenceContext = createContext<PreferenceContextType | undefined>(undefined)

export function PreferenceProvider({children}: { children: ReactNode }) {
    const [state, setState] = useState<PreferenceState>(DEFAULTS)

    useEffect(() => {
        const load = async () => {
            const entries = await Promise.all(
                Object.values(Preference).map(async key => {
                    const stored = await AsyncStorage.getItem(key)
                    if (stored === null) {
                        return [key, DEFAULTS[key]] as const
                    }
                    const num = Number(stored)
                    const value = isNaN(num) ? stored : num
                    return [key, value] as const
                })
            )
            setState(Object.fromEntries(entries) as PreferenceState)
        }
        load()
    }, [])

    const setPreference = <T extends PreferenceValue>(key: Preference, value: T) => {
        setState(prev => ({...prev, [key]: value}))
        AsyncStorage.setItem(key, String(value))
    }

    return (
        <PreferenceContext.Provider value={{state, setPreference}}>
            {children}
        </PreferenceContext.Provider>
    )
}

export function usePreference<T extends PreferenceValue>(key: Preference): [T, (v: T) => void] {
    const ctx = useContext(PreferenceContext)
    if (ctx === undefined) {
        throw new Error('usePreference must be used within PreferenceProvider')
    }
    const value = ctx.state[key] as T
    const set = (v: T) => ctx.setPreference(key, v)
    return [value, set]
}
