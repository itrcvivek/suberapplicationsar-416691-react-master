// Customizable Area Start
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList
} from "react-native";
import { likeImage, sendImage, unlikeImage } from "./assets";
import { CommentType, MyPosts } from "./RealtimeUpdatesController";


export const PostItem = (props: { item: MyPosts, getSinglePostComments: (postId: string) => void, likePost: (postId: string, isLiked: boolean) => void, addComment: (comment: string, postId: string) => void }) => {

    const [setMobComments, setsetMobComments] = useState<CommentType[]>(props.item.allComments ?? []);
    const [mobComment, setMobComment] = useState('');
    const [isPostLiked, setIsPostLiked] = useState(false);
    const [isPostCommentOpen, setIsPostCommentOpen] = useState(false);
    const [postLikeCount, setPostLikedCount] = useState<number>(props.item.attributes.post_likes_count ?? 0);
    const [postCommentCount, setPostCommentCount] = useState<number>(props.item.attributes.post_comment_count ?? 0);

    useEffect(() => {
        setsetMobComments(props.item.allComments);
    }, [props.item.allComments])

    return (
        <View style={{ width: '90%', alignSelf: 'center', marginVertical: 10, padding: 10, backgroundColor: 'white', borderWidth: 1, borderRadius: 10, borderColor: 'lightgrey' }}>
            <Text style={{ marginBottom: 15 }}>{props.item.attributes.description}</Text>

            {isPostCommentOpen && <FlatList
                scrollEnabled={false}
                testID="flatlist"
                data={setMobComments}
                renderItem={({ item }) => {
                    return <CommentPostView item={item} />
                }}
            />}

            {postCommentCount > 0 && <TouchableOpacity testID="hideShowButton" onPress={() => {
                if (isPostCommentOpen) {
                    setIsPostCommentOpen(false);
                    setsetMobComments([]);
                } else {
                    setIsPostCommentOpen(true);
                    props.getSinglePostComments(props.item.id)
                }
            }}>
                <Text style={{ width: '100%', fontSize: 13,marginTop:10 , marginBottom: 10, alignSelf: 'center' }}>{isPostCommentOpen ? 'Hide comments' : `See all ${postCommentCount} comments`}</Text>
            </TouchableOpacity>}

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', flex: 1 }}>

                <TouchableOpacity testID="likeButton" onPress={() => {
                    props.likePost(props.item.id, !isPostLiked)
                    setIsPostLiked(!isPostLiked)
                    setPostLikedCount(!isPostLiked ? postLikeCount + 1 : postLikeCount - 1);
                }} style={{ marginRight: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                    <Image source={isPostLiked ? likeImage : unlikeImage} style={{ height: 20, width: 20 }} />
                    <Text style={{ fontSize: 13, marginLeft: 5 }}>{postLikeCount}</Text>
                </TouchableOpacity>

                <View style={{ flex: 1 }}>
                    <TextInput
                        value={mobComment}
                        testID="txtInput"
                        multiline
                        style={[{
                            flex: 1, borderColor: 'black',
                            borderWidth: 1,
                            padding: 10,
                            paddingRight: 30,
                            marginTop: 10,
                            marginBottom: 10,
                            borderRadius: 5,
                        }]}
                        placeholder={"Write a comment...."}
                        onChangeText={(text: string) => setMobComment(text)}
                    />

                    <TouchableOpacity testID="addCommentButton" onPress={() => {
                        if (mobComment == "") { return }
                        props.addComment(mobComment, props.item.id)
                        if (isPostCommentOpen) {
                            props.getSinglePostComments(props.item.id)
                        }
                        setIsPostCommentOpen(false);
                        setPostCommentCount(postCommentCount + 1)
                        setMobComment("");
                    }} style={{ alignItems: 'center', justifyContent: 'center', position: 'absolute', right: 10, top: 20 }}>
                        <Image source={sendImage} style={{ height: 20, width: 20 }} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>)
}


export const CommentPostView = (props: { item: CommentType }) => {
    return (
        <View style={{ flex: 1, padding: 10, borderColor: 'lightgrey', borderWidth: 1, borderRadius: 10, marginVertical: 5 }}>
            <Text style={{ marginBottom: 10 }}>Username : {props.item.attributes.account.full_name}</Text>
            <Text>{props.item.attributes.comment}</Text>
        </View>
    );
}
// Customizable Area End
