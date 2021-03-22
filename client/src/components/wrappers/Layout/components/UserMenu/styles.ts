import styled from 'styled-components'
import { Button as AntdButton } from 'antd'

export const Wrapper = styled.div`
  line-height: 1;
`

export const Button = styled(AntdButton)`
  color: ${({ theme }) => theme.colors.font.contrast};
  display: flex;
  align-items: center;
  line-height: 1;
`
