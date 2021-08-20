import ky from 'ky'

const api = ky.create({
  prefixUrl: 'https://api.alienworlds.io/v1/alienworlds'
})

export const alienworlds = {
  async getMines(searchParams) {
    return await api.get('mines', { searchParams }).json()
  },

  async getLastMine(miner) {
    const data = await this.getMines({ miner, limit: 1 })
    return data.results[0]
  },

  async nextMineDate(miner) {
    const lastMine     = await this.getLastMine(miner)
    const lastMineDate = new Date(lastMine.block_timestamp)
    const cooldownTime = lastMine.params.delay
    const nextMineDate = new Date(lastMineDate.getTime() + (cooldownTime * 1000))

    return nextMineDate
  }
}
