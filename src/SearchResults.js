import React from 'react'
import { compose, lifecycle, withState } from 'recompose'
import { uniqueId } from 'lodash'

type Props = {
  searchTerm: string,
  results: []
}

const makeResults = (items) => {
  return items.map(item => {
    return(
      <div className='search-result' key={item.id}>
        <a href={item.url}>{item.full_name}</a>
      </div>
    )
  })
}

const SearchResults = ({ searchTerm, results }) => (
  <div className='search-results'>
    searched for ... {searchTerm}
    {results}
  </div>
)

export default compose(
  withState('results', 'setState', []),
  lifecycle({
    componentDidUpdate (prevProps, preState) {
      if (this.props.searchTerm.length > 3 && (this.props.searchTerm !== prevProps.searchTerm) ) {
        const url = new Request(`https://api.github.com/search/repositories?q=${prevProps.searchTerm}`)

        fetch(url)
        .then(results => {
          return results.json()
        }).then(data => {
          let dataItems = (data && data.items && data.items.length > 1) ? data.items : []
          let results
          if (dataItems.length) {
            results = makeResults(dataItems)
            this.setState({ results })
          }
        })
      }
    }
  })
)(SearchResults)
