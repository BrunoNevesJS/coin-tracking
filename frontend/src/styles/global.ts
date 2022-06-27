import { createStyles, makeStyles } from '@mui/material/styles'

import { sg } from './styleGuide'

const useStyles = makeStyles(() =>
  createStyles({
    '@global': {
      body: {
        height: '100%',
        width: '100%',
        margin: 0,
      },
      '#root': {
        height: '100%',
        minHeight: '100vh',
      },
      h1: {
        fontSize: sg.heading[1],
      },
      h2: {
        fontSize: sg.heading[2]
      },
      h3: {
        fontSize: sg.heading[3]
      },
      h4: {
        fontSize: sg.heading[4]
      },
      h5: {
        fontSize: sg.heading[5]
      },
      h6: {
        fontSize: sg.heading[6]
      }
    }
  })
);

const GlobalStyles = useStyles;

export default GlobalStyles;