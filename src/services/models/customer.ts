import { InCardHardCheckoutBillingAddress, InCartShippingOption } from './orders'

export interface InCartCustomer {
  billingAddress: InCardHardCheckoutBillingAddress[]
  defaultBillingId: number | null
  defaultShippingId: number | null
  dob: string
  email: string
  facebookId: string | null
  firstname: string | null
  gender: string | null
  id: null
  incartId: number | null
  lastname: string | null
  lineId: string | null
  media: string | null
  mobile: { number: string, countryCode: string }
  privacyConsent: boolean
  privacyConsentDate: Date
  provideDataConsent: boolean
  provideDataConsentDate: Date
  receiveNewsConsent: boolean
  receiveNewsConsentDate: Date
  shippingAddress: InCartShippingOption[]
  tags: string[]
}