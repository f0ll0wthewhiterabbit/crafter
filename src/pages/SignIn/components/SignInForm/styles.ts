import styled from 'styled-components'
import { Form as AntdForm, Input as AntdInput, Button as AntdButton } from 'antd'

export const Form = styled(AntdForm)`
  width: 280px;
  position: relative;
`

export const FormItem = styled(AntdForm.Item)`
  margin-bottom: 10px;

  &:last-of-type {
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

export const ErrorMessage = styled.p<{ isVisible: boolean }>`
  position: absolute;
  bottom: -28px;
  left: 0;
  color: ${({ theme }) => theme.colors.font.error};
  margin-bottom: 0;
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
`
