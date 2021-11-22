import useSWR from "swr"
import config from "../config"

const fetchUser = (url) => fetch(url, { credentials: "include" }).then((res) => res.json())

export function useUser() {
  const { data, error } = useSWR(`${config.api}/user`, fetchUser)
  return !data && !error ? { loading: true } : data && data?.user
}
