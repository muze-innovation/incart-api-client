import pick from 'lodash/pick'
import { DateTime } from 'luxon'
import { Deserialize } from 'cerialize'
import { InCartService } from './client'
import { MultipleLangInCartProduct } from './models/products'

type InCartProductFields = 'id' | 'sku' | 'type' | 'width' | 'height' | 'weight' | 'visibility'
  | 'name' | 'status' | 'description' | 'price' | 'stock' | 'paymentMethods' | 'media'
  | 'categories' | 'tags' | 'brand' | 'badge' | 'metaDescritpion' | 'attributes' | 'properties'
  | 'speciaCondition' | 'children' | 'toPage' | 'chainStore' | 'metaKeywords' | 'productRef'
  | 'inventory' | 'createdAt' | 'updatedAt'

export const simpleInCartProductFields: InCartProductFields[] = ['id', 'sku', 'name', 'price', 'brand', 'categories', 'children', 'description', 'media']

interface FieldsLimitOption {
  pick: InCartProductFields[]
}

interface InCartProductQueryOption extends FieldsLimitOption {
  pageSize: number
  currentPage: number // 1 ~ N
  visibility: 'public' | 'all'
  checkStock: boolean
  checkStatus: boolean
  priceFrom: number
  priceTo: number
  sku: string[]
}

export interface InCartMasterProductQueryOptions {
  limit: number
  offset: number
  sortBy?: string
  sortDirection?: string
  keyword?: string,
  lastUpdate?: Date
  traceId?: string
  needQty?: boolean
}

export class InCartProductsService extends InCartService {

  public async list(storeId: string, queryOpt: Partial<InCartProductQueryOption> = {}): Promise<any> {
    const pick = queryOpt.pick && queryOpt.pick.length > 0 ? queryOpt.pick.join(',') : undefined
    const params = {
      lang: 'th',
      pageSize: `${queryOpt.pageSize || 24}`,
      currentPage: `${queryOpt.currentPage || 1}`,
      visibility: `${queryOpt.visibility || 'public'}`, // 'all' | 'public'
      checkStock: `${queryOpt.checkStock || 'false'}`,
      checkStatus: `${queryOpt.checkStatus || 'false'}`,
      sku: queryOpt.sku && queryOpt.sku,
      priceFrom: queryOpt.priceFrom,
      priceTo: queryOpt.priceTo,
      pick,
    }
    const res = await this.axios.get(`/pcms/${storeId}/api/v1/products`, { params })
    return res.data
  }

  public async listBySku(storeId: string, skus: string[], fieldOpt: FieldsLimitOption): Promise<any[]> {
    const params = {
      skus: `[${skus.join(',')}]`,
    }
    const res = await this.axios.get(`/pcms/${storeId}/api/v1/products/multiple/skus`, { params })
    const collection = res.data.collection.map((o) => pick(o, ...fieldOpt.pick))
    return collection
  }

  public async getBySku(storeId: string, sku: string): Promise<any> {
    const res = await this.axios.get(`/pcms/${storeId}/api/v1/products/${sku}`)
    return res.data
  }

  public async getMasterProductsForSync(
    storeId: string,
    opts: InCartMasterProductQueryOptions,
  ): Promise<MultipleLangInCartProduct[]> {
    const params: any = {
      limit: opts.limit,
      offset: opts.offset,
      sortBy: opts.sortBy,
      sortDirection: opts.sortDirection,
      keyword: opts.keyword,
      traceId: opts.traceId || `${Math.random() * 99999}`,
      needQty: opts.needQty,
    }
    if (opts.lastUpdate) {
      const dt = DateTime.fromJSDate(opts.lastUpdate)
      if (!dt.isValid) {
        throw new Error(
          `Cannot sync with invalidate date value: ${opts.lastUpdate}`,
        )
      }
      params.lastSyncTimestamp = dt.setZone('UTC').toISO()
    }

    try {
      const res = await this.axios.get(
        `/pcms/${storeId}/api/v1/products/master`,
        { params },
      )
      return Deserialize(res.data.collection, MultipleLangInCartProduct)
    } catch (error: any) {
      this.client.logger?.log(
        'WARNING: Unable to fetch master products from inCart',
        error,
      )
      throw error
    }
  }
}
