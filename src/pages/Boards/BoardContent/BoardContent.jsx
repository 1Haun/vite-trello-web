import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import {
  DndContext,
  // PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep } from 'lodash'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_CARD'
}

function BoardContent({ board }) {
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })

  // yeu cau chuot di chuyen 10px thi moi kich hoat event, fix truong hop click bi goi event
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })

  // nhan giu 250ms va dung sai cua cam ung 500px thi moi hoat dong event
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })

  // const sensors = useSensors(pointerSensor)

  // uu tien su dung kep hop 2 loai  sensor la mouse va touch de co trai nghiem tren mobile tot nhat, khong
  // bi bug
  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])

  // cung 1 thoi diem chi co 1 phan tu dang dc keo (column hoac card)
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  // tim 1 column theo cardId
  const findColumnByCardId = (cardId) => {
    // doan nay can luu y, nen dung c.cards thay vi c.cardOrders boi vi o buoc handleDragOver chung ta se
    // lam du lieu cho card hoan chinh truoc roi moi tao ra cardOrderIds moi
    return orderedColumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
  }
  // Trigger khi bat dau keo 1 phan tu
  const handleDragStart = (event) => {
    // console.log('handleDragStart', event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
  }

  const handleDragOver = (event) => {
    // khong lam gi them neu dang keo column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
    // console.log('handleDragOver', event)

    const { active, over } = event
    // can dam bao nei khong ton tai active hoac over (khi keo ra khoi pham vi container) thi khong lam gi tranh crash trang
    if (!active || !over) return

    //activeDraggingCard: la card dang dc keo
    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    // overCard: la card dang duoc tuong tac tren hoac duoi so voi card duoc keo o tren 
    const { id: overCardId } = over

    // tim 2 column theo cardId
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    // neu khong ton tai 1 trong 2 column thi khong lam gi ca, tranh crash trang web
    if (!activeColumn || !overColumn) return

    // xu ly logic o day khi keo card qua 2 column khach nhau, con neu card trong chinh column ban dau cua no thi se khong lam gi
    // vi day dang la 1 doan xu ly luc keo (handleDragOver), con xu ly luc keo xong xuoi thi no lai la van de khac o (handleDragEnd)
    if (activeColumn._id !== overColumn._id) {
      setOrderedColumns(prevColumns => {
        // tim vi tri (index) cua cai overCard trong column dich (noi ma activeCard sap duoc tha)
        const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

        //logic tinh toan ' cardIndex moi' (tren hoac duoi overCard) lay chuan ra tu code cua thu vien 
        let newCardIndex
        const isBelowOverItem = active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height
        const modifier = isBelowOverItem ? 1 : 0
        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

        // clone mang oderedColumnState cu ra 1 cai moi de xu ly data roi return - cap nhat lai oderedColumnState moi
        const nextColumns = cloneDeep(prevColumns)
        const nextActivedColumn = nextColumns.find(column => column._id === activeColumn._id)
        const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

        // nextActivedColumn: column cu
        if (nextActivedColumn) {
          // xoa card o cai column active (cung co the hieu la column cu, cai luc ma keo card ra khoi no de sang column khac)
          nextActivedColumn.cards = nextActivedColumn.cards.filter(card => card._id !== activeDraggingCardId)

          // cap nhat lai mang cardOderIds cho chuan du lieu
          nextActivedColumn.cardOderIds = nextActivedColumn.cards.map(card => card._id)
        }

        //nextOverColumn: column moi
        if (nextOverColumn) {
          //kiem tra card dang keo no co ton tai o overColumn chua neu co thi can xoa no truoc
          nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
          //tiep theo them 1 cai card dang keo vao column theo vi tri index moi
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)
          // cap nhat lai mang cardOderIds cho chuan du lieu
          nextOverColumn.cardOderIds = nextOverColumn.cards.map(card => card._id)
        }

        return nextColumns
      })
    }
  }

  // Trigger khi ket thuc hanh dong keo 1 phan tu
  const handleDragEnd = (event) => {
    // console.log('handleDragEnd', event)

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // console.log('hanh dong keo tha card- tam thoi khong lam gi')
      return
    }

    const { active, over } = event

    if (!active || !over) return //kiem tra neu khong ton tai over keo linh tinh ra ngoai thi return luon tranh loi

    // neu vi tri sau khi keo tha khach vi tri ban dau
    if (active.id !== over.id) {
      const oldIndex = orderedColumns.findIndex(c => c._id === active.id) // Lay vi tri cu tu active

      const newIndex = orderedColumns.findIndex(c => c._id === over.id)
      // Dung arrayMove cua dnd-kid de sap xep lai mang column ban dau
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
      // 2 console.log sau nay dung de goi api
      // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
      // console.log('dndOrderedColumns: ', dndOrderedColumns)
      // console.log('dndOrderedColumnsIds: ', dndOrderedColumnsIds)

      setOrderedColumns(dndOrderedColumns) //cap nhat lai state columns ban dau sau khi da keo tha
    }
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
  }

  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      sensors={sensors}>
      <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        height: (theme) => theme.trello.broadContentHeight,
        p: '10px 0'
      }}>
        <ListColumns columns={orderedColumns} />
        <DragOverlay dropAnimation={customDropAnimation}>
          {(!activeDragItemType) && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData} />}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
