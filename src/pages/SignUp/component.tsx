import React, { FC } from 'react'
import { Input } from 'antd'
import { Link } from 'react-router-dom'

import { ROUTE_NAMES } from '@/constants/routeNames'
import { Wrapper, SignUpIcon, Title, Form, Button, FormItem, FormItemRequired } from './styles'

const SignUpPage: FC = () => {
  return (
    <Wrapper>
      <SignUpIcon />
      <Title>Sign up</Title>
      <Form layout="vertical">
        <FormItemRequired
          name="email"
          label="Email"
          colon={false}
          validateStatus="success"
          help={undefined}
        >
          <Input placeholder="Email" />
        </FormItemRequired>
        <FormItemRequired
          name="password"
          label="Password"
          colon={false}
          validateStatus="success"
          help={undefined}
        >
          <Input.Password placeholder="Password" />
        </FormItemRequired>
        <FormItemRequired
          name="passwordConfirm"
          label="Confirm password"
          colon={false}
          validateStatus="success"
          help={undefined}
        >
          <Input.Password placeholder="Confirm password" />
        </FormItemRequired>
        <FormItem>
          <Button type="primary" htmlType="submit">
            Sign up
          </Button>
          <span>
            Already have an account? <Link to={ROUTE_NAMES.SIGN_IN}>Sign in</Link>
          </span>
        </FormItem>
      </Form>
    </Wrapper>
  )
}

export default SignUpPage
