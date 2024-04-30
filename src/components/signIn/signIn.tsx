import React from 'react'
import { Button, Card, Form, Input, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'

import { useDispatch } from '../../hooks/useTypedSelector'
import { authUser } from '../../store/action-creators/authUser'
import { useNavigation } from '../../hooks/useNavigation'

import styles from './signIn.module.scss'

const { Text } = Typography

interface SignInFormData {
  email: string
  password: string
}

const SignIn: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { navigateToSignUp } = useNavigation()
  const handleFinish = (values: SignInFormData) => {
    const { email, password } = values
    dispatch(authUser(email, password, () => navigate('/articles')))
    console.log('SingIn >> ', values)
  }

  return (
    <Card className={styles['formContainer']}>
      <h2 className={styles['formTitle']}>Sign In</h2>
      <Form className={styles['formSign']} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Email address"
          name="email"
          rules={[
            { required: true, message: 'Please input email!' },
            { type: 'email', message: 'The input is not a valid email address' },
          ]}
        >
          <Input placeholder="Email address" />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input password!' }]}>
          <Input placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles['formButton']}>
            Login
          </Button>
        </Form.Item>
      </Form>
      <Text type="secondary" className={styles['formLink']}>
        Don&apos;t have an account?&nbsp;<span onClick={navigateToSignUp}>Sign Up</span>.
      </Text>
    </Card>
  )
}

export default SignIn
