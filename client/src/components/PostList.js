import { List } from "antd"
import Post from "./Post"
import { useState } from "react"

//given posts json, display them all with antd list
const PostList = ({ posts }) => {
  const [selected, setSelected] = useState(null) //current selected post id

  const onSelect = (id) => {
    setSelected(id)
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={posts}
      renderItem={(item) => {
        return (
          <div>
            <div className="small-spacer"></div>
            <Post post={item} key={item.id} selected={selected === item.id} setSelected={setSelected} />
          </div>
        )
      }}
    />
  )
}

export default PostList
