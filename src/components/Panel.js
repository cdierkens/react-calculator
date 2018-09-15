import React from 'react'
import styles from  './Panel.css'

const Panel = (props) => (
    <div className={styles.Panel}>
        <input value={props.calculation} readOnly/>
    </div>
)

export default Panel