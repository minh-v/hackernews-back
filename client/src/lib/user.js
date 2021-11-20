import useSWR from "swr"
import { API_URL } from "./constants"

const fetchUser = (url) => fetch(url, { credentials: "include" }).then((res) => res.json())

export function useUser() {
  const { data, error } = useSWR(`${API_URL}/login`, fetchUser)
  return !data && !error ? { loading: true } : data && data?.user
}
