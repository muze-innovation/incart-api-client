import { LangPair } from "./base";

export interface InCartHardCheckoutAddress {
  firstname: string
  lastname?: string
  mobile?: string
  mobileCountryCode: string
  street: string
  subDistrict: string
  district: string
  province: string
  country: 'TH'
  postcode: string
  vatId?: string
  company?: string
  companyBranch?: string
  companyBranchId?: string
  weight: number
  latitude?: string
  longitude?: string
}

export type InCardHardCheckoutBillingAddress = 'same-as-shipping-address' | InCartHardCheckoutAddress

export interface InCartHardCheckoutOrderItem {
  sku: string
  qty: number
  total: number
}

export interface InCartHardCheckoutPayment {
  method: 'credit'
  vendor: 'spw'
}

export interface InCartHardCheckoutReference {
  type: string,
  value: string,
}

/**
 * Generic interface for creating an Order directly.
 */
export interface InCartHardCheckoutRequest {

  /**
   * Email or Mobile
   */
  emailOrMobile: string

  /**
   * InCart's channel marker
   */
  channelType: string

  /**
   * Dictate the order token to be used.
   */
  orderToken?: string

  /**
   * Items to checkout
   */
  items: InCartHardCheckoutOrderItem[]
  ignoreAllPromotions: Boolean

  /**
   * Shipping Address
   */
  shippingAddress?: InCartHardCheckoutAddress
  shippingMethodId?: number
  shippingMethodName?: string
  shippingAmount?: string
  shippingDiscountAmount?: string
  shippingTrackingUrl?: string

  /**
   * Billing Address
   */
  billingAddress?: InCardHardCheckoutBillingAddress

  /**
   * Payment Option
   */
  payment?: InCartHardCheckoutPayment

  /**
   * Reference
   */
  reference: InCartHardCheckoutReference

  orderStatus: 'new' | 'paid'

  orderId?: number
}

export interface InCartShippingOption {
  /**
   * incart's condition
   */
  condition: string

  /**
   * Description with multiple language
   */
  description: LangPair

  /**
   * id
   */
  id: number

  /**
   * Is default shipping method?
   */
  isDefault: boolean

  /**
   * Display name
   */
  name: LangPair

  /**
   * Calculated Price
   */
  price: number

  setting: string // JSON

  /**
   * Shipping Type object
   */
  shippingType: string

  /**
   * Tracking URL's prefix
   */
  trackingUrl: string // tracking url prefix
}

export interface InCartUpdateOrderAddressRequest {
  firstname: string
  lastname?: string
  vatId?: string
  mobile: {
    countryCode: 'TH'
    number: string // start with +66
  }
  postcode: string
  province: string
  district: string
  subDistrict: string
  street: string
  country: 'TH'
}

export interface InCartUpdateEmailOrMobileOrderRequest {
  email: string
}

export interface InCartPaymentOption {
  id: number

  code: string

  condition: string | null

  description: LangPair

  isActive: boolean

  maximumPrice: number | null

  minimumPrice: number | null

  sortOrder: number

  vendor: string
}