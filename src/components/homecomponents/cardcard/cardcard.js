import React from "react";
import '../card.css';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { AccordionActions } from "@mui/material";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button } from '@mui/material';
import DeleteIcon from '@material-ui/icons/Delete';
import { getDatabase , ref, child,remove} from "firebase/database";
import {Link} from 'react-router-dom';
const Cardcard =({title,cardname,cardnum,cvv,expiry,user})=>
{const db = getDatabase();
  const rf= ref(db,`users/${user.uid}/card/${title}`);
    return(   
     <Accordion className="card">
         <AccordionSummary  
          expandIcon={<ExpandMoreIcon style={{ fill: '#0072ea' }} />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <Typography><h3 className="card__title">{title}</h3></Typography>
        </AccordionSummary>
        <AccordionDetails className="card__body">
          <Typography>
                    <p className="card__description">{"Card Holder name: "+cardname}</p>
                    <p className="card__description">{"Card Number : "+cardnum}</p>
                    <p className="card__description">{"CVV: "+cvv}</p>
                    <p className="card__description">{"Expiry Date: "+expiry}</p>
                    

          </Typography>
        </AccordionDetails>
        <AccordionActions>
          <Link className="Link" to={{pathname:"/home/cards"}}>
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
export default  Cardcard;