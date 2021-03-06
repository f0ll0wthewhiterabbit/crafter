import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { SelectValue } from 'antd/lib/select'
import { useField } from 'formik'

import { RootState } from '@/store/rootReducer'
import { DUMMY_USER_ID } from '@/constants/user.constants'

import { Select } from './styles'

const { Option } = Select

const ItemSelect: FC<{ fieldName: string; initialValue: string[] }> = ({
  fieldName,
  initialValue,
}) => {
  const { items } = useSelector((state: RootState) => state.game)
  const [, , helpers] = useField(fieldName)
  const { setValue, setTouched } = helpers

  const handleChange = (value: SelectValue) => {
    console.log('Selected items:', value)
    setValue(value)
  }

  const handleBlur = () => {
    setTouched(true)
  }

  return (
    <Select
      mode="multiple"
      allowClear
      placeholder="Recipe ingredients"
      defaultValue={initialValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onClear={handleBlur}
    >
      {items
        .filter((item) => !item.belongsTo || item.belongsTo === DUMMY_USER_ID)
        .map((item) => (
          <Option key={item._id} value={item.title}>
            {item.title}
          </Option>
        ))}
    </Select>
  )
}

export default ItemSelect
