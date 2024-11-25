import React from "react";

// Customizable Area Start
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Platform,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ImageSourcePropType
} from "react-native";


// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
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
  renderdata = ({ item, index }: { item: { id: number, productName: string, quantity: number, Price: number, mainPrice: number, Image: ImageSourcePropType | string }, index: number }) => {
    return (
      <View style={styles.renderData}>
        <Image source={item.Image as ImageSourcePropType} style={styles.imageStyle} />
        <View>
          <Text style={styles.productTitle}>{item.productName}</Text>
          <View style={styles.productDetail}>
            <Text style={styles.price1Style}>{configJSON.dollar}{item.Price}</Text>
          </View>
          <View style={styles.quantityView}>
            <TouchableOpacity
              testID="minusIcon"
              disabled={item.quantity <= 1}
              onPress={() => this.decreaseQuantity(item.id)}>
              <Text style={styles.plusIcon}>{configJSON.minusIcon}</Text>
            </TouchableOpacity>

            <Text testID="quantityText" style={styles.plusIcon}>{item.quantity}</Text>
            <TouchableOpacity testID="plusIcon" onPress={() => this.increaseQuantity(item.id)}>
              <Text style={styles.plusIcon}>{configJSON.plusIcon}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <TouchableWithoutFeedback
        >
          <View>
            {this.isPlatformWeb() ? (
              <Text
                testID="labelTitle" //Merge Engine::From BDS
                style={styles.title} //UI Engine::From Sketch
              >
                {configJSON.labelTitleText}
              </Text> //UI Engine::From Sketch
            ) : null}
            <View style={styles.cartHeading}>
              <Text
                testID="labelBody" //Merge Engine::From BDS
                style={styles.body} //UI Engine::From Sketch
              >
                {" "}
                {/* UI Engine::From Sketch */}
                {configJSON.labelBodyText} {/* UI Engine::From Sketch */}
              </Text>
            </View>
            < FlatList
              testID="flatlist1"
              data={this.state.productList}
              renderItem={this.renderdata}
              keyExtractor={this._keyExtractor}
            />
            <View style={styles.cart}
            >
              <Text style={styles.priceText}>{configJSON.priceDetailsText}</Text>
              <View style={[styles.priceDetailsCart, styles.priceCart]}>
                <Text>{configJSON.priceText} ({this.state.productList.length} {configJSON.items})</Text>
                <Text >{configJSON.dollar}{this.totalPrice()}</Text>
              </View>
              <View style={styles.priceDetailsCart}>
                <Text>{configJSON.discountText}({this.state.discount}{this.state.DiscountCostType == 'percent' ? configJSON.percent : configJSON.dollar})</Text>
                <Text style={{ color: 'green' }} >{configJSON.minusIcon} {configJSON.dollar}{this.discountPrice()}</Text>
              </View>
              <View style={styles.priceDetailsCart}>
                <Text>{configJSON.taxesText}({this.state.taxes}{this.state.TaxCostType == 'percent' ? configJSON.percent : configJSON.dollar})</Text>
                <Text >{configJSON.dollar}{this.taxPrice()}</Text>
              </View>
              <View style={styles.priceDetailsCart}>
                <Text>{configJSON.shippingCostText}({this.state.shippingCost}{this.state.ShippingCostType == 'percent' ? configJSON.percent : configJSON.dollar})</Text>
                <Text >{configJSON.dollar}{this.ShippingCost()}</Text>
              </View>
              <View style={styles.priceDetailsCart}>
                <Text style={styles.total}>{configJSON.totalAmountText}</Text>
                <Text style={styles.total} >{configJSON.dollar}{this.totalAmount()}</Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: 'grey'
  },
  title: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: Scale(8),
  },
  body: {
    marginBottom: 32,
    fontSize: 20,
    textAlign: "left",
    marginVertical: 8,
    color: 'black'
  },
  cartHeading: {
    flexDirection: 'row',
    borderRadius: 10,
    width: '100%',
    elevation: 4,
    backgroundColor: "white",

  },
  renderData: {
    flexDirection: 'row',
    marginTop: Scale(10),
    height: Scale(150),
    borderRadius: 10,
    padding: Scale(10),
    alignSelf: "center",
    width: '100%',
    elevation: 4,
    backgroundColor: "white",

  },

  cart: {
    marginTop: Scale(10),
    marginBottom: Scale(20),
    height: Scale(200),
    borderRadius: Scale(10),
    padding: Scale(10),
    alignSelf: "center",
    width: '100%',
    elevation: 4,
    backgroundColor: "white",
  },
  imageStyle: {
    height: 100,
    width: 100,
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
  priceDetailsCart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Scale(5)
  },
  priceCart:{ marginTop: Scale(10) },
  priceText:{ fontSize: 18, color: 'black' },
  total: {
    fontWeight: 'bold',
    color: 'black'
  },
  quantityView: {
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 10,
    justifyContent: 'space-around'
  },
  plusIcon: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
    borderWidth: 0.5,
    paddingHorizontal: 10
  }
});
// Customizable Area End
