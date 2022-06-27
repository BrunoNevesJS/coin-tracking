import { ptBR } from '@mui/material/locale';
import { createTheme } from '@mui/material/styles';

import { sg } from './styleGuide'

export const theme = createTheme(
  {
    //TODO: adicionar paleta de cores, espaçamentos, ...
    typography: {
      allVariants: {
        fontFamily: sg.fontFamily.primary
      },
      h1: { fontSize: sg.heading[1] },
      h2: { fontSize: sg.heading[2] },
      h3: { fontSize: sg.heading[3] },
      h4: { fontSize: sg.heading[4] },
      h5: { fontSize: sg.heading[5] },
      h6: { fontSize: sg.heading[6] }
    },
  },
  ptBR
)
