import Box from '@mui/material/Box'
import Card from './Card/Card'

function ListCards({ cards }) {
  return (
    <Box sx={{
      p: '0 5px',
      m: '0 5px',
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      overflowX: 'hidden',
      overflowY: 'auto',
      maxHeight: (theme) => `calc(
            ${theme.trello.broadContentHeight} - 
            ${theme.spacing(5)} - 
            ${theme.trello.columnHeaderHeight} -
            ${theme.trello.columnFooterHeight}
          )`,
      '&::-webkit-scrollbar-thumb': { backgroundColor: '#ced0da', boderRadius: '8px' },
      '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#bdc3c7' }
    }}>
      {cards?.map(card => <Card key={card._id} card={card} />)}
      {/* <Card /> */}
    </Box>
  )
}

export default ListCards
