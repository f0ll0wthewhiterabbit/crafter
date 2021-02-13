import styled from 'styled-components'
import { Modal as AntdModal } from 'antd'

export const Modal = styled(AntdModal)`
  .ant-modal-header {
    padding-left: 30px;
    padding-right: 60px;
  }

  .ant-modal-body {
    padding: 30px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
`

export const ImageWrapper = styled.div`
  width: 150px;
  height: 150px;
  margin-right: 30px;
`

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const DescriptionWrapper = styled.div`
  flex-grow: 1;
`

export const DescriptionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  > * + * {
    margin-top: 5px;
  }
`

export const ItemsList = styled.ul`
  list-style-type: square;
`
