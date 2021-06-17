import { Client, getConfiguration, InCartStoreService } from '../../src'
import { catched } from '../utils/catched'
import { loggedInClient, storeIds } from '../utils/fixture'

jest.setTimeout(30000)

describe('store', () => {
  const config = getConfiguration('alpha')
  
  describe('validate method', () => {
    it('throw an error if api is called without session', async () => {
      const client = new Client(config)
      const srv = new InCartStoreService(client)
      const [e] = await catched(() => srv.validate('some-store-id'))
      expect(e.message).toMatch(/forbidden/i)
    })
      
    describe('when logged in.', () => {
      it('can validate non-exists storeName', async () => {
        const client = await loggedInClient('admin')
        const srv = new InCartStoreService(client)

        const notExistStoreId = 'some-store-id-that-does-not-exists'
        const [e, r] = await catched(() => srv.validate(notExistStoreId))
        expect(e).toBeNull()
        expect(r).toBeTruthy()
        expect(r.exist).toBeFalsy()
        expect(r.storeId).toEqual(notExistStoreId)
      })

      it('can validate existing storeName', async () => {
        const client = await loggedInClient('admin')
        const srv = new InCartStoreService(client)

        const existingStoreId = storeIds.simpleStore
        const [e, r] = await catched(() => srv.validate(existingStoreId))
        expect(e).toBeNull()
        expect(r).toBeTruthy()
        expect(r.exist).toBeTruthy()
        expect(r.storeId).toMatch(new RegExp(`^(${existingStoreId})-\\d{1,}$`))
      })
    })
  })
})