import pick from 'lodash/pick'
import { InCartService } from './client'

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
}