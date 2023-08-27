import { Redis } from 'ioredis'
import 'dotenv/config'

const redis = new Redis({
    password: process.env.REDIS_PASSWORD,
    username: 'toolzz',
    port: 6379
})

export {redis}