import { Button, Form, Input, Dropdown, Menu } from "antd"
import { SearchOutlined, DownOutlined } from "@ant-design/icons"
import { useHistory, Link } from "react-router-dom"
import PostList from "../components/PostList"
import { useQuery } from "@apollo/client"
import { SEARCH_POSTS_SORTED_NEW, SEARCH_POSTS_SORTED_TOP } from "../lib/queries"
import { useUser } from "../lib/user"
import { LINKS_PER_PAGE } from "../lib/constants"
import { ArrowLeftOutlined } from "@ant-design/icons"
import { Empty } from "antd"

const Search = (props) => {
  const user = useUser()
  let history = useHistory()

  console.log("search prev button fixL: ", history.location)
  const urlPieces = props.location.search.split("&") //split the url up according to &

  let page = 1 //page number
  let order = "new"

  const pageIndexParams = urlPieces[0].split("/") //splitting up url params
  if (urlPieces.length > 1) {
    page = urlPieces[1].split("=")[1].split("/")[1]
    order = urlPieces[1].split("=")[1].split("/")[0]
  } else {
    page = parseInt(pageIndexParams[pageIndexParams.length - 1])
  }

  const search = pageIndexParams[0].split("=")[1] //search query is always here

  const SEARCH_QUERY = order === "new" ? SEARCH_POSTS_SORTED_NEW : SEARCH_POSTS_SORTED_TOP

  const offset = (page - 1) * LINKS_PER_PAGE
  const limit = LINKS_PER_PAGE

  const { data, loading } = useQuery(SEARCH_QUERY, {
    variables: { user_issuer: user ? user?.issuer : "", offset: offset, limit: limit, search: search },
  })

  const menu = (
    <Menu>
      <Link to={`${urlPieces[0]}/1`}>
        <Menu.Item key="new">new</Menu.Item>
      </Link>
      <Link to={`${pageIndexParams[0]}&sort=top/1`}>
        <Menu.Item key="top">top</Menu.Item>
      </Link>
    </Menu>
  )

  const handleSubmit = (values) => {
    const { search } = values

    history.push(`/search?q=${search}/1`)
  }
  if (loading) return <div>loading..</div>
  if (data.posts.length === 0)
    return (
      <div>
        <Empty />
        <span
          className="previous-button"
          onClick={() => {
            if (page > 1) {
              history.push(`/search${history.location.search.split("/")[0]}/${page - 1}`)
            }
          }}
        >
          <Button>
            <ArrowLeftOutlined style={{ fontSize: "20px" }} />
          </Button>
        </span>
      </div>
    )
  return (
    <div>
      <Form onFinish={handleSubmit} className="search-form">
        <Form.Item
          // label="Search"
          name="search"
          rules={[
            {
              required: true,
              message: "Please no empty",
            },
          ]}
          initialValue={search}
        >
          <Input placeholder="search" value="forceds" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" shape="circle" icon={<SearchOutlined />} />
        </Form.Item>
      </Form>
      <span className="comment-sort">
        sorted by{" "}
        <Dropdown overlay={menu} trigger={["click"]}>
          <span className="comment-select">
            {order} <DownOutlined />
          </span>
        </Dropdown>
      </span>
      <div>
        <PostList posts={data?.posts} page={page} sort={order} pageIndex={offset} />
      </div>
    </div>
  )
}

export default Search
