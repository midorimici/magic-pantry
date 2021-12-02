import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  AuthError,
  AuthErrorCodes,
  SignInMethod,
  UserCredential,
} from '@firebase/auth'
import { auth } from 'lib/firebase'
import { loadingHandler } from 'lib/loadingHandler'
import { authUserState } from 'states/auth/atom'

export const useEmailPasswordAuth = (ref: React.RefObject<HTMLTextAreaElement>) => {
  const [email, setEmail] = useState('')
  const [emailIsValid, setEmailIsValid] = useState(false)
  const [validationError, setValidationError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showPasswordAndConfirmationForm, setShowPasswordAndConfirmationForm] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)

  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [passwordMismatch, setPasswordMismatch] = useState(false)
  const [passwordValidationMessage, setPasswordValidationMessage] = useState<string | null>(null)

  const [errorMessage, setErrorMessage] = useState('')

  const setUser = useSetRecoilState(authUserState)

  const handleEmailChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEmail(e.target.value)
    const isValid = ref.current?.validity.valid ?? false
    setEmailIsValid(isValid)
    setValidationError(!isValid)
  }

  const handleContinueWithEmailButtonClick = () => {
    loadingHandler(setIsLoading, async () => {
      // Check if the email has already registered
      let mailInGoogle: boolean = false
      let isNewUser: boolean = true
      await fetchSignInMethodsForEmail(auth, email).then((methods: string[]) => {
        if (methods.includes(SignInMethod.GOOGLE)) {
          mailInGoogle = true
        }
        if (methods.includes(SignInMethod.EMAIL_PASSWORD)) {
          isNewUser = false
        }
      })

      // If the mail address is already used in Google, don't sign up by email and password.
      if (mailInGoogle) {
        setErrorMessage('The mail address is already used.')
        return
      }

      setErrorMessage('')

      // If not registered, create password to sign up
      if (isNewUser) {
        setShowPasswordAndConfirmationForm(true)
        return
      }

      // If already registered, sign in with password
      setShowPasswordForm(true)
    })
  }

  const handleChangeEmailButtonClick = () => {
    setShowPasswordAndConfirmationForm(false)
    setShowPasswordForm(false)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPassword(e.target.value)
  }

  const handlePasswordChangeWithValidation = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setPassword(value)

    // Validate password
    if (value.length < 8) {
      setPasswordValidationMessage('Password should be at least 8 characters long.')
      return
    }

    if (!/[a-z]/.test(value)) {
      setPasswordValidationMessage('Password should contain at least one lowercase letters.')
      return
    }

    if (!/[A-Z]/.test(value)) {
      setPasswordValidationMessage('Password should contain at least one uppercase letters.')
      return
    }

    if (!/\d/.test(value)) {
      setPasswordValidationMessage('Password should contain at least one digit.')
      return
    }

    if (!/[^a-zA-Z0-9]/.test(value)) {
      setPasswordValidationMessage('Password should contain at least one special character.')
      return
    }

    setPasswordValidationMessage('')

    // Check if passwords match
    if (value !== passwordConfirmation) {
      setPasswordMismatch(true)
      return
    }

    setPasswordMismatch(false)
  }

  const handleConfirmationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setPasswordConfirmation(value)

    // Check if passwords match
    if (value !== password) {
      setPasswordMismatch(true)
      return
    }

    setPasswordMismatch(false)
  }

  const handleSignInButtonClick = () => {
    loadingHandler(setIsLoading, async () => {
      await signInWithEmailAndPassword(auth, email, password)
        .then((cred: UserCredential) => {
          setUser(cred.user)
          setErrorMessage('')
        })
        .catch((err: AuthError) => {
          console.error(`Sign in failed: ${err.code} ${err.message} ${err.stack}`)
          if (err.code === AuthErrorCodes.INVALID_PASSWORD) {
            setErrorMessage('Wrong password. Please try again.')
          } else {
            setErrorMessage('Unexpected error.')
          }
        })
    })
  }

  const handleSignUpButtonClick = () => {
    loadingHandler(setIsLoading, async () => {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((cred: UserCredential) => setUser(cred.user))
        .catch((err: AuthError) => {
          console.error(`Sign up failed: ${err.code} ${err.message} ${err.stack}`)
        })
    })
  }

  return {
    email,
    emailIsValid,
    validationError,
    isLoading,
    showPasswordAndConfirmationForm,
    showPasswordForm,
    password,
    passwordValidationMessage,
    passwordMismatch,
    errorMessage,
    handleEmailChange,
    handleContinueWithEmailButtonClick,
    handleChangeEmailButtonClick,
    handlePasswordChange,
    handlePasswordChangeWithValidation,
    handleConfirmationChange,
    handleSignInButtonClick,
    handleSignUpButtonClick,
  }
}
