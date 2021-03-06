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
  width: calc(100% / 3);
  min-width: calc(100% / 3);
  position: relative;
  ${({ isAnimated }) => isAnimated && pulseAnimation}

  @media (max-width: 569px) {
    width: 100%;
    flex-grow: 0;
  }
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
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;

  @media (min-width: 410px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (min-width: 500px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  @media (min-width: 570px) {
    grid-template-columns: 1fr;
  }

  @media (min-width: 780px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1150px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (min-width: 1700px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 20px;
  }
`

export const DropOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  opacity: 0.5;
  background-color: ${({ theme }) => theme.colors.background.dropOverlay};
  border-radius: 20px;
`
