import ky from 'ky'

const api = ky.create({
  prefixUrl: 'https://waxapi.ledgerwise.io/v1'
})

const atx = ky.create({
  prefixUrl: 'https://wax.greymass.com/v1'
})

export const wax = {
  async getAccount(user) {
    const body = JSON.stringify({ account_name: user })
    return await api.post('chain/get_account', { body }).json()
  },

  async getBalance(user, options) {
    const body = JSON.stringify({ account: user, ...options })
    return await api.post('chain/get_currency_balance', { body }).json()
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

    return await api.post('chain/get_table_rows', { body }).json()
  },

  async getTransaction(id) {
    const body = JSON.stringify({ id })
    return await atx.post('history/get_transaction', { body }).json()
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
  },

  getClaims(user) {
    return this.getTableRows(user, 'm.federation', 'claims')
  }
}
