import styled from 'styled-components'
import { UserAddOutlined } from '@ant-design/icons'

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const SignUpIcon = styled(UserAddOutlined)`
  color: ${({ theme }) => theme.colors.accent};
  font-size: 32px;
  margin-bottom: 5px;
`

export const Title = styled.h1`
  font-size: 28px;
`
