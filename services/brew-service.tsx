import {Brew, BrewState} from '@/models/brew'
import {queryClient} from '@/services/query-client'
import {QueryKey, useQuery} from '@tanstack/react-query'

export const BREWS_QUERY_KEY: QueryKey = ['brews']

export interface BrewServiceInterface {
    allBrews(): ReturnType<typeof useQuery<Brew[]>>

    getBrewById(id: number): Promise<Brew | null>

    addBrew(brew: Brew): Promise<void>

    updateBrew(brew: Brew): Promise<void>

    deleteBrew(id: number): Promise<void>
}

class MockBrewService implements BrewServiceInterface {
    private brews: Brew[] = []

    constructor() {
        const today = new Date()
        const d = (days: number) => new Date(today.getTime() + days * 86_400_000)

        this.brews = [
            new Brew({
                id: 1,
                name: 'Already Started',
                createdAt: d(-5),
                state: BrewState.F1,
                firstFermentationEnd: d(14)
            }),
            new Brew({
                id: 2,
                name: 'Today’s F2 Target',
                createdAt: d(-18),
                state: BrewState.F2,
                firstFermentationEnd: d(-6),
                secondFermentationEnd: d(0)
            }),
            new Brew({
                id: 3,
                name: 'F2 In Progress',
                createdAt: d(-10),
                state: BrewState.F2,
                firstFermentationEnd: d(-5),
                secondFermentationEnd: d(2)
            }),
            new Brew({
                id: 4,
                name: 'Today’s F1 Target',
                createdAt: d(-10),
                state: BrewState.F1,
                firstFermentationEnd: d(0)
            }),
            new Brew({
                id: 5,
                name: 'Completed Batch',
                createdAt: d(-15),
                state: BrewState.Bottled,
                firstFermentationEnd: d(-10),
                secondFermentationEnd: d(-5),
                notes: 'Tastes great—bottled 5 days ago and stored cold.'
            }),
            new Brew({
                id: 6,
                name: 'Failed Attempt',
                createdAt: d(-10),
                state: BrewState.Failed,
                notes: 'Mold appeared midway through F1.'
            }),
        ]

        this.updateBrewData()
    }

    private updateBrewData() {
        queryClient.invalidateQueries({queryKey: BREWS_QUERY_KEY})
    }

    private createNextId() {
        return this.brews.length ? Math.max(...this.brews.map(b => b.id)) + 1 : 1
    }

    async fetchBrews(): Promise<Brew[]> {
        return [...this.brews]
    }

    async getBrewById(id: number): Promise<Brew | null> {
        const found = this.brews.find((b) => b.id === id)
        return found ?? null
    }

    async addBrew(brew: Brew): Promise<void> {
        if (brew.id === undefined) {
            brew.id = this.createNextId()
        }

        this.brews.push(brew)
        this.updateBrewData()
    }

    async updateBrew(updated: Brew): Promise<void> {
        const index = this.brews.findIndex((b) => b.id === updated.id)
        if (index >= 0) {
            this.brews[index] = updated
            this.updateBrewData()
        }
    }

    async deleteBrew(id: number): Promise<void> {
        this.brews = this.brews.filter((b) => b.id !== id)
        this.updateBrewData()
    }

    allBrews() {
        return useQuery({
            queryKey: BREWS_QUERY_KEY,
            queryFn: () => this.fetchBrews(),
        })
    }
}

export const BrewService: BrewServiceInterface = new MockBrewService()
