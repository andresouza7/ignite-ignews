
import { render, screen } from "@testing-library/react"
import Post, { getStaticProps } from "../../pages/posts/preview/[slug]"
import { mocked } from "ts-jest/utils"
import { getSession, useSession } from "next-auth/client"
import { getPrismicClient } from "../../services/prismic"
import { useRouter } from "next/router"

const post = {
  slug: "my-new-post",
  title: "My new post",
  content: "<p>Post content</p>",
  updatedAt: "10 de Abril"
}

jest.mock("next-auth/client")
jest.mock("next/router")

describe("Post preview page", () => {
  it("should render correctly", () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])

    render(<Post post={post} />)

    expect(screen.getByText("My new post")).toBeInTheDocument()
    expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument()
  })

  it("redirects to full post if user has a valid subscription", async () => {
    const useSessionMocked = mocked(useSession)
    const useRouterMocked = mocked(useRouter)
    const pushMocked = jest.fn()

    useSessionMocked.mockReturnValueOnce([{
      activeSubscription: "fake-active-subscription"
    }, false] as any)

    useRouterMocked.mockReturnValueOnce({
      push: pushMocked
    } as any)

    render(<Post post={post} />)

    expect(pushMocked).toHaveBeenCalledWith("/posts/my-new-post")
  })

  // it("loads initial data", async () => {
  //   const getSessionMocked = mocked(getSession)
  //   const getPrismicClientMocked = mocked(getPrismicClient)

  //   getSessionMocked.mockResolvedValueOnce({
  //     activeSubscription: "fake-active-subscription"
  //   } as any)

  //   getPrismicClientMocked.mockReturnValueOnce({
  //     getByUID: jest.fn().mockResolvedValueOnce({
  //       data: {
  //         title: [
  //           { type: "heading", text: "My new post" }
  //         ],
  //         content: [
  //           { type: "paragraph", text: "Post content" }
  //         ],
  //       },
  //       last_publication_date: "04-01-2021"
  //     })
  //   } as any)

  //   const response = await getServerSideProps({} as any)

  //   expect(response).toEqual(
  //     expect.objectContaining({
  //       props: {
  //         post: {
  //           slug: "my-new-post",
  //           title: "My new post",
  //           content: "<p>Post content</p>",
  //           updatedAt: "01 de abril de 2021"
  //         }
  //       }
  //     })
  //   )
  // })
})