import React, { FC, useState } from 'react'
import { Tooltip } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import UnitFormModal from '@/pages/Home/components/UnitFormModal'
import { UNIT_FORM_MODAL_MODES } from '@/constants/unit.constants'

import { Button } from './styles'

interface AddButtonProps {
  title: string
  mode: UNIT_FORM_MODAL_MODES.ITEM_ADD | UNIT_FORM_MODAL_MODES.RECIPE_ADD
}

const AddButton: FC<AddButtonProps> = ({ title, mode }) => {
  const [isUnitFormModalVisible, setIsUnitFormModalVisible] = useState(false)

  const showUnitFormModal = () => {
    setIsUnitFormModalVisible(true)
  }

  const closeUnitFormModal = () => {
    setIsUnitFormModalVisible(false)
  }

  return (
    <>
      <Tooltip title={title}>
        <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={showUnitFormModal} />
      </Tooltip>
      <UnitFormModal
        isVisible={isUnitFormModalVisible}
        mode={mode}
        modalTitle={mode === UNIT_FORM_MODAL_MODES.ITEM_ADD ? 'Add item' : 'Add recipe'}
        handleClose={closeUnitFormModal}
      />
    </>
  )
}

export default AddButton
