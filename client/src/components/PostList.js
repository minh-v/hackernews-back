import { List } from "antd"
import Post from "./Post"
import { useState } from "react"
import { useHistory } from "react-router"
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { useMediaQuery } from "react-responsive"
import Side from "./Side"
import { LINKS_PER_PAGE } from "../lib/constants"
//given posts json, display them all with antd list
const PostList = ({ posts, pageIndex }) => {
  //graphql call here?
  const history = useHistory()
  console.log(history.location)

  let prevLink, nextLink, npage

  if (history.location.pathname.includes("search")) {
    const newSearch = history.location.search.split("/")[0] //base pathname url before first /
    npage = parseInt(history.location.search.split("/")[1]) //current page number
    const prevPage = npage - 1
    const nextPage = npage + 1
    prevLink = history.location.pathname + newSearch + "/" + prevPage
    nextLink = history.location.pathname + newSearch + "/" + nextPage
    console.log(prevLink)
  } else if (history.location.pathname.includes("submitted")) {
    const pageIndexParams = history.location.pathname.split("/") //splitting up url params
    console.log(pageIndexParams)
    npage = parseInt(pageIndexParams[pageIndexParams.length - 1]) //page number
    const username = pageIndexParams[pageIndexParams.length - 2] //username
    prevLink = "/submitted/" + username + "/" + (npage - 1)
    nextLink = "/submitted/" + username + "/" + (npage + 1)
  } else {
    const pageIndexParams = history.location.pathname.split("/") //splitting up url params
    console.log("pageIndexParams: ", pageIndexParams)
    npage = parseInt(pageIndexParams[pageIndexParams.length - 1]) //page number
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
        {npage > 1 ? (
          <div
            className="previous-button"
            onClick={() => {
              if (npage > 1) {
                history.push(prevLink)
              }
            }}
          >
            <Button>
              <ArrowLeftOutlined style={{ fontSize: "20px" }} />
            </Button>
          </div>
        ) : null}
        {posts.length === LINKS_PER_PAGE ? (
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
        ) : null}
      </div>
    </div>
  )
}

export default PostList
