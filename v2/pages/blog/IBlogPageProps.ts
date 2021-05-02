import ISerializablePost from "../../lib/models/ISerializablePost";

export default interface IBlogPageProps{
    allSeriaziablePosts?: ISerializablePost[],
    slug: string[]
}