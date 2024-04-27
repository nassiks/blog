import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import ArticleList from '../articleList/articleList'
import AppHeader from '../appHeader/appHeader'
import ArticlePage from '../articlePage/articlePage'

import styles from './app.module.scss'

const App = () => {
  return (
    <Router>
      <div>
        <AppHeader />
        <div className={styles['appContainer']}>
          <Routes>
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
