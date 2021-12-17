import React from "react";
import '../card.css';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { AccordionActions } from "@mui/material";
import { Button } from '@mui/material';
import DeleteIcon from '@material-ui/icons/Delete';
import { getDatabase , ref, child,remove} from "firebase/database";
import {Link} from 'react-router-dom';
const Textcard =(props)=>
{const db = getDatabase();
  const rf= ref(db,`users/${props.user.uid}/text/${props.hint}`);
    return(   
     <Accordion className="card">
         <AccordionSummary  
          expandIcon={<ExpandMoreIcon style={{ fill: '#0072ea' }} />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <Typography><h3 className="card__title">{props.hint}</h3></Typography>
        </AccordionSummary>
        <AccordionDetails className="card__body">
          <Typography>
                    <p className="card__description">{"Text: "+props.text}</p>
          </Typography>
        </AccordionDetails>
        <AccordionActions>
          <Link className="Link" to={{pathname:"/home/text"}}>
            <Button style={{maxWidth: '400px', maxHeight: '50px', minWidth: '400px', minHeight: '50px'}} 
            variant="outlined" startIcon={<DeleteIcon />} 
            onClick={() => {
            remove(rf);            
            }}>Delete(decryption required)
            </Button>
            </Link>
        </AccordionActions>
    </Accordion>
);

};
export default  Textcard;