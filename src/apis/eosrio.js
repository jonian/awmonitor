import ky from 'ky'

const api = ky.create({
  prefixUrl: 'https://wax.eosrio.io/v2/history'
})

const eosrio = {
  async getTransaction(id) {
    return await api.get('get_transaction', { searchParams: { id } }).json()
  }
}

export { eosrio }
