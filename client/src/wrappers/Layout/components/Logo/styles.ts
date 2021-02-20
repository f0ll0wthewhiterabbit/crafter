import styled from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'

export const Wrapper = styled.div`
  font-size: 26px;
  margin-right: auto;
  color: ${({ theme }) => theme.colors.font.contrast};
  display: flex;
  align-items: center;
  line-height: 1;
`

export const Link = styled(RouterLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.font.contrast};
  line-height: 1;

  &:hover,
  &:focus,
  &:active {
    color: ${({ theme }) => theme.colors.font.contrast};
  }
`
