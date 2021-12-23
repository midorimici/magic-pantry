import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { sendEmailVerification, ActionCodeSettings, AuthError } from '@firebase/auth'
import { authUserState } from 'states/auth/atom'
import { loadingHandler } from 'lib/loadingHandler'

const actionCodeSettings: ActionCodeSettings = {
  url: 'http://localhost:3000/email-verification',
  handleCodeInApp: true,
}

export const useEmailVerification = () => {
  const [isVerified, setIsVerified] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [isError, setIsError] = useState(false)
  const [completedSending, setCompletedSending] = useState(false)
  const authUser = useRecoilValue(authUserState)

  useEffect(() => {
    if (authUser) {
      if (authUser.emailVerified) {
        setIsVerified(true)
      }
    }
  }, [authUser])

  const handleSendVerifyButtonClick = () => {
    if (authUser === null) {
      return
    }

    loadingHandler(setIsSending, async () => {
      await sendEmailVerification(authUser, actionCodeSettings)
        .then(() => setCompletedSending(true))
        .catch((err: AuthError) => {
          console.error(`Send email verification error: ${err.code} ${err.message} ${err.stack}`)
          setIsError(true)
        })
    })
  }

  return { isVerified, isSending, isError, completedSending, handleSendVerifyButtonClick }
}
