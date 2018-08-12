import React from 'react'
import { compose, withState, withHandlers } from 'recompose'

type Props = {
  count: number,
  incrementCount: Function,
  handleIncrement: Function,
  handleDecrement: Function
}

const Counter = ({ count, incrementCount, handleIncrement, handleDecrement }: Props) => (
  <div className='counter-container'>
    <button type='submit' className='increment-button' onClick={handleIncrement}>Increment</button>
    <button type='submit' className='decrement-button' onClick={handleDecrement}>Decrement</button>
    <span className='count'>{count}</span>
  </div>
)

export default compose(
  withState('count', 'incrementCount', 0),
  withHandlers({
    handleIncrement: ({ incrementCount, count }) => () => {
      incrementCount(count + 1)
    },
    handleDecrement: ({ incrementCount, count }) => () => {
      incrementCount(count - 1)
    }
  })
)(Counter)
