import Post from "../components/Post"
import CommentComponent from "../components/CommentComponent"
import { GET_COMMENTS_FROM_USERNAME } from "../lib/queries"
import { useQuery } from "@apollo/client"
import { useUser } from "../lib/user"
import { Divider, Empty } from "antd"
import { LINKS_PER_PAGE } from "../lib/constants"

const Comments = (props) => {
  const user = useUser()

  const pieces = props.location.pathname.split("/")
  const page = pieces[pieces.length - 1]
  const username = pieces[pieces.length - 2]

  const offset = (page - 1) * LINKS_PER_PAGE
  const limit = LINKS_PER_PAGE

  const { data, loading } = useQuery(GET_COMMENTS_FROM_USERNAME, {
    variables: {
      username: username,
      user_issuer: user ? user?.issuer : "",
      offset: offset,
      limit: limit,
    },
  })
  if (loading) return <div>loading..</div>
  return (
    <div>
      {data.comments.length > 0 ? (
        data.comments.map((comment) => {
          return (
            <div>
              <Post post={comment.post} />
              <CommentComponent comment={comment} comments={comment} />
              <Divider />
            </div>
          )
        })
      ) : (
        <div>
          <Empty />
        </div>
      )}
    </div>
  )
}

export default Comments
