/* eslint-disable */
import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface TaskInfos {
  description: string;
  created_at: Date | string;
  status: string;
  responsible: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%', 
      marginLeft: 'auto', 
      marginRight: 'auto',
      position: 'relative', 
      top: '200px',
      //backgroundColor: 'red', 
      padding: '5px'
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '25%',
      flexShrink: 0,
    },
    primaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
      position: 'relative', 
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
      position: 'relative', 
      marginLeft: '50px'
    },
  }),
);

const ControlledAccordions: React.FC<TaskInfos> = ({created_at, description, status, responsible}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.primaryHeading}><b style={{color: '#000000'}}>Criada em: </b>{created_at.toLocaleString('pt-br')}</Typography>
          <Typography className={classes.secondaryHeading}><b style={{color: '#000000'}}>Descrição: </b>{description}</Typography>
          <Typography className={classes.secondaryHeading}><b style={{color: '#000000'}}>Status: </b>{status}</Typography>
          <Typography className={classes.secondaryHeading}><b style={{color: '#000000'}}>Responsável: </b>{responsible}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
            maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default ControlledAccordions;