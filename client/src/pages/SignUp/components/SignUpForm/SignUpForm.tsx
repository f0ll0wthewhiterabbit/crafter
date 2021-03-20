import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input } from 'antd'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { ROUTE_NAMES } from '@/router/routes.constants'
import { UserForm } from '@/types/user.types'
import { signUpRequest } from '@/store/authSlice'
import { RootState } from '@/store/rootReducer'

import { Form, Button, FormItem, FormItemRequired, ErrorMessage } from './styles'

const SignUpForm: FC = () => {
  const { loadingState } = useSelector((state: RootState) => state.auth)
  const { error } = useSelector((state: RootState) => state.auth)
  const isLoading = loadingState === 'loading'
  const dispatch = useDispatch()

  const handleFormSubmit = (values: UserForm) => {
    dispatch(signUpRequest(values))
  }

  return (
    <Formik
      initialValues={{ email: '', password: '', passwordConfirm: '' }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be 6 characters or more')
          .required('Password is required'),
        passwordConfirm: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Password confirm is required'),
      })}
      onSubmit={handleFormSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <Form layout="vertical" onSubmitCapture={handleSubmit}>
          <FormItemRequired
            name="email"
            label="Email"
            colon={false}
            hasFeedback={touched.email}
            validateStatus={errors.email && touched.email ? 'error' : 'success'}
          >
            <Input
              placeholder="Email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
          </FormItemRequired>
          <FormItemRequired
            name="password"
            label="Password"
            colon={false}
            hasFeedback={touched.password}
            validateStatus={errors.password && touched.password ? 'error' : 'success'}
          >
            <Input.Password
              placeholder="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
          </FormItemRequired>
          <FormItemRequired
            name="passwordConfirm"
            label="Confirm password"
            colon={false}
            hasFeedback={touched.passwordConfirm}
            validateStatus={errors.passwordConfirm && touched.passwordConfirm ? 'error' : 'success'}
          >
            <Input.Password
              placeholder="Confirm password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.passwordConfirm}
            />
          </FormItemRequired>
          <FormItem>
            <Button type="primary" htmlType="submit" loading={isLoading} disabled={isLoading}>
              {isLoading ? '' : 'Sign up'}
            </Button>
            <span>
              Already have an account? <Link to={ROUTE_NAMES.SIGN_IN}>Sign in</Link>
            </span>
          </FormItem>
          <ErrorMessage
            isVisible={Boolean(
              (errors.email && touched.email) ||
                (errors.password && touched.password) ||
                (errors.passwordConfirm && touched.passwordConfirm) ||
                error
            )}
          >
            {errors.email || errors.password || errors.passwordConfirm || error || ''}
          </ErrorMessage>
        </Form>
      )}
    </Formik>
  )
}

export default SignUpForm
