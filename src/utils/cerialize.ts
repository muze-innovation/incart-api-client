import { Serialize, DeserializeInto } from "cerialize"
import Fraction from 'fraction.js'

export const BooleanSerializer = (trueValue: string, falseValue: string) => ({
  Serialize(jsValue: boolean): string {
    return jsValue ? trueValue : falseValue
  },
  Deserialize(jsonValue: string): boolean {
    return jsonValue === trueValue
  }
})

export const ISODateSerializer = ({
  Serialize(jsValue: Date): string {
    return jsValue.toISOString()
  },
  Deserialize(jsonValue: string): Date {
    return new Date(jsonValue)
  }
})

export const JsonObjectToArraySerializer = <T>(cnstr: new (key: string | undefined) => T, serializeKey: (o: T) => string) => ({
  Serialize(jsValue?: T[]): any {
    if (!jsValue) {
      return {}
    }
    const r = {}
    for(const o of jsValue) {
      const key = serializeKey(o)
      r[key] = Serialize(o, cnstr)
    }
    return r
  },
  Deserialize(jsonValue: any): T[] {
    const r: T[] = []
    for(const k in jsonValue) {
      const e = DeserializeInto(jsonValue[k], cnstr, new cnstr(k))
      r.push(e)
    }
    return r
  }
})

export const FractionSerializer = {
  Serialize(value: any): any {
    if (typeof value === 'number') {
      return value
    }
    if (typeof value === 'undefined') {
      return undefined
    }
    if (value === null) {
      return null
    }
    if (value instanceof Fraction) {
      return value.toString()
    }
    return +value
  },

  Deserialize(value: any): Fraction | null | undefined {
    if (typeof value === 'undefined') {
      return undefined
    }
    else if (value === null) {
      return null
    }
    else if (typeof value === 'string') {
      return new Fraction(value.trim() || 0)
    }
    return new Fraction(value)
  }
}

export const DateSerializer = {
  /**
   * dataValue => JSON data
   * @param dataValue
   * @returns number
   */
  Serialize(json?: string | Date | null) : number | null {
    if (!json) {
      return null
    }
    if (typeof json === 'string') {
      // Compare with Regex.
      return new Date(json).getTime()
    }
    if (json instanceof Date) {
      return json.getTime()
    }
    return null
  },
  Deserialize(json: Date | string | number | null) : Date | null {
    if (!json) {
      return null
    }
    if (typeof json === 'number' || typeof json === 'string') {
      // Compare with Regex.
      return new Date(json)
    }
    if (json instanceof Date) {
      return json
    }
    return null
  }
}