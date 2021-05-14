import ky from 'ky'

const api = ky.create({
  prefixUrl: 'https://chain.wax.io/v1/chain'
})

const wax = {
  async getAccount(user) {
    const body = JSON.stringify({ account_name: user })
    return await api.post('get_account', { body }).json()
  },

  async getBalance(user, options) {
    const body = JSON.stringify({ account: user, ...options })
    return await api.post('get_currency_balance', { body }).json()
  },

  getTLM(user) {
    return this.getBalance(user, { code: 'alien.worlds', symbol: 'TLM' })
  },

  getWAX(user) {
    return this.getBalance(user, { code: 'eosio.token', symbol: 'WAX' })
  }
}

export { wax }
