import CommentList from "../components/CommentList"
import Post from "../components/Post"
import CommentComponent from "../components/CommentComponent"
import { GET_USER_COMMENTS } from "../lib/queries"
import { useQuery } from "@apollo/client"
import { useUser } from "../lib/user"

const Comments = (props) => {
  const user = useUser()

  console.log(props.location.search.split("=")[1])
  const username = props.location.search.split("=")[1]

  const { data, loading } = useQuery(GET_USER_COMMENTS, {
    variables: {
      username: username,
      user_issuer: user ? user?.issuer : "",
    },
  })
  if (loading) return <div>loading..</div>
  return (
    <div>
      {data.comments.map((comment) => {
        return (
          <div>
            <Post post={comment.post} />
            <CommentComponent comment={comment} comments={comment} />
          </div>
        )
      })}
    </div>
  )
}

export default Comments
