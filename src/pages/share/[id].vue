<script>
import { accountNames, hashids } from '@/utils'

export default {
  name: 'RestoreDashboard',
  beforeRouteEnter(to, from, next) {
    try {
      const hash = to.params.id
      const data = hashids.decode(hash)

      if (data && Array.isArray(data)) {
        accountNames.value = data
      }
    } finally {
      next('/')
    }
  }
}
</script>
