import { timeDifferenceForDate } from "../utils/timeDifference"
import { List } from "antd"

const PostList = ({ posts }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={posts}
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
