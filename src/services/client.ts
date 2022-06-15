import axios, { AxiosInstance, AxiosError } from 'axios'
import get from 'lodash/get'
import { InCartAccessTokenResponse } from './models/auth'

export type InCartEnv = 'alpha' | 'qa' | 'prod' | 'A' | 'Q' | 'P'

export const isInCartEnv = (o: string): o is InCartEnv => {
  return /^(alpha|qa|prod|A|Q|P)$/.test(o)
}

export interface InCartConfig {
  apiKey: string
  baseURL: string
}

export interface ClientLogger {
  log(...args: any[]): void
  error(...args: any[]): void
}

export class Client {

  private static _instances: { [key: string]: Client } = {}

  public static getInstance(config: InCartConfig): Client {
    const key = `${config.baseURL}@${config.apiKey}`
    return this._instances[key] || (this._instances[key] = new Client(config))
  }

  private _axios: AxiosInstance

  private _token?: InCartAccessTokenResponse

  public get axios(): AxiosInstance { return this._axios }

  public constructor(public readonly config: InCartConfig, public readonly logger?: ClientLogger) {
    this._axios = axios.create({
      baseURL: config.baseURL,
    })
    this._axios.interceptors.request.use((conf) => {
      if (this._token) {
        conf.headers = {
          'authorization': this._token.accessToken,
          'x-api-key': '',
        }
      } else {
        conf.headers = {
          'x-api-key': config.apiKey
        }
      }
      return conf
    })
    this._axios.interceptors.response.use((resp) => {
      return resp
    }, (error: AxiosError) => {
      const conf = error.request
      this.logger?.log('INCART SERVICE FAILED.')
      if (conf) {
        const printable = `.. RQ > ${conf.method?.toUpperCase()} ${conf.path}`
        this.logger?.log(printable)
      }
      this.logger?.log(`.. ER < message ${error.message}`)
      if (error.response) {
        const message = get(error.response, 'data.info.message', get(error.response, 'data.message', error.message))
        this.logger?.log(`.. ER < detail ${JSON.stringify(error.response?.data)}`)

        throw new Error(message)
      }
      throw error
    })
  }

  public overrideSession(token: InCartAccessTokenResponse) {
    this._token = token
  }
}

export class InCartService {

  constructor(readonly client: Client) {
  }

  // Short-hand
  protected get axios(): AxiosInstance {
    return this.client.axios
  }
}