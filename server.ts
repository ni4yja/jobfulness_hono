import { serve } from '@hono/node-server'
import app from './api/index'

serve({
  fetch: app.fetch,
  port: 3000,
})

console.log('🚀 Local server running at http://localhost:3000')