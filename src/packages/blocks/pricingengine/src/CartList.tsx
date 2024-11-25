import React from "react";

// Customizable Area Start
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Platform,
  Image,
} from "react-native";
// Customizable Area End

import CartListController, { ICartItem, Props } from "./CartListController";

export default class CartList extends CartListController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
   
    // Customizable Area End
  }

  // Customizable Area Start
  renderItem = (data: {item:ICartItem,index:number}) => (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: data.item.product_image }}
        style={styles.product_image}
      />
      <View style={styles.cartContainer}>
        <Text style={styles.txt_name}>{data.item.name}</Text>
        <Text style={styles.txt_brandName}>{data.item.brand}</Text>
        <Text style={styles.txt_price}>{data.item.price + " Rs"}</Text>
      </View>
    </View>
  );
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <View style={styles.container}>
        <FlatList
          testID="FlatList"
          data={this.state.cartList}
          showsVerticalScrollIndicator={false}
          renderItem={(item) => this.renderItem(item)}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          extraData={this.state}
        />

      </View>
    );
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
    backgroundColor: "#ffffffff",
  },
  title: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
  },
  body: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
  },
  bgPasswordContainer: {
    flexDirection: "row",
    backgroundColor: "#00000000",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    padding: 10,
    borderWidth: 1,
  },
  bgMobileInput: {
    flex: 1,
  },
  showHide: {
    alignSelf: "center",
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
  },
  itemSeparator: {
    height: 10,
  },
  product_image: { width: 100, height: 80, margin: 6, borderRadius: 5 },
  txt_name: {
    fontSize: 14,
    fontWeight: "700",
  },
  txt_brandName: {
    color: "#808080",
    fontSize: 12,
  },
  txt_price: {
    color: "#4CBB17",
    marginTop: 10,
    fontSize: 12,
  },
  cartContainer:{ flex: 1, margin: 6 }
});
// Customizable Area End