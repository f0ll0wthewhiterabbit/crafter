import React, { FC } from 'react'
import { DoubleRightOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'

import { signOutRequest } from '@/store/authSlice'

import { Wrapper, Button } from './styles'

const UserMenu: FC = () => {
  const dispatch = useDispatch()

  const handleSignOut = () => {
    dispatch(signOutRequest())
  }

  return (
    <Wrapper>
      <Button type="link" icon={<DoubleRightOutlined />} onClick={handleSignOut}>
        Sign out
      </Button>
    </Wrapper>
  )
}

export default UserMenu
