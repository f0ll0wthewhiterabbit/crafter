import styled from 'styled-components'
import { Form as AntdForm, Input as AntdInput, Button as AntdButton } from 'antd'
import { LoginOutlined } from '@ant-design/icons'

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const LoginIcon = styled(LoginOutlined)`
  color: ${({ theme }) => theme.colors.accent};
  font-size: 32px;
  margin-bottom: 5px;
`

export const Title = styled.h1`
  font-size: 28px;
`

export const Form = styled(AntdForm)`
  width: 280px;
`

export const FormItem = styled(AntdForm.Item)`
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
    margin-top: 25px;
  }

  .ant-form-item-label {
    padding-bottom: 2px;
  }
`

export const CheckboxFormItem = styled(FormItem)`
  .ant-form-item-control-input {
    min-height: auto;
  }
`

export const Input = styled(AntdInput)`
  .site-form-item-icon {
    color: ${({ theme }) => theme.colors.formIcon};
  }
`

export const PasswordInput = styled(AntdInput.Password)`
  .site-form-item-icon {
    color: ${({ theme }) => theme.colors.formIcon};
  }
`

export const Button = styled(AntdButton)`
  width: 100%;
  margin-bottom: 2px;
`
