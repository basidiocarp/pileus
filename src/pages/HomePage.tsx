import { MarketingPage } from '../components/MarketingPage'
import { useStamp } from '../hooks/useStamp'

export function HomePage() {
  useStamp('home')
  return <MarketingPage />
}
