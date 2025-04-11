interface Iresource {
    id: string;
    name: string;
    fetchAll(): Promise<Array<Iresource>>;
    display(): void;
}

export type {Iresource};