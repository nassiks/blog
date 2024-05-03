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
  console.log('User >> ', user)
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
          <Button onClick={navigateToCreateArticle}>Create article</Button>
          <div className={styles['appHeaderAuthAuthor']} onClick={navigateToProfile}>
            <Text>{user.username}</Text>
            <Avatar size={46} src={user.image} />
          </div>
          <Button onClick={handleLogout}>Log Out</Button>
        </div>
      ) : (
        <div className={styles['appHeaderButton']}>
          <Button type="default" onClick={navigateToSignIn}>
            Sign In
          </Button>
          <Button className={styles['appHeaderButtonGreen']} onClick={navigateToSignUp}>
            Sign Up
          </Button>
        </div>
      )}
    </div>
  )
}

export default AppHeader
