// Customizable Area Start
import React, {
  Fragment,
} from "react";

import {
  Container,
  Box,
  InputLabel,
  Typography,
  Select,
  MenuItem,
  TextField,
} from "@material-ui/core";

import TaxCalculatorController, {
  ProductTypeObj,
  CountryObj,
  Props,
  configJSON,
} from "./TaxCalculatorController";

export default class TaxCalculator extends TaxCalculatorController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {
      price,
      productName,
      selectedCountry,
      productTypeData,
      selectedProductType,
      productTypeErr,
      countryData,
      countryErr,
      priceErr,
      productNameErr,
      taxDataRes,
    } = this.state;
    // Merge Engine - render - Start

    return (
      <Container maxWidth={"sm"}>
        <Box sx={styles.mainWrapper}>
          <Typography variant="h6">{configJSON.labelTitleText}</Typography>
          <Box sx={styles.formControl}>
            <InputLabel id="demo-simple-select-label">
              {configJSON.country}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              data-test-id="country"
              fullWidth
              placeholder={configJSON.countryPlaceholder}
              value={selectedCountry}
              onChange={(event) => {
                const item = countryData.find(
                  (dItem: CountryObj) => dItem.id == event.target.value
                );
                if (item) {
                  this.onchangeCountry(item.name, countryData);
                }
              }}
            >
              {countryData.map((item: CountryObj) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
            {countryErr && <Box sx={styles.errorTxt}>{countryErr}</Box>}
          </Box>
          <Box sx={styles.formControl}>
            <TextField
              id="standard-basic"
              data-test-id="price"
              fullWidth
              type="number"
              label={configJSON.price}
              placeholder={configJSON.pricePlaceholder}
              value={price}
              onChange={(event) => this.onChangePrice(event.target.value)}
            />
            {priceErr && <Box style={styles.errorTxt}>{priceErr}</Box>}
          </Box>
          <Box sx={styles.formControl}>
            <InputLabel id="demo-simple-select-label">
              {configJSON.productType}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              data-test-id="productType"
              fullWidth
              placeholder={configJSON.productTypePlaceholder}
              value={selectedProductType}
              onChange={(event) => {
                const item = productTypeData.find(
                  (dItem: ProductTypeObj) =>
                    dItem.attributes.id == event.target.value
                );
                if (item && item.attributes.name) {
                  this.onchangePType(item.attributes.name, productTypeData);
                }
              }}
            >
              {productTypeData.map((item: ProductTypeObj) => (
                <MenuItem key={item.attributes.id} value={item.attributes.id}>
                  {item.attributes.name}
                </MenuItem>
              ))}
            </Select>
            {productTypeErr && <Box sx={styles.errorTxt}>{productTypeErr}</Box>}
          </Box>
          <Box sx={styles.formControl}>
            <TextField
              id="standard-basic"
              data-test-id="productName"
              fullWidth
              label={configJSON.productName}
              placeholder={configJSON.productNamePlaceholder}
              value={productName}
              onChange={(event) => this.onChangeProductName(event.target.value)}
              onBlur={() => this.checkvalues()}
            />
            {productNameErr && <Box sx={styles.errorTxt}>{productNameErr}</Box>}
          </Box>
          {taxDataRes.price ? (
            <Fragment>
              <Box sx={styles.formControl}>
                <Box sx={styles.font18}>{`Price: ${price}`}</Box>
              </Box>
              <Box sx={styles.formControl}>
                <Box sx={styles.font18}>{`Tax: ${
                  taxDataRes.price - Number(this.state.price)
                }`}</Box>
              </Box>
              <Box sx={styles.formControl}>
                <Box
                  sx={styles.font18}
                >{`Total cost: ${taxDataRes.price}`}</Box>
              </Box>
            </Fragment>
          ) : (
            <h6>{this.state.errorMessage}</h6>
          )}
        </Box>
      </Container>
      // Merge Engine - render - End
    );
  }
}

const styles = {
  mainWrapper: {
    display: "flex",
    fontFamily: "Roboto-Medium",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "30px",
    background: "#fff",
  },
  font18: {
    fontSize: 18,
  },
  formControl: {
    margin: "10px",
    minWidth: "100%",
  },
  errorTxt: {
    color: "red",
    fontSize: 12,
  },
};

// Customizable Area End
