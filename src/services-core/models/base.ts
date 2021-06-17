import { autoserializeAs } from 'cerialize'
import { DateSerializer } from '../../utils/cerialize'

export abstract class DynamoBaseEntity {

  @autoserializeAs(DateSerializer, 'createdAt')
  createdAt!: Date
  
  @autoserializeAs(DateSerializer, 'updatedAt')
  updatedAt!: Date

  @autoserializeAs('version')
  version!: number
}