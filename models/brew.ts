export interface Brew {
    id: number;
    name: string;
    created: string;
    notes?: string;
}

export function createBrew(
    overrides: Partial<Brew> = {}
): Brew {
    return {
        name: 'Unnamed',
        created: new Date().toISOString(),
        ...overrides,
    } as Brew;
}
