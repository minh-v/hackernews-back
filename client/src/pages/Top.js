import { useEffect } from "react"
import { useUser } from "../lib/user"
import PostList from "../components/PostList"
import { GET_POSTS_BY_VOTE } from "../lib/queries"
import { useSubscription } from "@apollo/client"

const Top = () => {
  let user = useUser()

  const { data, loading } = useSubscription(GET_POSTS_BY_VOTE, { variables: { user_issuer: user ? user?.issuer : "" } })

  //fix issue where is post has no votes, aggregate sum of votes is null

  useEffect(() => {
    if (data) {
      data.posts.forEach((post) => {
        if (post.votes.aggregate.sum.value === null) {
          post.votes.aggregate.sum.value = 0
        }
      })
      data.posts.sort((a, b) => {
        return b.votes.aggregate.sum.value - a.votes.aggregate.sum.value
      })
    }
  }, [data])
  // console.log(data.posts)
  if (loading || !data) return <div>loading...</div>
  return (
    <div>
      <PostList posts={data.posts} />
    </div>
  )
}

export default Top
