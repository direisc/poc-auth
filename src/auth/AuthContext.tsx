import { createContext } from 'react'
import { IUserTokenData } from './IUserTokenData'

interface UserDetail {}
interface RolesDetail {}
interface OrganizationXpto {}

interface AuthContextProps {
  userTokenData?: IUserTokenData | null
  logout(): void

  user: UserDetail
  parentOrgToken: string
  organizations: OrganizationXpto[]
  roles: RolesDetail[]
  hasRole: (role: string) => boolean
}

export const AuthContext = createContext<AuthContextProps>({
  userTokenData: null,
  logout: () => {},
  user: {} as UserDetail,
  parentOrgToken: '',
  organizations: [],
  roles: [],
  hasRole: () => false,
})
