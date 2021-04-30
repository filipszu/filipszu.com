export interface ISerializablePostAttributes{
    date?: string;
    title?: string;
    tags?: string[];
    category?: string;
    previewLength?: number;
}

export default interface ISerializablePost{
    body: string;
    attributes: ISerializablePostAttributes;
    slug: string;
    previewLength: number;
}