import React from "react";

// Customizable Area Start
import {
  Dimensions,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  RefreshControl,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FeatherIcon from "react-native-vector-icons/Feather";

// Customizable Area End

import PricingEngineController, {
  Props,
  configJSON,
  IProductItem,
} from "./PricingEngineController";

export default class PricingEngine extends PricingEngineController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

  emptyComponent=()=>
  {
    return(
      <View style={styles.emptyContainer}>
        <Text style={styles.txtEmpty}>{configJSON.emptyText}</Text>
      </View>
    )
  }

  renderItem = (data: {item:IProductItem,index:number}) => (
    <TouchableOpacity
      testID="btn_productSelect"
      style={styles.itemContainer}
      activeOpacity={1}
      onPress={() => {
        this.selectItem(data.item);
      }}
    >
      <Image
        source={{ uri: data.item.product_image }}
        style={styles.product_image}
      />
      <View style={styles.productContainer}>
        <Text style={styles.txt_name}>{data.item.name}</Text>
        <Text style={styles.txt_brandName}>{data.item.brand}</Text>
        <Text style={styles.txt_price}>{data.item.price + " Rs"}</Text>
      </View>
      <View style={{ margin: 5 }}>
        {data.item.isSelected ? (
          <Icon name="checkbox-marked" size={20} />
        ) : (
          <Icon name="checkbox-blank-outline" size={20} />
        )}
      </View>
    </TouchableOpacity>
  );
  // Customizable Area End

  render() {
    // Customizable Area Start
   
    return (
      <View style={styles.container} testID={"view_main"}>
      
          <FlatList
            contentContainerStyle={styles.flatlistContent}
            testID="FlatList"
            data={this.state.productList}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={(!this.state.loading)?this.emptyComponent():null}
            renderItem={(item) => this.renderItem(item)}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
            extraData={this.state}
            refreshControl={
              <RefreshControl
              refreshing={this.state.loading}
              onRefresh={()=>this.getProductList()}
              ></RefreshControl>
            }
          />
        

        <TouchableOpacity
          activeOpacity={0.5}
          testID="btn_AddToCart"
          style={styles.addToCart_btn}
          onPress={() => {
            this.submit(this.state.productCount);
          }}
        >
          <Text style={styles.addToCart_btn_txt}>
            {configJSON.btnAddCartTitle}{" "}
          </Text>
          <View>
            <FeatherIcon name="shopping-cart" size={20} color={"#FFF"} />
            <Text
              style={[
                styles.txt_count,
                this.state.productCount !== 0 ? styles.ovalContainer : {},
              ]}
            >
              {this.state.productCount !== 0 ? this.state.productCount : ""}
            </Text>
          </View>
        </TouchableOpacity>
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
  txt_count: {
    color: "#FFF",
    position: "absolute",
    top: -10,
    right: -8,
    backgroundColor: "red",
  },
  ovalContainer: {
    height: 20,
    width: 20,
    borderRadius: 10,
    textAlign: "center",
  },
  addToCart_btn: {
    backgroundColor: "#272729",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    justifyContent: "center",
    
  },
  addToCart_btn_txt: { color: "#FFF", alignSelf: "center", fontSize: 16 },
  productContainer:{ flex: 1, margin: 6 },
  emptyContainer:
  {
   position:'absolute',
   top:"50%",alignSelf:'center',
   justifyContent:'center',
   alignItems:"center"
  },
  txtEmpty:{fontSize:15},
  flatlistContent:{flexGrow:1}
});
// Customizable Area End
