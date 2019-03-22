import React from 'react';
import './RegisterError.css';

export default function RegisterError(props) {
  const { message } = props;
  return <div className="register-error">{ message }</div>
}