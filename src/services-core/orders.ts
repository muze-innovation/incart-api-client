import { isEmpty } from 'lodash'
import { InCartService } from '../services/client'
import { OrderEntity } from './models/orders'

type EntityList = {
  count: number,
  items: OrderEntity[]
}

type QueryCondition = {
  pageSize?: number
  currentPage?: number
  sortDirection?: 'asc' | 'desc'
  groupBy?: string
} & QueryKeywords

type QueryKeywords = {
  [key: string]: string
} | {}

export class OrderService extends InCartService {

  public async createOrder(storeId: string, order: Partial<OrderEntity>): Promise<OrderEntity> {
    const { data } = await this.axios.post(`${storeId}/order`, order)
    return data
  }

  public async list(storeId: string, condition: QueryCondition = {}): Promise<EntityList> {
    const { 
      pageSize = 10,
      currentPage = 1,
      sortDirection = 'asc',
      groupBy = '',
      ...keywords
    } = condition
    let requestUrl = `${storeId}/order/search?pageSize=${pageSize}&currentPage=${currentPage}&sortDirection=${sortDirection}`
    if (!isEmpty(groupBy)){
      requestUrl = requestUrl.concat(`&groupBy=${groupBy}`)
    }
    const kw = Object.keys(keywords).map(
      (k) => `${k}=${encodeURIComponent(keywords[k])}`
    ).join('&')
    if (!isEmpty(kw)){
      requestUrl = requestUrl.concat(`&${kw}`)
    }
    const { data } = await this.axios.get(requestUrl)
    return data
  }
  
  public async getOrderById(storeId: string, orderId: string): Promise<OrderEntity> {
    const { data } = await this.axios.get(`${storeId}/order/${orderId}`)
    return data
  }

  public async updateOrderByid(storeId: string, orderId: string, entity: Partial<OrderEntity>): Promise<EntityList> {
    const { data } = await this.axios.post(`${storeId}/order/${orderId}`, entity)
    return data
  }
  

}