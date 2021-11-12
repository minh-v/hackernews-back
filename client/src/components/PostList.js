import { List } from "antd"
import Post from "./Post"
import { useState } from "react"
import { useHistory } from "react-router"
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons"
import { Button } from "antd"
//given posts json, display them all with antd list
const PostList = ({ posts, page, sort, pageIndex }) => {
  //graphql call here?
  const history = useHistory()
  const [selected, setSelected] = useState(null) //current selected post id

  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={posts}
        renderItem={(item) => {
          return (
            <div>
              <div className="small-spacer"></div>
              <Post
                post={item}
                key={item.id}
                selected={selected === item.id}
                setSelected={setSelected}
                index={posts.indexOf(item) + pageIndex + 1}
              />
            </div>
          )
        }}
      />
      <div className="navigation-button">
        {page > 1 ? (
          <div
            className="previous-button"
            onClick={() => {
              if (page > 1) {
                history.push(`/${sort}/${page - 1}`)
              }
            }}
          >
            <Button>
              <ArrowLeftOutlined style={{ fontSize: "20px" }} />
            </Button>
          </div>
        ) : null}
        <div
          className="next-button"
          onClick={() => {
            history.push(`/${sort}/${page + 1}`)
          }}
        >
          <Button>
            <ArrowRightOutlined style={{ fontSize: "20px" }} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PostList
