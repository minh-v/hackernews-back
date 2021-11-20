import { List } from "antd"
import Post from "./Post"
import { useState } from "react"
import { useHistory } from "react-router"
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { useMediaQuery } from "react-responsive"
import Side from "./Side"
import { LINKS_PER_PAGE } from "../lib/constants"
import { urlContains } from "../utils/utils"
//given posts json, display them all with antd list

const PostList = ({ posts, pageIndex }) => {
  const SEARCH = "search"
  const SUBMITTED = "submitted"
  const COMMENTS = "comments"
  //graphql call here?
  const history = useHistory()

  const url = history.location.pathname

  let prevLink, nextLink, pageNumber

  //calc prev and next links for navigation buttons
  //move to different function?
  if (urlContains(url, SEARCH)) {
    const newSearch = history.location.search.split("/")[0] //base pathname url before first /
    pageNumber = parseInt(history.location.search.split("/")[1]) //current page number
    const prevPage = pageNumber - 1
    const nextPage = pageNumber + 1
    prevLink = url + newSearch + "/" + prevPage
    nextLink = url + newSearch + "/" + nextPage
  } else if (urlContains(url, SUBMITTED) || urlContains(url, COMMENTS)) {
    const pageIndexParams = url.split("/") //splitting up url params
    pageNumber = parseInt(pageIndexParams[pageIndexParams.length - 1]) //page number
    const username = pageIndexParams[pageIndexParams.length - 2] //username
    prevLink = "/submitted/" + username + "/" + (pageNumber - 1)
    nextLink = "/submitted/" + username + "/" + (pageNumber + 1)
  } else {
    const pageIndexParams = url.split("/") //splitting up url params
    pageNumber = parseInt(pageIndexParams[pageIndexParams.length - 1]) //page number
    const order = pageIndexParams[pageIndexParams.length - 2] //page sort
    prevLink = "/" + order + "/" + (pageNumber - 1)
    nextLink = "/" + order + "/" + (pageNumber + 1)
  }

  const [selected, setSelected] = useState(null) //current selected post id
  const minBreakpoint = useMediaQuery({ query: "(max-width: 768px" })

  return (
    <div>
      {minBreakpoint && !urlContains(url, SEARCH) && (
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
        {pageNumber > 1 ? (
          <div
            className="previous-button"
            onClick={() => {
              if (pageNumber > 1) {
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
