import { InCartService } from './client'
import {
  InCartPaymentOption, InCartShippingOption, InCartUpdateEmailOrMobileOrderRequest, InCartUpdateOrderAddressRequest, InCartListOrdersOption,
  InCartOrder, InCartOrderMeta, InCartOrderDetail
} from './models/orders'

export class InCartOrdersService extends InCartService {

  public async updateOrderComment(storeId: string, orderId: string, comment: string, source: string, entityName: string): Promise<{ success: boolean }> {
    return this.axios.post(`/pcms/${storeId}/api/v1/orders/${orderId}/comments`, {
      isCustomerNotified: 0,
      comment,
      source,
      entityName,
    })
  }

  public async updateOrderStatus(storeId: string, orderId: string, status: string): Promise<{ success: boolean }> {
    return this.axios.put(`/pcms/${storeId}/api/v1/orders/${orderId}/statuses`, {
      status
    })
  }

  public async updateOrderShipment(storeId: string, orderId: number, trackingNumber: string): Promise<{ success: boolean }> {
    const tracking = trackingNumber !== '' && { track: { trackNumber: trackingNumber } }
    return this.axios.post(`/pcms/${storeId}/api/v1/shipments`, {
      orderId,
      ...tracking
    })
  }

  public async cancelOrder(storeId: string, orderId: string): Promise<{ success: boolean }> {
    return this.axios.post(`/pcms/${storeId}/api/v1/orders/${orderId}/cancel`)
  }

  /**
   * Request estimate shipping cost along with available shipping options
   *
   * @param storeId 
   * @param orderId 
   */
  public async estimateShippingCost(storeId: string, orderId: number): Promise<{ collection: InCartShippingOption[] }> {
    const r = await this.axios.get(`/pcms/${storeId}/api/v1/orders/${orderId}/estimate-shipping`)
    return r.data
  }

  public async updateShippingMethod(storeId: string, orderId: number, shippingMethodId: number): Promise<void> {
    await this.axios.put(`/pcms/${storeId}/api/v1/orders/${orderId}/shipping-methods`, { shippingMethodId })
  }

  public async updateEmailOrMobile(storeId: string, orderId: number, emailOrMobile: string): Promise<boolean> {
    const req: InCartUpdateEmailOrMobileOrderRequest = {
      email: emailOrMobile,
    }
    const r = await this.axios.put(`/pcms/${storeId}/api/v1/orders/${orderId}/emails`, req)
    const data = r.data
    return data.status
  }

  public async updateAddress(storeId: string, orderId: number, addressType: 'billing' | 'shipping', updateAddressRequest: InCartUpdateOrderAddressRequest): Promise<boolean> {
    switch (addressType) {
      case 'billing': return this.updateBillingAddress(storeId, orderId, updateAddressRequest)
      case 'shipping': return this.updateShippingAddress(storeId, orderId, updateAddressRequest)
    }
  }

  /**
   * Unset billing address - mimic what Dashboard has updated.
   *
   * @param storeId 
   * @param orderId 
   * @return
   */
  public async removeBillingAddress(storeId: string, orderId: number): Promise<boolean> {
    return this.updateBillingAddress(storeId, orderId, <any>{
      country: null,
      district: null,
      subDistrict: null,
      mobile: { number: null, countryCode: null },
      province: null,
      firstname: null,
      vatId: null,
      street: null,
    })
  }

  public async updateShippingAddress(storeId: string, orderId: number, updateAddressRequest: InCartUpdateOrderAddressRequest): Promise<boolean> {
    const r = await this.axios.put(`/pcms/${storeId}/api/v1/orders/${orderId}/shipping-addresses`, updateAddressRequest)
    const data = r.data
    return data.status
  }

  public async updateBillingAddress(storeId: string, orderId: number, updateAddressRequest: InCartUpdateOrderAddressRequest): Promise<boolean> {
    const r = await this.axios.put(`/pcms/${storeId}/api/v1/orders/${orderId}/billing-addresses`, updateAddressRequest)
    const data = r.data
    return data.status
  }

  public async listPaymentMethods(storeId: string, orderId: number): Promise<{ collection: InCartPaymentOption[] }> {
    const r = await this.axios.get(`/pcms/${storeId}/api/v1/orders/${orderId}/payment-methods`)
    return r.data
  }

  public async updatePaymentMethod(storeId: string, orderId: number, paymentMethodId: number): Promise<void> {
    await this.axios.put(`/pcms/${storeId}/api/v1/orders/${orderId}/payment-methods`, { paymentMethodId })
  }

  public async listOrders(storeId: string, params: InCartListOrdersOption): Promise<{ collection: InCartOrder[], meta: InCartOrderMeta[] }> {
    const r = await this.axios.get(`/pcms/${storeId}/api/v1/orders`, { params })
    return r.data
  }

  public async listOrderDetail(storeId: string, orderId: number): Promise<InCartOrderDetail> {
    const r = await this.axios.get(`/pcms/${storeId}/api/v1/orders/${orderId}`)
    return r.data
  }
}