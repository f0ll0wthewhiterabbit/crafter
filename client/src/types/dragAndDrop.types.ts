import { DRAG_UNIT_TYPES } from '@/constants/dragAndDrop.constants'
import { DropTargetMonitor } from 'react-dnd'

export interface DropTargetMonitorPayload {
  id: string
  dragUnitType: DRAG_UNIT_TYPES
}

export interface DropTargetMonitorWithPayload extends DropTargetMonitor, DropTargetMonitorPayload {}
