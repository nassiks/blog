import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Checkbox, Form, Input, Typography } from 'antd'

import { registerUser } from '../../store/action-creators/registerUser'
import { useDispatch } from '../../hooks/useTypedSelector'
import { useNavigation } from '../../hooks/useNavigation'

import styles from './signUp.module.scss'

const { Text } = Typography

interface SignUpFormData {
  username: string
  email: string
  password: string
  repeatPassword: string
  agreement: boolean
}
const SignUp: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { navigateToSignIn } = useNavigation()

  const handleFinish = (values: SignUpFormData) => {
    const { username, email, password } = values
    dispatch(registerUser(username, email, password, () => navigate('/articles')))
    console.log('SingUp >>', values)
  }

  return (
    <Card className={styles['formContainer']}>
      <h2 className={styles['formTitle']}>Create new account</h2>
      <Form
        className={styles['formSign']}
        layout="vertical"
        onFinish={handleFinish}
        onFinishFailed={(errorInfo) => console.error('Failed:', errorInfo)}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            { required: true, message: 'Please input your username!' },
            { min: 3, message: 'Username must be at least 3 characters long' },
            { max: 20, message: 'Username cannot exceed 20 characters' },
            { whitespace: true, message: 'Cannot be blank!' },
          ]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          label="Email address"
          name="email"
          rules={[
            { required: true, message: 'Please input your email address!' },
            { type: 'email', message: 'The input is not a valid email address' },
          ]}
        >
          <Input placeholder="Email address" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 6, message: 'Password must be at least 6 characters long' },
            { max: 40, message: 'Password cannot exceed 40 characters' },
          ]}
        >
          <Input placeholder="Password" />
        </Form.Item>

        <Form.Item
          label="Repeat password"
          name="repeatPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'))
              },
            }),
          ]}
        >
          <Input placeholder="Repeat password" />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: async (_, checked) =>
                checked
                  ? Promise.resolve()
                  : Promise.reject(new Error('You must agree to the processing of your personal data!')),
            },
          ]}
        >
          <Checkbox className={styles['formCheckbox']}>I agree to the processing of my personal information</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles['formButton']}>
            Create
          </Button>
        </Form.Item>
      </Form>
      <Text type="secondary" className={styles['formLink']}>
        Already have an account?&nbsp;
        <span onClick={navigateToSignIn}>Sign In</span>.
      </Text>
    </Card>
  )
}

export default SignUp
