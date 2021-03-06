import React, { FC, KeyboardEvent, SyntheticEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useDrag } from 'react-dnd'
import { Tooltip } from 'antd'
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons'

import DeleteModal from '@/components/pages/Home/components/DeleteModal'
import UnitFormModal from '@/components/pages/Home/components/UnitFormModal'
import UnitModal from '@/components/pages/Home/components/UnitModal'
import { Unit as UnitType } from '@/types/unit.types'
import { Item } from '@/types/item.types'
import { UNIT_TYPES, UNIT_FORM_MODAL_MODES } from '@/constants/unit.constants'
import { extractRecipeFromBagRequest, moveRecipeToBagRequest } from '@/store/recipesSlice'
import { extractItemFromBagRequest, moveItemToBagRequest } from '@/store/itemsSlice'
import { DRAG_UNIT_TYPES } from '@/constants/dragAndDrop.constants'
import { DropTargetMonitorPayload } from '@/types/dragAndDrop.types'

import { Wrapper, ImageWrapper, Image, Controls, ControlButton, Badge } from './styles'

const Unit: FC<{ unit: UnitType; unitType: UNIT_TYPES; dragUnitType: DRAG_UNIT_TYPES }> = ({
  unit,
  unitType,
  dragUnitType,
}) => {
  const dispatch = useDispatch()
  const [isFocused, setIsFocused] = useState(false)
  const [isUnitFormModalVisible, setIsUnitFormModalVisible] = useState(false)
  const [isUnitModalVisible, setIsUnitModalVisible] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)

  const [{ isDragging }, drag] = useDrag(() => ({
    type: dragUnitType,
    item: { id: unit._id, dragUnitType } as DropTargetMonitorPayload,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  const { _id: id, title, imageSrc, belongsTo } = unit
  const isRecipe = unitType === UNIT_TYPES.RECIPE
  const isCraftedItem = Boolean((unit as Item).parentRecipe)

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
    <Wrapper ref={drag} isDragging={isDragging} isCraftedItem={isCraftedItem}>
      <Tooltip title={title}>
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
            <ControlButton shape="circle" icon={leftButtonIcon} onClick={handleLeftButtonClick} />
            <ControlButton
              shape="circle"
              icon={<EditOutlined />}
              onClick={handleMiddleButtonClick}
            />
            <ControlButton shape="circle" icon={rightButtonIcon} onClick={handleRightButtonClick} />
          </Controls>
        </ImageWrapper>
        <Badge count={isRecipe ? 'Recipe' : isCraftedItem ? 'Crafted' : 0} showZero={false} />
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
    </Wrapper>
  )
}

export default Unit
