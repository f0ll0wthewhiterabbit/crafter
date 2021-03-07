import React from 'react'

import { Overlay, Spinner, Wrapper } from './styles'

const Loader: React.FC<{ isVisible: boolean; text?: string }> = ({ isVisible, text }) => (
  <Wrapper isVisible={isVisible}>
    <Overlay />
    <Spinner size="large" tip={text || ''} />
  </Wrapper>
)

export default Loader
