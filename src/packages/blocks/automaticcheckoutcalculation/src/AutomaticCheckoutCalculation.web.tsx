import React from "react";

import {
  Container,
  Box,
  Button,
  Typography,

  // Customizable Area Start
  // Customizable Area End
} from "@material-ui/core";

// Customizable Area Start
import { createTheme, ThemeProvider } from "@material-ui/core/styles";


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

import AutomaticCheckoutCalculationController, {
  Props,
  configJSON,
} from "./AutomaticCheckoutCalculationController";
import Scale from "../../../components/src/Scale";

export default class AutomaticCheckoutCalculation extends AutomaticCheckoutCalculationController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderdata = (data: { id: number, productName: string, quantity: number, Price: number, mainPrice: number, Image: string }, index: number) => {
    return (
      <Box sx={webStyle.renderData}>
        <Box sx={webStyle.imageStyle} >
          <img src={data.Image} />
        </Box>
        <Box sx={{ marginLeft: 30 }}>
          <Typography style={webStyle.productTitle}>{data.productName}</Typography>
          <Box sx={webStyle.productDetail}>
            <Typography style={{
              paddingBottom: 5,
              paddingLeft: 10,
              fontWeight: "bold",
              color: "black"
            }}>{configJSON.dollar}{data.Price}</Typography>
          </Box>
          <Box sx={webStyle.quantityView}>
            <Button data-testid={`minusIcon-${index}`} disabled={data.quantity <= 1} onClick={() => this.decreaseQuantity(index)} style={{
              fontWeight: 'bold',
              fontSize: 18,
              color: 'black',
            }}>
              {configJSON.minusIcon}
            </Button>

            <Typography style={{
              fontWeight: 'bold',
              fontSize: 18,
              color: 'black',
            }}>{data.quantity}</Typography>
            <Button data-testid={`plusIcon-${index}`} onClick={() => this.increaseQuantity(index)} style={{
              fontWeight: 'bold',
              fontSize: 18,
              color: 'black',
            }}>
              {configJSON.plusIcon}
            </Button>
          </Box>
        </Box>
      </Box>
    )
  }
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <ThemeProvider theme={theme}>
        <Container maxWidth={"md"}>
          <Box sx={webStyle.mainWrapper}>
            <Typography variant="h4">{configJSON.labelTitleText}</Typography>
          </Box>
          {this.state.productList.map((data, index) => {
            return this.renderdata(data, index);
          })}

          <Box style={webStyle.cart}
          >
            <Typography style={{ fontSize: 22, color: 'black' }}>{configJSON.priceDetailsText}</Typography>
            <Box sx={webStyle.priceDetailsCart}>
              <Typography>{configJSON.priceText} ({this.state.productList.length} {configJSON.items})</Typography>
              <Typography >{configJSON.dollar}{this.totalPrice()}</Typography>
            </Box>
            <Box sx={webStyle.priceDetailsCart}>
              <Typography>{configJSON.discountText}({this.state.discount}{this.state.DiscountCostType == 'percent' ? configJSON.percent : configJSON.dollar})</Typography>
              <Typography style={{ color: 'green' }} >{configJSON.minusIcon} {configJSON.dollar}{this.discountPrice()}</Typography>
            </Box>
            <Box sx={webStyle.priceDetailsCart}>
              <Typography>{configJSON.taxesText}({this.state.taxes}{this.state.TaxCostType == 'percent' ? configJSON.percent : configJSON.dollar})</Typography>
              <Typography >{configJSON.dollar}{this.taxPrice()}</Typography>
            </Box>
            <Box sx={webStyle.priceDetailsCart}>
              <Typography>{configJSON.shippingCostText}({this.state.shippingCost}{this.state.ShippingCostType == 'percent' ? configJSON.percent : configJSON.dollar})</Typography>
              <Typography >{configJSON.dollar}{this.ShippingCost()}</Typography>
            </Box>
            <Box sx={webStyle.priceDetailsCart}>
              <Typography style={{
                fontWeight: 'bold',
                color: 'black'
              }}>{configJSON.totalAmountText}</Typography>
              <Typography style={{
                fontWeight: 'bold',
                color: 'black'
              }}>{configJSON.dollar}{this.totalAmount()}</Typography>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
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
    borderRadius: 10,
    paddingBottom: "30px",
    background: "#fff",
  },
  cart: {
    marginTop: Scale(10),
    marginBottom: Scale(20),
    borderRadius: 10,
    padding: Scale(10),
    alignSelf: "center",
    elevation: 4,
    backgroundColor: "white",
  },
  priceDetailsCart: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Scale(5)
  },
  total: {
    fontWeight: 'bold',
    color: 'black'
  },
  renderData: {
    display: "flex",
    flexDirection: 'row',
    marginTop: Scale(10),
    borderRadius: 10,
    padding: Scale(10),
    alignSelf: "center",
    elevation: 4,
    backgroundColor: "white",

  },
  imageStyle: {
    borderRadius: 10,
    marginTop: 10
  },
  productTitle: {
    marginLeft: 20,
    marginTop: 10,
    color: 'black',
    fontSize: 16
  },
  productDetail: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 20,
    marginTop: 10
  },
  priceStyle: {
    paddingBottom: 5,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: "grey"
  },
  price1Style: {
    paddingBottom: 5,
    paddingLeft: 10,
    fontWeight: "bold",
    color: "black"
  },
  quantityView: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 10,
    justifyContent: 'space-around'
  },
  plusIcon: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
    borderWidth: 1,
    paddingHorizontal: 10,
  }
};
// Customizable Area End
