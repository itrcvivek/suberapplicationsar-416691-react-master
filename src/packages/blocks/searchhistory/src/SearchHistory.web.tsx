//@ts-nocheck
import React from "react";

// Customizable Area Start
import { Box, TextField, Typography, Button, CircularProgress } from "@material-ui/core";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
// Customizable Area End
interface Item {
    attributes: {
      id: number;
      link: string;
      name: string;
    };
    id: string;
    type: string; 
}

import SearchHistoryController, {
  Props,
  configJSON,
} from "./SearchHistoryController";
export default class SearchHistory extends SearchHistoryController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start


  _searchHistory = () => {
    return (
      <>
      <Box>
      <Typography variant="h6">{configJSON.recentSearch}</Typography>
      {this.state.searchHistoryList.map((item:Item,index:number)=>{           
              return(
                <Box  
                key={index}
                id="searchList"
                display="flex"
                flexWrap="wrap"
                justifyContent="space-between"
                alignItems="center">
                  <Typography variant="h6">{item.attributes.name}</Typography>
                  <Button id="btnDelete" onClick={()=>this.deleteListCall(item.attributes.id)}><DeleteOutlineIcon/></Button>
               </Box>
              )
      })}
      </Box>
      </>
    );
  };

  // Customizable Area End

  render() {  
    return (
      // Customizable Area Start

      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        id="main_div"
      >
        <Box>
          <form noValidate autoComplete="off" style={{marginTop:'15px'}}>
            <TextField
              id="textInput"
              placeholder={configJSON.textInputPlaceHolder}
              variant="outlined"
              value={this.state.txtInputValue}
              onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{this.onChangeInvoice(event.target.value)}}
              style={{width:'500px'}}
            />
            <Button id='btnExample' variant="contained" color="primary" onClick={this.postSearchApi} style={{marginTop:'15px', display:'block'}}>
            {configJSON.btnExampleTitle}
            </Button>
          </form>
          {this.state.loading ? <CircularProgress /> :this.state.searchHistoryList?.length > 0 && this._searchHistory()
        }
        
        </Box>
      </Box>

      // Customizable Area End
    );
  }
}

// Customizable Area Start
// Customizable Area End
