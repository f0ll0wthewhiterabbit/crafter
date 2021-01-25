import React, { FC, useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Input, Button, Tooltip } from 'antd'

import { Item } from '@/interfaces/Item'
import { Recipe } from '@/interfaces/Recipe'
import { ItemForm } from '@/interfaces/ItemForm'
import { RecipeForm } from '@/interfaces/RecipeForm'
import { UNIT_MODAL_MODES } from '@/constants/unitModalModes'

import ItemSelect from './components/ItemSelect'
import { Modal, Form, FormBody, FormItemRequired, Controls } from './styles'

interface UnitModalProps {
  isVisible: boolean
  mode: UNIT_MODAL_MODES
  modalTitle: string
  item?: Item
  recipe?: Recipe
  handleClose: () => void
}

const UnitModal: FC<UnitModalProps> = ({
  isVisible,
  mode,
  modalTitle,
  item,
  recipe,
  handleClose,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const title = item?.title || recipe?.title || ''
  const imageSrc = item?.imageSrc || recipe?.imageSrc || ''
  const items = recipe?.items || []
  const isItemEditMode = mode === UNIT_MODAL_MODES.ITEM_EDIT
  const isRecipeAddMode = mode === UNIT_MODAL_MODES.RECIPE_ADD
  const isRecipeEditMode = mode === UNIT_MODAL_MODES.RECIPE_EDIT

  const handleConfirm = (values: ItemForm | RecipeForm) => {
    setIsLoading(true)

    if (isItemEditMode || isRecipeEditMode) {
      console.log('Edit confirm', values)
    } else {
      console.log('Add confirm', values)
    }

    setTimeout(() => {
      handleClose()
      setIsLoading(false)
    }, 3000)
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
        initialValues={{ title, imageSrc, ...(recipe && { items }) }}
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
              {(isRecipeAddMode || isRecipeEditMode) && (
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
                  Edit
                </Button>
              </Tooltip>
            </Controls>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default UnitModal
