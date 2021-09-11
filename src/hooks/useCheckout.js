import { useState } from 'react'
import { NotificationManager } from 'react-notifications'
import { useHistory } from 'react-router-dom'
import orderService from 'services/order'

export default function useCheckout() {
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = async () => {
    try {
      setIsLoading(true)
      await orderService.add()
      NotificationManager.success('Checkout successfully', 'Success')
      history.push('/transactions')
    } catch (err) {
      if (err.response.status === 401) {
        history.push({
          pathname: '/login',
          state: { message: 'Please login first' },
        })
      }
    }

    setIsLoading(false)
  }

  return [handleCheckout, isLoading]
}
