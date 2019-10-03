import { Config } from "../types/config"

const getConfig = (env: string): Config => {
  return {
    env,
    server: {
      port: parseInt(process.env.PORT) || 5000,
      
      cors: {
        origin: '*',
        exposeHeaders: [
          'Authorization',
          'Content-Language',
          'Content-Length',
          'Content-Type',
          'Date',
          'ETag',
        ],
        maxAge: 3600,
      },
    },
    logger: {
      prettyPrint: true,
    },
    db: {
      uri: process.env.DATABASE_URL || 'postgres://postgres@localhost/mcpneu-db'
    },
    security: {
      saltRounds: 10,
      secretHash: process.env.SECURITY_SECRET_HASH || "FEBE2B28F5BB3256A258412F992E8D70F0DC2726B6D6CB16C2C04C01D337FFFF",
      jwtInputSettings: {
        algorithm: 'HS256',
        expiresIn: 60 * 60
      },
      jwtOutputSettings: {
        algorithm: 'HS256'
      }
    }
  }
}


export default getConfig