import React from "react";

import {
  Input,
  Button,
  InputLabel,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  // Customizable Area Start
  // Customizable Area End
} from "@material-ui/core";

// Customizable Area Start
import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
      contrastText: "#fff",
    },
  },
  typography: {
    h6: {
      fontWeight: 500,
    },
    subtitle1: {
      margin: "20px 0px",
    },
  },
});
// Customizable Area End

import RefundManagementController, {
  Props,
} from "./RefundManagementController.web";

export default class RefundManagement extends RefundManagementController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      // <ThemeProvider theme={theme}>
      <>
        <Modal
          data-testId="modalForRefund"
          open={this.state.acceptButon}
          // onClose={this.onClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <div style={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            height: 320,
            backgroundColor: "white",
            border: '1px solid #000',
            textAlign: 'center'
          }}>
            <br />
            <Typography>Amount paid by Customer {this.state.item.attributes?.amount_paid}/-</Typography>
            <br />
            {this.state.leftamount !== 0 ? <Typography data-testId="remainingAmount">Remaining Amount = {this.state.leftamount}/-</Typography> : null}
            <br />
            <InputLabel>Please Enter Refund Amount</InputLabel><Input data-testId="txtInput" type="text" value={this.state.amount} onChange={this.inputOnChange} />
            <br />
            {this.state.ismsgShow && <InputLabel style={{ fontSize: "12px", color: "red" }}>You do not have enough remaining balance, please enter a valid amount</InputLabel>}
            {this.state.isValue && <InputLabel style={{ fontSize: "12px", color: "red" }}>Please do not enter 0 as refund amount, Please enter a valid refund amount</InputLabel>}
            {this.state.isInvalidAmt && <InputLabel style={{ fontSize: "12px", color: "red" }}>Please enter a refund amount</InputLabel>}
            <Typography>Are You Sure You Want To Proceed Order Id {this.state.item.attributes?.order_id} For Refund ?</Typography>
            <Button data-testId="btnYes" style={{ backgroundColor: "green" }} onClick={() => { this.refundAPI(this.state.item) }}>Yes</Button>
            <br />
            <br />
            <Button data-testId="btnNo" style={{ backgroundColor: "red" }} onClick={() => this.onClose()}>No</Button>
            <br />
          </div>
        </Modal >
        <TableContainer style={{ overflow: "scroll" }} component={Paper}>
          <Table data-testId="mainTable" style={{ width: "100vw", height: "100vh" }}>
            <TableHead>
              <TableRow>
                <TableCell>Customer Name</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Order ID</TableCell>
                <TableCell align="right">Transaction Status</TableCell>
                <TableCell align="right">Transaction ID</TableCell>
                <TableCell align="right">TimeStamp</TableCell>
                <TableCell align="right">Refund Status</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody data-testId="tableBody">
              {(this.state.data || []).map((data, index) => (
                <TableRow data-testId="rowTable" key={index}>
                  <TableCell scope="row">
                    {data.attributes.customer_name}
                  </TableCell>
                  <TableCell align="right">{data.attributes.amount_paid}</TableCell>
                  <TableCell align="right">{data.attributes.order_id}</TableCell>
                  <TableCell align="right">{data.attributes.transaction_status}</TableCell>
                  <TableCell align="right">{data.attributes.transaction_id}</TableCell>
                  <TableCell align="right">{data.attributes.created_at}</TableCell>
                  <TableCell align="right">{data.attributes.orders_status}</TableCell>
                  {data.attributes.orders_status === "completed" ? <TableCell data-testId="RefundSuccess" align="right">Full Refund success</TableCell> :
                    <TableCell data-testId={`tableCell${index}`} align="right"><Button data-testId={`buttonRefund${index}`} onClick={() => this.buttonOnClick(data)} style={{ backgroundColor: '#31bd31' }}>Refund</Button></TableCell>}

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
      // </ThemeProvider>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const webStyle = {
  mainWrapper: {
    display: "flex",
    fontFamily: "Roboto-Medium",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "30px",
    background: "#fff",
  },
  inputStyle: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.6)",
    width: "100%",
    height: "100px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  buttonStyle: {
    width: "100%",
    height: "45px",
    marginTop: "40px",
    border: "none",
    backgroundColor: "rgb(98, 0, 238)",
  },
};
// Customizable Area End
