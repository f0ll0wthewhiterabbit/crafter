import styled from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'

export const Wrapper = styled.p`
  margin-bottom: 0;
`

export const Link = styled(RouterLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.font.contrast};
`
