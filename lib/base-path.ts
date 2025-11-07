const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? ""
const normalizedBasePath =
  rawBasePath && rawBasePath !== "/"
    ? rawBasePath.startsWith("/")
      ? rawBasePath.replace(/\/$/, "")
      : `/${rawBasePath.replace(/\/$/, "")}`
    : ""

export const getBasePath = () => normalizedBasePath

export const withBasePath = (path: string) => {
  if (!path || !path.startsWith("/") || !normalizedBasePath) {
    return path
  }
  return `${normalizedBasePath}${path}`
}
