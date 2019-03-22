import React from 'react';
import './LoginError.css';

export default function LoginError(props) {
  const { message } = props;
  return <div className="error-msg">{ message }</div>
}