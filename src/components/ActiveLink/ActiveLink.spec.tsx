
import { render } from "@testing-library/react"
import { ActiveLink } from "."

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        asPath: "/"
      }
    }
  }
})

describe("ActiveLink component", () => {
  it("should render correctly", () => {
    const { debug, getByText } = render(
      <ActiveLink href="/" activeLinkClassName="active">
        <a>Home</a>
      </ActiveLink>
    )

    expect(getByText("Home")).toBeInTheDocument()
  })

  it("should receive active class", () => {
    const { debug, getByText } = render(
      <ActiveLink href="/" activeLinkClassName="active">
        <a>Home</a>
      </ActiveLink>
    )

    expect(getByText("Home")).toHaveClass("active")
  })
})

