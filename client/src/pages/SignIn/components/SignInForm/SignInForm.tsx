import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { Formik, Form as FormikForm } from 'formik'
import * as Yup from 'yup'

import { ROUTE_NAMES } from '@/router/routes.constants'
import { RootState } from '@/store/rootReducer'
import { UserForm } from '@/types/user.types'
import { signInRequest } from '@/store/authSlice'

import { Form, FormItem, Input, PasswordInput, Button, ErrorMessage } from './styles'

const SignInForm: FC = () => {
  const { loadingState } = useSelector((state: RootState) => state.auth)
  const { error } = useSelector((state: RootState) => state.auth)
  const isLoading = loadingState === 'loading'
  const dispatch = useDispatch()

  const handleFormSubmit = (values: UserForm) => {
    dispatch(signInRequest(false, values))
  }

  return (
    <Formik
      initialValues={{ email: '', password: '', remember: true }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
      })}
      onSubmit={handleFormSubmit}
    >
      {({ handleChange, handleBlur, setFieldValue, values, errors, touched }) => (
        <Form as={FormikForm}>
          <FormItem
            name="email"
            hasFeedback={touched.email}
            validateStatus={errors.email && touched.email ? 'error' : 'success'}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email *"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
          </FormItem>
          <FormItem
            name="password"
            hasFeedback={touched.password}
            validateStatus={errors.password && touched.password ? 'error' : 'success'}
          >
            <PasswordInput
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password *"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" loading={isLoading} disabled={isLoading}>
              {isLoading ? '' : 'Sign in'}
            </Button>
            <span>
              Or <Link to={ROUTE_NAMES.SIGN_UP}>register now!</Link>
            </span>
          </FormItem>
          <ErrorMessage
            isVisible={Boolean(
              (errors.email && touched.email) || (errors.password && touched.password) || error
            )}
          >
            {errors.email || errors.password || error || ''}
          </ErrorMessage>
        </Form>
      )}
    </Formik>
  )
}

export default SignInForm
