import { Hono } from 'hono'

const app = new Hono()

app.use('*', async (c, next) => {
  c.res.headers.set('Access-Control-Allow-Origin', '*')
  c.res.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  c.res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (c.req.method === 'OPTIONS') return new Response(null, { status: 204 })
  await next()
})

app.get('/', async (c) => {
  const token = process.env.FINDWORK_API_KEY
  if (!token) {
    return c.json({ error: 'API key missing' }, 500)
  }

  const url = new URL('https://findwork.dev/api/jobs')

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Token ${token}`,
    },
  })

  const data = await response.json()
  return c.json(data)
})

export default app
