import { useUser } from "../lib/user"
import { useHistory } from "react-router"
import PostList from "../components/PostList"
import { SUBSCRIBE_POSTS } from "../lib/queries"
import { useSubscription } from "@apollo/client"
import { LINKS_PER_PAGE } from "../lib/constants"
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons"
import { Empty, Button } from "antd"

const New = () => {
  let user = useUser()
  const history = useHistory()

  const pageIndexParams = history.location.pathname.split("/") //splitting up url params
  const page = parseInt(pageIndexParams[pageIndexParams.length - 1]) //page number

  const offset = (page - 1) * LINKS_PER_PAGE
  const limit = LINKS_PER_PAGE
  const orderBy = { createdAt: "desc" }

  const { data, loading } = useSubscription(SUBSCRIBE_POSTS, {
    variables: { user_issuer: user ? user?.issuer : "", offset: offset, limit: limit, order: orderBy, search: "" },
  })

  if (loading || !data) return <div>loading...</div>
  if (data.posts.length === 0)
    return (
      <div>
        <Empty />
        <span
          className="previous-button"
          onClick={() => {
            if (page > 1) {
              history.push(`/new/${page - 1}`)
            }
          }}
        >
          <Button>
            <ArrowLeftOutlined style={{ fontSize: "20px" }} />
          </Button>
        </span>
      </div>
    )
  else
    return (
      <div>
        <PostList posts={data.posts} page={page} sort={"new"} pageIndex={offset} />
      </div>
    )
}

export default New
