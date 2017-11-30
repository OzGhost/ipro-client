import React from 'react'

export default class Switcher extends React.Component {
  render() {
    const switches = ["Session", "Process"]
      .map((label, key) => {
        let classes = ""
        if (this.props.type === label)
          classes = "active"
        return <button key={key} className={classes}
          onClick={() => this.props.changedType(label)}>
            {label}
          </button>
      })
    return (
      <p className="switcher-bar">
        {switches}
      </p>
    )
  }
}

