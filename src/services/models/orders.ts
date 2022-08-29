import { LangPair } from "./base";
import { Payment } from './payment'
import { InCartCustomer } from './customer'
import { InCartProduct } from './products'
import { InCartShippingMethod } from './shippingMethod'

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

export interface InCartListOrdersOption {
  sortBy?: string
  sortDirection?: string
  pageSize?: number
  currentPage?: number
  includeOrderDetail?: boolean
  includeOrderPayment?: boolean
  includeOrderCreditTerm?: boolean
  createdBy?: string
  channelId?: number
  requestInvoice?: boolean
  includeOrderInvoice?: boolean
  orderIds?: string
}

interface InCartCoupon {
  id: number
  code: string
  usagePerCoupon: number | null
  usagePerCustomer: number | null
}

interface InCartOrderReference {
  type: string
  value: string
}

interface InCartOrderTrack {
  id: number
  shipmentId: number
  trackNumber: string
  trackingUrl: string
  createdAt: Date
  updatedAt: Date
}
interface InCartOrderShipment {
  createdAt: Date
  id: number
  incrementId: string
  logisticOrderDetail: string | null
  logisticResponse: string | null
  orderId: number
  totalQty: number
  totalWeight: number
  updatedAt: Date
  track: InCartOrderTrack[]

}
interface InCartAppliedRules {
  action: string
  actionSerialized: string
  applyToShipping: number
  condition: string
  coupon: InCartCoupon[]
  createdAt: Date
  description: string | null
  discountAmount: number
  discountType: string
  fromDate: Date
  id: number
  isActive: 1 | 0
  isApplyAllProduct: 1 | 0
  maximumQuantity: number | null
  name: string
  notEligibleToPriceTier: boolean
  simpleFreeShipping: 1 | 0
  sortOrder: number
  stopRulesProcessing: number
  toDate: Date
  type: string
  updatedAt: Date
  usageLimit: number | null
  useAutoGeneration: 1 | 0
  usesPerCustomer: number | null
}

interface InCartOrderBillingAddress {
  branch: string | null
  branchId: null
  country: string | null
  district: string | null
  firstname: string | null
  lastname: string | null
  mobile: { number: string | null, countryCode: string | null }
  postcode: string | null
  province: string | null
  street: string | null
  subDistrict: string | null
  vatId: string | null
}

interface InCartOrderShippingAddress {
  country: string | null
  district: string | null
  firstname: string | null
  lastname: string | null
  mobile: { number: string | null, countryCode: string | null }
  postcode: string | null
  province: string | null
  street: string | null
  subDistrict: string | null
}

export interface InCartOrderPaymentMethod {
  code: string
  id: number
  vendor: string
  description: LangPair
}

interface InCartOrderChannel {
  createdAt: Date
  id: number
  name: string
  type: string
  updatedAt: Date | null
}

export interface InCartOrder {
  appliedRuleIds: string[] | null
  appliedRules: InCartAppliedRules[]
  billingAddress: InCartOrderBillingAddress
  channel: InCartOrderChannel
  channel_id: number
  couponCode: string | null
  createdAt: Date
  customerId: number
  customerName: string
  discountAmount: number
  discountTaxCompensationAmount: number
  email: string
  firstname: string | null
  grandTotal: string
  id: number
  incrementId: string
  isArchived: number
  isGrandTotalOverrode: boolean
  lastPrinted: null
  lastname: string | null
  orderCurrencyCode: string | null
  orderReference: InCartOrderReference[]
  orderShipment: InCartOrderShipment[]
  orderToken: string
  paymentMethod: InCartOrderPaymentMethod | null
  payments: Payment[]
  rawData: null
  remark: string | null
  representStatus: string
  shippingAddress: InCartOrderShippingAddress
  shippingAmount: number
  shippingDiscountAmount: number
  shippingDiscountTaxCompensationAmount: number
  shippingExclTax: number
  shippingMethodDetail: string | null
  shippingMethodName: string | null
  shippingTaxAmount: number
  status: string
  subtotal: number
  subtotalInclTax: number
  subtotalRefunded: number | null
  taxAmount: number
  taxRefunded: number | number
  totalInvoiced: number
  totalQty: number
  totalRefunded: number | null
}


export interface InCartOrderMeta {
  count: {
    arrived: number
    canceled: number
    collected: number
    completed: number
    inCancel: number
    new: number
    paid: number
    paymentProcessing: number
    readyToShip: number
    refunded: number
    returned: number
    shipped: number
    total: number
  }
  currentPage: number
  currentTime: number
  includeOrderDetail: boolean
  pageSize: number
}

interface InCartOrderDetailShipment {
  createdAt: Date
  id: number
  incrementId: string
  orderId: number
  totalQty: number
  totalWeight: number
  track: {
    trackNumber: string
    trackingUrl: string
  }
}

interface InCartComments {
  comment: string
  createdAt: Date
  entityName: string
  id: number
  isCustomerNotified: number
  orderId: number
  source: string | null
  updatedAt: Date
}

interface InCartOrderItem {
  appliedRuleIds: number[]
  discount: number
  id: number
  name: string
  product: InCartProduct[]
  quantity: { ordered: number, invoiced: number, shipped: number, canceled: number, refund: number }
  refItemId: number | null
  totalPrice: { original: number, final: number }
  unitPrice: { original: number, final: number }
  weight: number | null
}

export interface InCartOrderDetail {
  appliedRuleIds: string[]
  appliedRules: InCartAppliedRules[]
  billingAddress: InCartOrderBillingAddress
  cartId: number
  channel: InCartOrderChannel
  comments: InCartComments[]
  couponCode: string | null
  customShipping: null
  createdAt: Date
  customer: InCartCustomer | null
  email: string
  expiredAt: Date
  id: number
  incrementId: string
  isGrandTotalOverrode: boolean
  items: InCartOrderItem[]
  orderReference: InCartOrderReference[]
  paymentMethod: InCartOrderPaymentMethod | null
  payments: Payment
  remark: string | null
  representStatus: string
  shippingAddress: InCartOrderShippingAddress
  shipments: InCartOrderDetailShipment
  shippingMethod: InCartShippingMethod
  shippingMethodName: string | null
  specialDiscountAmount: number
  status: string
  token: string
  totalProducts: number
  totalQty: number
  totalSegments: {
    currencyCode: string | null
    discount: number
    discountTaxCompensationAmount: number
    grandTotal: number
    shipping: number
    shippingTax: number
    subtotal: number
    tax: number
    totalDue: number
    totalInvoiced: number
    totalRefunded: number | null
  }
  totalWeight: number
  updatedAt: string

}