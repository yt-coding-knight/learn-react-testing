import { rest } from "msw"

export const handler = [
  rest.get("https://jsonplaceholder.typicode.com/users/1", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ email: "kamu@mail.com" }))
  }),
]
