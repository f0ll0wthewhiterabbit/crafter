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

  @media (max-width: 569px) {
    flex-direction: column;
    justify-content: flex-start;

    > * + * {
      margin-left: 0;
      margin-top: 20px;
    }
  }
`
