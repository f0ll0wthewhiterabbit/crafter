import React, { FC, KeyboardEvent, SyntheticEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Tooltip, Button, Badge } from 'antd'
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons'

import DeleteModal from '@/pages/Home/components/DeleteModal'
import UnitFormModal from '@/pages/Home/components/UnitFormModal'
import UnitModal from '@/pages/Home/components/UnitModal'
import { Unit as UnitType } from '@/types/unit.types'
import { UNIT_TYPES, UNIT_FORM_MODAL_MODES } from '@/constants/unit.constants'
import {
  extractItemFromBagRequest,
  extractRecipeFromBagRequest,
  moveItemToBagRequest,
  moveRecipeToBagRequest,
} from '@/store/gameSlice'

import { ImageWrapper, Image, Controls } from './styles'

const Unit: FC<{ unit: UnitType; unitType: UNIT_TYPES }> = ({ unit, unitType }) => {
  const dispatch = useDispatch()
  const [isFocused, setIsFocused] = useState(false)
  const [isUnitFormModalVisible, setIsUnitFormModalVisible] = useState(false)
  const [isUnitModalVisible, setIsUnitModalVisible] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const { id, title, imageSrc, belongsTo } = unit
  const isRecipe = unitType === UNIT_TYPES.RECIPE

  const handleImageWrapperFocus = () => {
    setIsFocused(true)
  }

  const handleImageWrapperBlur = () => {
    setIsFocused(false)
  }

  const showUnitFormModal = () => {
    setIsUnitFormModalVisible(true)
  }

  const closeUnitFormModal = () => {
    setIsUnitFormModalVisible(false)
  }

  const showUnitModal = () => {
    setIsUnitModalVisible(true)
  }

  const closeUnitModal = () => {
    setIsUnitModalVisible(false)
  }

  const showDeleteModal = () => {
    setIsDeleteModalVisible(true)
  }

  const closeDeleteModal = () => {
    setIsDeleteModalVisible(false)
  }

  const moveToBag = () => {
    isRecipe ? dispatch(moveRecipeToBagRequest(id)) : dispatch(moveItemToBagRequest(id))
    console.log('added to bag')
  }

  const handleImageWrapperKeyPress = (event: KeyboardEvent) => {
    if (event.code === 'Enter' || event.code === 'Space') {
      showUnitModal()
    }
  }

  const handleMiddleButtonClick = (event: SyntheticEvent) => {
    event.stopPropagation()
    showUnitFormModal()
  }

  const handleLeftButtonClick = (event: SyntheticEvent) => {
    event.stopPropagation()

    if (isRecipe) {
      belongsTo ? showDeleteModal() : moveToBag()
    } else {
      belongsTo ? dispatch(extractItemFromBagRequest(id)) : showDeleteModal()
    }
  }

  const handleRightButtonClick = (event: SyntheticEvent) => {
    event.stopPropagation()

    if (isRecipe) {
      belongsTo ? dispatch(extractRecipeFromBagRequest(id)) : showDeleteModal()
    } else {
      belongsTo ? showDeleteModal() : moveToBag()
    }
  }

  let leftButtonIcon
  let rightButtonIcon

  if (isRecipe) {
    rightButtonIcon = belongsTo ? <ArrowRightOutlined /> : <DeleteOutlined />
    leftButtonIcon = belongsTo ? <DeleteOutlined /> : <ArrowLeftOutlined />
  } else {
    leftButtonIcon = belongsTo ? <ArrowLeftOutlined /> : <DeleteOutlined />
    rightButtonIcon = belongsTo ? <DeleteOutlined /> : <ArrowRightOutlined />
  }

  return (
    <>
      <Tooltip title={title}>
        <Badge count={isRecipe ? 'Recipe' : 0} showZero={false} offset={[-20, 0]}>
          <ImageWrapper
            tabIndex={0}
            onFocus={handleImageWrapperFocus}
            onBlur={handleImageWrapperBlur}
            onMouseEnter={handleImageWrapperFocus}
            onMouseLeave={handleImageWrapperBlur}
            onClick={showUnitModal}
            onKeyPress={handleImageWrapperKeyPress}
          >
            <Image src={imageSrc} alt={title} isFocused={isFocused} />
            <Controls $isVisible={isFocused}>
              <Button shape="circle" icon={leftButtonIcon} onClick={handleLeftButtonClick} />
              <Button shape="circle" icon={<EditOutlined />} onClick={handleMiddleButtonClick} />
              <Button shape="circle" icon={rightButtonIcon} onClick={handleRightButtonClick} />
            </Controls>
          </ImageWrapper>
        </Badge>
      </Tooltip>
      <DeleteModal
        isVisible={isDeleteModalVisible}
        handleClose={closeDeleteModal}
        id={id}
        title={title}
        isRecipe={isRecipe}
      />
      <UnitFormModal
        isVisible={isUnitFormModalVisible}
        unit={unit}
        mode={isRecipe ? UNIT_FORM_MODAL_MODES.RECIPE_EDIT : UNIT_FORM_MODAL_MODES.ITEM_EDIT}
        modalTitle={isRecipe ? 'Edit recipe' : 'Edit item'}
        handleClose={closeUnitFormModal}
      />
      <UnitModal
        isVisible={isUnitModalVisible}
        unit={unit}
        isRecipe={isRecipe}
        handleClose={closeUnitModal}
      />
    </>
  )
}

export default Unit