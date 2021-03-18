import React from "react"
import styled from 'styled-components';
import { TextField, InputAdornment } from "@material-ui/core"
import SearchIcon from '@material-ui/icons/Search'

const SearchTextField = styled(TextField)`
  margin-bottom: 30px !important;
`
const StyledSearchIcon = styled(SearchIcon)`
  fill: grey;
`

const SearchBox: React.FC<{ 
  disabled?: boolean; 
  onChange: (event: React.ChangeEvent) => void
}> = ({ disabled, onChange }): JSX.Element => (
  <SearchTextField
    fullWidth
    variant="outlined"
    disabled={disabled}
    placeholder="Search for a contact"
    margin="dense"
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
    onChange={onChange}
  />
)

export default SearchBox
