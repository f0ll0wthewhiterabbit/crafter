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

  @media (max-width: 569px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`

export const Content = styled(AntdContent)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (min-width: 1920px) {
    max-width: 1920px;
    min-width: 1920px;
    margin-left: auto;
    margin-right: auto;
  }
`

export const Footer = styled(AntdFooter)`
  text-align: center;
  color: ${({ theme }) => theme.colors.font.contrast};
  background-color: ${({ theme }) => theme.colors.background.footer};
  border-top: none;
`
