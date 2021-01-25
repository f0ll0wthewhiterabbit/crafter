import React, { FC, useState } from 'react'
import { Tooltip, Button } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

import DeleteModal from '@/components/DeleteModal'
import UnitModal from '@/components/UnitModal'
import { Item } from '@/interfaces/Item'
import { Recipe } from '@/interfaces/Recipe'
import { UNIT_MODAL_MODES } from '@/constants/unitModalModes'

import { ImageWrapper, Image, Controls } from './styles'

const Unit: FC<{ item?: Item; recipe?: Recipe }> = ({ item, recipe }) => {
  const [isFocused, setIsFocused] = useState(false)
  const [isUnitModalVisible, setIsUnitModalVisible] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const title = item?.title || recipe?.title || ''
  const imageSrc = item?.imageSrc || recipe?.imageSrc || ''

  const handleImageWrapperFocus = () => {
    setIsFocused(true)
  }

  const handleImageWrapperBlur = () => {
    setIsFocused(false)
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

  return (
    <>
      <Tooltip title={title}>
        <ImageWrapper
          tabIndex={0}
          onFocus={handleImageWrapperFocus}
          onBlur={handleImageWrapperBlur}
          onMouseEnter={handleImageWrapperFocus}
          onMouseLeave={handleImageWrapperBlur}
        >
          <Image src={imageSrc} alt={title} isFocused={isFocused} />
          <Controls $isVisible={isFocused}>
            <Button shape="circle" icon={<DeleteOutlined />} onClick={showDeleteModal} />
            <Button shape="circle" icon={<EditOutlined />} onClick={showUnitModal} />
          </Controls>
        </ImageWrapper>
      </Tooltip>
      <DeleteModal isVisible={isDeleteModalVisible} handleClose={closeDeleteModal} title={title} />
      <UnitModal
        isVisible={isUnitModalVisible}
        item={item}
        recipe={recipe}
        mode={item ? UNIT_MODAL_MODES.ITEM_EDIT : UNIT_MODAL_MODES.RECIPE_EDIT}
        modalTitle={item ? 'Edit item' : 'Edit recipe'}
        handleClose={closeUnitModal}
      />
    </>
  )
}

export default Unit
