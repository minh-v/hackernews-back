import { GET_ALL_POSTS } from "../lib/queries"
import { useQuery, useLazyQuery } from "@apollo/client"
import Post from "./Post"
import { timeDifferenceForDate } from "../utils/timeDifference"
import { List } from "antd"
import { GET_USERNAME } from "../lib/queries"

//query all posts
const PostList = () => {
  const { data, error, loading } = useQuery(GET_ALL_POSTS)

  if (loading) return <div>loading...</div>
  //console.log(data)
  return (
    // <div>
    //   {data.posts.map((post) => {
    //     return <Post key={post.id} post={post} />
    //   })}
    // </div>
    <List
      itemLayout="horizontal"
      dataSource={data.posts}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            title={
              <a href={`//${item.url}`}>
                {item.title} ({item.url})
              </a>
            }
            description={`by ${item.user.username} ${timeDifferenceForDate(item.createdAt)}`}
          />
        </List.Item>
      )}
    />
  )
}

export default PostList
