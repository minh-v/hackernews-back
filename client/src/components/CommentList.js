import { Comment, List, Input, Form, Button } from "antd"
import CommentComponent from "./CommentComponent"

const CommentList = ({ comments }) => {
  return (
    <div>
      <List
        className="comment-list"
        // header={`${comments.length} replies`}
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={(comment) => <CommentComponent comment={comment} />}
      />
      ,
    </div>
  )
}

export default CommentList
