import { ProtectedRoute } from '../components/ProtectedRoute'
import { Admin } from './Admin'

export function AdminRoute() {
  return <ProtectedRoute><Admin /></ProtectedRoute>
}
