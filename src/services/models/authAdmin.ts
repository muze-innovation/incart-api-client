import { autoserializeAs } from 'cerialize'
import { BooleanSerializer, JsonObjectToArraySerializer } from '../../utils/cerialize'

export class InCartStoreMe {

  @autoserializeAs('id')
  id : string

  @autoserializeAs('storeId')
  storeId: string

  @autoserializeAs('name')
  role: string

  constructor(storeId?: string) {
    this.storeId = storeId
  }
}

export class InCartMobileMe {
  @autoserializeAs('number')
  number: string

  @autoserializeAs('countryCode')
  countryCode: string
}

export class InCartMeResponse {
  @autoserializeAs('id')
  id: string

  @autoserializeAs('email')
  email: string

  @autoserializeAs(BooleanSerializer('1', '0'), 'isConfirm')
  isConfirm: boolean

  @autoserializeAs('picture')
  picture: string

  @autoserializeAs('name')
  name: string

  @autoserializeAs(InCartMobileMe, 'mobile')
  mobile?: InCartMobileMe

  @autoserializeAs(JsonObjectToArraySerializer(InCartStoreMe, (o) => o.storeId), 'stores')
  stores: InCartStoreMe[]
}