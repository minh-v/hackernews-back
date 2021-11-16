import { List } from "antd"
import Post from "./Post"
import { useState } from "react"
import { useHistory } from "react-router"
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { useMediaQuery } from "react-responsive"
import Side from "./Side"
//given posts json, display them all with antd list
const PostList = ({ posts, page, sort, pageIndex }) => {
  //graphql call here?
  const history = useHistory()
  console.log(history.location)

  let prevLink, nextLink

  if (history.location.pathname.includes("search")) {
    const newSearch = history.location.search.split("/")[0] //base pathname url before first /
    const npage = parseInt(history.location.search.split("/")[1]) //current page number
    const prevPage = npage - 1
    const nextPage = npage + 1
    prevLink = history.location.pathname + newSearch + "/" + prevPage
    nextLink = history.location.pathname + newSearch + "/" + nextPage
    console.log(prevLink)
  } else {
    const pageIndexParams = history.location.pathname.split("/") //splitting up url params
    console.log(pageIndexParams)
    const npage = parseInt(pageIndexParams[pageIndexParams.length - 1]) //page number
    const prevPage = npage - 1
    const nextPage = npage + 1
    const order = pageIndexParams[pageIndexParams.length - 2] //page sort
    prevLink = "/" + order + "/" + (npage - 1)
    nextLink = "/" + order + "/" + (npage + 1)
  }

  const [selected, setSelected] = useState(null) //current selected post id
  const minBreakpoint = useMediaQuery({ query: "(max-width: 768px" })

  return (
    <div>
      {minBreakpoint && (
        <div clasName="small-side">
          <Side />
        </div>
      )}
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
                history.push(prevLink)
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
            history.push(nextLink)
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
