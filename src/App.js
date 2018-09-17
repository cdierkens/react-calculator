import React, { Component } from 'react'
import styles from  './App.css'
import Row from './components/Row'
import Column from './components/Column'
import Button from './components/Button'
import Panel from './components/Panel'

import entry from './lib/entry'

// - Add
// - Subtract
// - Multiply
// - Divide
// - Percentages
// - Square roots
// - Backspace
// - Clear/reset 

class App extends Component {
  state = {
    entries: [],
    result: 0
  }

  entryClickHandler = (event) => {
    this.setState({
      entries: entry.applyEntry(this.state.entries, event.target.innerHTML)
    })
  }

  allClearHandler = (event) => {
    this.setState({
      entries: [],
      result: 0
    })
  }

  clearEntryHandler = (event) => {
    let entries = entry.clearEntry(this.state.entries)
    if (entries.length === 0) {
      this.setState({ entries, result : 0 })
    } else {
      this.setState({ entries })
    }
  }

  calculateEntriesHandler = () => {
    let result = entry.calculate(this.state.entries)
    if (result !== void 0) {
      this.setState({ result })
    }
  }

  keyUpHandler = (event) => {
    if (event.which === 13 || (event.which === 187 && !event.shiftKey)) {
      this.calculateEntriesHandler()
    } else if (event.which === 8) {
      this.clearEntryHandler()
    } else {
      const key = entry.getKey(event); 

      this.setState({
        entries: entry.applyEntry(this.state.entries, key)
      })
    }
  }

  appRef = React.createRef();

  componentDidMount() {
    this.appRef.current.focus()
  }

  render() {
    return (
      <div className={styles.App} onKeyUp={this.keyUpHandler} tabIndex='0' ref={this.appRef}>
        <Panel calculation={this.state.entries.join(' ')} result={this.state.result}></Panel>
        <Row>
          <Column></Column>
          <Column>
            <Button click={this.clearEntryHandler}>CE</Button>
          </Column>
          <Column>
            <Button click={this.allClearHandler}>AC</Button>
          </Column>
          <Column>
            <Button click={this.entryClickHandler}>%</Button>
          </Column>
        </Row>
        <Row>
          <Column>
            <Button click={this.entryClickHandler}>7</Button>
          </Column>
          <Column>
            <Button click={this.entryClickHandler}>8</Button>
          </Column>
          <Column>
            <Button click={this.entryClickHandler}>9</Button>
          </Column>
          <Column>
            <Button click={this.entryClickHandler}>/</Button>
          </Column>
        </Row>
        <Row>
          <Column>
            <Button click={this.entryClickHandler}>4</Button>
          </Column>
          <Column>
            <Button click={this.entryClickHandler}>5</Button>
          </Column>
          <Column>
            <Button click={this.entryClickHandler}>6</Button>
          </Column>
          <Column>
            <Button click={this.entryClickHandler}>*</Button>
          </Column>
        </Row>
        <Row>
          <Column>
            <Button click={this.entryClickHandler}>1</Button>
          </Column>
          <Column>
            <Button click={this.entryClickHandler}>2</Button>
          </Column>
          <Column>
            <Button click={this.entryClickHandler}>3</Button>
          </Column>
          <Column>
            <Button click={this.entryClickHandler}>-</Button>
          </Column>
        </Row>
        <Row>
          <Column>
            <Button click={this.entryClickHandler}>0</Button>
          </Column>
          <Column>
            <Button click={this.entryClickHandler}>.</Button>
          </Column>
          <Column>
            <Button click={this.calculateEntriesHandler}>=</Button>
          </Column>
          <Column>
            <Button click={this.entryClickHandler}>+</Button>
          </Column>
        </Row>
      </div>
    )
  }
}

export default App
