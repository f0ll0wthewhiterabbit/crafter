import styled from 'styled-components'

export const ImageWrapper = styled.div<{ tabIndex: number }>`
  width: 130px;
  height: 130px;
  overflow: hidden;
  border-radius: 10px;
  transition: box-shadow 0.5s;
  position: relative;
  background-color: ${({ theme }) => theme.colors.background.unit};

  &:hover,
  &:focus {
    box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12),
      0 5px 12px 4px rgba(0, 0, 0, 0.09);
    outline: none;
  }
`

export const Image = styled.img<{ isFocused: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
  transform: ${({ isFocused }) => (isFocused ? `scale(1.1)` : `scale(1)`)};
`

export const Controls = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.6s;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};

  > * + * {
    margin-left: 5px;
  }
`
