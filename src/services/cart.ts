import type { InCartHardCheckoutRequest } from './models/orders'
import { InCartService } from './client'

export class InCartCartService extends InCartService {

  public async hardCheckout(storeId: string, hardCheckoutRequest: InCartHardCheckoutRequest): Promise<{ storeId: string, orderId: string, payableLink: string }> {
    const { data } = await this.axios.post(`/pcms/${storeId}/api/v1/carts/hard-checkout`, hardCheckoutRequest)
    return data
  }
}