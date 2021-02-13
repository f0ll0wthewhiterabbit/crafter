import React, { FC, useState } from 'react'
import { Tooltip } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import UnitModal from '@/pages/Home/components/UnitModal'
import { UNIT_MODAL_MODES } from '@/constants/unit.constants'

import { Button } from './styles'

interface AddButtonProps {
  title: string
  mode: UNIT_MODAL_MODES.ITEM_ADD | UNIT_MODAL_MODES.RECIPE_ADD
}

const AddButton: FC<AddButtonProps> = ({ title, mode }) => {
  const [isUnitModalVisible, setIsUnitModalVisible] = useState(false)

  const showUnitModal = () => {
    setIsUnitModalVisible(true)
  }

  const closeUnitModal = () => {
    setIsUnitModalVisible(false)
  }

  return (
    <>
      <Tooltip title={title}>
        <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={showUnitModal} />
      </Tooltip>
      <UnitModal
        isVisible={isUnitModalVisible}
        mode={mode}
        modalTitle={mode === UNIT_MODAL_MODES.ITEM_ADD ? 'Add item' : 'Add recipe'}
        handleClose={closeUnitModal}
      />
    </>
  )
}

export default AddButton
