const domains = {
  prod: 'https://mirateo.jp',
  dev: 'https://dev.mirateo.jp',
  local: 'http://0.0.0.0:8080',
}

exports.handler = async (event, context, callback) => {
  console.log('dev-cognito-mail-confirm-message-customize', event)
  const triggerSource = event.triggerSource
  if (
    triggerSource === 'CustomMessage_SignUp' ||
    triggerSource === 'CustomMessage_ResendCode' ||
    triggerSource === 'CustomMessage_ForgotPassword'
  ) {
    // Ensure that your message contains event.request.codeParameter. This is the placeholder for code that will be sent
    const { codeParameter, clientMetadata } = event.request
    const { userName, region } = event
    const { clientId } = event.callerContext
    const { email } = event.request.userAttributes

    const env = clientMetadata ? clientMetadata.env : ''
    const domain = domains[env] || domains.dev

    const url = `${domain}/${
      triggerSource === 'CustomMessage_ForgotPassword' ? 'password-reset' : 'confirm-signup'
    }`
    const encodedEmail = encodeURIComponent(email)
    const link = `<a href="${url}?code=${codeParameter}&username=${userName}&clientId=${clientId}&region=${region}&email=${encodedEmail}" target="_blank">こちら</a>`

    event.response.emailSubject = 'ミラテオの登録確認'
    event.response.emailMessage = `ミラテオへようこそ。登録を完了するには${link}をクリックしてください。`

    if (triggerSource === 'CustomMessage_ForgotPassword') {
      event.response.emailSubject = 'ミラテオのパスワードリセット'
      event.response.emailMessage = `パスワードのリセット手続きは${link}で行ってください。`
    }
  }
  callback(null, event)
}
