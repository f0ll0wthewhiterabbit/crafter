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
import { Item } from '@/types/item.types'

interface UnitModalProps {
  isVisible: boolean
  unit: Unit
  isRecipe: boolean
  handleClose: () => void
}

const UnitModal: FC<UnitModalProps> = ({ isVisible, unit, isRecipe, handleClose }) => {
  const title = unit.title
  const imageSrc = unit.imageSrc
  const itemTitles = (unit as Recipe).itemTitles || []
  const isCraftedItem = Boolean((unit as Item).parentRecipe)

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
            <b>Type:</b> {isRecipe ? 'Recipe' : isCraftedItem ? 'Crafted Item' : 'Item'}
          </li>
          {isRecipe && (
            <li>
              <b>Items:</b>
              <ItemsList>
                {itemTitles.map((itemTitle, index) => (
                  <li key={`${itemTitle}-${index}`}>{itemTitle}</li>
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
