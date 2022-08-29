import { InCartService } from './client'
import { IncartShippingMethod } from './models/shippingMethod'


export class InCartShippingMethodService extends InCartService {
  public async list(storeId: string): Promise<{ collection: IncartShippingMethod[] }> {
    const res = await this.axios.get(`/pcms/${storeId}/api/v1/shipping-methods/admin`)
    return res.data
  }
}