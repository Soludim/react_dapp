import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';


const DownloadModal = (props) => {

  const theme = useTheme();
  const basePrice = 10 ** 10;
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return ( 
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        onClose={props.onModalClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Conform downloading {props.song.Title} by  {props.song.SongArtist}</DialogTitle>
        <DialogContent>
          <DialogContentText>
             Downloading Song will cost you {props.song.Price.toNumber()/basePrice} ether
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onModalClose} color="primary">
            Cancel
          </Button>
          <Button onClick={props.onModalContinue} color="primary" autoFocus>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
   );
}
 
export default DownloadModal;