import { List } from "antd"
import CommentComponent from "./CommentComponent"

const CommentList = ({ comments, baseComments }) => {
  return (
    <div>
      <List
        className="comment-list"
        itemLayout="horizontal"
        dataSource={baseComments}
        renderItem={(comment) => {
          return (
            <CommentComponent
              comment={comment} //the commnet itself
              comments={comments} //array of all comments
              children={comments.filter((c) => c.parent_id === comment.id)}
            />
          )
        }}
      />
    </div>
  )
}

export default CommentList
