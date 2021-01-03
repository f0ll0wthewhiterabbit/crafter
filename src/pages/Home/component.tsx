import React from 'react'
import styled from 'styled-components'

interface TitleProps {
  primary?: boolean
}

const Title = styled.h1<TitleProps>`
  font-size: 1.5em;
  text-align: center;
  color: ${({ primary }) => (primary ? 'palevioletred' : 'cyan')};
`

const Paragraph = styled.p`
  font-size: 1em;
  text-align: center;
  color: ${({ theme }) => theme.colors.font.regular};
`

const HomePage: React.FC = () => {
  return (
    <div>
      <Title primary>Home page</Title>
      <Paragraph>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus inventore quas
        voluptates id dolores. In quaerat laboriosam nemo optio ducimus temporibus quis ex, dolor,
        sed vel tempora, explicabo commodi molestiae!
      </Paragraph>
    </div>
  )
}

export default HomePage
