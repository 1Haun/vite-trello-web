import Box from '@mui/material/Box'

function BoardContent() {
  return (
    <Box sx={{
      bgcolor: (theme) => (
        theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'
      ),
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
