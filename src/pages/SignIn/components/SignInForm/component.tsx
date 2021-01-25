import React, { FC } from 'react'
import { Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { Formik, Form as FormikForm } from 'formik'
import * as Yup from 'yup'

import { ROUTE_NAMES } from '@/constants/routeNames'
import { SignInForm as ISignInForm } from '@/interfaces/SignInForm'
import {
  Form,
  FormItem,
  CheckboxFormItem,
  Input,
  PasswordInput,
  Button,
  ErrorMessage,
} from './styles'

const SignInForm: FC = () => {
  const handleFormSubmit = (values: ISignInForm) => {
    console.log(values)
  }

  return (
    <Formik
      initialValues={{ email: '', password: '', remember: true }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
        remember: Yup.boolean(),
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
          <CheckboxFormItem name="remember" valuePropName="rememberMe">
            <Checkbox
              defaultChecked={values.remember}
              onChange={() => setFieldValue('remember', !values.remember)}
            >
              Remember me
            </Checkbox>
          </CheckboxFormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">
              Sign in
            </Button>
            <span>
              Or <Link to={ROUTE_NAMES.SIGN_UP}>register now!</Link>
            </span>
          </FormItem>
          <ErrorMessage
            isVisible={Boolean(
              (errors.email && touched.email) || (errors.password && touched.password)
            )}
          >
            {errors.email || errors.password || ''}
          </ErrorMessage>
        </Form>
      )}
    </Formik>
  )
}

export default SignInForm
