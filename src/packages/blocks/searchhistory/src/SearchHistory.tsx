//@ts-nocheck
import React from "react";

import {
  Text,
  Image,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Button,
  // Customizable Area Start
  FlatList,
  ActivityIndicator,
  StyleSheet,
  // Customizable Area End
} from "react-native";
import { search } from "./assets";
interface Item {
  item: {
    attributes: {
      id: number;
      link: string;
      name: string;
    };
    id: string;
    type: string;
  };
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

  searchView = () => { 
    return (
      <View style={styles.searchView}>
        <TextInput
          testID="txtInput"
          placeholder={configJSON.textInputPlaceHolder}
          value={this.state.txtInputValue}
          onChangeText={this.onChangeInvoice}
          style={styles.input}
        />
        <Image source={search} style={styles.searchIcon} />
      </View>
    );
  };

  _searchHistory = () => {
    return (
      <View  >
        <Text style={styles.recentSearchText}>{configJSON.recentSearch}</Text>
        {
          this.state.searchHistoryList.map((item, index)=>this.renderItem(item, index))
        }
      </View>
    );
  };

  renderItem = ( item : Item, index) => {
    return (
      <TouchableOpacity key={index} style={styles.renderItem1} testID="searchList">
        <Text style={styles.renderItem1Label}>{item?.attributes?.name}</Text>
        <Text testID="delete" onPress={()=>this.deleteListCall(item.attributes.id)}>{configJSON.delete}</Text>
      </TouchableOpacity>
    );
  };

  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <ScrollView style={styles.container} testID='main_div'>
        <TouchableWithoutFeedback>
          {/* Customizable Area Start */}
          <>
            {this.searchView()}
            <Button
              testID={"searchbtn"} 
              title={configJSON.btnExampleTitle}
              onPress={this.postSearchApi}
            />
            {this.state.loading ? <ActivityIndicator color="red" /> : null}
            {this.state.searchHistoryList?.length > 0 && this._searchHistory()}
          </>
          {/* Customizable Area End */}
        </TouchableWithoutFeedback>
      </ScrollView>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#ffffffff",
  },
  searchView: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginVertical: 10,
    elevation: 5,
    backgroundColor: "white",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 18,
  },
  recentSearchText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
    marginTop: 20,
  },
  renderItem1: {
    height: 30,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    paddingHorizontal: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "gray",
    flexDirection: "row",
  },
  renderItem1Label: {
    fontSize: 12,
    color: "black",
    marginRight: 5,
  },
  image: {
    width: 18,
    height: 18,
  },
  searchIcon: { width: 24, height: 24 },
  flatListStyle: { maxHeight: 70 },
});

// Customizable Area End
