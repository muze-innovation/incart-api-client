export interface Payment {
  additionalData: null
  amountCanceled: number | null
  amountPaid: number
  amountRefunded: number | null
  authenticationCode: string | null
  authorizedUri: string | null
  bankCode: string | null
  bankName: string
  bankNumber: string
  bankOwner: string
  cartPaymentId: number
  ccCardId: string | null
  ccCountry: string | null
  ccExpMonth: string | null
  ccExpYear: string | null
  ccFingerprint: string | null
  ccFirstSix: string | null
  ccLastFour: string | null
  ccOwner: string | null
  ccSsStartMonth: string | null
  ccSsStartYear: string | null
  ccType: string | null
  chargeAt: Date
  chargeId: string | null
  chargeLocation: string | null
  createdAt: Date
  currency: string | null
  id: number
  installmentPeriod: string | null
  method: string
  orderId: number
  reference: string | null
  refundAt: Date | null
  refundId: string | null
  refundLocation: string | null
  returnUri: string | null
  slipUrl: string | null
  sourceId: string | null
  sourceType: string | null
  updatedAt: Date
  vendor: string | null
}