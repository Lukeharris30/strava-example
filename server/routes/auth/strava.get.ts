export default defineOAuthStravaEventHandler({
  config: {
    approvalPrompt: 'force',
    scope: ['profile:read_all', 'activity:read_all'],
  },
  async onSuccess(event, { user, tokens }) {
    await setUserSession(event, {
      user,
      secure: {
        apiToken: tokens.access_token,
        expiresAt: tokens.expires_at,
        expiresIn: tokens.expires_in,
        refreshToken: tokens.refresh_token
      },
      loggedInAt: new Date()
    })
    return sendRedirect(event, '/')
  },
  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    console.error('GitHub OAuth error:', error)
    return sendRedirect(event, '/')
  },
})