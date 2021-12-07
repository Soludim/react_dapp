import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const Event1 = "SongAdded";

const TransactionComponent = ({ event, user }) => {

   if (!event) return null;
   if (!event.address) return null;
   return (
      (event.event === Event1 && event.returnValues.songowner === user) || (event.event !== Event1 && event.returnValues.buyer === user) ? 
         (
            <div className="list-group-item">
            <div className="row">
               <div className="col-6">
                  <h5 className="float-left">TX HASH</h5>
               </div>
               <div className="col-6">
                  {event.event === Event1 ? 
                  (<h6><span className="float-right badge badge-primary badge-pill">Song Added</span></h6>)
                   :
                  (<h6><span className="float-right badge badge-secondary badge-pill">Song Downloaded</span></h6>)}
               </div>
            </div>
   
            <div className="row">
               <div className="col-12">
                  <p style={{fontSize: '12px', fontWeight: 'bold'}} className="float-left">{event.transactionHash}</p>
               </div>
            </div>
   
            <div className="row">
               <div className="col-6">
                  <h6 className="float-left">From Address</h6>
               </div>
               <div className="col-6">
                  <h6 className="float-right">To Address</h6>
               </div>
            </div>
   
            <div className="row">
               <div className="col-6">
                  {event.event === Event1 ? 
                  (<p style={{fontSize: '9px'}} className="float-left">{event.returnValues.songowner}</p>) :
                  (<p style={{fontSize: '9px'}} className="float-left">{event.returnValues.buyer}</p>)}
                 
               </div>
               <div className="col-6">
                  <p style={{fontSize: '9px'}} className="float-right">{event.address}</p>
               </div>
            </div>
   
            <div className="row">
               {event.event === Event1 ? (
                   <div className="col-6">
                   <h6 className="float-left">Song: </h6>
                   <p  className="float-left" style={{fontSize: '13px'}}>{event.returnValues.song.Title } by {event.returnValues.song.SongArtist}</p>
             </div>
               ) : (
                  <DropdownButton title="Song Details" size="sm" variant="outline-info">
                     <Dropdown.Item eventKey="1">Owner: {event.returnValues.owner}</Dropdown.Item>
                     <Dropdown.Item eventKey="2">Title: {event.returnValues.song.Title} by {event.returnValues.song.SongArtist}</Dropdown.Item>
                     <Dropdown.Item eventKey="3">Price: {event.returnValues.song.Price.toNumber() / 10**10} ether</Dropdown.Item>
                  </DropdownButton>    
               )}
              
               <div className="col-6">
                  {event.event  === Event1 ? 
                  (<div>
                     <small className="float-right">{event.returnValues.song.Date}</small>
                     <small className="float-right">Date Uploaded:</small>
                  </div>) :
                  (<div>
                     <small className="float-right">{event.returnValues.dateDownloaded}</small>
                     <small className="float-right">Date Downloaded:</small>
                  </div>)}
               </div>
            </div>
         </div>
         ) : null
     
   );
}

export default TransactionComponent;