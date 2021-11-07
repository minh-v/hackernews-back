import { List } from "antd"
import Post from "./Post"

//given posts json, display them all with antd list
const PostList = ({ posts }) => {
  return <List itemLayout="horizontal" dataSource={posts} renderItem={(item) => <Post post={item} />} />
}

export default PostList
