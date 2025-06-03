import {Brew, BrewState} from '@/models/brew'

export interface BrewServiceInterface {
    fetchBrews(): Promise<Brew[]>

    getBrewById(id: number): Promise<Brew | null>

    addBrew(brew: Brew): Promise<void>

    updateBrew(brew: Brew): Promise<void>

    deleteBrew(id: number): Promise<void>
}

class MockBrewService implements BrewServiceInterface {
    private brews: Brew[] = []

    constructor() {
        const today = new Date()
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)
        const fiveDaysAgo = new Date(today)
        fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5)
        const tenDaysAgo = new Date(today)
        tenDaysAgo.setDate(tenDaysAgo.getDate() - 10)
        const fifteenDaysAgo = new Date(today)
        fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15)
        const twoDaysFromNow = new Date(today)
        twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2)
        const fourteenDaysFromNow = new Date(today)
        fourteenDaysFromNow.setDate(fourteenDaysFromNow.getDate() + 14)

        this.brews = [
            new Brew({
                id: 1,
                name: 'Yesterday’s Starter',
                createdAt: yesterday,
                state: BrewState.FirstFermentation,
                firstFermentationEnd: fourteenDaysFromNow,
            }),
            new Brew({
                id: 2,
                name: 'Today’s F1 Target',
                createdAt: tenDaysAgo,
                state: BrewState.FirstFermentation,
                firstFermentationEnd: today,
            }),
            new Brew({
                id: 3,
                name: 'F2 In Progress',
                createdAt: tenDaysAgo,
                state: BrewState.SecondFermentation,
                firstFermentationEnd: fiveDaysAgo,
                secondFermentationEnd: twoDaysFromNow,
            }),
            new Brew({
                id: 4,
                name: 'Completed Batch',
                createdAt: fifteenDaysAgo,
                state: BrewState.Bottled,
                firstFermentationEnd: tenDaysAgo,
                secondFermentationEnd: fiveDaysAgo,
                notes: 'Tastes great—bottled 5 days ago and stored cold.',
            }),
            new Brew({
                id: 5,
                name: 'Failed Attempt',
                createdAt: tenDaysAgo,
                state: BrewState.Failed,
                notes: 'Mold appeared midway through F1.',
            }),
        ]
    }

    async fetchBrews(): Promise<Brew[]> {
        return [...this.brews]
    }

    async getBrewById(id: number): Promise<Brew | null> {
        const found = this.brews.find((b) => b.id === id)
        return found ?? null
    }

    async addBrew(brew: Brew): Promise<void> {
        this.brews.push(brew)
    }

    async updateBrew(updated: Brew): Promise<void> {
        const index = this.brews.findIndex((b) => b.id === updated.id)
        if (index >= 0) {
            this.brews[index] = updated
        }
    }

    async deleteBrew(id: number): Promise<void> {
        this.brews = this.brews.filter((b) => b.id !== id)
    }
}

export const BrewService: BrewServiceInterface = new MockBrewService()
