import { catched } from '../utils/catched'
import { Client, OrderService, getConfiguration } from '../../src'

jest.setTimeout(30000)

const config = getConfiguration('qa', 'order')
const storeId = 'storeTest'
describe('authAdminService', () => {
  it('can create order', async () => {
    const client = new Client(config)
    const service = new OrderService(client)
    const [e, r] = await catched(() => service.createOrder(storeId, {
        name: "incart apiclient",
        email: "apiclient@api.com",
        mapOrderId: 4,
      }))
    expect(e).toBeNull()
    expect(r).toBeTruthy()
  })

  it('can list order', async () => {
    const client = new Client(config)
    const service = new OrderService(client)
    const keys = {
      status : "new"
    }
    const [e, r] = await catched(() => service.list(storeId, { 
      pageSize: 10,
      currentPage: 1,
      sortDirection: 'asc',
      ...keys
    }))
    expect(e).toBeNull()
    expect(r).toBeTruthy()
  })
})