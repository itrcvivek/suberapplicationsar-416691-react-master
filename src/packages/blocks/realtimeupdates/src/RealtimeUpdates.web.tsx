// Customizable Area Start
import React from "react";

import {
  Container,
  Box,
  Input,
  Button,
  Typography,
  Modal
} from "@material-ui/core";

import { createTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
      contrastText: "#fff",
    },
  },
  typography: {
    h6: {
      fontWeight: 500,
    },
    subtitle1: {
      margin: "20px 0px",
    },
  },
});

import RealtimeUpdatesController, {
  MyPosts,
  Props,
} from "./RealtimeUpdatesController";
import { notification } from "./assets";
import { PostItem } from "./PostItem.web";

export default class RealtimeUpdates extends RealtimeUpdatesController {
  constructor(props: Props) {
    super(props);
  }


  render() {
    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth={"sm"}>
          <Box sx={webStyle.mainWrapper}>

            <Box
              data-test-id={"createPostButton"}
              onClick={() => this.setModalVisibility(true)}
              component="button"
              sx={webStyle.buttonStyle}
            >
              <Button color={'primary'}>{"Create post"}</Button>
            </Box>
            <Box style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
              {
                this.state.postsData.map((item: MyPosts, index: number) => {
                  return <PostItem key={index} getSinglePostComments={this.getSinglePostComments} item={item} addComment={this.addComment} likePost={this.likePostApiCall} />
                })
              }
            </Box>

            {this.state.modalVisible && <Modal open={this.state.modalVisible}>
              <Box sx={webStyle.modalMainWrapper}>

                <Box sx={webStyle.whiteWrapper}>

                  <Box data-test-id={"closeModalButton"} onClick={() => this.setModalVisibility(false)} style={{ alignItems: 'center', justifyContent: 'center', height: 25, width: 25, position: 'absolute', right: 10, top: 10 }}>
                    <Typography style={{ fontSize: 18, fontWeight: 'bold' }}>X</Typography>
                  </Box>
                  <Typography style={{ fontSize: 20, fontWeight: 'bold' }}>Want to create a post?</Typography>
                  <Input
                    value={this.state.postTextValue}
                    data-test-id="txtInput"
                    multiline
                    style={{ ...webStyle.inputStyle, width: '100%', }}
                    placeholder={"What's on your mind?"}
                    onChange={(event) => this.onPostTextChange(event.target.value)}
                  />

                  {this.state.isPostTextEmpty && <Typography style={{ color: 'red', marginTop: 5, marginBottom: 10, textAlign: 'left', width: '100%' }}>Please enter something...</Typography>}

                  <Box
                    data-test-id="callPostApiButton"
                    onClick={() => this.createPost(this.state.postTextValue)}
                    component="button"
                    sx={webStyle.buttonStyle}
                  >
                    <Button color={'primary'}>{"Post"}</Button>
                  </Box>
                </Box>

              </Box>

            </Modal>}

            <Box data-test-id="navigateButton" onClick={this.navigateTo} style={{ cursor: 'pointer', position: 'absolute', right: 20, top: 60, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: 20, height: 40, width: 40 }}>
              <img src={notification} style={{ height: 30, width: 30 }} />
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
}

const webStyle = {
  mainWrapper: {
    display: "flex",
    fontFamily: "Roboto-Medium",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "30px",
    background: "#fff",
    paddingTop: "20px",
    width: '100%',
    alignSelf: 'center',
  },
  inputStyle: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.6)",
    width: "100%",
    height: "100px",
    display: "flex",
    justifyContent: "space-between",
  },
  buttonStyle: {
    width: '100%',
    height: '45px',
    marginTop: '40px',
    marginBottom: '20px',
    border: 'none',
    backgroundColor: 'rgb(98, 0, 238)',
  },
  modalMainWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    background: "transparent",
    alignSelf: "center",
  },
  whiteWrapper: {
    background: "white",
    width: "50%",
    padding: "25px",
    position: "relative",
    borderRadius: "38px",
    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.25)",
    display: "flex",
    flexDirection: "column",
    maxHeight: "85%",
    alignItems: "center",
  },
};

// Customizable Area End
