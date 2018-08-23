import React from 'react'
import { componentFromStream, createEventHandler, setObservableConfig } from 'recompose'
import { Observable } from 'rxjs'

setObservableConfig({
  fromESObservable: Observable.from
})

const CounterCounterCounter = componentFromStream(props$ => {
  const { handler: increment, stream: increment$ } = createEventHandler()
  const { handler: decrement, stream: decrement$ } = createEventHandler()
  const count$ = Observable.merge(
      increment$.mapTo(1),
      decrement$.mapTo(-1)
    )
    .startWith(0)
    .scan((count, n) => count + n, 0)

  return props$.combineLatest(
    count$,
    (props, count) =>
      <div className='contained'>
        <h3>CounterCounterCounter</h3>
        <div {...props} className='counter-container'>
          <button onClick={increment} className='increment-button'>Increment</button>
          <button onClick={decrement} className='decrement-button'>Decrement</button>
          <span className='count'>{count}</span>  
        </div >
      </div>
  )
})

export default CounterCounterCounter
