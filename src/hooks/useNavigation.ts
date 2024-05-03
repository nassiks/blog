import { useNavigate } from 'react-router-dom'

export function useNavigation() {
  const navigate = useNavigate()

  const navigateToSignUp = () => {
    navigate('/sign-up')
  }

  const navigateToSignIn = () => {
    navigate('/sign-in')
  }

  const navigateToArticle = () => {
    navigate('/articles')
  }

  const navigateToProfile = () => {
    navigate('/profile')
  }

  const navigateToCreateArticle = () => {
    navigate('/new-article')
  }

  return {
    navigateToSignUp,
    navigateToSignIn,
    navigateToArticle,
    navigateToProfile,
    navigateToCreateArticle,
  }
}
