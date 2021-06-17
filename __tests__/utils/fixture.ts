import { Client, getConfiguration, InCartAuthAdminService } from '../../src'

const clientCache: { [key: string]: Promise<Client> } = {}

export const credentials = {
  admin: [
    process.env.TESTER_USERNAME || 'REPLACE_WITH_YOUR_USERNAME',
    process.env.TESTER_PASSWORD || 'REPLACE_WITH_YOUR_INCART_PASSWORD',
  ],
  bad: [
    'incart@who.com',
    'password',
  ]
}

export const storeIds = {
  simpleStore: 'jest' // simple-store
  // TODO: Add more stores here.
  // Mall (SPW)
  // Child1 (SPW)
  // Child2 (SPW)
  // WeFresh
  // Belive
  // Beci
}

export const loggedInClient = async (role: 'admin' | 'bad'): Promise<Client> => {
  if (clientCache[role]) {
    return clientCache[role]
  }
  const make = (async (): Promise<Client> => {
    const config = getConfiguration('alpha')
    const cred = credentials[role]
    if (!cred) throw new Error(`Unknown role: ${role}`)
    const client = new Client(config)
    const auth = new InCartAuthAdminService(client)
    const token = await auth.login(credentials.admin[0], credentials.admin[1])
    client.overrideSession(token)
    return client
  })
  clientCache[role] = make()
  return clientCache[role]
}