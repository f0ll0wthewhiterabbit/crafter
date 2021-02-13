import styled from 'styled-components'
import { Modal as AntdModal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

export const Modal = styled(AntdModal)`
  .ant-modal-body {
    padding: 32px 32px 24px;
  }
`

export const ContentWrapper = styled.div`
  display: flex;
  margin-bottom: 24px;
`

export const IconWrapper = styled.div`
  margin-right: 16px;
`

export const ExclamationIcon = styled(ExclamationCircleOutlined)`
  color: ${({ theme }) => theme.colors.icon.exclamation};
  font-size: 22px;
`

export const Controls = styled.footer`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  > * + * {
    margin-left: 8px;
  }
`
