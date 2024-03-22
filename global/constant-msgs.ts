// these are next-auth error codes
const AUTH_ERRORS = {
  Signin: "Try signing with a different account.",
  OAuthSignin: "Try signing with a different account.",
  OAuthCallback: "Try signing with a different account.",
  OAuthCreateAccount: "Try signing with a different account.",
  EmailCreateAccount: "Try signing with a different account.",
  Callback: "Try signing with a different account.",
  OAuthAccountNotLinked: "Email already associated with another account.",
  EmailSignin: "Check your email address.",
  CredentialsSignin: "Invalid credentials!",
  AccessDenied: "Please confirm your account or contact administrator.",
  default: "Unable to sign in.",
} as const;

const SUCCESS_MESSAGES = {} as const;

export { AUTH_ERRORS, SUCCESS_MESSAGES };
