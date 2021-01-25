import React, { FC } from 'react'
import { Typography, Button } from 'antd'

import { Modal, ContentWrapper, ExclamationIcon, IconWrapper, Controls } from './styles'

const { Title } = Typography

const DeleteModal: FC<{ isVisible: boolean; title: string; handleClose: () => void }> = ({
  isVisible,
  title,
  handleClose,
}) => {
  const handleConfirm = () => {
    console.log('Delete confirm')
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
