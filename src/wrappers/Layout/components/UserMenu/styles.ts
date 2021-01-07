import styled from 'styled-components'
import { Button as AntdButton } from 'antd'

export const Wrapper = styled.div`
  line-height: 1;
`

export const Button = styled(AntdButton)`
  /* font-size: 18px; */
  color: ${({ theme }) => theme.colors.font.contrast};
  display: flex;
  align-items: center;
  line-height: 1;
`
