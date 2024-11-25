// Customizable Area Start
import React from "react";

import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  FlatList,
} from "react-native";
import { notification } from "./assets";
import { PostItem } from "./PostItem";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start

// Merge Engine - Artboard Dimension  - End

import RealtimeUpdatesController, { Props } from "./RealtimeUpdatesController";

export default class RealtimeUpdates extends RealtimeUpdatesController {
  constructor(props: Props) {
    super(props);

  }


  render() {
    // Merge Engine - render - Start
    return (
      <View style={{ flex: 1, paddingBottom: 30 }}>
        <Button
          testID={"createPostButton"} //Merge Engine::From BDS
          title={"Create post"} //UI Engine::From Sketch
          onPress={() => this.setModalVisibility(true)}
        />

        <FlatList
          scrollEnabled={true}
          testID='flatlist'
          data={this.state.postsData}
          ListEmptyComponent={() => {
            return (
              <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>No posts found</Text>
              </View>
            );
          }}
          renderItem={({ item }) => {
            return (
              <PostItem
                getSinglePostComments={this.getSinglePostComments}
                item={item}
                addComment={this.addComment}
                likePost={this.likePostApiCall}
              />
            );
          }}
        />

        <Modal transparent visible={this.state.modalVisible} animationType={"slide"}>
          <View
            style={{
              flex: 1,
              backgroundColor: "#00000080",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: "90%",
                alignSelf: "center",
                backgroundColor: "white",
                borderRadius: 20,
                alignItems: "center",
                padding: 20,
              }}
            >
              <TouchableOpacity
                testID={"closeModalButton"}
                onPress={() => this.setModalVisibility(false)}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  height: 25,
                  width: 25,
                  position: "absolute",
                  right: 10,
                  top: 10,
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>X</Text>
              </TouchableOpacity>

              <Text style={{ fontSize: 20, fontWeight: "700" }}>Want to create a post?</Text>

              <TextInput
                value={this.state.postTextValue}
                testID='txtInput'
                multiline
                style={[styles.mobileInput, { width: "90%" }]}
                placeholder={"What's on your mind?"}
                onChangeText={(text: string) => this.onPostTextChange(text)}
              />

              <TouchableOpacity
                testID='callPostApiButton'
                onPress={() => this.createPost(this.state.postTextValue)}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: "90%",
                  alignSelf: "center",
                  height: 40,
                  backgroundColor: "blue",
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "600", color: "white" }}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          testID='navigateButton'
          onPress={() => {
            this.navigateTo();
          }}
          style={{
            position: "absolute",
            right: 20,
            bottom: 30,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            borderRadius: 20,
            height: 40,
            width: 40,
          }}
        >
          <Image source={notification} style={{ height: 30, width: 30 }} />
        </TouchableOpacity>
      </View>
    );
    // Merge Engine - render - End
  }
}

const styles = StyleSheet.create({
  mobileInput: {
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    height: 120,
    textAlignVertical: "top",
  },
});

// Customizable Area End
