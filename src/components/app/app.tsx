import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import ArticleList from '../articleList/articleList'
import AppHeader from '../appHeader/appHeader'
import ArticlePage from '../articlePage/articlePage'
import SignUp from '../signUp/signUp'
import SignIn from '../signIn/signIn'
import EditProfile from '../editProfile/editProfile'
import { useDispatch } from '../../hooks/useTypedSelector'
import { initializeAuth } from '../../store/action-creators/authUser'

import styles from './app.module.scss'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAuth())
  }, [dispatch])

  return (
    <Router>
      <div>
        <AppHeader />
        <div className={styles['appContainer']}>
          <Routes>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/profile" element={<EditProfile />} />
            <Route path="/articles/:slug" element={<ArticlePage />} />
            <Route path="/" element={<ArticleList />} />
            <Route path="/articles" element={<ArticleList />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
