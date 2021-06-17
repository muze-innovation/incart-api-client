import { catched } from '../utils/catched'
import { credentials } from '../utils/fixture'
import { Client, InCartAuthAdminService, getConfiguration } from '../../src/'

jest.setTimeout(30000)

describe('authAdminService', () => {
  const config = getConfiguration('alpha')

  it('throw an error if invalid credentials', async () => {
    const client = new Client(config)
    const auth = new InCartAuthAdminService(client)
    const [e] = await catched(() => auth.login(credentials.bad[0], credentials.bad[1]))
    expect(e.message).toMatch(/unauth/i)
  })

  it('can login', async () => {
    const client = new Client(config)
    const auth = new InCartAuthAdminService(client)
    const [e, r] = await catched(() => auth.login(credentials.admin[0], credentials.admin[1]))
    expect(e).toBeNull()
    expect(r.accessToken).toBeTruthy()
    expect(r.refreshToken).toBeTruthy()

    client.overrideSession(r)

    const [me_e, me] = await catched(() => auth.me())
    expect(me_e).toBeNull()
    expect(me.id).toBeTruthy()
  })
})