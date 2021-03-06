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

export const Input = styled(AntdInput)`
  .site-form-item-icon {
    color: ${({ theme }) => theme.colors.icon.form};
  }
`

export const PasswordInput = styled(AntdInput.Password)`
  .site-form-item-icon {
    color: ${({ theme }) => theme.colors.icon.form};
  }
`

export const Button = styled(AntdButton)`
  width: 100%;
  margin-bottom: 2px;

  :disabled {
    color: ${({ theme }) => theme.colors.disabledButton};
  }
`

export const ErrorMessage = styled.p<{ isVisible: boolean }>`
  position: absolute;
  bottom: -77px;
  left: 0;
  color: ${({ theme }) => theme.colors.font.error};
  margin-bottom: 0;
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  min-height: 72px;
`
