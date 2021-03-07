import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, Button } from 'antd'

import { deleteItemRequest, deleteRecipeRequest } from '@/store/gameSlice'
import { RootState } from '@/store/rootReducer'

import { Modal, ContentWrapper, ExclamationIcon, IconWrapper, Controls } from './styles'

const { Title } = Typography

const DeleteModal: FC<{
  isVisible: boolean
  id: string
  title: string
  isRecipe: boolean
  handleClose: () => void
}> = ({ isVisible, id, title, isRecipe, handleClose }) => {
  const { itemsLoadingState } = useSelector((state: RootState) => state.game)
  const { recipesLoadingState } = useSelector((state: RootState) => state.game)
  const dispatch = useDispatch()

  const handleConfirm = () => {
    if (id) {
      isRecipe
        ? dispatch(deleteRecipeRequest(id, handleClose))
        : dispatch(deleteItemRequest(id, handleClose))
    }
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
        <Button
          danger
          onClick={handleConfirm}
          loading={itemsLoadingState === 'modalLoading' || recipesLoadingState === 'modalLoading'}
        >
          Delete
        </Button>
      </Controls>
    </Modal>
  )
}

export default DeleteModal
