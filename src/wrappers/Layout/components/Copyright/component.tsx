import React, { FC } from 'react'

import { ROUTE_NAMES } from '@/router/routes.constants'
import { Wrapper, Link } from './styles'

const Copyright: FC = () => (
  <Wrapper>
    © <Link to={ROUTE_NAMES.HOME}>Crafter</Link> {new Date().getFullYear()}{' '}
  </Wrapper>
)

export default Copyright
