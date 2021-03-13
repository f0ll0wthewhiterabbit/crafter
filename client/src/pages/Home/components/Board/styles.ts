import styled, { css, keyframes } from 'styled-components'
import { Typography } from 'antd'

const { Title: AntdTitle } = Typography

const pulse = keyframes`
  0% {
    background-color: #e7effb;
  }

  16.7% {
    background-color: #97bef9;
  }

  33.3% {
    background-color: #e7effb;
  }

  50% {
    background-color: #b9d3f9;
  }

  66.6% {
    background-color: #e7effb;
  }

  83.3% {
    background-color: #cedff9;
  }

  100% {
    background-color: #e7effb;
  }
`

const pulseAnimation = css`
  animation: ${pulse} 5s ease-out infinite;
`

export const Wrapper = styled.section<{ isAnimated?: boolean }>`
  background-color: ${({ theme }) => theme.colors.background.board};
  flex-grow: 1;
  border-radius: 20px;
  padding: 0 20px 20px;
  max-width: calc(100% / 3);
  position: relative;
  ${({ isAnimated }) => isAnimated && pulseAnimation}
`

export const Header = styled.header`
  text-align: left;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border.board};
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export const Title = styled(AntdTitle)`
  margin-right: auto;

  && {
    margin-bottom: 0;
  }
`

export const Content = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, 130px);
`
