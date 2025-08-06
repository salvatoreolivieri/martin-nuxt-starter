import { toast } from "vue-sonner"

import type { NotificationKey } from "./useNotifications.message"

import { useNotificationsMessages } from "./useNotifications.message"

/**
 * Notification options configuration.
 */
type Options = {
  /**
   * Unique key to identify the notification message.
   */
  key: NotificationKey

  /**
   * Indicates if the notification is a success or error message.
   */
  isSuccess: boolean

  /**
   * The position where the notification appears.
   * @default 'bottom'
   */
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right"

  /**
   * Duration (in milliseconds) before the notification disappears.
   * @default 3000
   */
  duration?: number

  /**
   * List of actions associated with the notification.
   */
  action?: {
    label: string
    onClick: () => void
  }[]

  /**
   * Extra message to append to the main notification message.
   */
  description?: string
}

/**
 * @name useNotifications
 * @description This composable globally handle the app notifications across the application.
 * It leverages Quasar's notification system to display success and error messages.
 */
export function useNotifications() {
  const { notificationMessages } = useNotificationsMessages() // Retrieve predefined notification messages.

  /**
   * @name addNotification
   * @description Displays a notification based on the provided options.
   *
   * @param {Options} options - Configuration options for the notification.
   */
  const addNotification = ({
    key,
    isSuccess,
    position = "bottom-right",
    duration = 3000,
    action,
    description,
  }: Options) => {
    const type = isSuccess ? "success" : "error" // Determine notification type.
    const message = notificationMessages[key][type] ?? ""

    toast[type](message, {
      richColors: !isSuccess,
      description,
      duration,
      position,
      action,
    })
  }

  /**
   * @name addNotificationSuccess
   * @description Displays a success notification with predefined options.
   *
   * @param {Omit<Options, 'isSuccess'>} options - Notification options excluding `isSuccess`.
   */
  const addNotificationSuccess = (
    options: Omit<Options, "isSuccess">,
  ) => {
    addNotification({
      ...options,
      isSuccess: true,
    })
  }

  /**
   * @name addNotificationError
   * @description Displays an error notification with predefined options.
   *
   * @param {Omit<Options, 'isSuccess'>} options - Notification options excluding `isSuccess`.
   */
  const addNotificationError = (
    options: Omit<Options, "isSuccess">,
  ) =>
    addNotification({
      ...options,
      isSuccess: false,
    })

  return {
    addNotificationSuccess,
    addNotificationError,
  }
}
