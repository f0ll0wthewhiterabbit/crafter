import React, { FC } from 'react'
import { DoubleRightOutlined } from '@ant-design/icons'

import { Wrapper, Button } from './styles'

const UserMenu: FC = () => (
  <Wrapper>
    <Button type="link" icon={<DoubleRightOutlined />}>
      Sign out
    </Button>
  </Wrapper>
)

export default UserMenu
