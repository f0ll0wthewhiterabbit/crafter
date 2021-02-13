import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { Typography, Button } from 'antd'

import { deleteItemRequest, deleteRecipeRequest } from '@/store/gameSlice'

import { Modal, ContentWrapper, ExclamationIcon, IconWrapper, Controls } from './styles'

const { Title } = Typography

const DeleteModal: FC<{
  isVisible: boolean
  id: string
  title: string
  isRecipe: boolean
  handleClose: () => void
}> = ({ isVisible, id, title, isRecipe, handleClose }) => {
  const dispatch = useDispatch()

  const handleConfirm = () => {
    // TODO: loading
    console.log('Delete confirm')

    if (id) {
      isRecipe ? dispatch(deleteRecipeRequest(id)) : dispatch(deleteItemRequest(id))
    }

    handleClose()
  }

  return (
    <Modal
      width={416}
      visible={isVisible}
      title={null}
      footer={null}
      closable={false}
      onCancel={handleClose}
    >
      <ContentWrapper>
        <IconWrapper>
          <ExclamationIcon />
        </IconWrapper>
        <div>
          <Title level={5}>Do you really want to delete &quot;{title}&quot;?</Title>
        </div>
      </ContentWrapper>
      <Controls>
        <Button onClick={handleClose}>Cancel</Button>
        <Button danger onClick={handleConfirm}>
          Delete
        </Button>
      </Controls>
    </Modal>
  )
}

export default DeleteModal
