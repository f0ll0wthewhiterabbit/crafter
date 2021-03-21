import styled, { css } from 'styled-components'
import { Button as AntdButton } from 'antd'

export const Wrapper = styled.div<{ isCraftedItem: boolean }>`
  .ant-badge-count {
    background: ${({ isCraftedItem, theme }) =>
      isCraftedItem ? theme.colors.background.badgeItem : theme.colors.background.badgeRecipe};
  }
`

export const ImageWrapper = styled.div<{ tabIndex: number }>`
  /* width: 130px;
  height: 130px; */
  aspect-ratio: 1 /1;
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

  &:hover {
    cursor: pointer;
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
    margin-left: 2px;

    @media (min-width: 1400px) {
      margin-left: 5px;
    }
  }
`

const controlButtonSmallSize = css`
  min-width: 28px;
  max-width: 28px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    font-size: 14px;
  }
`

export const ControlButton = styled(AntdButton)`
  @media (max-width: 570px) {
    ${controlButtonSmallSize}
  }

  @media (min-width: 780px) and (max-width: 940px) {
    ${controlButtonSmallSize}
  }

  @media (min-width: 1150px) and (max-width: 1300px) {
    ${controlButtonSmallSize}
  }
`
