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
  }
}
