import ky from 'ky'

const api = ky.create({
  prefixUrl: 'https://wax.greymass.com/v1/history'
})

const greymass = {
  async getTransaction(id) {
    return await api.get('get_transaction', { searchParams: { id } }).json()
  }
}

export { greymass }
