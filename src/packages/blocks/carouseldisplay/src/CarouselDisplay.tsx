import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";

import Swiper from "react-native-swiper";
// Customizable Area End

import CarouselDisplayController, {
  Props,
  configJSON,
} from "./CarouselDisplayController";

export default class CarouselDisplay extends CarouselDisplayController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderThumbnails = (current: number, total: number, context: any) => {
    return (
      <ScrollView
        horizontal={true}
        style={styles.thubnailContainer}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <View style={styles.thubmnailView}>
          {context.state.children?.map((item: any, index: number) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => this.thumbnailControl(index)}
                style={
                  index === this.state.index
                    ? styles.swiperThumbnailActive
                    : styles.swiperThumbnail
                }
              >
                {item}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    );
  };
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.hideKeyboard();
          }}
        >
        <Swiper
          style={styles.swiper}
          showsButtons={true}
          key={this.state.imgData.length}
          showsPagination={true}
          renderPagination={this.renderThumbnails}
          index={this.state.index}
          onIndexChanged={(index) => this.setState({ index: index })}
          ref={(swiper) => {
            this.swiper = swiper;
          }}
        >
          {this.state.imgData.map((item: any) => {
            return (
              <View key={item.id} style={styles.swiperWrap}>
                <Image
                  style={styles.imageContainer}
                  source={item.img}
                  resizeMode={"cover"}
                />
              </View>
            );
          })}
        </Swiper>
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
    marginLeft: "auto",
    marginRight: "auto",
    width: Platform.OS === "web" ? "75%" : "100%",
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
  swiper: {
    height: 550,
  },
  swiperWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
    width: "100%",
  },
  swiperThumbnail: {
    width: 50,
    height: 50,
    marginHorizontal: 5,
    borderRadius: 100,
    overflow: "hidden",
    borderColor: "#fff",
    borderWidth: 4,
  },
  swiperThumbnailActive: {
    width: 50,
    height: 50,
    marginHorizontal: 5,
    borderRadius: 100,
    overflow: "hidden",
    borderColor: "#007aff",
    borderWidth: 4,
  },
  thubnailContainer: {
    position: "absolute",
    bottom: 12,
    left: 0,
    right: 0,
  },
  thubmnailView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  contentContainerStyle: {
    minWidth: "100%",
  },
  imageContainer: {
    flex: 1,
    maxWidth: "100%",
  },
});
// Customizable Area End
