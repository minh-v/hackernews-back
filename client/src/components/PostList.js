import { List } from "antd"
import Post from "./Post"
import { Divider } from "antd"

//given posts json, display them all with antd list
const PostList = ({ posts }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={posts}
      renderItem={(item) => {
        return (
          <div>
            <Post post={item} /> <Divider />
          </div>
        )
      }}
    />
  )
}

export default PostList
