import styled from 'styled-components'
import { Typography } from 'antd'

const { Title: AntdTitle } = Typography

export const Wrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.background.board};
  flex-grow: 1;
  border-radius: 20px;
  padding: 0 20px 20px;
  max-width: calc(100% / 3);
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
