// Customizable Area Start
import React, { useState, useEffect } from "react";
import { Box, Typography, Input } from "@material-ui/core";
import { likeImage, sendImage, unlikeImage } from "./assets";
import { COLORS } from "../../../framework/src/Globals";
import { CommentType, MyPosts } from "./RealtimeUpdatesController";

export const PostItem = (props: {
  item: MyPosts;
  getSinglePostComments: (postId: string) => void;
  likePost: (postId: string, isLiked: boolean) => void;
  addComment: (comment: string, postId: string) => void;
}) => {
  const [allComments, setAllComments] = useState<CommentType[]>(props.item.allComments || []);
  const [comment, setComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [likeCount, setLikedCount] = useState<number>(props.item.attributes.post_likes_count ?? 0);
  const [commentCount, setCommentCount] = useState<number>(
    props.item.attributes.post_comment_count ?? 0
  );

  useEffect(() => {
    setAllComments(props.item.allComments);
  }, [props.item.allComments]);

  return (
    <Box
      style={{ width: "100%", alignSelf: "center" }}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignSelf: "center",
        marginBottom: 15,
        width: "100%",
      }}
    >
      <Box
        style={{ width: "100%" }}
        sx={{ ...webStyle.newEventContainer, flexDirection: "column" }}
      >
        <Typography
          style={{
            width: "100%",
            display: "flex",
            fontSize: 16,
            marginBottom: 15,
            alignSelf: "center",
          }}
        >
          {props.item.attributes.description}
        </Typography>

        {allComments &&
          isCommentOpen &&
          allComments.map((item, index) => {
            return <CommentView key={index} item={item} />;
          })}

        {commentCount > 0 && (
          <Box
            data-test-id={"hideShowButton"}
            onClick={() => {
              if (isCommentOpen) {
                setIsCommentOpen(false);
                setAllComments([]);
              } else {
                setIsCommentOpen(true);
                props.getSinglePostComments(props.item.id);
              }
            }}
          >
            <Typography
              style={{
                width: "100%",
                display: "flex",
                fontSize: 13,
                marginTop: 10,
                marginBottom: 10,
                alignSelf: "center",
              }}
            >
              {isCommentOpen ? "Hide comments" : `See all ${commentCount} comments`}
            </Typography>
          </Box>
        )}

        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Box
            data-test-id='likeButton'
            onClick={() => {
              props.likePost(props.item.id, !isLiked);
              setIsLiked(!isLiked);
              setLikedCount(!isLiked ? likeCount + 1 : likeCount - 1);
            }}
            style={{
              cursor: "pointer",
              marginRight: 10,
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <img src={isLiked ? likeImage : unlikeImage} style={{ height: 20, width: 20 }} />
            <Typography style={{ fontSize: 13, marginLeft: 5 }}>{likeCount}</Typography>
          </Box>

          <Box style={{ position: "relative", width: "100%", alignSelf: "center" }}>
            <Input
              value={comment}
              data-test-id='txtInput'
              multiline
              style={{
                borderColor: "black",
                borderWidth: 1,
                padding: 10,
                paddingRight: 30,
                marginTop: 10,
                marginBottom: 10,
                borderRadius: 5,
                width: "100%",
              }}
              placeholder={"Write a comment...."}
              onChange={(event: { target: { value: string } }) => setComment(event.target.value)}
            />

            <Box
              data-test-id='addCommentButton'
              onClick={() => {
                if (comment == "") {
                  return;
                }
                props.addComment(comment, props.item.id);
                if (isCommentOpen) {
                  setIsCommentOpen(false);
                  props.getSinglePostComments(props.item.id);
                }
                setCommentCount(commentCount + 1);
                setComment("");
              }}
              style={{
                cursor: "pointer",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                right: 10,
                top: 20,
              }}
            >
              <img src={sendImage} style={{ height: 20, width: 20 }} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export const CommentView = (props: { item: CommentType }) => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid black",
        width: "90%",
        alignSelf: "center",
        padding: 10,
        borderColor: "lightgrey",
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 5,
      }}
    >
      <Typography style={{ fontSize: 13, marginBottom: 10, width: "95%", alignSelf: "center" }}>
        Username : {props.item.attributes.account.full_name}
      </Typography>
      <Typography style={{ fontSize: 14, width: "95%", alignSelf: "center" }}>
        {props.item.attributes.comment}
      </Typography>
    </Box>
  );
};

const webStyle = {
  newEventContainer: {
    backgroundColor: "white",
    borderWidth: 1.3,
    width: "100%",
    display: "flex",
    borderColor: COLORS.yellow,
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 0.1,
    elevation: 5,
    border: "1px solid black",
  },
};

// Customizable Area End
