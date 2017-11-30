import React from 'react'
import ReactDOM from 'react-dom'
import Switcher from './Switcher.jsx'
import Stat from './Stat.jsx'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      type: "Session",
      cParent: {},
      taskLevel: 0
    }

    this.changedType = this.changedType.bind(this)
  }
  
  changedType(newType) {
    console.log('noticed to: ' + newType)
    this.setState({type: newType})
  }
  
  render() {
    return (
      <div className={this.state.type.toLowerCase()}>
        <Switcher
          changedType={this.changedType}
          type={this.state.type}
        />
        <Stat type={this.state.type} taskLevel={this.state.taskLevel}/>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
