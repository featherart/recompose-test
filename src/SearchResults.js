import React from 'react'
import { compose, lifecycle, withState } from 'recompose'
import { uniqueId } from 'lodash'

type Props = {
  searchTerm: string,
  results: []
}

const SearchResults = ({ searchTerm, results }) => (
  <div className='search-results'>
    {searchTerm}
    {results}
  </div>
)

export default compose(
  withState('results', 'setState', []),
  lifecycle({
    componentDidMount () {
      console.log('in did mount', this.props.searchTerm)
    },
    componentDidUpdate (prevProps, preState) {
      console.log('props', this.props.searchTerm, 'prevProps', prevProps.searchTerm)

      if (this.props.searchTerm !== prevProps.searchTerm) {
        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'url')

        const myInit = { method: 'GET',
                       headers: myHeaders,
                       mode: 'cors',
                       cache: 'default' }

        let url = new Request(`https://api.github.com/search/repositories?q=${prevProps.searchTerm}`)

        fetch(url, myInit)
        .then(results => {
          return results.json()
        }).then(data => {
          console.log('data', data)
          let results = data.items.map(item => {
            return(
              <div key={uniqueId}>
                <a href={item.url}>{item.full_name}</a>
              </div>
            )
          })
          this.setState({ results })
        })
      }
    }
  })
)(SearchResults)
