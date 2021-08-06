const appURL = import.meta.env.VITE_APP_URL
const userID = import.meta.env.VITE_COUNTER_ID

export default {
  install: () => {
    if (!userID || typeof window == 'undefined') {
      return
    }

    if (!location.href.match(appURL) || location.href.match('share')) {
      return
    }

    if (!sessionStorage.getItem('_swa') && document.referrer.indexOf(appURL) !== 0) {
      const params = new URLSearchParams({
        referrer: document.referrer,
        screen: `${screen.width}x${screen.height}`,
        user: userID,
        utcoffset: '3'
      })

      fetch(`https://counter.dev/track?${params}`)
    }

    sessionStorage.setItem('_swa', '1')
  }
}
