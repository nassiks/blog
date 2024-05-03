import React from 'react'
import { Avatar, Button, Typography } from 'antd'

import { useDispatch, useTypedSelector } from '../../hooks/useTypedSelector'
import { logoutUser } from '../../store/action-creators/authUser'
import { useNavigation } from '../../hooks/useNavigation'

import styles from './appHeader.module.scss'

const { Title, Text } = Typography
const AppHeader: React.FC = () => {
  const { user } = useTypedSelector((state) => state.users)
  const { navigateToArticle, navigateToProfile, navigateToSignIn, navigateToSignUp, navigateToCreateArticle } =
    useNavigation()
  const dispatch = useDispatch()
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    dispatch(logoutUser())
    navigateToArticle()
  }

  return (
    <div className={styles['appHeaderContainer']}>
      <Title level={1} onClick={navigateToArticle} className={styles['appHeaderTitle']}>
        Realworld Blog
      </Title>
      {user ? (
        <div className={styles['appHeaderAuth']}>
          <Button size="middle" onClick={navigateToCreateArticle} className={styles['appHeaderButtonCreate']}>
            Create article
          </Button>
          <div className={styles['appHeaderAuthAuthor']} onClick={navigateToProfile}>
            <Text>{user.username}</Text>
            <Avatar size={46} src={user.image} />
          </div>
          <Button size="large" onClick={handleLogout} className={styles['appHeaderButtonLogOut']}>
            Log Out
          </Button>
        </div>
      ) : (
        <div className={styles['appHeaderButton']}>
          <Button size="large" className={styles['appHeaderButtonSignIn']} onClick={navigateToSignIn}>
            Sign In
          </Button>
          <Button size="large" className={styles['appHeaderButtonSignUp']} onClick={navigateToSignUp}>
            Sign Up
          </Button>
        </div>
      )}
    </div>
  )
}

export default AppHeader
