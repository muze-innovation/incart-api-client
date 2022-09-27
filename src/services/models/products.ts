import { autoserializeAs, inheritSerialization } from "cerialize"
import { LangPair } from "./base"

export class MinMaxValue {

  @autoserializeAs('min')
  min!: number | null

  @autoserializeAs('max')
  max!: number | null

  public static zero(): MinMaxValue {
    const v = new MinMaxValue()
    v.min = 0
    v.max = 0
    return v
  }
}

export class PriceFormat {
  @autoserializeAs(MinMaxValue, 'original')
  original!: MinMaxValue

  @autoserializeAs(MinMaxValue, 'special')
  special: MinMaxValue | null = null

  public static noNull(value?: PriceFormat): PriceFormat {
    const pf = new PriceFormat()
    if (!value) {
      pf.original = MinMaxValue.zero()
      pf.special = null
      return pf
    }
    pf.original = new MinMaxValue()
    pf.original.min = (value.original && value.original?.min) ?? value.original?.min ?? 0
    pf.original.max = (value.original && value.original?.max) ?? value.original?.max ?? 0
    pf.special = new MinMaxValue()
    pf.special.min = (value.special && value.special?.min) ?? value.special?.min ?? 0
    pf.special.max = (value.special && value.special?.max) ?? value.special?.max ?? 0
    
    return pf
  }
}

export class Suggest {
  @autoserializeAs('input')
  input!: string[]

  @autoserializeAs('contexts')
  contexts!: {}
}

export class LangsSuggest {
  @autoserializeAs('en')
  en!: Suggest

  @autoserializeAs('th')
  th!: Suggest
}

export class WareHouse {
  @autoserializeAs('id')
  id!: number

  @autoserializeAs('name')
  name!: string
  
  @autoserializeAs('active')
  active!: boolean

  @autoserializeAs('created_at')
  created_at!: string

  @autoserializeAs('updated_at')
  updated_at!: string
}

export class Inventory {
  @autoserializeAs('qty')
  qty!: number | null

  @autoserializeAs('stockType')
  stockType!: string
  
  // Disable this to save extra memory in the ES.
  // @autoserializeAs('warehouseId')
  // warehouseId!: number

  // @autoserializeAs(WareHouse, 'warehouse')
  // warehouse!: WareHouse
}

export class Warehouse {
  @autoserializeAs('id')
  id!: number

  @autoserializeAs('name')
  name!: string

  @autoserializeAs('active')
  active: boolean = false

  @autoserializeAs('created_at')
  created_at!: string

  @autoserializeAs(Warehouse, 'updated_at')
  updated_at: string | null = null
}

export class ChannelWarehouses {
  @autoserializeAs('id')
  id!: number

  @autoserializeAs('channelId')
  channelId!: number

  @autoserializeAs('warehouseId')
  warehouseId!: number

  @autoserializeAs('warehouse_id')
  warehouse_id!: number

  @autoserializeAs(Warehouse, 'warehouse')
  warehouse!: Warehouse
}

export class Channel {
  @autoserializeAs('id')
  id!: number

  @autoserializeAs('type')
  type!: string | null

  @autoserializeAs('name')
  name!: string | null

  @autoserializeAs('updatedAt')
  updatedAt!: Date | null

  @autoserializeAs('createdAt')
  createdAt!: Date

  @autoserializeAs(ChannelWarehouses, 'channel_warehouses')
  channel_warehouses!: ChannelWarehouses[] | null
}

export class ProductRef {

  @autoserializeAs('id')
  id!: number

  @autoserializeAs('productId')
  productId!: number

  @autoserializeAs('channelId')
  channelId!: number

  @autoserializeAs('name')
  name!: string | null

  @autoserializeAs('itemId')
  itemId!: number | null

  @autoserializeAs('variantId')
  variantId!: number | null

  @autoserializeAs('price')
  price!: number | null

  @autoserializeAs('specialPrice')
  specialPrice!: number | null

  @autoserializeAs('refType')
  refType!: string | null

  @autoserializeAs('channel_id')
  channel_id!: number

  @autoserializeAs(Channel, 'channel')
  channel!: Channel
}

export class Stock {
  @autoserializeAs('sku')
  sku?: string

  @autoserializeAs('indexId')
  indexId?: string

  @autoserializeAs('qty')
  qty!: number | null

  @autoserializeAs('productId')
  productId?: string | null

  @autoserializeAs('stockType')
  stockType!: 'infinite' | 'normal'

  @autoserializeAs('warehouseId')
  warehouseId?: number | null

  @autoserializeAs('refillThresholdValue')
  refillThresholdValue?: number

  @autoserializeAs('updatedAt')
  updatedAt?: Date
}

export class Media {

  @autoserializeAs('id')
  id!: number

  @autoserializeAs('path')
  path!: string | null

  @autoserializeAs('type')
  type!: string

  @autoserializeAs('ref')
  ref!: string

  @autoserializeAs('position')
  position!: number
}

export class StockReserve {
  @autoserializeAs('orderId')
  orderId!: string
  
  @autoserializeAs('qty')
  qty!: number
}

class BaseTaxonomy {
  @autoserializeAs('id')
  id!: number
}

@inheritSerialization(BaseTaxonomy)
export class LocalizedTaxonomy extends BaseTaxonomy {
  @autoserializeAs('label')
  label!: string
}

@inheritSerialization(BaseTaxonomy)
export class LangTaxonomy extends BaseTaxonomy {

  @autoserializeAs(LangPair, 'label')
  label!: LangPair
}

export class Brand {

  @autoserializeAs('id')
  id!: number

  @autoserializeAs('label')
  label: LangPair | null = null

  @autoserializeAs('actualValue')
  actualValue!: number | null
}

export class Badge {

  @autoserializeAs('id')
  id!: number

  @autoserializeAs('label')
  label!: string

  @autoserializeAs('actualValue')
  actualValue!: number | null
}

export class SubOptions {

  @autoserializeAs('id')
  id!: number

  @autoserializeAs('label')
  label!: LangPair

  @autoserializeAs('actualValue')
  actualValue!: number | null
}

export class BaseOptions {

  @autoserializeAs('attributeId')
  attributeId!: number

  @autoserializeAs('type')
  type!: string

  @autoserializeAs('code')
  code!: string

  @autoserializeAs(LangPair, 'label')
  label!: LangPair

  @autoserializeAs(SubOptions, 'options')
  options!: SubOptions[]
}

@inheritSerialization(BaseOptions)
export class LocalizedOptions {

  @autoserializeAs('label')
  label!: string
}

@inheritSerialization(BaseOptions)
export class LangOptions extends BaseOptions {

  @autoserializeAs(LangPair, 'label')
  label!: LangPair
}

export class Attributes {

  @autoserializeAs(BaseOptions, 'options')
  options!: BaseOptions[] | null

}
export class PaymentMethods {

  @autoserializeAs('id')
  id!: number

  @autoserializeAs('isBrandActive')
  isBrandActive!: boolean

}
export class ToPage {

  @autoserializeAs('pageId')
  pageId!: string

  @autoserializeAs('labelTh')
  labelTh!: string | null

  @autoserializeAs('labelEn')
  labelEn!: string | null

  @autoserializeAs('sortOrder')
  sortOrder!: number

}

/* Raw product from inCart */

class BaseInCartProduct {

  @autoserializeAs('id')
  id!: number

  @autoserializeAs('sku')
  sku!: string

  @autoserializeAs('storeId')
  storeId!: string

  @autoserializeAs('type')
  type!: 'simple' | 'configurable'

  @autoserializeAs('width')
  width!: number | null

  @autoserializeAs('height')
  height!: number | null

  @autoserializeAs('length')
  length!: number | null

  @autoserializeAs('weight')
  weight!: number | null

  @autoserializeAs('visibility')
  visibility!: 'public' | 'private' | 'all'

  @autoserializeAs('status')
  status!: boolean

  @autoserializeAs('createdAt')
  createdAt!: Date

  @autoserializeAs('updatedAt')
  updatedAt!: Date | null

  @autoserializeAs(PriceFormat, 'price')
  price!: PriceFormat

  @autoserializeAs(Stock,'stock')
  stock!: Stock

  @autoserializeAs(Inventory, 'inventory')
  inventory!: Inventory[] | null

  // Not-relevant do not map.
  // @autoserializeAs(ProductRef, 'productRef')
  // productRef: ProductRef[] | null

  @autoserializeAs(Media, 'media')
  media!: Media[] | null

  @autoserializeAs('refillThresholdValue')
  refillThresholdValue!: number | null

  @autoserializeAs(Brand, 'brand')
  brand!: Brand | null

  @autoserializeAs(Badge, 'badge')
  badge!: Badge | null

  // Not-relevant do not map.
  // @autoserializeAs('metaKeywords')
  // metaKeywords: any[]

  // Not-relevant do not map.
  // @autoserializeAs('metaDescription')
  // metaDescription: any[]

  // TODO: Fixe me
  @autoserializeAs('properties')
  properties!: Array<any>

  @autoserializeAs(Attributes, 'attributes')
  attributes!: Attributes | null

  // Not-relevant do not map.
  // @autoserializeAs('chainStore')
  // chainStore: object

  // @autoserializeAs(PaymentMethods, 'paymentMethods')
  // paymentMethods!: PaymentMethods[] | null

  // Not-relevant do not map.
  // @autoserializeAs('specialCondition')
  // specialCondition: object

  // Not-relevant do not map.
  // @autoserializeAs(ToPage, 'toPage')
  // toPage: ToPage[] | null

  constructor(from: BaseInCartProduct | null = null) {
    if (!from) {
      return
    }
    this.id = from.id
    this.sku = from.sku
    this.storeId = from.storeId
    this.type = from.type
    this.width = from.width
    this.weight = from.weight
    this.height = from.height
    this.length = from.length
    this.media = from.media
    this.visibility = from.visibility
    this.status = from.status
    this.createdAt = from.createdAt
    this.updatedAt = from.updatedAt
    this.price = PriceFormat.noNull(from.price)
    this.stock = from.stock
    this.inventory = from.inventory
    this.media = from.media
    this.brand = from.brand
    this.badge = from.badge
    this.properties = from.properties
    this.attributes = from.attributes
    // this.paymentMethods = from.paymentMethods
  }
}

@inheritSerialization(BaseInCartProduct)
export class InCartProduct extends BaseInCartProduct {

  @autoserializeAs('name')
  name!: string

  @autoserializeAs('description')
  description!: string

  @autoserializeAs(LocalizedTaxonomy, 'categories')
  categories!: LocalizedTaxonomy[] | null

  @autoserializeAs(LangTaxonomy, 'tags')
  tags!: LangTaxonomy[] | null

  @autoserializeAs(InCartProduct, 'children')
  children!: InCartProduct[] | null

  constructor(from: InCartProduct | null = null) {
    super(from)
    if (!from) {
      return
    }
    this.name = from.name
    this.description = from.description
    this.categories = from.categories
    this.tags = from.tags
    this.children = from.children
  }
}

@inheritSerialization(BaseInCartProduct)
export class MultipleLangInCartProduct extends BaseInCartProduct {

  @autoserializeAs('byStoreId')
  byStoreId?: number

  @autoserializeAs(LangPair, 'name')
  name!: LangPair

  @autoserializeAs(LangPair, 'title')
  title!: LangPair

  @autoserializeAs(LangPair, 'description')
  description!: LangPair | null

  @autoserializeAs(LangTaxonomy, 'categories')
  categories!: LangTaxonomy[] | null

  @autoserializeAs(LangTaxonomy, 'tags')
  tags!: LangTaxonomy[] | null

  @autoserializeAs('codeColor')
  codeColor?: string | null

  @autoserializeAs('colorSwatch')
  colorSwatch?: string | null

  @autoserializeAs(MultipleLangInCartProduct, 'children')
  children: MultipleLangInCartProduct[] = []

  @autoserializeAs(StockReserve, 'stockReserve')
  stockReserve!: StockReserve[] | null

  @autoserializeAs('vizCoin')
  vizCoin?: number

  @autoserializeAs('rawQty')
  rawQty?: number | null

  @autoserializeAs('refillStock')
  refillStock?: boolean | null

  @autoserializeAs('backInStockTimeStamp')
  backInStockTimeStamp: number = 0

  @autoserializeAs('productStock')
  productQty?: number | null

  constructor(from: MultipleLangInCartProduct| null = null) {
    super(from)
    if (!from) {
      return
    }
    this.name = from.name
    this.description = from.description
    this.categories = from.categories
    this.tags = from.tags
    this.children = from.children
  }
}

export class Payloads {
  @autoserializeAs(Stock, 'stocks')
  stocks!: Stock[]

  @autoserializeAs('refillThresholdValue')
  refillThresholdValue?: number

  @autoserializeAs('updatedAt')
  updatedAt!: Date
}

export class PayloadStock {
  @autoserializeAs(Payloads, 'payloads')
  payloads!: Payloads[]

  @autoserializeAs('storeId')
  storeId!: string
}

export class Products {
  @autoserializeAs('id')
  id!: number

  @autoserializeAs('sku')
  sku!: string

  @autoserializeAs('stockType')
  stockType!: 'infinite' | 'normal'

  @autoserializeAs('qty')
  qty!: number

  @autoserializeAs('type')
  type!: 'simple' | 'configurable'
}

export class PayloadUpdateStockIncart {
  @autoserializeAs(Products, 'products')
  products!: Products[]

  @autoserializeAs('storeId')
  storeId!: string
}

export class ReserveStock {
  @autoserializeAs('sku')
  sku!: string

  @autoserializeAs('storeId')
  storeId!: string

  @autoserializeAs('orderId')
  orderId!: string

  @autoserializeAs('qty')
  qty!: number
  
  @autoserializeAs('indexId')
  indexId?: string

  @autoserializeAs('returnStock')
  returnStock?: boolean | true
}

export class PayloadReserveStock {
  @autoserializeAs(ReserveStock, 'payloads')
  payloads!: ReserveStock[]
}

