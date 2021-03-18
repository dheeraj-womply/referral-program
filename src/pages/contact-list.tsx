import React, { useEffect, useState } from "react"
import styled from 'styled-components';
import { Button, Checkbox, Container, Grid, Typography } from "@material-ui/core"
import ListItem from "../components/ListItem";
import Header from "../components/Header";
import SearchBox from "../components/SearchBox";

const StyledHeader = styled.div`
  font-size: 28px;
  text-align: center;
  line-height: 36px;
  font-weight: 600;
  margin-bottom: 30px;
`;

const SubText = styled.div`
  font-size: 16px;
  text-align: center;
  line-height: 24px;
  font-weight: 400;
  margin-bottom: 35px;
`

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
`;

const Amount = styled(Grid)`
  color: #000;
  font-size: 18px;
  font-weight: 600;
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
  font-family: 'Roboto', sans-serif;
  margin-top: 30px;
`;

const SelectAllGrid = styled(Grid)`
  cursor: pointer;
  color: ${props => props.disabled ? 'rgba(0, 0, 0, 0.26)' : '#000'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
`;

const NoContactFound = styled(Grid)`
    text-align: center;
    font-weight: 600;
`;

const ContactList:React.FC<{ location: any}> = ({ location }): JSX.Element => {
  const [selected, setSelected] = useState<Array<string>>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [contacts, setContacts] = useState<Array<any>>([])
  const [selectAll, setSelectAll] = useState<boolean>(false)
  // set to 200. need to fetch amount from API
  const [referralAmount, setReferralAmount] = useState<number>(200);

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

  const onSelectAll = (doSelectAll: boolean) => {
    if(doSelectAll) {
      setSelected(contacts.map(contact => contact?.emailAddresses?.[0]?.value))
    } else {
      setSelected([])
    }
    setSelectAll(doSelectAll)
  }

  useEffect(() => {
    setContacts(location.state.res.connections
      .filter(contact => !!contact?.emailAddresses?.[0])
      .filter(contact =>
        matchString(contact?.names?.[0] || {}, 'displayName', searchTerm) || 
        matchString(contact?.emailAddresses?.[0] || {}, 'value', searchTerm)
      )
    )
  }, [searchTerm])

  console.log(contacts)
  return (
    <>
    <Header />
    <StyledContainer maxWidth="sm">
      <Grid container>
        <Grid item xs={12}>
          <StyledHeader >Invite your friends to Womply!</StyledHeader>
        </Grid>
        <Grid item xs={12}>
          <SubText>You’ll receive ${referralAmount} for every new friend who gets funded</SubText>
        </Grid>
        <Grid item xs={8}>
          <SearchBox 
            onChange={(event: React.ChangeEvent) => {
                setSearchTerm((event.target as HTMLInputElement).value);
                setSelectAll(false);
              }
            }
          />
        </Grid>
        <Grid item xs={4}>
          <SelectAllGrid 
            container 
            onClick={() => !!contacts.length && onSelectAll(!selectAll)}
            disabled={!contacts.length}
          >
            <Grid item xs={9} style={{padding: 17}}>
              Select All
            </Grid>
            <Grid item xs={3} style={{paddingTop: 13}}>
              <StyledCheckbox
                color="default"
                disabled={!contacts.length}
                checked={selectAll}
                onClick={() => onSelectAll(!selectAll)}
              />
            </Grid>
          </SelectAllGrid>
        </Grid>
        <List container>
          <Grid item xs={12}>
            { contacts.length > 0 ? contacts.map(e => (
              <ListItem 
                name={e?.names?.[0]?.displayName || ''}
                email={e?.emailAddresses?.[0]?.value || ''}
                checked={selected.includes(e?.emailAddresses?.[0]?.value || '')}
                onSelect={onSelect}
                />
              )
            ) : <NoContactFound>No Contacts with Email</NoContactFound>}
          </Grid>
        </List>
        <Footer container>
          <Grid item xs={8}>
            <Grid container>
              <PriceText item xs={12}>
                Potential reward
              </PriceText>
              <Amount item xs={12}>
                ${referralAmount*selected.length}
              </Amount>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <StyledButton 
              fullWidth 
              disabled={!selected.length}
              >
                Invite {selected.length} Friends
              </StyledButton>
          </Grid>
        </Footer>
      </Grid>
    </StyledContainer>
    </>
  )
}

export default ContactList
