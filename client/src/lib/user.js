import useSWR from "swr"

const fetchUser = (url) => fetch(url, { credentials: "include", withCredentials: true }).then((res) => res.json())

export function useUser() {
  const { data, error } = useSWR("http://localhost:3001/user", fetchUser)
  return !data && !error ? { loading: true } : data && data?.user
}
