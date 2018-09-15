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
    entries: []
  }

  entryClickHandler = (event) => {
    this.setState({
      entries: entry.applyEntry(this.state.entries, event.target.innerHTML)
    })
  }

  allClearHandler = (event) => {
    this.setState({
      entries:  []
    })
  }

  clearEntryHandler = (event) => {
    this.setState({
      entries:  entry.clearEntry(this.state.entries)
    })
  }

  render() {
    return (
      <div className={styles.App}>
        <Panel calculation={this.state.entries.join(' ')}></Panel>
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
            <Button click={this.entryClickHandler}>÷</Button>
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
            <Button click={this.entryClickHandler}>×</Button>
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
            <Button click={this.entryClickHandler}>−</Button>
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
            <Button click={this.entryClickHandler}>=</Button>
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
