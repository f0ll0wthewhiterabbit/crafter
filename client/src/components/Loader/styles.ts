import styled from 'styled-components'
import { Spin as AntdSpin } from 'antd'

export const Wrapper = styled.div<{ isVisible: boolean }>`
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.3s;
`

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.background.loader};
  opacity: 0.5;
  z-index: 10;
`

export const Spinner = styled(AntdSpin)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 15;
  user-select: none;
`
