import { Client, getConfiguration, InCartProductsService } from '../../src'
import { catched } from '../utils/catched'
import { loggedInClient, storeIds } from '../utils/fixture'

describe('products', () => {
  const config = getConfiguration('alpha')
  const simpleStoreId = storeIds.simpleStore
  
  describe('list API', () => {
    it('can list products without session', async () => {
      const client = new Client(config)
      const srv = new InCartProductsService(client)
      const [e, r] = await catched(() => srv.list(simpleStoreId, { visibility: 'all' }))
      expect(e).toBeNull()
      expect(r).toBeTruthy()
      expect(r.collection instanceof Array).toBeTruthy()
      expect(r.collection.length).toBeGreaterThan(1)
      // Validate array payload.
    })

    describe('when logged in.', () => {

      let client: Client
      let srv: InCartProductsService

      beforeAll(async () => {
        client = await loggedInClient('admin')
        srv = new InCartProductsService(client)
      }, 3000)

      it('can list products for frontend (visibility=all)', async () => {
        const [e, r] = await catched(() => srv.list(simpleStoreId, { visibility: 'all' }))
        expect(e).toBeNull()
        expect(r).toBeTruthy()
        expect(r.collection instanceof Array).toBeTruthy()
        expect(r.collection.length).toBeGreaterThanOrEqual(3)
      })

      it('can list products for frontend (visibility=public)', async () => {
        const [e, r] = await catched(() => srv.list(simpleStoreId, { visibility: 'public' }))
        expect(e).toBeNull()
        expect(r).toBeTruthy()
        expect(r.collection instanceof Array).toBeTruthy()
        expect(r.collection.length).toBeGreaterThanOrEqual(2)
      })

      it('can list products by single sku', async () => {
        const [e, r] = await catched(() => srv.list(simpleStoreId, { sku: ['jest-001'] }))
        expect(e).toBeNull()
        expect(r).toBeTruthy()
        expect(r.collection instanceof Array).toBeTruthy()
        expect(r.collection.length).toEqual(1)
        expect(r.collection.map((o) => o.sku)).toContain('jest-001')
      })

      it('can list products by multiple skus', async () => {
        const [e, r] = await catched(() => srv.list(simpleStoreId, { sku: ['jest-001', 'jest-002'] }))
        expect(e).toBeNull()
        expect(r).toBeTruthy()
        expect(r.collection instanceof Array).toBeTruthy()
        expect(r.collection.length).toEqual(2)
        expect(r.collection.map((o) => o.sku)).toContain('jest-001')
        expect(r.collection.map((o) => o.sku)).toContain('jest-002')
      })

      it('can list product with sales enabled (checkStatus=true)', async () => {

      })

      it('can list product with stock enabled (checkStock=true)', async () => {

      })

      it('can list product by productIds (productIds=array)', async () => {

      })

      it('can list product by brandsIds', async () => {

      })

      it('can list products by categoryIds', async () => {

      })

      it('can list products with price min', async () => {
        const testAgainst = async (priceFrom: number, expectedCount: number): Promise<number> => {
          const [e, r] = await catched(() => srv.list(simpleStoreId, { priceFrom }))
          expect(e).toBeNull()
          expect(r).toBeTruthy()
          expect(r.collection instanceof Array).toBeTruthy()
          expect(r.collection.length).toBeGreaterThanOrEqual(expectedCount)
          r.collection.forEach((o) => {
            expect(o.price).toBeTruthy()
            expect(o.price.original).toBeTruthy()
            if (o.price.special) {
              expect(o.price.special.min).toBeGreaterThanOrEqual(priceFrom)
            } else {
              expect(o.price.original.min).toBeGreaterThanOrEqual(priceFrom)
            }
          })
          return r.collection.length
        }

        const largestScope = await testAgainst(350, 2)
        const largerScope = await testAgainst(360, 1)
        const minorScope = await testAgainst(370, 0)
        expect(largerScope).toBeLessThan(largestScope)
        expect(minorScope).toBeLessThan(largestScope)
        expect(minorScope).toBeLessThan(largerScope)
      })

      it('can list products with price max', async () => {
        const testAgainst = async (priceTo: number, expectedCount: number) => {
          const [e, r] = await catched(() => srv.list(simpleStoreId, { priceTo }))
          expect(e).toBeNull()
          expect(r).toBeTruthy()
          expect(r.collection instanceof Array).toBeTruthy()
          expect(r.collection.length).toBeGreaterThanOrEqual(expectedCount)
          r.collection.forEach((o) => {
            expect(o.price).toBeTruthy()
            expect(o.price.original).toBeTruthy()
            if (o.price.special) {
              expect(o.price.special.min).toBeLessThanOrEqual(priceTo)
            } else {
              expect(o.price.original.min).toBeLessThanOrEqual(priceTo)
            }
          })
          return r.collection.length
        }

        const largestScope = await testAgainst(360, 2)
        const largerScope = await testAgainst(350, 1)
        const minorScope = await testAgainst(340, 0)
        expect(largerScope).toBeLessThan(largestScope)
        expect(minorScope).toBeLessThan(largestScope)
        expect(minorScope).toBeLessThan(largerScope)
      })

      it('can list products with price range', async () => {

      })

      it('can list products with price keyword', async () => {

      })

      it('can list products with price single tag', async () => {

      })

      it('can list products with price multiple tag', async () => {

      })

      it('can list products with attributes', async () => {

      })

      describe('can list master products', () => {
        it('can list with limit', async () => {
          const [e, r] = await catched(() =>
            srv.getMasterProductsForSync(simpleStoreId, {
              limit: 2,
              offset: 0,
            }),
          )
          expect(e).toBeNull()
          expect(r instanceof Array).toBeTruthy()
          expect(r?.length).toEqual(2)
          expect(r?.map((o) => o.sku)).toContain('PD000001')
          expect(r?.map((o) => o.sku)).toContain('jest-001')
        })

        it('can list with offset', async () => {
          const [e, r] = await catched(() =>
            srv.getMasterProductsForSync(simpleStoreId, {
              limit: 2,
              offset: 2,
            }),
          )
          expect(e).toBeNull()
          expect(r instanceof Array).toBeTruthy()
          expect(r?.length).toEqual(1)
          expect(r?.map((o) => o.sku)).toContain('jest-002')
        })

        it('can list with search', async () => {
          const [e, r] = await catched(() =>
            srv.getMasterProductsForSync(simpleStoreId, {
              limit: 5,
              offset: 0,
              search: '02',
            }),
          )
          expect(e).toBeNull()
          expect(r instanceof Array).toBeTruthy()
          expect(r?.length).toEqual(1)
          expect(r?.map((o) => o.sku)).toContain('jest-002')
        })
      })
    })
  })
})