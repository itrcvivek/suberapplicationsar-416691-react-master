import React from "react";

// Customizable Area Start
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TextInput,
  ScrollView,
  Modal,
} from "react-native";
import Scale from "../../../components/src/Scale";
import moment from "moment";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import RefundManagementController, {
  Props,
  RefundData,
  configJSON,
  ResponseData,
} from "./RefundManagementController";

export default class RefundManagement extends RefundManagementController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start

    // Customizable Area End
  }

  // Customizable Area Start
  renderModal = () => {
    return (
      <View>
        <Modal
          animationType={'fade'}
          transparent={true}
          visible={this.state.acceptButon}
        >
          <View style={styles.submitModal}>
            <View style={styles.submitContainer}>
              <Text style={styles.textInput}>Amount Paid by Customer :- {this.state.amount_paid} /-</Text>
              {this.state.leftamount !== 0 && <Text style={styles.textInput}>Remaining Amount = {this.state.leftamount}/-</Text>}
              <Text style={styles.textInput}>Please Enter Refund Amount</Text>
              <View style={[styles.passwordContainer, { borderColor: this.state.isInvalidAmt ? "#a4653e" : '#20515E', backgroundColor: this.state.isInvalidAmt ? "#f3ebe4" : "#ffffff70", }]}>
                <TextInput
                  testID="txtInput"
                  placeholder="Amount"
                  keyboardType="numeric"
                  style={styles.textInputField}
                  value={this.state.amount}
                  onChangeText={(text) => this.amountSet(text)}
                />
              </View>
              {this.state.isInvalidAmtvalue && <Text style={styles.errorMsg}>You do not enter 0 as refund amount, please enter a valid amount</Text>}
              {this.state.ismsgShow && <Text style={styles.errorMsg}>You do not have enough remaining balance, please enter a valid amount</Text>}
              <Text style={styles.sureTxt}>Are you sure you want to proceed order id {this.state.iditem} for Refund ?</Text>
              <TouchableOpacity testID="btnYes" style={styles.Buttonstyle} onPress={this.refundAPI}>
                <Text style={styles.yesTxt}>YES</Text>
              </TouchableOpacity>
              <TouchableOpacity testID="btnNo" style={styles.Buttonstyle} onPress={this.noSet}>
                <Text style={styles.yesTxt}>NO</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    )
  }

  renderData = () => {
    return (
      <View>
        <Text style={styles.myOrdersTxt}>Refund Management</Text>
        <ScrollView style={styles.flatlistData} horizontal>
          <Text style={styles.flatlistDataTxt1}>Customer name: </Text>
          <Text style={styles.flatlistDataTxt1}>Amount </Text>
          <Text style={styles.flatlistDataTxt1}>Order ID:</Text>
          <Text style={styles.flatlistDataTxt1}>Transaction status:  </Text>
          <Text style={styles.flatlistDataTxt1}>Transaction ID:</Text>
          <Text style={styles.flatlistDataTxt1}>Timestamp</Text>
          <Text style={styles.flatlistDataTxt1}>Refund Status </Text>
          <Text style={styles.flatlistDataTxt1}>Action</Text>
        </ScrollView>
      </View>
    )
  }

  renderLaws = (item: RefundData) => {
    return (
      <View>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.flatlistDataTxt}>{item?.attributes?.customer_name}</Text>
            <Text style={styles.flatlistDataTxt}>{item?.attributes?.amount_paid}</Text>
            <Text style={styles.flatlistDataTxt}>{item?.attributes?.order_id}</Text>
            <Text style={styles.flatlistDataTxt}>{item?.attributes?.transaction_status}</Text>
            <Text style={styles.flatlistDataTxt}>{item?.attributes?.transaction_id}</Text>
            <Text style={styles.flatlistDataTxt}>{moment(item?.attributes?.created_at).format("DD-MM-yyyy")}</Text>
            <Text style={styles.flatlistDataTxt}>{item?.attributes?.orders_status}</Text>
            {item?.attributes?.orders_status === "completed" ? <Text style={styles.flatlistDataTxt}>Full Refund success</Text> :
              <TouchableOpacity testID="refundID" style={styles.submitButton} onPress={() => this.refundSet(item)}>
                <Text style={styles.refund}>Refund</Text>
              </TouchableOpacity>}
          </View>
        </View>
        <View style={styles.lineView} />
      </View>
    )
  }

  renderTable = () => {
    return (
      <ScrollView style={styles.flatliststyle} horizontal={true}>
        <FlatList
          testID="Flatlist_Data"
          data={this.state.data}
          renderItem={({ item }) => this.renderLaws(item)}
        />
      </ScrollView>
    )
  }

  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <View style={styles.container}>
        {this.renderData()}
        <ScrollView keyboardShouldPersistTaps="always">
          {this.renderTable()}
          {this.renderModal()}
        </ScrollView>
      </View>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  title: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
  },
  body: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
  },
  bgPasswordContainer: {
    flexDirection: "row",
    backgroundColor: "#00000000",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    padding: 10,
    // borderWidth: Platform.OS === "web" ? 0 : 1
  },
  bgMobileInput: {
    flex: 1
  },
  showHide: {
    alignSelf: "center"
  },
  // imgShowhide: Platform.OS === "web" ? { height: 30, width: 30 } : {},

  tableView: {
    marginTop: 30,
  },

  flatlistData: {
    marginHorizontal: Scale(15),
    marginTop: Scale(20)
  },

  flatliststyle: {
    marginHorizontal: Scale(15),
    marginTop: Scale(20),
    height: Scale(900)
  },

  flatlistDataTxt: {
    fontSize: Scale(14),
    color: '#20515E',
    textAlign: 'center',
    width: Scale(90)
  },

  flatlistDataTxtt1: {
    fontSize: Scale(14),
    color: '#20515E',
    marginLeft: Scale(20),
  },

  mainStyle: {
    fontSize: Scale(22),
    color: '#20515E',
  },

  flatlistDataTxt1: {
    textDecorationLine: 'underline',
    fontSize: Scale(16),
    color: '#20515E',
    marginLeft: Scale(10)
  },

  flatlistDataTxt3: {
    textDecorationLine: 'underline',
    fontSize: Scale(16),
    color: '#20515E',
  },

  flatlistDataTxt2: {
    fontSize: Scale(14),
    color: "#979797",
    marginTop: Scale(5),
    marginLeft: Scale(5),
  },

  lineView: {
    marginTop: Scale(10),
    height: Scale(0.5),
    width: Scale(700),
    backgroundColor: "#979797",
    bottom: Scale(5),
  },

  submitButton: {
    marginLeft: Scale(20),
    height: Scale(20),
    width: Scale(60),
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Scale(3),
  },

  submitButton1: {
    height: Scale(20),
    width: Scale(60),
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Scale(3),
    marginLeft: Scale(20),
    marginTop: Scale(10)
  },

  refund: {
    color: "#fff"
  },

  submitModal: {
    flex: 1,
    backgroundColor: '#000000aa',
    alignItems: 'center',
    justifyContent: 'center',
  },

  submitContainer: {
    width: Scale(373),
    backgroundColor: "#fff",
    borderWidth: Scale(1),
    borderColor: "#979797",
    borderRadius: Scale(10),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  crossIcon: {
    marginTop: Scale(20),
    height: Scale(24),
    width: Scale(24),
    alignSelf: 'flex-end',
    right: Scale(20),
  },

  nextButton2: {
    height: Scale(48),
    width: Scale(347),
    backgroundColor: "#20515E",
    borderWidth: Scale(1),
    borderRadius: Scale(5),
    alignSelf: 'center',
    marginTop: Scale(30),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: Scale(20),
  },

  nextTxt: {
    color: "#fff",
    fontSize: Scale(18),
    marginLeft: Scale(120),
  },

  nextTxt2: {
    color: "#fff",
    fontSize: Scale(18),
  },

  emailContainer: {
    height: Scale(56),
    width: Scale(347),
    backgroundColor: "#e3e8ed",
    borderWidth: Scale(1),
    borderRadius: Scale(5),
    borderColor: "#c0c9ce",
    alignSelf: 'center',
    marginTop: Scale(10),
    flexDirection: 'row',
    alignItems: 'center',
  },

  textInputField: {
    width: Scale(250),
    marginLeft: Scale(30),
    fontSize: Scale(18),
    color: '#20515E',
  },

  docBox: {
    height: Scale(48),
    width: Scale(164),
    marginLeft: Scale(15),
    marginTop: Scale(5),
    backgroundColor: '#ffffff',
    borderWidth: Scale(1),
    borderColor: '#20515E',
    borderRadius: Scale(5),
    marginHorizontal: Scale(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  docTxt: {
    marginLeft: Scale(20),
    fontSize: Scale(18),
    color: '#20515E',
  },

  docTxt1: {
    marginTop: Scale(10),
    marginLeft: Scale(20),
    fontSize: Scale(18),
    color: '#20515E',
  },

  PlusIcon: {
    height: Scale(26),
    width: Scale(26),
    right: Scale(10),
  },


  myOrdersTxt: {
    marginTop: Scale(40),
    marginLeft: Scale(30),
    fontSize: Scale(20),
    color: '#20515E',
    textDecorationLine: 'underline',
  },

  Buttonstyle: {
    height: Scale(20),
    width: Scale(30),
    backgroundColor: 'blue',
    borderRadius: 3,
    marginTop: Scale(20),
    bottom: Scale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },

  sureTxt: {
    fontSize: Scale(16),
    marginTop: Scale(10),
    textAlign: 'center',
  },

  yesTxt: {
    color: 'white',
  },

  textInput: {
    width: Scale(250),
    fontSize: Scale(18),
    color: '#20515E',
    marginTop: Scale(20),
    right: 30
  },

  passwordContainer: {
    height: Scale(56),
    width: Scale(347),
    backgroundColor: "#e3e8ed",
    borderWidth: Scale(1),
    borderRadius: Scale(5),
    borderColor: "#c0c9ce",
    alignSelf: 'center',
    marginTop: Scale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  errorMsg: {
    marginTop: Scale(5),
    color: "#a3653e",
    fontSize: Scale(16),
    alignSelf: 'center',
    textAlign: 'center'
  },

});
// Customizable Area End
