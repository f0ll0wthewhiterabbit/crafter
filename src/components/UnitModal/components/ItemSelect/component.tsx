import React, { FC } from 'react'
import { SelectValue } from 'antd/lib/select'
import { useField } from 'formik'

import { Select } from './styles'

const { Option } = Select

const items = ['Item1', 'Item2', 'Item3']

const ItemSelect: FC<{ fieldName: string; initialValue: string[] }> = ({
  fieldName,
  initialValue,
}) => {
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
      {items.map((item) => (
        <Option key={item} value={item}>
          {item}
        </Option>
      ))}
    </Select>
  )
}

export default ItemSelect
