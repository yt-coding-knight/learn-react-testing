import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import App from "./App"

describe("App component", () => {
  it("when form is empry, buton should disable", () => {
    render(<App />)

    const buttonEl = screen.getByRole("button", { name: /login/i })
    expect(buttonEl).toBeDisabled()
  })

  it("when form is fill, buton should not disable", async () => {
    render(<App />)

    const inputEmail = screen.getByRole("textbox")
    const inputPassword = screen.getByPlaceholderText(/enter password/i)
    const buttonEl = screen.getByRole("button", { name: /login/i })

    await userEvent.type(inputEmail, "saya")
    await userEvent.type(inputPassword, "123")

    expect(buttonEl).not.toBeDisabled()
  })

  it("when email format wrong, should show error message", async () => {
    render(<App />)

    const inputEmail = screen.getByRole("textbox")
    const inputPassword = screen.getByPlaceholderText(/enter password/i)
    const buttonEl = screen.getByRole("button", { name: /login/i })

    await userEvent.type(inputEmail, "saya")
    await userEvent.type(inputPassword, "123")

    await userEvent.click(buttonEl)

    expect(inputEmail).toBeInvalid()
  })

  it("when user not register, should show error message", async () => {
    render(<App />)

    const inputEmail = screen.getByRole("textbox")
    const inputPassword = screen.getByPlaceholderText(/enter password/i)
    const buttonEl = screen.getByRole("button", { name: /login/i })

    await userEvent.type(inputEmail, "saya@mail.com")
    await userEvent.type(inputPassword, "123")

    await userEvent.click(buttonEl)

    const spanEl = screen.getByText(/user not register/i)
    expect(spanEl).toBeInTheDocument()
  })

  it("when login succes, should not show error message", async () => {
    render(<App />)

    const inputEmail = screen.getByRole("textbox")
    const inputPassword = screen.getByPlaceholderText(/enter password/i)
    const buttonEl = screen.getByRole("button", { name: /login/i })

    await userEvent.type(inputEmail, "kamu@mail.com")
    await userEvent.type(inputPassword, "123")

    await userEvent.click(buttonEl)

    const spanEl = screen.getByRole("alert")
    expect(spanEl).toHaveTextContent("")
  })
})
