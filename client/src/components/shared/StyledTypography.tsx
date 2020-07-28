import Typography, {TypographyProps} from '@material-ui/core/Typography'
import styled from 'styled-components'

export const StyledTypography = styled(Typography)`
  && {
    font-size: 20px;
    margin: 20px;
    border-bottom: 1px solid black;
    float: left;
  }
` as React.ComponentType<TypographyProps>
