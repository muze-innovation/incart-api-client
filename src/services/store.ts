import { Deserialize, DeserializeInto } from 'cerialize'
import { InCartService } from './client'
import { InCartLocation, InCartStore, InCartStoreNameCandidateValidation, InCartStorePackage } from './models/store'

export class InCartStoreService extends InCartService {

  /**
   * @param overrideAuthenticationToken 
   * @return User Admin Profile: { id, name, email }
   */
  public async getStore(storeId: string): Promise<InCartStore> {
    const resp = await this.axios.get(`/pcms/api/v1/stores/${storeId}/settings/general`)
    return DeserializeInto(resp.data, InCartStore, new InCartStore(storeId))
  }

  public async getLocation(storeId: string): Promise<InCartLocation> {
    const resp = await this.axios.get(`/${storeId}/api/v1/custom-domains/location`)
    return DeserializeInto(resp.data, InCartLocation, new InCartLocation(storeId))
  }

  public async getPackage(storeId: string): Promise<InCartStorePackage> {
    const resp = await this.axios.get(`/${storeId}/api/v1/subscriptions/package`)
    return Deserialize(resp.data, InCartStorePackage)
  }

  /**
   * Validate if given store name exists?
   * 
   * @param storeIdCandidate
   * @returns Status of candiate, or a new name if given store already exists.
   */
  public async validate(storeIdCandidate: string): Promise<InCartStoreNameCandidateValidation> {
    const resp = await this.axios.post(`/pcms/api/v1/stores/validate`, {
      storeName: storeIdCandidate
    })
    return Deserialize(resp.data, InCartStoreNameCandidateValidation)
  }
}