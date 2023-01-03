import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles({
  InputRoot: {
    '&::-webkit-calendar-picker-indicator': {
          display: 'none',
          '-webkit-appearance': 'none'
        }
    }
})
