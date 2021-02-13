import React, { FC } from 'react'
import { Space } from 'antd'
import { CodeSandboxOutlined } from '@ant-design/icons'

import { ROUTE_NAMES } from '@/router/routes.constants'
import { Wrapper, Link } from './styles'

const Logo: FC = () => (
  <Wrapper>
    <Space size={3}>
      <CodeSandboxOutlined /> <Link to={ROUTE_NAMES.HOME}>Crafter</Link>
    </Space>
  </Wrapper>
)

export default Logo
