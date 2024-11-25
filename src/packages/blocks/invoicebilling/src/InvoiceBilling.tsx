//@ts-nocheck

import React from "react";
// Customizable Area Start
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  StatusBar,
  Button,
  ActivityIndicator,
} from "react-native";
// Customizable Area End

import InvoiceBillingController, {
  Props,
  configJSON,
} from "./InvoiceBillingController";

export default class InvoiceBilling extends InvoiceBillingController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container} testID='main_view'>
        <StatusBar />
        <View style={styles.container}>
          <Text style={styles.label}>{configJSON.enterInvoice}</Text>
          <TextInput
            value={this.state.invoice}
            onChangeText={this.onChangeInvoice}
            placeholder={configJSON.invoiceNumber}
            placeholderTextColor={"gray"}
            maxLength={6}
            keyboardType={configJSON.keyboardType}
            editable={true}
            secureTextEntry={false}
            style={styles.input}
            autoCapitalize="none"
            testID="txtInput"
          />
          <Text style={styles.errorText}>{this.state.invoiceError}</Text>
        </View>
        <Button title={configJSON.btnExampleTitle} onPress={this.getPdfLink}  testID="btnExample"/>
        {this.state.loading&&<ActivityIndicator size={'large'} color='blue'/>}
      </ScrollView>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    flex: 1,
    paddingHorizontal:5
  },
  input: {
    width: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
    color: "black",
    borderRadius: 7,
    fontSize: 16,
    marginTop: 10,
    height:60
  },
  label: {
    marginBottom: 5,
    fontSize: 18,
    color: "black",
    fontWeight: "500",
  },
  errorText: {
    marginVertical: 5,
    color: "red",
    fontSize: 13,
  },
});


// Customizable Area End
