import styled from 'styled-components'
import { Layout as AntdLayout } from 'antd'

const { Header: AntdHeader, Footer: AntdFooter } = AntdLayout

export const Wrapper = styled(AntdLayout)`
  min-height: 100vh;
`

export const Header = styled(AntdHeader)`
  color: ${({ theme }) => theme.colors.font.contrast};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  line-height: 1.15;
`

export const Footer = styled(AntdFooter)`
  text-align: center;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`