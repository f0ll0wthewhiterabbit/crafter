import React, { FC } from 'react'

import { Recipe } from '@/types/recipe.types'
import { Unit } from '@/types/unit.types'

import {
  Modal,
  ImageWrapper,
  Image,
  DescriptionWrapper,
  DescriptionList,
  ItemsList,
} from './styles'

interface UnitModalProps {
  isVisible: boolean
  unit: Unit
  isRecipe: boolean
  handleClose: () => void
}

const UnitModal: FC<UnitModalProps> = ({ isVisible, unit, isRecipe, handleClose }) => {
  const title = unit.title
  const imageSrc = unit.imageSrc
  const items = (unit as Recipe).items || []

  return (
    <Modal
      width={400}
      visible={isVisible}
      title={title}
      footer={null}
      destroyOnClose
      onCancel={handleClose}
    >
      <ImageWrapper>
        <Image src={imageSrc} alt={title} />
      </ImageWrapper>
      <DescriptionWrapper>
        <DescriptionList>
          <li>
            <b>Type:</b> Recipe
          </li>
          {isRecipe && (
            <li>
              <b>Items:</b>
              <ItemsList>
                {items.map((item, index) => (
                  <li key={`${item}-${index}`}>{item}</li>
                ))}
              </ItemsList>
            </li>
          )}
        </DescriptionList>
      </DescriptionWrapper>
    </Modal>
  )
}

export default UnitModal
