interface Iresource {
    id: string;
    name: string;
    fetchAll(): Promise<Array<Iresource>>;
    display(): DocumentFragment;
}

export type {Iresource};