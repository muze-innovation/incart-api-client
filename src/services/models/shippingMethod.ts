import { LangPair } from "./base";

export interface InCartShippingMethod {
  id: number
  isActive: boolean
  isDefault: boolean
  condition: {
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
  description: LangPair
  name: LangPair
  shippingType: string
  sortOrder: number
  trackingUrl: string
}