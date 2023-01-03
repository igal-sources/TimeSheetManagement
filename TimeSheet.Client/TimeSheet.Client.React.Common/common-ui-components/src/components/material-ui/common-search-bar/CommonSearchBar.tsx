import React from 'react'
//https://www.npmjs.com/package/material-ui-search-bar
import SearchBar from 'material-ui-search-bar'
import { ICommonSearchBarProps } from '../../../global/interfaces'
import { useStyles } from './CommonSearchBarStyle'

export const CommonSearchBar = ({
  placeholderText,
  value,
  isReadOnly,
  onChange,
  onCancelSearch,
  onRequestSearch
}: ICommonSearchBarProps) => {
  const classes = useStyles()
  return (
    <div className={classes.searchBar}>
      <SearchBar
        placeholder={placeholderText}
        value={value ?? ''}
        onChange={onChange}
        onCancelSearch={onCancelSearch}
        onRequestSearch={onRequestSearch}
        style={{
          margin: '10px auto'
          // maxWidth: 710,
        }}
        disabled={isReadOnly}
      />
    </div>
  )
}

export default CommonSearchBar
