import {Batch, BatchState} from '@/models/batch'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications'
import i18n from '@/locale/i18n'

type BatchNotificationMap = Record<string, string>

export default class NotificationService {
    private static readonly STORAGE_KEY = 'batchNotificationMap'
    private readonly notificationTime = {hour: 11, minute: 0}

    constructor(hour?: number, minute?: number) {
        this.notificationTime = {
            hour: hour || this.notificationTime.hour,
            minute: minute || this.notificationTime.minute
        }
    }

    private async loadMap(): Promise<BatchNotificationMap> {
        const json = await AsyncStorage.getItem(NotificationService.STORAGE_KEY)
        if (json) {
            return JSON.parse(json) as BatchNotificationMap
        }
        return {}
    }

    private async saveMap(map: BatchNotificationMap): Promise<void> {
        await AsyncStorage.setItem(NotificationService.STORAGE_KEY, JSON.stringify(map))
    }

    private finishDate(batch: Batch): Date | undefined {
        if (batch.state === BatchState.F1) {
            return batch.firstFermentationEnd
        }
        if (batch.state === BatchState.F2) {
            return batch.secondFermentationEnd
        }
        return undefined
    }

    private triggerFromDate(d: Date): Notifications.DateTriggerInput {
        return {
            type: 'date',
            date: new Date(
                d.getFullYear(),
                d.getMonth(),
                d.getDate(),
                this.notificationTime.hour,
                this.notificationTime.minute,
                0,
                0
            )
        }
    }

    async initialize(): Promise<void> {
        const {status} = await Notifications.getPermissionsAsync()
        if (status !== 'granted') {
            await Notifications.requestPermissionsAsync()
        }
    }

    async scheduleBatchNotification(batch: Batch): Promise<void> {
        const doneAt = this.finishDate(batch)
        if (!doneAt) {
            return
        }

        const trigger = this.triggerFromDate(doneAt)
        if (trigger.date.getTime() < Date.now()) {
            return
        }

        const id = await Notifications.scheduleNotificationAsync({
            content: {
                title: i18n.t('notifications.readyTitle', {name: batch.name}),
                body: i18n.t('notifications.readyBody'),
                sound: true
            },
            trigger
        })

        if (batch.id !== undefined) {
            console.info(`Notification scheduled for #${batch.id} @ ${trigger.date.toISOString()}`)
            const map = await this.loadMap()
            map[batch.id.toString()] = id
            await this.saveMap(map)
        }
    }

    async cancelBatchNotification(batchId: number): Promise<void> {
        const map = await this.loadMap()
        const localId = map[batchId.toString()]
        if (localId) {
            await Notifications.cancelScheduledNotificationAsync(localId)
            delete map[batchId.toString()]
            await this.saveMap(map)
        }
    }

    async rescheduleBatchNotification(batch: Batch): Promise<void> {
        if (batch.id === undefined) {
            return
        }
        await this.cancelBatchNotification(batch.id)
        await this.scheduleBatchNotification(batch)
    }

    async wipeAllBatchNotifications(): Promise<void> {
        await Notifications.cancelAllScheduledNotificationsAsync()
        if (typeof Notifications.dismissAllNotificationsAsync === 'function') {
            await Notifications.dismissAllNotificationsAsync()
        }
        await AsyncStorage.removeItem(NotificationService.STORAGE_KEY)
    }

    async refreshAllBatchNotifications(batches: Batch[]): Promise<void> {
        await this.wipeAllBatchNotifications()
        for (const b of batches) {
            await this.scheduleBatchNotification(b)
        }
    }

    async scheduleTestNotification(): Promise<void> {
        const fireAt = new Date(Date.now() + 60 * 1000)
        await Notifications.scheduleNotificationAsync({
            content: {
                title: i18n.t('notifications.testTitle'),
                body: i18n.t('notifications.testBody'),
                sound: true
            },
            trigger: {
                seconds: 60,
                repeats: false
            }
        })
    }
}
