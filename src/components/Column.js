import React from 'react'
import styles from  './Column.css'

const Column = (props) => <div className={styles.Column}>{props.children}</div>

export default Column