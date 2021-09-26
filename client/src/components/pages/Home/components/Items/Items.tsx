import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDrop } from 'react-dnd'
import { io } from 'socket.io-client'

import { UNIT_FORM_MODAL_MODES, UNIT_TYPES } from '@/constants/unit.constants'
import { RootState } from '@/store/rootReducer'
import Board from '@/components/pages/Home/components/Board'
import AddButton from '@/components/pages/Home/components/AddButton'
import Unit from '@/components/pages/Home/components/Unit'
import { DRAG_UNIT_TYPES } from '@/constants/dragAndDrop.constants'
import { DropTargetMonitorWithPayload } from '@/types/dragAndDrop.types'
import {
  addItemSuccess,
  deleteItemSuccess,
  editItemSuccess,
  extractItemFromBagRequest,
} from '@/store/itemsSlice'
import { Item } from '@/types/item.types'
import { BASE_WEB_SOCKET_URL } from '@/constants/endpoints.constants'

const Items: FC = () => {
  const { data: items } = useSelector((state: RootState) => state.items)
  const { loadingState: itemsLoadingState } = useSelector((state: RootState) => state.items)
  const { user } = useSelector((state: RootState) => state.auth)
  const userId = user?._id
  const dispatch = useDispatch()

  useEffect(() => {
    if (!userId) {
      return
    }

    const socket = io(`${BASE_WEB_SOCKET_URL}/items`)
    socket.on('itemAppear', (item: Item) => {
      dispatch(addItemSuccess(item))
    })
    socket.on('itemsRemove', (itemIds: string[]) => {
      itemIds.forEach((itemId) => {
        dispatch(deleteItemSuccess(itemId))
      })
    })
    socket.on('itemUpdate', (item: Item) => {
      dispatch(editItemSuccess(item))
    })
    socket.on('itemBag', (item: Item) => {
      if (item.belongsTo !== userId) {
        dispatch(deleteItemSuccess(item._id))
      }
    })

    return () => {
      socket.disconnect()
    }
  }, [dispatch, userId])

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
