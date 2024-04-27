import React from 'react'
import { Button, Typography } from 'antd'

import styles from './appHeader.module.scss'

const { Title } = Typography
const AppHeader = () => {
  return (
    <div className={styles['appHeaderContainer']}>
      <Title level={1}>Realworld Blog</Title>
      <div className={styles['appHeaderButton']}>
        <Button type="default">Sing In</Button>
        <Button className={styles['appHeaderButtonGreen']}>Sing Up</Button>
      </div>
    </div>
  )
}

export default AppHeader
