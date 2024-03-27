// these are next-auth error codes
const ERROR_MESSAGES = {
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
  InvalidField: "Invalid fields!",
  EmailInUse: "Email already in use",
  InternalServerError:
    "We have encountered an internal error. Please try again later.",
  InvalidToken: "Invalid token.",
  TokenExpired: "Token expired. Please request a new one.",
  default: "Unable to sign in.",
  OAuthResetPasswordNotAllowed:
    "Your account doesn't have a password. Please sign in with your social account.",
} as const;

const SUCCESS_MESSAGES = {
  EmailVerificationSent: "Email verification sent! Please check your inbox.",
  PasswordResetEmailSent: "Instructions sent! Please check your inbox.",
  AlreadySentVerificationEmail:
    "You have already received a verification email. Please check your inbox.",
  AlreadySentPassowrdResetEmail:
    "You have already received a password reset email. Please check your inbox.",
  TokenVerified: "Your account has been verified! Redirecting to signin...",
  PasswordResetSuccess: "Password reset successful! Redirecting to signin...",
  default: "Success!",
} as const;

export { ERROR_MESSAGES, SUCCESS_MESSAGES };
