import ky from 'ky'

const api = ky.create({
  prefixUrl: 'https://wax.pink.gg/v1/chain'
})

const pink = {
  async getTableRows(user, scope, table) {
    const body = JSON.stringify({
      json: true,
      code: scope,
      scope: scope,
      table: table,
      lower_bound: user,
      upper_bound: user
    })

    return await api.post('get_table_rows', { body }).json()
  },

  getPlayer(user) {
    return this.getTableRows(user, 'federation', 'players')
  },

  getMiner(user) {
    return this.getTableRows(user, 'm.federation', 'miners')
  }
}

export { pink }
