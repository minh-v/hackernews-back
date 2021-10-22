import { Button } from "antd"
import { Link } from "react-router-dom"

const Side = () => {
  return (
    <div className="side">
      <Link to="/submit">
        <Button> Submit link</Button>
      </Link>
    </div>
  )
}

export default Side
