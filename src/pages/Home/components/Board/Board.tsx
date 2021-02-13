import React, { FC, ReactNode } from 'react'

import { Wrapper, Header, Title, Content } from './styles'

const Board: FC<{ title: string; controls?: ReactNode }> = ({ title, controls, children }) => {
  return (
    <Wrapper>
      <Header>
        <Title level={3}>{title}</Title>
        {controls}
      </Header>
      <Content>{children}</Content>
    </Wrapper>
  )
}

export default Board
