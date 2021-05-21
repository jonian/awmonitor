import ky from 'ky'

const definition = {
  async getAccount(user) {
    const body = JSON.stringify({ account_name: user })
    return await this.api.post('chain/get_account', { body }).json()
  },

  async getBalance(user, options) {
    const body = JSON.stringify({ account: user, ...options })
    return await this.api.post('chain/get_currency_balance', { body }).json()
  },

  async getTableRows(user, scope, table) {
    const body = JSON.stringify({
      json: true,
      code: scope,
      scope: scope,
      table: table,
      lower_bound: user,
      upper_bound: user
    })

    return await this.api.post('chain/get_table_rows', { body }).json()
  },

  async getTransaction(id) {
    return await this.api.get('history/get_transaction', { searchParams: { id } }).json()
  },

  getTLM(user) {
    return this.getBalance(user, { code: 'alien.worlds', symbol: 'TLM' })
  },

  getWAX(user) {
    return this.getBalance(user, { code: 'eosio.token', symbol: 'WAX' })
  },

  getPlayer(user) {
    return this.getTableRows(user, 'federation', 'players')
  },

  getMiner(user) {
    return this.getTableRows(user, 'm.federation', 'miners')
  }
}

const createHandler = options => {
  const api = ky.create(options)
  return { api, ...definition }
}

export const pink = createHandler({
  prefixUrl: 'https://wax.pink.gg/v1'
})

export const greymass = createHandler({
  prefixUrl: 'https://wax.greymass.com/v1'
})
