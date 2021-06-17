import { autoserializeAs, inheritSerialization } from 'cerialize'
import { IsNotEmpty, ValidateNested, IsEmail } from 'class-validator'
import  Fraction from 'fraction.js'
import { DynamoBaseEntity } from './base'
import { DateSerializer, FractionSerializer } from "../../utils/cerialize";
export class OrderItem {

    @autoserializeAs('itemId')
    itemId!: String

    @autoserializeAs('orderId')
    orderId!: String
    
    @IsNotEmpty()
    @autoserializeAs('sku')
    sku!: String

    @autoserializeAs(FractionSerializer, 'originalPrice')
    originalPrice: Fraction = new Fraction(0)

    @autoserializeAs(FractionSerializer, 'price')
    price: Fraction = new Fraction(0)

    @autoserializeAs(FractionSerializer, 'priceInclTax')
    priceInclTax: Fraction = new Fraction(0)

    @autoserializeAs(FractionSerializer, 'rowTotal')
    rowTotal: Fraction = new Fraction(0)

    @autoserializeAs(FractionSerializer, 'rowTotalInclTax')
    rowTotalInclTax: Fraction = new Fraction(0)

    @autoserializeAs(FractionSerializer, 'rowTotalWithDiscount')
    rowTotalWithDiscount: Fraction = new Fraction(0)

    @autoserializeAs(FractionSerializer, 'taxAmount')
    taxAmount: Fraction = new Fraction(0)

    @autoserializeAs(FractionSerializer, 'taxBeforeDiscount')
    taxBeforeDiscount: Fraction = new Fraction(0)

    @autoserializeAs(FractionSerializer, 'taxPercent')
    taxPercent: Fraction = new Fraction(0)

    @autoserializeAs(FractionSerializer, 'taxInvoiced')
    taxInvoiced: Fraction = new Fraction(0)

    @autoserializeAs(FractionSerializer, 'taxRefunded')
    taxRefunded: Fraction = new Fraction(0)

    @autoserializeAs(FractionSerializer, 'discountAmount')
    discountAmount: Fraction = new Fraction(0)

    @autoserializeAs(FractionSerializer, 'discountPercent')
    discountPercent: Fraction = new Fraction(0)

    @autoserializeAs(FractionSerializer, 'discountTaxCompensationAmount')
    discountTaxCompensationAmount: Fraction = new Fraction(0)

    @autoserializeAs('name')
    name?: String

    @autoserializeAs('qty')
    qty: number = 0

    @autoserializeAs('qtyCanceled')
    qtyCanceled: number = 0

    @autoserializeAs('qtyInvoiced')
    qtyInvoiced: number = 0

    @autoserializeAs('qtyOrdered')
    qtyOrdered: number = 0

    @autoserializeAs('qtyRefunded')
    qtyRefunded: number = 0

    @autoserializeAs('qtyShipped')
    qtyShipped: number = 0

    @autoserializeAs('refItemId')
    refItemId?: number

    @autoserializeAs('rawData')
    rawData?: String

    @autoserializeAs('weight')
    weight?: number

    @autoserializeAs(DateSerializer, 'createdAt')
    createdAt!: Date

    @autoserializeAs(DateSerializer, 'updatedAt')
    updatedAt!: Date

    @autoserializeAs(FractionSerializer, 'paymentGatewayMdr')
    paymentGatewayMdr: Fraction = new Fraction(0)

}

@inheritSerialization(DynamoBaseEntity)
export class OrderEntity extends DynamoBaseEntity {
   
    @IsNotEmpty()
    @autoserializeAs('orderId')
    orderId!: string 
    
    @IsNotEmpty()
    @autoserializeAs('storeId')
    storeId!: string
    
    @autoserializeAs('cartId')
    cartId?: string

    @autoserializeAs('mapOrderId')
    mapOrderId?: number

    @autoserializeAs('orderToken')
    orderToken: string = ''

    @autoserializeAs('appliedRuleIds')
    appliedRuleIds : string[] = []

    @autoserializeAs('couponCode')
    couponCode?: string

    @autoserializeAs('appliedRules')
    appliedRules : {}[] = []

    @autoserializeAs('couponRuleName')
    couponRuleName?: string
    
    @autoserializeAs('status')
    status: 'new' | 'pending' | 'paid' | 'canceled' | 'waiting_to_ship' = 'new'

    @autoserializeAs('customerId')
    customerId?: string
    
    @IsNotEmpty()
    @autoserializeAs('name')
    name!: string
    
    @IsEmail()
    @autoserializeAs('email')
    email!: string

    @autoserializeAs('isArchived')
    isArchived: boolean = false

    @autoserializeAs(FractionSerializer, 'grandTotal')
    grandTotal : Fraction = new Fraction(0)

    @autoserializeAs(FractionSerializer, 'subtotal')
    subtotal : Fraction = new Fraction(0)

    @autoserializeAs(FractionSerializer, 'subtotalInclTax')
    subtotalInclTax : Fraction = new Fraction(0)

    @autoserializeAs(FractionSerializer, 'subtotalInvoiced')
    subtotalInvoiced : Fraction = new Fraction(0)

    @autoserializeAs(FractionSerializer, 'subtotalCanceled')
    subtotalCanceled : Fraction = new Fraction(0)

    @autoserializeAs(FractionSerializer, 'subtotalRefunded')
    subtotalRefunded : Fraction = new Fraction(0)

    @autoserializeAs(FractionSerializer, 'discountAmount')
    discountAmount : Fraction = new Fraction(0)

    @autoserializeAs(FractionSerializer, 'discountInvoiced')
    discountInvoiced : Fraction = new Fraction(0)

    @autoserializeAs(FractionSerializer, 'discountRefunded')
    discountRefunded : Fraction = new Fraction(0)

    @autoserializeAs(FractionSerializer, 'taxAmount')
    taxAmount : Fraction = new Fraction(0)

    @autoserializeAs(FractionSerializer, 'taxCanceled')
    taxCanceled : Fraction = new Fraction(0)

    @autoserializeAs(FractionSerializer, 'taxInvoiced')
    taxInvoiced : Fraction = new Fraction(0)

    @autoserializeAs(FractionSerializer, 'taxRefunded')
    taxRefunded : Fraction = new Fraction(0)

    @autoserializeAs(FractionSerializer, 'discountTaxCompensationAmount')
    discountTaxCompensationAmount : Fraction = new Fraction(0)

    @autoserializeAs(FractionSerializer, 'customShipping')
    customShipping : Fraction = new Fraction(0)

    @autoserializeAs(FractionSerializer, 'specialDiscountAmount')
    specialDiscountAmount : Fraction = new Fraction(0)

    @autoserializeAs('totalProducts')
    totalProduct : number = 0

    @autoserializeAs('totalQty')
    totalQty : number = 0

    @autoserializeAs('totalCanceled')
    totalCanceled : number = 0

    @autoserializeAs('totalInvoiced')
    totalInvoiced : number = 0

    @autoserializeAs('totalRefunded')
    totalRefunded : number = 0

    @autoserializeAs('paymentMethodId')
    paymentMethodId : number = 0

    @autoserializeAs(FractionSerializer, 'shippingAmount')
    shippingAmount : Fraction = new Fraction(0)

    @autoserializeAs(FractionSerializer, 'shippingDiscountAmount')
    shippingDiscountAmount : Fraction = new Fraction(0)

    @autoserializeAs(FractionSerializer, 'shippingInclTax')
    shippingInclTax : Fraction = new Fraction(0)

    @autoserializeAs(FractionSerializer, 'shippingTaxAmount')
    shippingTaxAmount : Fraction = new Fraction(0)

    @autoserializeAs('shippingMethodId')
    shippingMethodId? : number

    @autoserializeAs('shippingMethodName')
    shippingMethodName? : string

    @autoserializeAs('shippingMethodDetail')
    shippingMethodDetail : string = ''

    @autoserializeAs('globalCurrencyCode')
    globalCurrencyCode? : string

    @autoserializeAs('orderCurrencyCode')
    orderCurrencyCode? : string

    @autoserializeAs(FractionSerializer, 'globalToOrderRate')
    globalToOrderRate : Fraction = new Fraction(0)

    @autoserializeAs('weight')
    weight? : number

    @autoserializeAs(DateSerializer, 'expiredAt')
    expiredAt?: string

    @autoserializeAs('chainStoreId')
    chainStoreId : string = ''

    @autoserializeAs('chainStoreDetail')
    chainStoreDetail? : string

    @autoserializeAs('channelId')
    channelId? : number

    @autoserializeAs('orderRef')
    orderRef? : string

    @autoserializeAs('rawData')
    rawData? : string

    @autoserializeAs('remark')
    remark? : string

    @autoserializeAs('isGrandTotalOverrode')
    isGrandTotalOverrode? : string

    @autoserializeAs('meta')
    meta?: string 

    @autoserializeAs(DateSerializer, 'lastPrinted')
    lastPrinte?: Date

    @autoserializeAs('shippingDiscountTaxCompensationAmount')
    shippingDiscountTaxCompensationAmount : number = 0

    @autoserializeAs('totalShippingAmount')
    totalShippingAmount : number = 0
    
    @ValidateNested()
    @autoserializeAs(OrderItem, 'items')
    items?: OrderItem[] = []
}