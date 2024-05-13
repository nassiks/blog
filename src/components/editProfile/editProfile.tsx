import React from 'react'
import { Button, Card, Form, Input, message } from 'antd'

import { useDispatch, useTypedSelector } from '../../hooks/useTypedSelector'
import { updateProfile } from '../../store/action-creators/updateProfile'

import styles from './editProfile.module.scss'

interface editProfileFormData {
  username: string
  email: string
  password: string
  image: string
}

const EditProfile: React.FC = () => {
  const dispatch = useDispatch()
  const { user } = useTypedSelector((state) => state.users)

  const handleFinish = (values: editProfileFormData) => {
    const { username, email, password, image } = values
    if (user) {
      dispatch(
        updateProfile({ username, email, password, image }, user.token, () => {
          message.success('Profile updated successfully!')
        })
      )
    }
  }

  return (
    <Card className={styles['formContainer']}>
      <h2 className={styles['formTitle']}>Edit Profile</h2>
      <Form className={styles['formSign']} layout="vertical" onFinish={handleFinish}>
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
          label="New password"
          name="password"
          rules={[
            { required: false },
            { min: 6, message: 'Password must be at least 6 characters long' },
            { max: 40, message: 'Password cannot exceed 40 characters' },
          ]}
        >
          <Input placeholder="Password" />
        </Form.Item>

        <Form.Item
          label="Avatar image (url)"
          name="image"
          rules={[{ required: false }, { type: 'url', message: 'The input is not a valid url' }]}
        >
          <Input placeholder="Avatar image" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles['formButton']}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default EditProfile
