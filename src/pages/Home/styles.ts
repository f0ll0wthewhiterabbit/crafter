import styled from 'styled-components'

export const Wrapper = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  align-self: stretch;
  padding: 20px;

  > * + * {
    margin-left: 20px;
  }
`
