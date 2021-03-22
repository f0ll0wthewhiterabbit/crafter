import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDrop } from 'react-dnd'

import { UNIT_FORM_MODAL_MODES, UNIT_TYPES } from '@/constants/unit.constants'
import { RootState } from '@/store/rootReducer'
import Board from '@/components/pages/Home/components/Board'
import AddButton from '@/components/pages/Home/components/AddButton'
import Unit from '@/components/pages/Home/components/Unit'
import { DRAG_UNIT_TYPES } from '@/constants/dragAndDrop.constants'
import { DropTargetMonitorWithPayload } from '@/types/dragAndDrop.types'
import { extractItemFromBagRequest } from '@/store/itemsSlice'

const Items: FC = () => {
  const { data: items } = useSelector((state: RootState) => state.items)
  const { loadingState: itemsLoadingState } = useSelector((state: RootState) => state.items)
  const dispatch = useDispatch()

  const [{ isOver }, drop] = useDrop(() => ({
    accept: DRAG_UNIT_TYPES.BAGGED_ITEM,
    drop: (monitor: DropTargetMonitorWithPayload) => {
      dispatch(extractItemFromBagRequest(monitor.id))
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  return (
    <Board
      dropRef={drop}
      isDropOver={isOver}
      title="Items"
      isLoaderVisible={itemsLoadingState === 'loading'}
      controls={<AddButton mode={UNIT_FORM_MODAL_MODES.ITEM_ADD} title="Add item" />}
    >
      {items
        .filter((item) => !item.belongsTo)
        .map((item) => (
          <Unit
            unit={item}
            unitType={UNIT_TYPES.ITEM}
            dragUnitType={DRAG_UNIT_TYPES.ITEM}
            key={item._id}
          />
        ))}
    </Board>
  )
}

export default Items
