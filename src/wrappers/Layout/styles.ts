import styled from 'styled-components'
import { Layout as AntdLayout } from 'antd'

const { Header: AntdHeader, Content: AntdContent, Footer: AntdFooter } = AntdLayout

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

export const Content = styled(AntdContent)`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Footer = styled(AntdFooter)`
  text-align: center;
  color: ${({ theme }) => theme.colors.font.contrast};
  background-color: ${({ theme }) => theme.colors.background.footer};
  border-top: none;
`
