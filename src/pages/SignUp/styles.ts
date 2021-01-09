import styled from 'styled-components'
import { Button as AntdButton, Form as AntdForm } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const SignUpIcon = styled(UserAddOutlined)`
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
`
