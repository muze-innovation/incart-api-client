import { autoserializeAs } from "cerialize"
import { ISODateSerializer } from "../../utils/cerialize"
import { DefaultKeyValue, LangPair } from "./base"

class InCartPackageFeature {
  @autoserializeAs('chats')
  chats: boolean = false

  @autoserializeAs('clickAndCollect')
  clickAndCollect: boolean = false

  @autoserializeAs('creditTerms')
  creditTerms: boolean = false

  @autoserializeAs('customerTier')
  customerTier: boolean = false
  
  @autoserializeAs('domain')
  domain: boolean = false

  @autoserializeAs('orderManager')
  orderManager: boolean = false

  @autoserializeAs('quotation')
  quotation: boolean = false

  @autoserializeAs('report')
  report: boolean = false

  @autoserializeAs('stockManage')
  stockManage: boolean = false

  @autoserializeAs('syncMarketPlace')
  syncMarketPlace: boolean = false

  @autoserializeAs('ordersLimit')
  ordersLimit: number

  @autoserializeAs('productsLimit')
  productsLimit: number

  @autoserializeAs('staffsLimit')
  staffsLimit: number

  @autoserializeAs('tier')
  tier: number

  @autoserializeAs('type')
  type: string

  @autoserializeAs('id')
  id: string

  @autoserializeAs('name')
  name: string

}

class InCartPackage {

  @autoserializeAs('active')
  active: boolean

  @autoserializeAs('createdAt')
  createdAt: Date

  @autoserializeAs('duration')
  duration: string

  @autoserializeAs('id')
  id: string

  @autoserializeAs('name')
  name: string

  @autoserializeAs('paymentType')
  paymentType: string

  @autoserializeAs('planId')
  planId: string

  @autoserializeAs('price')
  price: number

  @autoserializeAs(ISODateSerializer, 'updatedAt')
  updatedAt: Date

  @autoserializeAs(InCartPackageFeature, 'features')
  features: InCartPackageFeature
}

export class InCartStorePackage {

  @autoserializeAs('storeId')
  storeId: string

  @autoserializeAs('cycleDate')
  cycleDate: number

  @autoserializeAs(ISODateSerializer, 'dueDate')
  dueDate: Date

  @autoserializeAs(ISODateSerializer, 'updatedAt')
  updatedAt: Date

  @autoserializeAs('packageId')
  packageId: string

  @autoserializeAs(InCartPackage, 'package')
  package: InCartPackage
}

export class InCartLocation {

  constructor(public readonly storeId: string) {
  }

  @autoserializeAs('baseURL')
  baseURL: string

  @autoserializeAs('host')
  host: string

  @autoserializeAs('storeBaseURL')
  storeBaseURL: string

  @autoserializeAs('storeHost')
  storeHost: string
}

class InCartStoreCurrency {

  @autoserializeAs(DefaultKeyValue, 'storeCurrency')
  storeCurrency: DefaultKeyValue = new DefaultKeyValue('THB')
}

export class InCartStore {

  @autoserializeAs('storeId')
  storeId: string
  
  @autoserializeAs('taxId')
  taxId: string

  @autoserializeAs('storeLogo')
  storeLogo: string

  @autoserializeAs('storeLogoMobile')
  storeLogoMobile: string

  @autoserializeAs('favicon')
  favicon: string

  @autoserializeAs(LangPair, 'storeName')
  storeName: LangPair = LangPair.empty()

  @autoserializeAs('mobile')
  mobile: string

  @autoserializeAs(LangPair, 'storeDescription')
  storeDescription: LangPair = LangPair.empty()

  @autoserializeAs(InCartStoreCurrency, 'currency')
  currency: InCartStoreCurrency

  @autoserializeAs(DefaultKeyValue, 'timezone')
  timezone: DefaultKeyValue = new DefaultKeyValue(7)

  constructor(storeId: string) {
    this.storeId = storeId
  }
}

export class InCartStoreNameCandidateValidation {
  @autoserializeAs('exist')
  exist: boolean

  @autoserializeAs('storeId')
  storeId: string
}