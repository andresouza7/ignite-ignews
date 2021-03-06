
import { render } from "@testing-library/react"
import { Header } from "."

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        asPath: "/"
      }
    }
  }
})

jest.mock("next-auth/client", () => {
  return {
    useSession() {
      return [null, false]
    }
  }
})

describe("Header component", () => {
  it("should render correctly", () => {
    const { debug, getByText } = render(
      <Header />
    )

    expect(getByText("Home")).toBeInTheDocument()
    expect(getByText("Posts")).toBeInTheDocument()
  })
})

