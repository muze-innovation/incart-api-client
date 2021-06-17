type CountryCode = '66'

export class RegEx {
  static email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  static thaiMobileNumber = /^\+66[1-9]\d{8,}$/
  static matchOneOf(...values: string[]) { return new RegExp(`^(${values.join(',')})$`) }
  static latLongValue = /^\d{1,}\.\d{3,}$/
  static vatId = /^\d{10,}$/
  static replace0withCoutnryCode(mayBePhoneNumber: string, countryCode: CountryCode = '66'): string {
    // Is this phone number that start with leading 0?
    const noSpaceAndDash = mayBePhoneNumber.replace(/\s-/gi, '')
    if (/^0[0-9]{8,}$/.test(noSpaceAndDash)) {
      return noSpaceAndDash.replace(/^0/, `+${countryCode}`)
    }
    return mayBePhoneNumber
  }
}