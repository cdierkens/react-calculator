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

  buttonClickHandler = (event) => {
    this.setState({
      entries: entry.applyEntry(this.state.entries, event.target.innerHTML)
    })
  }

  // TODO: User handler convention.
  clearCalculation = (event) => {
    this.setState({
      entries:  []
    })
  }

  render() {
    return (
      <div className={styles.App}>
        <Panel calculation={this.state.entries.join(' ')}></Panel>
        <Row>
          <Column></Column>
          <Column>
            <Button click={this.buttonClickHandler}>CE</Button>
          </Column>
          <Column>
            <Button click={this.clearCalculation}>AC</Button>
          </Column>
          <Column>
            <Button click={this.buttonClickHandler}>%</Button>
          </Column>
        </Row>
        <Row>
          <Column>
            <Button click={this.buttonClickHandler}>7</Button>
          </Column>
          <Column>
            <Button click={this.buttonClickHandler}>8</Button>
          </Column>
          <Column>
            <Button click={this.buttonClickHandler}>9</Button>
          </Column>
          <Column>
            <Button click={this.buttonClickHandler}>÷</Button>
          </Column>
        </Row>
        <Row>
          <Column>
            <Button click={this.buttonClickHandler}>4</Button>
          </Column>
          <Column>
            <Button click={this.buttonClickHandler}>5</Button>
          </Column>
          <Column>
            <Button click={this.buttonClickHandler}>6</Button>
          </Column>
          <Column>
            <Button click={this.buttonClickHandler}>×</Button>
          </Column>
        </Row>
        <Row>
          <Column>
            <Button click={this.buttonClickHandler}>1</Button>
          </Column>
          <Column>
            <Button click={this.buttonClickHandler}>2</Button>
          </Column>
          <Column>
            <Button click={this.buttonClickHandler}>3</Button>
          </Column>
          <Column>
            <Button click={this.buttonClickHandler}>−</Button>
          </Column>
        </Row>
        <Row>
          <Column>
            <Button click={this.buttonClickHandler}>0</Button>
          </Column>
          <Column>
            <Button click={this.buttonClickHandler}>.</Button>
          </Column>
          <Column>
            <Button click={this.buttonClickHandler}>=</Button>
          </Column>
          <Column>
            <Button click={this.buttonClickHandler}>+</Button>
          </Column>
        </Row>
      </div>
    )
  }
}

export default App
