import styled from 'styled-components'
import { Button as AntdButton, Form as AntdForm } from 'antd'

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

export const FormItemRequired = styled(FormItem)`
  .ant-form-item-label {
    label {
      &::before {
        content: '*';
        display: inline-block;
        margin-right: 4px;
        color: ${({ theme }) => theme.colors.font.error};
        font-size: 14px;
        font-family: SimSun, sans-serif;
        line-height: 1;
      }
    }
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
