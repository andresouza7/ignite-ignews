import Prismic from "@prismicio/client"

export function getPrismicClient(req?: any) {
  const prismic = Prismic.client(
    "https://ignews-ac.cdn.prismic.io/api/v2", {
    req,
    accessToken: process.env.PRISMIC_ACCESS_TOKEN
  }
  )

  return prismic
}