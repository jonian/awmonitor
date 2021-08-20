import ky from 'ky'

const api = ky.create({
  prefixUrl: 'https://wax.api.atomicassets.io/atomicassets/v1'
})

export const atomicassets = {
  async getAsset(id) {
    return await api.get(`assets/${id}`).json()
  }
}
