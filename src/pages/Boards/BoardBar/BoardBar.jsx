import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { capitalizeFirstLetter } from '~/utils/formatters'
const MENU_STYLES = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '.MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}
function BoardBar({ board }) {
  return (
    <Box sx={{
      with: '100%',
      height: (theme) => theme.trello.broadBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      paddingX: 2,
      overflowX: 'auto',
      bgcolor: (theme) => (
        theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'
      ),
      '&::-webkit-scrollbar-track': { m: 2 }
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx={MENU_STYLES}
          icon={<DashboardIcon />}
          label={board?.title}
          clickable
        />

        <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon />}
          label={capitalizeFirstLetter(board?.type)}
          clickable
        />

        <Chip
          sx={MENU_STYLES}
          icon={<AddToDriveIcon />}
          label="Add To Google Drive"
          clickable
        />

        <Chip
          sx={MENU_STYLES}
          icon={<BoltIcon />}
          label="Automation"
          clickable
        />

        <Chip
          sx={MENU_STYLES}
          icon={<FilterListIcon />}
          label="Filters"
          clickable
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': { borderColor: 'white' }
          }}>
          Invite
        </Button>

        <AvatarGroup
          max={3}
          sx={{
            gap: '10px',
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: 16,
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              '&:first-of-type': { bgColor: '#a4b0be' }
            }
          }}
        >
          <Tooltip title="Huan">
            <Avatar alt="Huan"
              src="https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-6/429956045_335786376129809_2672506687246116446_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Jpq1gD_hjlAQ7kNvgFnVXfg&_nc_ht=scontent.fhan5-9.fna&cb_e2o_trans=t&oh=00_AYC_uUoJldCtCLZEz16rJ-1EESvbvdVOTVQ9yhXVhGOn3A&oe=669D2F0A"
            />
          </Tooltip>
          <Tooltip title="Huan">
            <Avatar alt="Huan"
              src="https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-6/429956045_335786376129809_2672506687246116446_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Jpq1gD_hjlAQ7kNvgFnVXfg&_nc_ht=scontent.fhan5-9.fna&cb_e2o_trans=t&oh=00_AYC_uUoJldCtCLZEz16rJ-1EESvbvdVOTVQ9yhXVhGOn3A&oe=669D2F0A"
            />
          </Tooltip>
          <Tooltip title="Huan">
            <Avatar alt="Huan"
              src="https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-6/429956045_335786376129809_2672506687246116446_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Jpq1gD_hjlAQ7kNvgFnVXfg&_nc_ht=scontent.fhan5-9.fna&cb_e2o_trans=t&oh=00_AYC_uUoJldCtCLZEz16rJ-1EESvbvdVOTVQ9yhXVhGOn3A&oe=669D2F0A"
            />
          </Tooltip>
          <Tooltip title="Huan">
            <Avatar alt="Huan"
              src="https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-6/429956045_335786376129809_2672506687246116446_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Jpq1gD_hjlAQ7kNvgFnVXfg&_nc_ht=scontent.fhan5-9.fna&cb_e2o_trans=t&oh=00_AYC_uUoJldCtCLZEz16rJ-1EESvbvdVOTVQ9yhXVhGOn3A&oe=669D2F0A"
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
