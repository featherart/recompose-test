import React from 'react'
import { fromEvent } from 'rxjs/observable/fromEvent'
import { map, debounceTime } from 'rxjs/operators'
import { compose, withState, withHandlers } from 'recompose'
import SearchResults from './SearchResults'

type Props = {
  searchTerm: string,
  handleSearch: Function,
  setSearchTerm: Function
}

const TypeAhead = ({ searchTerm, handleSearch, setSearchResults }) => (
  <div className='search-container'>
    <input id='search' type='text' placeholder='search ...' autoFocus onChange={handleSearch} value={searchTerm}/>
    <SearchResults searchTerm={searchTerm} />
  </div>
)

export default compose(
  withState('searchTerm', 'setSearchTerm', ''),
  withHandlers({
    handleSearch: ({ setSearchTerm, searchTerm }) => () => {
      let input = document.getElementById('search')
      const observable = fromEvent(input, 'input')
        .pipe(map(i => i.currentTarget.value))

      observable
        .pipe(debounceTime(100))
        .subscribe(searchTerm => setSearchTerm(searchTerm))
    }
  })
)(TypeAhead)
