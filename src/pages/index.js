import * as React from "react"
import { GoogleLogin } from 'react-google-login';


const IndexPage = () => {
  return (
    <GoogleLogin
      clientId={`${process.env.GATSBY_GOOGLE_SIGN_IN_KEY}.apps.googleusercontent.com`}
      buttonText="Login"
      onSuccess={res => console.log('Success response : ', res)}
      onFailure={res => console.log('Failure response : ', res)}
      cookiePolicy={'single_host_origin'}
    />
  )
}

export default IndexPage
