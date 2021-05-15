import ky from 'ky'

const api = ky.create({
  prefixUrl: 'https://api.binance.com/api/v3'
})

const binance = {
  async avgPrice(toSymbol) {
    const symbol = `TLM${toSymbol}`.toUpperCase()
    return await api.get('avgPrice', { searchParams: { symbol } }).json()
  }
}

export { binance }
