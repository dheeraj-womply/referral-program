import React from "react"
import styled from 'styled-components';
import { Checkbox, Grid } from "@material-ui/core"

const Item = styled(Grid)`
  padding: 10px;
  cursor: pointer;
  background: ${props => props.selected ? '#26BA8F' : '#fff'};
  border-radius: 5px;
  margin-bottom: 10px;
  color: ${props => props.selected ? '#fff' : '#000'};
  input {
    background: white;
  }
`;

const StyledCheckbox = styled(Checkbox)`
  padding: 0 !important;
`;

const ListItem: React.FC<{
  name: string;
  email: string;
  checked: boolean;
  onSelect: (email: string) => void;
}> = ({ name, email, checked, onSelect }): JSX.Element =>  (
  <Item 
    container 
    onClick={() => onSelect(email)} 
    selected={checked}
    >
    <Grid item xs={5}>
      {name}
    </Grid>
    <Grid item xs={6}>
      {email}
    </Grid>
    <Grid item xs={1}>
      <StyledCheckbox
        color="default"
        checked={checked}
      />
    </Grid>
  </Item>
);


export default ListItem;
