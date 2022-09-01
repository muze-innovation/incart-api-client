import { InCartService } from './client'

export interface StockLevelBySku {
  id: number
  sku: string
  stockType: string
  qty: number | null
  warhouseId: number
  status: boolean
}

export interface CheckStockBySkuResponse {
  stocks: StockLevelBySku[]
}

export class InCartStocksService extends InCartService {

  public async CheckStockBySku(storeId: string, skus: string[]): Promise<CheckStockBySkuResponse> {
    const res = await this.axios.post(`/pcms/${storeId}/api/v1/products/check-product-stock`, { skus })
    return res.data
  }
}