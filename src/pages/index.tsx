import * as React from "react"
import { GoogleLogin } from 'react-google-login';
import GoogleContacts from 'react-google-contacts';
import { navigate } from "gatsby"
import {Helmet} from "react-helmet";

const IndexPage = () => {
  const onSuccess = (res) => {
    fetch(`https://people.googleapis.com/v1/people/me/connections?personFields=names%2CemailAddresses`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${res.accessToken}`
      }
    }).then(res => res.json())
    .then(res => navigate("/contact-list", { state: { res }}))
  }

  return (
    <>
    <Helmet>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap" rel="stylesheet" />
    </Helmet>
    <GoogleLogin
      clientId={`${process.env.GATSBY_GOOGLE_SIGN_IN_KEY}.apps.googleusercontent.com`}
      buttonText="Login"
      onSuccess={onSuccess}
      onFailure={res => console.log('Failure response : ', res)}
      cookiePolicy={'single_host_origin'}
      scope={'https://www.googleapis.com/auth/contacts.readonly'}
    />
  </>
  )
}

export default IndexPage
