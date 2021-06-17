import { autoserializeAs } from 'cerialize'

export class LangPair {
  @autoserializeAs('en')
  en: string = ''

  @autoserializeAs('th')
  th: string = ''

  static empty(): LangPair {
    return new LangPair()
  }
}

export class DefaultKeyValue {
  @autoserializeAs('default')
  default: string | number

  constructor(defaultValue: string | number) {
    this.default = defaultValue
  }
}