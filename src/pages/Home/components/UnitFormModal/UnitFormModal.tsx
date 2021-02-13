import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Input, Button, Tooltip } from 'antd'

import { Item, ItemForm } from '@/types/item.types'
import { Recipe, RecipeForm } from '@/types/recipe.types'
import { Unit } from '@/types/unit.types'
import { UNIT_FORM_MODAL_MODES } from '@/constants/unit.constants'
import {
  addItemRequest,
  addRecipeRequest,
  editItemRequest,
  editRecipeRequest,
} from '@/store/gameSlice'

import ItemSelect from './components/ItemSelect'
import { Modal, Form, FormBody, FormItemRequired, Controls } from './styles'

interface UnitFormModalProps {
  isVisible: boolean
  mode: UNIT_FORM_MODAL_MODES
  modalTitle: string
  unit?: Unit
  handleClose: () => void
}

const UnitFormModal: FC<UnitFormModalProps> = ({
  isVisible,
  mode,
  modalTitle,
  unit,
  handleClose,
}) => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const id = unit?.id || ''
  const title = unit?.title || ''
  const imageSrc = unit?.imageSrc || ''
  const items = (unit as Recipe)?.items || []
  const isItemEditMode = mode === UNIT_FORM_MODAL_MODES.ITEM_EDIT
  const isRecipeAddMode = mode === UNIT_FORM_MODAL_MODES.RECIPE_ADD
  const isRecipeEditMode = mode === UNIT_FORM_MODAL_MODES.RECIPE_EDIT
  const isRecipe = isRecipeAddMode || isRecipeEditMode

  const handleConfirm = (values: ItemForm | RecipeForm) => {
    setIsLoading(true)

    if (isItemEditMode || isRecipeEditMode) {
      setTimeout(() => {
        console.log('Edit confirm', values)

        if (isRecipeEditMode) {
          const updatedRecipe = { ...values, id } as Recipe
          dispatch(editRecipeRequest(updatedRecipe))
        } else {
          const updatedItem = { ...values, id } as Item
          dispatch(editItemRequest(updatedItem))
        }

        handleClose()
        setIsLoading(false)
      }, 3000)
    } else {
      setTimeout(() => {
        console.log('Add confirm', values)

        if (isRecipeAddMode) {
          const recipe = {
            ...values,
            id: String(Math.random()),
            belongsTo: null,
            baggageDate: null,
          } as Recipe
          dispatch(addRecipeRequest(recipe))
        } else {
          const item = {
            ...values,
            id: String(Math.random()),
            belongsTo: null,
            baggageDate: null,
          } as Item
          dispatch(addItemRequest(item))
        }

        handleClose()
        setIsLoading(false)
      }, 3000)
    }
  }

  return (
    <Modal
      width={500}
      visible={isVisible}
      title={modalTitle}
      footer={null}
      closable={false}
      destroyOnClose
      onCancel={handleClose}
    >
      <Formik
        initialValues={{ title, imageSrc, ...(isRecipe && { items }) }}
        validationSchema={Yup.object({
          title: Yup.string().required('Title is required'),
          imageSrc: Yup.string().required('Image is required'),
          ...((isRecipeAddMode || isRecipeEditMode) && {
            items: Yup.array()
              .required('Items are required')
              .min(2, 'The recipe should contain at least two items'),
          }),
        })}
        onSubmit={handleConfirm}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, dirty, isValid }) => (
          <Form
            layout="vertical"
            onSubmitCapture={handleSubmit}
            initialValues={{ title, imageSrc }}
          >
            <FormBody>
              <FormItemRequired
                name="title"
                label="Title"
                colon={false}
                hasFeedback={touched.title}
                validateStatus={errors.title && touched.title ? 'error' : ''}
              >
                <Input
                  placeholder="Title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                />
              </FormItemRequired>
              <FormItemRequired
                name="imageSrc"
                label="Image"
                colon={false}
                hasFeedback={touched.imageSrc}
                validateStatus={errors.imageSrc && touched.imageSrc ? 'error' : ''}
              >
                <Input
                  placeholder="Image"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.imageSrc}
                />
              </FormItemRequired>
              {isRecipe && (
                <FormItemRequired
                  name="items"
                  label="Items"
                  colon={false}
                  hasFeedback={touched.items}
                  validateStatus={errors.items && touched.items ? 'error' : ''}
                >
                  <ItemSelect fieldName="items" initialValue={items} />
                </FormItemRequired>
              )}
            </FormBody>
            <Controls>
              <Button onClick={handleClose}>Cancel</Button>
              <Tooltip
                title={
                  (touched.title && errors.title) ||
                  (touched.imageSrc && errors.imageSrc) ||
                  (touched.items && errors.items) ||
                  ''
                }
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  disabled={!dirty || !isValid}
                >
                  {isItemEditMode || isRecipeEditMode ? 'Edit' : 'Add'}
                </Button>
              </Tooltip>
            </Controls>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default UnitFormModal
