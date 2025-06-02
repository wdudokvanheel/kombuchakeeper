export enum BrewState {
    FirstFermentation = 'F1',
    SecondFermentation = 'F2',
    Bottled = 'Bottled',
    Failed = 'Failed',
}

export class Brew {
    id?: number;
    createdAt: Date;
    state: BrewState;
    name: string;
    firstFermentationEnd?: Date;
    secondFermentationEnd?: Date;
    notes?: string;

    constructor(overrides: Partial<Brew> = {}) {
        this.id = overrides.id;
        this.name = overrides.name ?? 'Unnamed';
        this.createdAt = overrides.createdAt ?? new Date();
        this.state = overrides.state ?? BrewState.FirstFermentation;
        this.firstFermentationEnd = overrides.firstFermentationEnd;
        this.secondFermentationEnd = overrides.secondFermentationEnd;
        this.notes = overrides.notes;
    }

    // Days left in current fermentation
    getDaysLeft(): number | undefined {
        const now = new Date();
        let endDate: Date | undefined;

        switch (this.state) {
            case BrewState.FirstFermentation:
                endDate = this.firstFermentationEnd;
                break;
            case BrewState.SecondFermentation:
                endDate = this.secondFermentationEnd;
                break;
            case BrewState.Bottled:
            case BrewState.Failed:
                return 0;
        }

        if (!endDate) return undefined;
        const diffMs = endDate.getTime() - now.getTime();
        if (diffMs <= 0) return 0;
        const msPerDay = 1000 * 60 * 60 * 24;
        return Math.ceil(diffMs / msPerDay);
    }

    // Days since the start of current fermentation
    getDaysSinceStart(): number | undefined {
        const now = new Date();
        let startDate: Date | undefined;

        switch (this.state) {
            case BrewState.FirstFermentation:
                startDate = this.createdAt;
                break;
            case BrewState.SecondFermentation:
                startDate = this.firstFermentationEnd;
                break;
            case BrewState.Bottled:
            case BrewState.Failed:
                return undefined;
        }

        if (!startDate) return undefined;
        const diffMs = now.getTime() - startDate.getTime();
        if (diffMs < 0) return 0;
        const msPerDay = 1000 * 60 * 60 * 24;
        return Math.floor(diffMs / msPerDay);
    }

    // Total planned duration of the current fermentation
    getCurrentFermentationDuration(): number | undefined {
        let startDate: Date | undefined;
        let endDate: Date | undefined;

        switch (this.state) {
            case BrewState.FirstFermentation:
                startDate = this.createdAt;
                endDate = this.firstFermentationEnd;
                break;
            case BrewState.SecondFermentation:
                startDate = this.firstFermentationEnd;
                endDate = this.secondFermentationEnd;
                break;
            case BrewState.Bottled:
            case BrewState.Failed:
                return undefined;
        }

        if (!startDate || !endDate) return undefined;
        const diffMs = endDate.getTime() - startDate.getTime();
        if (diffMs <= 0) return 0;
        const msPerDay = 1000 * 60 * 60 * 24;
        return Math.ceil(diffMs / msPerDay);
    }

    // Check if the current fermentation is complete (end day is today or earlier)
    isCurrentFermentationComplete(): boolean {
        const now = new Date();

        switch (this.state) {
            case BrewState.FirstFermentation: {
                const endDate = this.firstFermentationEnd;
                if (!endDate) return false;
                const endDay = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
                const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                return endDay <= today;
            }
            case BrewState.SecondFermentation: {
                const endDate = this.secondFermentationEnd;
                if (!endDate) return false;
                const endDay = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
                const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                return endDay <= today;
            }
            case BrewState.Bottled:
            case BrewState.Failed:
                return true;
        }
    }
}
