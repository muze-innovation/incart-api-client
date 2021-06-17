import { Deserialize } from 'cerialize'
import { InCartService } from './client'
import { InCartMeResponse } from './models/authAdmin'
import { InCartAccessTokenResponse } from './models/auth'

export class InCartAuthAdminService extends InCartService {

  /**
   * 
   * @param overrideAuthenticationToken 
   * @return User Admin Profile: { id, name, email }
   */
  public async me(): Promise<InCartMeResponse> {
    const resp = await this.axios.get('/pcms/api/v1/auth/admin/me')
    const r: InCartMeResponse = Deserialize(resp.data, InCartMeResponse)
    // cleanse data
    r.stores = r.stores.filter((o) => o.storeId !== 'global')
    return r
  }

  /**
   * Initiate Login request with email and password.
   * 
   * Example usage:
   * 
   * ```ts
   * import { Client, InCartAuthAdminService, getConfiguration } from 'incart-api-client'
   * 
   * const client = new Client(getConfiguration('alpha'))
   * const auth = new InCartAuthAdminService(client)
   * const token = await auth.login('test@gmail.com', 'password')
   * client.overrideSession(token)
   * const me = await auth.me()
   * ```
   * 
   * @param email
   * @param password
   * @returns AccessToken
   */
  public async login(email: string, password: string): Promise<InCartAccessTokenResponse> {
    const resp = await this.axios.post('/pcms/api/v1/auth/admin/access-tokens', {
      email,
      password,
    }, {
      headers: {
        'x-api-key': '',
      }
    })
    const r: InCartAccessTokenResponse = Deserialize(resp.data, InCartAccessTokenResponse)
    return r
  }
}