import React from 'react'
import styles from  './Button.css'

const Button = (props) => <button className={styles.Button} onClick={props.click} tabIndex="0">{props.children}</button>

export default Button