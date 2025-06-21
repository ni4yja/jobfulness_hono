import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Welcome to the Jobfulness API 👋')
})

export default app
