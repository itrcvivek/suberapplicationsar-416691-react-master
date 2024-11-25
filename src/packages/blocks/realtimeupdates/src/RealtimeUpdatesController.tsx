// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

export interface MyPosts {
  id: string;
  type: string;
  allComments: CommentType[];
  attributes: {
    id: number;
    name: string;
    description: string;
    account_id: number;
    created_at: string;
    updated_at: string;
    notification: number | null;
    post_likes_count: number;
    post_comment_count: number;
  };
}

export interface CommentType {
  attributes: {
    id: number;
    comment: string;
    account: {
      full_name: string;
    };
  };
}

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  modalVisible: boolean;
  postTextValue: string;
  likeApiCalled: boolean;
  token: string;
  isPostTextEmpty: boolean;
  postsData: MyPosts[];
  selectedCommentId: string;
}

interface SS {
  id: any;
}

export default class RealtimeUpdatesController extends BlockComponent<Props, S, SS> {
  createPostId: string = "";
  getPostId: string = "";
  likePostId: string = "";
  createCommentId: string = "";
  singleCommentId: string = "";

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      modalVisible: false,
      postTextValue: "",
      likeApiCalled: false,
      isPostTextEmpty: false,
      postsData: [],
      selectedCommentId: "0",
      token: "",
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

  }

  async componentDidMount() {
    this.getToken();
    this.getPost();
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    this.handleGetPostData(from, message);
    this.handleCreatePost(from, message);

    this.handleLikePostData(from, message);
    this.handleCreateCommentData(from, message);
    this.handlePostCommentData(from, message);
  }

  txtInputWebProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputValue: text });
    },
    secureTextEntry: false,
  };

  onButtonPressed() {
    let messageData = new Message(getName(MessageEnum.AccoutLoginSuccess));
    messageData.addData(getName(MessageEnum.AuthTokenDataMessage), this.state.txtInputValue);
    this.send(messageData);
  }

  txtInputMobileProps = {
    ...this.txtInputWebProps,
    keyboardType: "email-address",
    autoCompleteType: "email",
  };

  btnExampleProps = {
    onPress: () => this.onButtonPressed(),
  };

  setModalVisibility = (value: boolean) => {
    this.setState({ modalVisible: value, postTextValue: "" });
  };

  onPostTextChange = (text: string) => {
    this.setState({ isPostTextEmpty: text == "" ? true : false });
    this.setState({ postTextValue: text });
  };

  navigateTo = () => {
    this.props.navigation.navigate("NotificationScreen");
  };

  setPostData = (postsData: MyPosts[]) => {
    this.setState({ postsData });
  };

  handlePostCommentData = (from: string, message: Message) => {
    if (this.singleCommentId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))) {
      const responseApi = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      if (responseApi && responseApi.data) {
        let newPostData: MyPosts[] = [];
        this.state.postsData.forEach((item) => {
          let newPost: MyPosts = item;
          if (item.id == this.state.selectedCommentId) {
            newPost = { ...item, allComments: responseApi.data };
          }
          newPostData.push(newPost);
        });
        this.setPostData(newPostData);
      } else {
        this.showAlert("Error", "Something went wrong. Please try again later!");
      }
    }
  };

  handleLikePostData = (from: string, message: Message) => {
    if (this.likePostId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))) {
      this.setState({ likeApiCalled: false });
      const apiResponse = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      if (apiResponse && apiResponse.data) {
        this.showAlert("", "Successfully liked the post");
      } else if (apiResponse && apiResponse.message) {
        this.showAlert("", apiResponse.message);
      } else {
        this.showAlert("Error", "Something went wrong. Please try again later!");
      }
    }
  };

  handleCreateCommentData = (from: string, message: Message) => {
    if (this.createCommentId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))) {
      const apiResponse = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      if (apiResponse && apiResponse.data) {
        this.showAlert("Success", "Successfully commented");
      } else {
        this.showAlert("Error", "Something went wrong. Please try again later!");
      }
    }
  };

  handleGetPostData = (from: string, message: Message) => {
    if (this.getPostId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))) {
      const apiResponse = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      if (
        apiResponse &&
        apiResponse.data &&
        apiResponse.data.length > 0 &&
        apiResponse.data[0] !== "No Posts Available"
      ) {
        this.setState({ postsData: apiResponse.data });
      } 
    }
  };

  handleCreatePost = (from: string, message: Message) => {
    if (this.createPostId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))) {
      const apiResponse = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      if (apiResponse && apiResponse.data) {
        this.setState({ postsData: [...this.state.postsData, apiResponse.data] });
        this.showAlert("Success", "Post created successfully");
      } else {
        this.showAlert("Error", "Somthing went wrong!");
      }
    }
  };

  getSinglePostComments = (postId: string) => {
    this.setState({ selectedCommentId: postId });
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      token: this.state.token,
    };

    const getPostMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.singleCommentId = getPostMessage.messageId;

    getPostMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getAllComments + postId
    );

    getPostMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    getPostMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );

    runEngine.sendMessage(getPostMessage.id, getPostMessage);
  };

  getPost = () => {
    let newToken: string | null = "";
    if (this.isPlatformWeb()) {
      newToken = localStorage.getItem("token");
      this.setState({ token: newToken ? newToken : "" });
    }
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      token: newToken,
    };

    const getPostMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.getPostId = getPostMessage.messageId;

    getPostMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getAllPostsEndPoint
    );

    getPostMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    getPostMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );

    runEngine.sendMessage(getPostMessage.id, getPostMessage);
  };

  setModalVisible = () => {
    this.setState({ modalVisible: true });
  };

  createPost = (description: string) => {
    this.setState({ postTextValue: "" });

    if (description === undefined || description == "") {
      if (this.isPlatformWeb()) {
        this.setState({ isPostTextEmpty: true });
      } else {
        this.showAlert("Error", "Please enter something.");
      }
      return;
    }

    this.setState({ modalVisible: false });

    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      token: this.state.token,
    };

    let post = {
      name: "",
      description: description,
    };

    const createPostMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.createPostId = createPostMessage.messageId;

    createPostMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.createPostEndPoint
    );

    createPostMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify({ post })
    );

    createPostMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    createPostMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.postMethod
    );

    runEngine.sendMessage(createPostMessage.id, createPostMessage);
  };

  likePostApiCall = (postId: string, isLiked: boolean) => {
    if (this.state.likeApiCalled) {
      return;
    }

    this.setState({ likeApiCalled: true });
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      token: this.state.token,
    };

    let postData = {
      attributes: {
        likeable_id: postId,
        likeable_type: "BxBlockRealTimeUpdates::Post",
      },
    };

    const likePostMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.likePostId = likePostMessage.messageId;

    likePostMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      isLiked ? configJSON.likePostEndPoint : configJSON.dislikePostEndPoint + `${postId}`
    );

    if (isLiked) {
      likePostMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify({ data: postData })
      );
    }

    likePostMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    likePostMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      isLiked ? configJSON.postMethod : configJSON.deleteMethod
    );

    runEngine.sendMessage(likePostMessage.id, likePostMessage);
  };

  addComment = (comment: string, postId: string) => {
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      token: this.state.token,
    };

    let commentData = {
      comment: comment,
      post_id: postId,
    };

    const addCommentMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.createCommentId = addCommentMessage.messageId;

    addCommentMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.createCommentEndPoint
    );

    addCommentMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(commentData)
    );

    addCommentMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    addCommentMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.postMethod
    );

    runEngine.sendMessage(addCommentMessage.id, addCommentMessage);
  };

  getToken = () => {
    const msgData: Message = new Message(getName(MessageEnum.SessionRequestMessage));
    this.send(msgData);
    if (this.isPlatformWeb()) {
      let token = localStorage.getItem("token");
      this.setState({ token: token ? token : "" });
    }
  };
}

// Customizable Area End
