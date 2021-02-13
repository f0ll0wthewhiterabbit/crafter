import styled from 'styled-components'
import { Modal as AntdModal, Form as AntdForm } from 'antd'

export const Modal = styled(AntdModal)`
  .ant-modal-body {
    padding: 0;
  }
`

export const Form = styled(AntdForm)`
  width: 100%;
`

export const FormBody = styled.div`
  padding: 20px 32px 20px;
`

export const FormItem = styled(AntdForm.Item)`
  margin-bottom: 10px;

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

export const Controls = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 32px;
  border-top: 1px solid ${({ theme }) => theme.colors.border.modal};

  & > * + * {
    margin-left: 8px;
  }
`
