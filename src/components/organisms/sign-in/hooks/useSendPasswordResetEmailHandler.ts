import { useState } from 'react'
import { sendPasswordResetEmail } from '@firebase/auth'
import { auth } from 'lib/firebase'
import { loadingHandler } from 'lib/loadingHandler'

export const useSendPasswordResetEmailHandler = () => {
  const [isSending, setIsSending] = useState(false)
  const [finishedSending, setFinishedSending] = useState(false)

  const handleSendEmailClick = (email: string) => {
    if (isSending) {
      return
    }

    loadingHandler(setIsSending, async () => {
      await sendPasswordResetEmail(auth, email)
        .then(() => {
          setFinishedSending(true)
          setTimeout(() => setFinishedSending(false), 3000)
        })
        .catch((err) => console.error(`Email send failed: ${err.code} ${err.message} ${err.stack}`))
    })
  }

  return { isSending, finishedSending, handleSendEmailClick }
}
