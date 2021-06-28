
import { render, screen, fireEvent } from "@testing-library/react"
import { mocked } from "ts-jest/utils"
import { useSession, signIn } from "next-auth/client"
import { useRouter } from "next/router"
import SubscribeButton, { SessionProps } from "."

jest.mock("next-auth/client")
jest.mock("next/router")

describe("SubscribeButton component", () => {
  it("should render correctly", () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])

    render(<SubscribeButton />)

    expect(screen.getByText("Subscribe now")).toBeInTheDocument()
  })

  it("should trigger sign in pop up when not authenticated", () => {
    const signInMocked = mocked(signIn)
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])

    render(<SubscribeButton />)

    const subscriptionButton = screen.getByText("Subscribe now")

    fireEvent.click(subscriptionButton)

    expect(signInMocked).toHaveBeenCalled()
  })

  // it("should redirect to posts page if user has a subscription", () => {
  //   const useRouterMocked = mocked(useRouter)
  //   const useSessionMocked = mocked(useSession)
  //   const pushMocked = jest.fn()

  //   useSessionMocked.mockReturnValueOnce([
  //     {
  //       user: {
  //         name: "John Doe", email: "john.doe@net",
  //       },
  //       activeSubscription: "fake-subscription",
  //       expires: "fake-date"
  //     },
  //     false
  //   ] as SessionProps)

  //   useRouterMocked.mockReturnValueOnce({
  //     push: pushMocked
  //   } as any)

  //   render(<SubscribeButton />)

  //   const subscribeButton = screen.getByText("Subscribe now")

  //   fireEvent.click(subscribeButton)

  //   expect(pushMocked).toHaveBeenCalled()
  // })
})

