import React from 'react'
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import ArticleList from '../articleList/articleList'
import AppHeader from '../appHeader/appHeader'

import styles from './app.module.scss'

const App = () => {
  return (
    <div>
      <AppHeader />
      <div className={styles['appContainer']}>
        <ArticleList />
      </div>
    </div>
  )
}

export default App
