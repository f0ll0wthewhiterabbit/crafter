import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { SelectValue } from 'antd/lib/select'
import { useField } from 'formik'

import { RootState } from '@/store/rootReducer'

import { Select } from './styles'

const { Option } = Select

const ItemSelect: FC<{ fieldName: string; initialValue: string[] }> = ({
  fieldName,
  initialValue,
}) => {
  const { user } = useSelector((state: RootState) => state.auth)
  const itemTitles = useSelector((state: RootState) => {
    const filteredItems = state.items.data.filter(
      (item) => (!item.belongsTo || item.belongsTo === user?.id) && !item.parentRecipe
    )

    return [...new Set(filteredItems.map((item) => item.title))]
  })
  const [, , helpers] = useField(fieldName)
  const { setValue, setTouched } = helpers

  const handleChange = (value: SelectValue) => {
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
      {itemTitles.map((itemTitle, index) => (
        <Option key={`${itemTitle}-${index}`} value={itemTitle}>
          {itemTitle}
        </Option>
      ))}
    </Select>
  )
}

export default ItemSelect
