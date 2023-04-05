import { render, screen } from "@testing-library/react"
import Button from "./Button"

describe("Button component", () => {
  it("should render label correctly", () => {
    const label = "test"

    render(<Button label={label} />)

    const buttonEl = screen.getByRole("button")
    expect(buttonEl).toHaveTextContent("test")
  })
})
