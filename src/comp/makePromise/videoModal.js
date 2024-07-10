import React, { useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';
import Video from 'react-native-video';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAw5 from 'react-native-vector-icons/FontAwesome5';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const VideoModal = ({ isVisible, toggleModal, videoUrl, navigation }) => {
    const [isLoading, setIsLoading] = useState(true);

    const handleLoadStart = () => {
        setIsLoading(true);
    };

    const handleLoad = () => {
        setIsLoading(false);
    };
    console.log(isVisible, toggleModal, videoUrl)
    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isVisible}
                onRequestClose={isVisible}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {isLoading && <ActivityIndicator size="large" color="white" />}
                        <TouchableOpacity style={styles.closeButton} onPress={() => console.log("click")}>
                            <FontAw5 name="times" size={wp(6)} color="white" />
                        </TouchableOpacity>
                        <Video
                            source={{ uri: videoUrl }}
                            style={[styles.video, isLoading && styles.hidden]}
                            controls={true}
                            resizeMode="contain"
                            onLoadStart={handleLoadStart}
                            onLoad={handleLoad}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default VideoModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',

    },
    modalContent: {
        width: wp(90),
        backgroundColor: 'black',
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        paddingBottom: 20,
    },
    video: {
        width: '100%',
        height: hp(40),
    },
    hidden: {
        display: 'none',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        left: 200,
        zIndex: 1,
    },
});
