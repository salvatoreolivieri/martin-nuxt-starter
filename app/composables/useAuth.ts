import type { AuthError, Provider } from "@supabase/supabase-js"

export type User = {
  id: string
  name: string
  email: string
  phone: string
  address: string
  avatar: string
  providers: Provider[]
}

/**
 * Custom composable for managing authentication using Supabase.
 * Provides access to user state, access token, and authentication methods.
 */
export function useAuth() {
  const {
    addNotificationSuccess,
    addNotificationError,
  }
    = useNotifications()

  const { auth } = useSupabaseClient()
  const supabaseUser = useSupabaseUser()
  const accessToken = useSupabaseSession().value?.access_token

  const user = computed(
    (): User => ({
      id: supabaseUser.value?.id ?? "",
      name: "Salvatore Olivieri",
      email: supabaseUser.value?.email ?? "",
      phone: supabaseUser.value?.phone ?? "",
      address: "",
      avatar: "",
      providers: supabaseUser.value?.app_metadata.providers,
    }),
  )

  /**
   * Reactive boolean indicating if the user is logged in.
   */
  const isLoggedIn = computed(() => !!supabaseUser.value)

  const addNotification = (
    error: AuthError | null,
    key: NotificationKey,
  ) => {
    if (error) {
      addNotificationError({
        key,
      })
    }
    else {
      addNotificationSuccess({
        key,
        duration: Infinity,
      })
    }
  }

  /**
   * Sends a one-time password (OTP) sign-in link to the provided email.
   * @param {string} email - The user's email address.
   */
  const signInWithOtp = async (email: string): Promise<void> => {
    const { error } = await auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "http://localhost:5173/dashboard",
      },
    })

    addNotification(error, "signInWithOtp")
  }

  /**
   * Initiates OAuth sign-in flow with the specified provider.
   * @param {provider} Provider - The name of the OAuth provider (e.g., 'google', 'github').
   */
  const signInWithOAuth = async (
    provider: Provider,
  ): Promise<void> => {
    const { error } = await auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: "/confirm",
      },
    })

    // TODO: handle notifications
    if (error)
      console.log(error)
  }

  /**
   * Registers a new user with email and password.
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   */
  const signUp = async (
    email: string,
    password: string,
  ): Promise<void> => {
    const { error } = await auth.signUp({
      email,
      password,
    })

    addNotification(error, "signUp")
  }

  /**
   * Logs out the current user and navigates to the login page.
   * @returns {Promise<void>}
   */
  const logOut = async () => {
    await auth.signOut()
    navigateTo("/login")
  }

  return {
    user,
    accessToken,
    isLoggedIn,

    signInWithOtp,
    signInWithOAuth,
    signUp,
    logOut,
  }
}
