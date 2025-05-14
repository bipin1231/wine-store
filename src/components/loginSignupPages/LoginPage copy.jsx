import React from 'react'

function LoginPage() {

  const GOOGLE_CLIENT_ID = "929473542830-t6sgrd1ll801muf7a14d6hhbnrgut1po.apps.googleusercontent.com";
  const REDIRECT_URI = "http://localhost:5173/oauth2/callback"; // Where Google will send the user after login
  const RESPONSE_TYPE = "code"; // We want a "code" (this is OAuth2 authorization code flow)
  const SCOPE = "openid email profile"; // We are asking permission for basic user info

  const loginWithGoogle = () => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
    window.location.href = url; // Redirect to Google login page
  }

  return (
    <>
      <div>
        hello
      <button onClick={loginWithGoogle}>Login with Google</button>
    </div>
    </>
  )
}

export default LoginPage
