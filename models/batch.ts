import {SmileyVariant} from "@/ui/graphics/smiley"

export type Rating = SmileyVariant | undefined

export enum BatchState {
    F1 = 'F1',
    F2 = 'F2',
    Complete = 'Complete',
    Failed = 'Failed',
}

export class Batch {
    id?: number
    createdAt: Date
    state: BatchState
    name: string
    firstFermentationEnd?: Date
    secondFermentationEnd?: Date
    notes?: string
    rating?: SmileyVariant

    constructor(overrides: Partial<Batch> = {}) {
        this.id = overrides.id
        this.name = overrides.name ?? 'Unnamed'
        this.createdAt = overrides.createdAt ?? new Date()
        this.state = overrides.state ?? BatchState.F1
        this.firstFermentationEnd = overrides.firstFermentationEnd
        this.secondFermentationEnd = overrides.secondFermentationEnd
        this.notes = overrides.notes
        this.rating = overrides.rating
    }

    // Days left in current fermentation
    getDaysLeft(): number | undefined {
        const now = new Date()
        let endDate: Date | undefined

        switch (this.state) {
            case BatchState.F1:
                endDate = this.firstFermentationEnd
                break
            case BatchState.F2:
                endDate = this.secondFermentationEnd
                break
            case BatchState.Complete:
            case BatchState.Failed:
                return 0
        }

        if (!endDate) {
            return undefined
        }
        const diffMs = endDate.getTime() - now.getTime()
        if (diffMs <= 0) {
            return 0
        }
        const msPerDay = 1000 * 60 * 60 * 24
        return Math.ceil(diffMs / msPerDay)
    }

    // Days since the start of current fermentation
    getDaysSinceStart(): number | undefined {
        const now = new Date()
        let startDate: Date | undefined

        switch (this.state) {
            case BatchState.F1:
                startDate = this.createdAt
                break
            case BatchState.F2:
                startDate = this.firstFermentationEnd
                break
            case BatchState.Complete:
            case BatchState.Failed:
                return undefined
        }

        if (!startDate) return undefined
        const diffMs = now.getTime() - startDate.getTime()
        if (diffMs < 0) return 0
        const msPerDay = 1000 * 60 * 60 * 24
        return Math.floor(diffMs / msPerDay)
    }

    // Total planned duration of the current fermentation
    getCurrentFermentationDuration(): number | undefined {
        let startDate: Date | undefined
        let endDate: Date | undefined

        switch (this.state) {
            case BatchState.F1:
                startDate = this.createdAt
                endDate = this.firstFermentationEnd
                break
            case BatchState.F2:
                startDate = this.firstFermentationEnd
                endDate = this.secondFermentationEnd
                break
            case BatchState.Complete:
            case BatchState.Failed:
                return undefined
        }

        if (!startDate || !endDate) return undefined
        const diffMs = endDate.getTime() - startDate.getTime()
        if (diffMs <= 0) return 0
        const msPerDay = 1000 * 60 * 60 * 24
        return Math.ceil(diffMs / msPerDay)
    }

    // Check if the current fermentation is complete (end day is today or earlier)
    isCurrentFermentationComplete(): boolean {
        const now = new Date()
        switch (this.state) {
            case BatchState.F1: {
                const endDate = this.firstFermentationEnd
                if (!endDate) {
                    return false
                }
                const endDay = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())
                const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
                return endDay <= today
            }
            case BatchState.F2: {
                const endDate = this.secondFermentationEnd
                if (!endDate) {
                    return false
                }
                const endDay = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())
                const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
                return endDay <= today
            }
            case BatchState.Complete:
            case BatchState.Failed:
                return true
        }
    }

    hasEnded(): boolean {
        return this.state === BatchState.Complete || this.state === BatchState.Failed
    }

    hasRating(): boolean {
        return this.rating !== undefined
    }

    hasFirstFermentationEnded(): boolean {
        return this.secondFermentationEnd != undefined && this.state != BatchState.F1
    }

    getFirstFermentationLength(): number | undefined {
        if (!this.firstFermentationEnd) {
            return undefined
        }
        const diffMs = this.firstFermentationEnd.getTime() - this.createdAt.getTime()
        if (diffMs <= 0) {
            return 0
        }
        const msPerDay = 1000 * 60 * 60 * 24
        return Math.ceil(diffMs / msPerDay)
    }

    getSecondFermentationLength(): number | undefined {
        if (!this.firstFermentationEnd || !this.secondFermentationEnd) {
            return undefined
        }
        const diffMs = this.secondFermentationEnd.getTime() - this.firstFermentationEnd.getTime()
        if (diffMs <= 0) {
            return 0
        }
        const msPerDay = 1000 * 60 * 60 * 24
        return Math.ceil(diffMs / msPerDay)
    }
}
