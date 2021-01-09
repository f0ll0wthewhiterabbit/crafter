import React, { FC } from 'react'
import { Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

import { ROUTE_NAMES } from '@/constants/routeNames'
import {
  Wrapper,
  LoginIcon,
  Title,
  Form,
  FormItem,
  CheckboxFormItem,
  Input,
  PasswordInput,
  Button,
} from './styles'

const SignInPage: FC = () => {
  return (
    <Wrapper>
      <LoginIcon />
      <Title>Sign in</Title>
      <Form>
        <FormItem name="email" validateStatus="success" help={undefined}>
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email *" />
        </FormItem>
        <FormItem name="password" validateStatus="success" help={undefined}>
          <PasswordInput
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password *"
          />
        </FormItem>
        <CheckboxFormItem name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </CheckboxFormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">
            Sign in
          </Button>
          <span>
            Or <Link to={ROUTE_NAMES.SIGN_UP}>register now!</Link>
          </span>
        </FormItem>
      </Form>
    </Wrapper>
  )
}

export default SignInPage
