export const urlContains = (url, parameter) => {
  return url.includes(parameter)
}

export const getHostName = (url) => {
  return url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split("/")[0]
}
