import React from 'react'
import Alert from 'react-bootstrap/Alert';

export default function Aleart(props) {
  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1)
  }
  return (
    props.aleart && <Alert variant={props.aleart.type} className='fixed-top mt-2'>
      <strong>{capitalize(props.aleart.type)}</strong>:{props.aleart.msg}
      {/* <strong>{props.successfully}</strong> : {props.aleart.msg} */}
    </Alert>
  )
}