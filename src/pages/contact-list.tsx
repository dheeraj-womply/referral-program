import { Button, Checkbox, Container, FormControlLabel, Grid, InputAdornment, TextField } from "@material-ui/core"
import React, { useState } from "react"
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search'

const StyledHeader = styled.div`
  font-size: 28px;
  text-align: center;
  line-height: 36px;
  font-weight: 600;
  font-family: 'Roboto', sans-serif;
  margin-bottom: 30px;
`;

const SubText = styled.div`
  font-size: 16px;
  text-align: center;
  line-height: 24px;
  font-weight: 400;
  margin-bottom: 35px;
  font-family: 'Roboto', sans-serif;
`

const SearchBox = styled(TextField)`
  margin-bottom: 30px !important;
  font-family: 'Roboto', sans-serif;

`

const StyledSearchIcon = styled(SearchIcon)`
  fill: grey;
`

const ListItem = styled(Grid)`
  font-family: 'Roboto', sans-serif;
  padding: 10px;
  cursor: pointer;
  background: ${props => props.selected ? '#26BA8F' : '#fff'};
  border-radius: 5px;
  margin-bottom: 10px;
  color: ${props => props.selected ? '#fff' : '#000'};
`;

const StyledCheckbox = styled(Checkbox)`
  padding: 0 !important;
`;

const List = styled(Grid)`
  height: 275px;
  overflow-y: auto;
`

const PriceText = styled(Grid)`
  color: #636E72;
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
`;

const Amount = styled(Grid)`
  color: #000;
  font-size: 18px;
  font-weight: 600;
  font-family: 'Roboto', sans-serif;
  margin-top: 8px;
  line-height: 24px;
`;

const Footer = styled(Grid)`
  margin-top: 20px;
`;

const StyledButton = styled(Button)`
  background: ${props => props.disabled ? 'rgba(0, 0, 0, 0.12)' : '#0805C4'};
  color: #fff;
  padding: 10px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  &:hover {
    background: #0805C4;
    }
`;

const StyledContainer = styled(Container)`
    border: 1px solid gainsboro;
    padding: 40px;
`

const ContactList = (props) => {
  const [selected, setSelected] = useState<Array<string>>([])
  const [searchTerm, setSearchTerm] = useState('')

  const matchString = (
    data: any,
    field: string,
    searchString: string
  ): boolean => new RegExp(searchString, 'gi').test(data[field])

  const onSelect = (element: string) => {
    if(selected.includes(element)) {
      selected.splice(selected.indexOf(element), 1)
      setSelected([...selected])
    } else {
      setSelected([...selected, element])
    }
  }

  return (
    <StyledContainer maxWidth="sm" style={{marginTop: 30}}>
      <Grid container>
        <Grid item xs={12}>
          <StyledHeader >Invite your friends to Womply!</StyledHeader>
        </Grid>
        <Grid item xs={12}>
          <SubText>You’ll receive $200 for every new friend who gets funded</SubText>
        </Grid>
        <Grid item xs={12}>
        <SearchBox
            fullWidth
            variant="outlined"
            placeholder="Search for a name or email address"
            margin="dense"
            // value={searchTerm}
            // disabled={loading}
            inputProps={{
              'data-testid': 'search',
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <StyledSearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={(event: React.ChangeEvent) =>
              setSearchTerm((event.target as HTMLInputElement).value)
            }
          />
        </Grid>
        <List container>
          <Grid item xs={12}>
            {props.location.state.res.connections.filter(e =>
                matchString(e.names[0], 'displayName', searchTerm) || matchString(e.emailAddresses[0], 'value', searchTerm)
              ).map(e => {
              return (
                <ListItem container onClick={() => onSelect(e.emailAddresses[0].value)} selected={selected.includes(e.emailAddresses[0].value)}>
                  <Grid item xs={5}>
                    {e.names[0].displayName}
                  </Grid>
                  <Grid item xs={6}>
                    {e.emailAddresses[0].value}
                  </Grid>
                  <Grid item xs={1}>
                    <StyledCheckbox
                      color="default"
                      checked={selected.includes(e.emailAddresses[0].value)}
                    />
                  </Grid>
                </ListItem>

                )
            })}

          </Grid>
        </List>
        <Footer container>
          <Grid item xs={8}>
            <Grid container>
              <PriceText item xs={12}>
                Potential reward
              </PriceText>
              <Amount item xs={12}>
                ${200*selected.length}
              </Amount>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <StyledButton fullWidth disabled={!selected.length}>Invite {selected.length} Friends</StyledButton>
          </Grid>
        </Footer>
          
          
      </Grid>
    </StyledContainer>
  )
}

export default ContactList
