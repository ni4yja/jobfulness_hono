import { Hono } from 'hono'
import { cors } from 'hono/cors'
import 'dotenv/config'

const app = new Hono()

app.use('*', cors())

app.get('/api/jobs', async (c) => {
  const token = process.env.FINDWORK_API_KEY
  if (!token) {
    return c.json({ error: 'API key missing' }, { status: 500 })
  }

  const query = c.req.query()
  const url = new URL('https://findwork.dev/api/jobs')
  Object.entries(query).forEach(([key, value]) => {
    url.searchParams.set(key, value)
  })

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Token ${token}`,
    },
  })

  const data = await response.json()
  return c.json(data)
})

export default app
