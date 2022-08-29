import { LangPair } from "./base";

/**
 * Supported shipping method types from inCart
 * 
 * @refs `incart-brand-next/shared/constants/shipping.js`
 */
export type InCartShippingMethodType = 'flatrate' | 'byItem' | 'byProvince' | 'byDistance' | 'jnt' | 'pickup' | 'kerry' | 'tablerate'

interface InCartShippingMethodCondition {
  initial: number
  next: number
  allowCountries: {
    allowAll: boolean
    countryList: string[]
  }
  COD: {
    allow: boolean
    maximumPrice: number | null
    minimumPrice: number | null
  }
}

export interface InCartShippingMethod {
  /**
   * InCart's Shipping Method's ID.
   */
  id: number
  /**
   * Indicator for being Active.
   */
  isActive: boolean
  /**
   * Indicator for being default shipping method.
   */
  isDefault: boolean
  /**
   * 
   */
  condition: InCartShippingMethodCondition
  /**
   * Descriptive Text for the Method
   */
  description: LangPair
  /**
   * Name of the Method
   */
  name: LangPair
  /**
   * Associated type of this Method.
   */
  shippingType: InCartShippingMethodType
  /**
   * Sorting order to be displayed on front-end
   */
  sortOrder: number
  /**
   * Tracking URL pattern.
   */
  trackingUrl: string
}