import React from 'react'
import styles from  './Row.css'

const Row = (props) => <div className={styles.Row}>{props.children}</div>

export default Row