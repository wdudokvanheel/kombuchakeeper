import {Preference, usePreference} from "@/contexts/preference-context"
import NotificationService from "@/services/notification-service"
import React, {createContext, useContext, useMemo} from 'react'

const NotificationServiceContext = createContext<NotificationService | null>(null)

export function NotificationServiceProvider({children}: { children: React.ReactNode }) {

    const [hour] = usePreference(Preference.NotificationTime)

    const service = useMemo(
        () => {
            console.info("Notification service created with notifications at ", hour)
            return new NotificationService()
        },
        [hour]
    )

    return (
        <NotificationServiceContext.Provider value={service}>
            {children}
        </NotificationServiceContext.Provider>
    )
}

export function useNotificationService() {
    const svc = useContext(NotificationServiceContext)
    if (!svc) {
        throw new Error('useNotificationService must be used within NotificationServiceProvider')
    }
    return svc
}