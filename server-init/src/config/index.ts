import { AppConfig } from "./config";
import path from 'path'

let config: AppConfig | null

export default async function useAppConfig(): Promise<AppConfig> {
  if (!config) {
    const env = process.env.NODE_ENV || 'dev'

    const p = path.join(__dirname, `./${env}`)
    const configModule = await import(p)
    config = configModule.default as AppConfig
  }

  return config
}

export {
  AppConfig
}