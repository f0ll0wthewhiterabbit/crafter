import React, { FC, ReactNode } from 'react'
import { ConnectDropTarget } from 'react-dnd'

import Loader from '@/components/shared/Loader'

import { Wrapper, Header, Title, Content, DropOverlay } from './styles'

const Board: FC<{
  title: string
  isLoaderVisible: boolean
  dropRef: ConnectDropTarget
  isDropOver: boolean
  controls?: ReactNode
  isAnimated?: boolean
}> = ({ title, isLoaderVisible, controls, dropRef, isDropOver, isAnimated, children }) => {
  return (
    <Wrapper ref={dropRef} isAnimated={isAnimated}>
      <Loader isVisible={isLoaderVisible} />
      <Header>
        <Title level={3}>{title}</Title>
        {controls}
      </Header>
      <Content>{children}</Content>
      {isDropOver && <DropOverlay />}
    </Wrapper>
  )
}

export default Board
