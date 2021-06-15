
import { render, screen } from "@testing-library/react"
import { mocked } from "ts-jest/utils"
import { useSession } from "next-auth/client"
import AuthButton from "."

jest.mock("next-auth/client")

describe("AuthButton component", () => {
  it("should render correctly when use IS NOT authenticated", () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])

    render(
      <AuthButton />
    )

    expect(screen.getByText("Sign in with Github")).toBeInTheDocument()
  })

  it("should render correctly when use is authenticated", () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([{
      user: {
        name: "John Doe",
      },
      expires: "1000000000"
    }, false])

    render(
      <AuthButton />
    )

    expect(screen.getByText("John Doe")).toBeInTheDocument()
  })
})

