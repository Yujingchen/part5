import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = (props, ref) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility: () => { toggleVisibility() }
    }
  })
  return (
    <div >
      <div style={hideWhenVisible} >
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div >
  )
}
const FowardTogglable = React.forwardRef(Togglable)
Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}
export default FowardTogglable