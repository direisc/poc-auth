import { deleteCookie, getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useIdleTimer } from 'react-idle-timer'
import { AuthContext } from './AuthContext'
import { IdleModal } from './IdleModal'
import { IUserTokenData } from './IUserTokenData'
import { postRefreshToken } from './postRefreshToken'

export type IdleState = 'Active' | 'Idle' | 'Prompted'

export type LoginInputType = {
  email: string
  password: string
}

// TODO should get values from env like today
const CONFIG_TIME_IN_SECONDS = {
  promptBeforeIdleInSeconds: 15,
  timeoutInSeconds: 0.5,
  shouldRefreshInSeconds: 60,
  throttleRefresh: 15,
}

interface Me {
  user: any
  parentOrgToken?: string
  roles: any[]
  organizations: any[]
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()

  const accessToken = getCookie('accessToken')
  const rolesCookie = getCookie('roles')

  const [userTokenData, setUserTokenData] = useState<IUserTokenData | null>(null)

  // TODO checking state based on login
  const [state, setState] = useState<IdleState>('Active')
  const [remaining, setRemaining] = useState<number>(15)
  const [open, setOpen] = useState<boolean>(false)

  const shouldDisable =
    !accessToken || router.route.startsWith('/auth') || ['/accept-invitation', '/access-denied'].includes(router.route)

  // TODO replace by:
  // const { data, isSuccess } = useQuery({ queryKey: [GET_ME], queryFn: () => getMe(), enabled: !shouldDisable })
  const data: Me = {
    user: {},
    parentOrgToken: '',
    roles: [],
    organizations: [],
  }

  const rolesPlain: string[] = rolesCookie ? JSON.parse(rolesCookie) : data?.roles?.map(({ label }) => label)

  const logout = () => {
    setUserTokenData(null)
    // delete cookies works because is using same site domain
    deleteCookie('refreshToken', {
      domain: window.location.hostname,
      secure: window.location.hostname.includes('payology.io') ? true : false,
      sameSite: true,
    })
    deleteCookie('accessToken', {
      domain: window.location.hostname,
      secure: window.location.hostname.includes('payology.io') ? true : false,
      sameSite: true,
    })
    deleteCookie('roles', {
      domain: window.location.hostname,
      secure: window.location.hostname.includes('payology.io') ? true : false,
      sameSite: true,
    })

    router.push('/auth/login')
  }

  const onIdle = () => {
    setState('Idle')
    setOpen(false)

    logout()
  }

  const onActive = () => {
    setState('Active')
    setOpen(false)
  }

  const onPrompt = () => {
    setState('Prompted')
    setOpen(true)
  }

  const { getRemainingTime, activate } = useIdleTimer({
    onIdle,
    onActive,
    onPrompt,
    timeout: CONFIG_TIME_IN_SECONDS.timeoutInSeconds * 60 * 1_000,
    promptBeforeIdle: CONFIG_TIME_IN_SECONDS.promptBeforeIdleInSeconds * 1_000,
    stopOnIdle: true,
    crossTab: true,
    leaderElection: true,

    disabled: shouldDisable,
  })

  const handleStillHere = () => {
    activate()
  }

  const hasRole = (role: string): boolean => {
    return process.env.NEXT_PUBLIC_IS_TEST ? true : !!rolesPlain?.some((validRole) => validRole === role)
  }

  useEffect(() => {
    console.log('mount useEffect')
    const intervalRemainingTime = setInterval(() => {
      if (state === 'Prompted') {
        setRemaining(Math.ceil(getRemainingTime() / 1_000))
      } else {
        setRemaining(15)
      }
    }, 500)

    const intervalRefreshToken = setInterval(async () => {
      if (state === 'Idle') {
        logout()
      } else {
        const shouldRefresh = !!getCookie('refreshToken')
          ? userTokenData && userTokenData.exp
            ? Boolean(userTokenData.exp * 1_000 - CONFIG_TIME_IN_SECONDS.shouldRefreshInSeconds * 1_000 <= Date.now())
            : true
          : false

        if (shouldRefresh) {
          await postRefreshToken()
        }
      }
    }, CONFIG_TIME_IN_SECONDS.throttleRefresh * 1_000)

    return () => {
      clearInterval(intervalRemainingTime)
      clearInterval(intervalRefreshToken)
    }
  })

  return (
    <AuthContext.Provider
      value={{
        userTokenData,
        logout,
        user: data.user,
        parentOrgToken: data.parentOrgToken || '',
        organizations: data.organizations || [],
        roles: data.roles,
        hasRole,
      }}
    >
      {children}
      <IdleModal open={open} remaining={remaining} handleStillHere={handleStillHere} />
    </AuthContext.Provider>
  )
}
