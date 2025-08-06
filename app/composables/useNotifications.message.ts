export type NotificationKey = "signInWithOtp" | "signUp"

type NotificationMessages = {
  [key in NotificationKey]: {
    success?: string
    error?: string
  };
}

export function useNotificationsMessages() {
  // const { t } = useI18n()

  const notificationMessages: NotificationMessages = {
    signInWithOtp: {
      success:
        "We sent you a magic link to Log In into your account. Please check your email.",
      error:
        "We couldn't log you in. Please try again or contact support.",
    },
    signUp: {
      success:
        "Successfully signed up! Please check your email to verify your account.",
      error:
        "We encounter an error while signing up. Please try again or contact support.",
    },
  }

  return {
    notificationMessages,
  }
}
