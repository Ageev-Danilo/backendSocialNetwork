import express from 'express'
import cors from 'cors'
import http from 'node:http'
import { env } from '../config/env'
import { appRoutes } from './routes'
import { errorHandlerMiddleware } from '../middlewares/error-handler.middleware'
import { uploadDir } from '../config/path'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { SocketManager } from '../socket'

mkdirSync(join(uploadDir, 'original'), { recursive: true })
mkdirSync(join(uploadDir, 'thumbnail'), { recursive: true })

export const app = express()

const httpServer = http.createServer(app)

app.use(cors())
app.use(express.json())
app.use('/media', express.static(uploadDir))
app.use(appRoutes)
app.use(errorHandlerMiddleware)

const socketManager = new SocketManager(httpServer)

httpServer.listen(env.PORT, env.HOST, () => {
  console.log(`Server running on http://${env.HOST}:${env.PORT}`)
})