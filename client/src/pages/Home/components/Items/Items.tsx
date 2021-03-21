import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import { UNIT_FORM_MODAL_MODES, UNIT_TYPES } from '@/constants/unit.constants'
import { RootState } from '@/store/rootReducer'
import Board from '@/pages/Home/components/Board'
import AddButton from '@/pages/Home/components/AddButton'
import Unit from '@/pages/Home/components/Unit'

const Items: FC = () => {
  const { data: items } = useSelector((state: RootState) => state.items)
  const { loadingState: itemsLoadingState } = useSelector((state: RootState) => state.items)

  return (
    <Board
      title="Items"
      isLoaderVisible={itemsLoadingState === 'loading'}
      controls={<AddButton mode={UNIT_FORM_MODAL_MODES.ITEM_ADD} title="Add item" />}
    >
      {items
        .filter((item) => !item.belongsTo)
        .map((item) => (
          <Unit unit={item} unitType={UNIT_TYPES.ITEM} key={item._id} />
        ))}
    </Board>
  )
}

export default Items
