import React from "react"
import styled from 'styled-components';
import { Container } from "@material-ui/core"

const Image = styled.img`
  margin: auto;
  display: flex;
  width: 200px;
`;

const Header: React.FC = (): JSX.Element => (
  <Container maxWidth="sm">
    <Image
      src="https://res.cloudinary.com/womply/image/upload/flagship-app-ui/womply_logo_nhqwf7.png" 
      alt="Womply Logo"
    />
  </Container>
)

export default Header
