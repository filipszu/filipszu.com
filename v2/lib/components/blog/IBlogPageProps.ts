import ISerializablePost from "../../models/ISerializablePost";

export default interface IBlogPageProps{
    allSeriaziablePosts?: ISerializablePost[],
    slug: string[]
}