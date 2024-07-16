import Box from '@mui/material/Box'

function BoardContent() {
  return (
    <Box sx={{
      backgroundColor: 'primary.main',
      with: '100%',
      height: (theme) => `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.broadBarHeight})`,
      display: 'flex',
      alignItems: 'center'
    }}>
        Broad Content
    </Box>
  )
}

export default BoardContent
