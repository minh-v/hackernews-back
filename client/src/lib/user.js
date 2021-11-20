import useSWR from "swr"
import { REACT_APP_API_URL } from "./constants"

const fetchUser = (url) => fetch(url, { credentials: "include" }).then((res) => res.json())

export function useUser() {
  const { data, error } = useSWR(`${REACT_APP_API_URL}/user`, fetchUser)
  return !data && !error ? { loading: true } : data && data?.user
}
