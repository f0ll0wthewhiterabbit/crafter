import Loader from '@/components/Loader'
import React, { FC, ReactNode } from 'react'

import { Wrapper, Header, Title, Content } from './styles'

const Board: FC<{ title: string; isLoaderVisible: boolean; controls?: ReactNode }> = ({
  title,
  isLoaderVisible,
  controls,
  children,
}) => {
  return (
    <Wrapper>
      <Loader isVisible={isLoaderVisible} />
      <Header>
        <Title level={3}>{title}</Title>
        {controls}
      </Header>
      <Content>{children}</Content>
    </Wrapper>
  )
}

export default Board
