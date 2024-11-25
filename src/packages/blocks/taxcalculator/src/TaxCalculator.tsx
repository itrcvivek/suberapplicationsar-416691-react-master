// Customizable Area Start
import React from "react";

import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";

import { Dropdown } from "react-native-material-dropdown";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End

import TaxCalculatorController, {
  Props,
  configJSON,
  CountryObj,
  ProductTypeObj,
} from "./TaxCalculatorController";

export default class TaxCalculator extends TaxCalculatorController {
  constructor(props: Props) {
    super(props);
    Dimensions.addEventListener("change", (event) => {
      MergeEngineUtilities.init(
        artBoardHeightOrg,
        artBoardWidthOrg,
        Dimensions.get("window").height,
        Dimensions.get("window").width
      );
    });
  }

  renderBase = () => {
    const { selectedProductType } = this.state;
    return (
      <View style={styles.bgPasswordContainer}>
        <Text>
          {selectedProductType?.attributes?.name ??
            configJSON.productTypePlaceholder}
        </Text>
      </View>
    );
  };

  renderBaseCountry = () => {
    const { selectedCountry } = this.state;
    return (
      <View style={styles.bgPasswordContainer}>
        <Text>{selectedCountry?.name ?? configJSON.countryPlaceholder}</Text>
      </View>
    );
  };

  render() {
    const {
      productTypeData,
      productTypeErr,
      countryData,
      countryErr,
      priceErr,
      productNameErr,
      taxDataRes,
    } = this.state;
    // Merge Engine - render - Start
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <TouchableWithoutFeedback
          testID="hideKeyboard"
          onPress={() => {
            this.hideKeyboard();
          }}
        >
          <View>
            <View>
              <Text style={styles.labelStyle}>{configJSON.country}</Text>
              <Dropdown
                testID="country"
                data={countryData}
                valueExtractor={(item: CountryObj) => item?.name}
                containerStyle={styles.dropDownStyle}
                pickerStyle={styles.pickerStyle}
                dropdownPosition={0}
                itemCount={10}
                renderBase={() => this.renderBaseCountry()}
                onChangeText={(
                  value: string,
                  index: number,
                  data: CountryObj[]
                ) => this.onchangeCountry(value, data)}
              />
              {countryErr ? (
                <Text style={styles.errorTxt}>{countryErr}</Text>
              ) : null}
            </View>

            <View style={styles.bottomSpacing}>
              <Text style={styles.labelStyle}>{configJSON.price}</Text>
              <TextInput
                testID="price"
                style={styles.bgPasswordContainer}
                placeholder={configJSON.pricePlaceholder}
                onChangeText={(text) => this.onChangePrice(text)}
              />
              {priceErr ? (
                <Text style={styles.errorTxt}>{priceErr}</Text>
              ) : null}
            </View>

            <View>
              <Text style={styles.labelStyle}>{configJSON.productType}</Text>
              <Dropdown
                testID="productType"
                data={productTypeData}
                valueExtractor={(item: ProductTypeObj) =>
                  item?.attributes?.name
                }
                containerStyle={styles.dropDownStyle}
                pickerStyle={styles.pickerStyle}
                dropdownPosition={0}
                itemCount={10}
                renderBase={() => this.renderBase()}
                onChangeText={(
                  value: string,
                  index: number,
                  data: ProductTypeObj[]
                ) => this.onchangePType(value, data)}
              />
              {productTypeErr ? (
                <Text style={styles.errorTxt}>{productTypeErr}</Text>
              ) : null}
            </View>

            <View style={styles.bottomSpacing}>
              <Text style={styles.labelStyle}>{configJSON.productName}</Text>
              <TextInput
                testID="productName"
                style={styles.bgPasswordContainer}
                placeholder={configJSON.productNamePlaceholder}
                onChangeText={(text) => this.onChangeProductName(text)}
                onBlur={() => this.checkvalues()}
              />
              {productNameErr ? (
                <Text style={styles.errorTxt}>{productNameErr}</Text>
              ) : null}
            </View>

            {taxDataRes?.price ? (
              <>
                <View style={styles.priceView}>
                  <Text
                    style={styles.font18}
                  >{`Price: ${this.state.price}`}</Text>
                </View>
                <View style={styles.priceView}>
                  <Text style={styles.font18}>{`Tax: ${
                    this.state.taxDataRes?.price - Number(this.state.price)
                  }`}</Text>
                </View>
                <View style={styles.priceView}>
                  <Text
                    style={styles.font18}
                  >{`Total cost: ${this.state.taxDataRes?.price}`}</Text>
                </View>
              </>
            ) : null}

            {/* <Button
              testID={"btnExample"}
              title={configJSON.btnExampleTitle}
              {...this.btnExampleProps}
            /> */}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    );
    // Merge Engine - render - End
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
  bgPasswordContainer: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    fontSize: 16,
  },
  errorTxt: {
    color: "red",
    fontSize: 12,
  },
  bottomSpacing: {
    marginBottom: 10,
  },
  labelStyle: {
    color: "#186cf2",
    fontSize: 14,
  },
  dropDownStyle: {
    marginBottom: 10,
  },
  pickerStyle: {
    width: "91%",
    marginLeft: 10,
    elevation: 5,
  },
  priceView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  font18: { fontSize: 18 },
});

// Customizable Area End
