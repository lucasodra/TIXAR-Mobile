import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default FanclubCard = ({
    clubName,
    fanNumber,
    codesActive,
    navigationDestination, // Receive the screen name prop
    imageUrl,
    onPressFunction,
}) => {
    const navigation = useNavigation();
    const [showDeleteButton, setShowDeleteButton] = useState(false);

    const handleHamburgerPress = () => {
        setShowDeleteButton(!showDeleteButton);
    }

    const handleDeletePress = () => {
        // Handle the delete action here
        // You can add your logic to delete the item
        console.log('Delete button pressed');
    }

    let image = require('../../assets/soft-ui-pro-react-native-v1.1.1/avatar23x.png');
    if (imageUrl) {
        image = { uri: imageUrl };
    }

    return (
        <View>
            <Pressable
                style={styles.container}
                onPress={() => {
                    // Use the screenName prop as the screen name to navigate to
                    // navigation.navigate(navigationDestination);
                    onPressFunction();
                }}
            >
                {/* icon */}
                <Image
                    source={image}
                    style={styles.icon}
                    resizeMode="cover"
                />

                {/* information */}
                <View style={styles.information}>
                    <Text style={styles.title}
                        adjustsFontSizeToFit={true}
                        numberOfLines={1}
                    > {clubName} </Text>
                    <View style={{
                        justifyContent: 'flex-end'
                    }}>
                        <Text style={styles.fanNumber}> Fans: {fanNumber} </Text>
                        <Text style={styles.codesActive}> Codes Active: {codesActive} </Text>
                    </View>
                </View>

                {/* hamburger menu icon, it dissapears when delete button is visible */}
                {!showDeleteButton && (
                    <Pressable
                        style={styles.hamburgerMenuContainer}
                        onPress={handleHamburgerPress}
                    >
                        <Image
                            source={require("../../assets/hamburgerMenu.png")}
                            style={styles.hamburgerMenuIcon}
                            resizeMode="cover"
                        />
                    </Pressable>
                )}


                {/* Transparent overlay covering the entire screen when delete button is shown */}
                {showDeleteButton && (
                    <Pressable
                        style={styles.overlay}
                        onPress={handleHamburgerPress} // Handle presses on the overlay to hide the delete button
                    />
                )}

                {/* delete button */}
                {showDeleteButton && (
                    <Pressable
                        style={styles.deleteButton}
                        onPress={handleDeletePress}
                    >
                        <Text style={styles.deleteButtonText}>Delete</Text>
                    </Pressable>
                )}
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 15,
        height: Dimensions.get('window').height * 0.12,
        marginVertical: 5,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,

    },

    icon: {
        width: 80,
        height: 80,
        borderRadius: 15,
    },

    title: {
        flex: 1,
        fontSize: 20,
        color: '#252F40',
        fontFamily: 'Lato-Bold',
        // lineHeight: 35,
    },

    fanNumber: {
        fontSize: 15,
        color: '#67748E',
        fontFamily: 'Lato-Regular',
        lineHeight: 22,
    },

    codesActive: {
        fontSize: 15,
        color: '#67748E',
        fontFamily: 'Lato-Regular',
        lineHeight: 22,
    },

    information: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        paddingLeft: 10,
    },

    hamburgerMenuContainer: {
        padding: 5,
        borderRadius: 5,
    },

    hamburgerMenuIcon: {
        width: 30,
        height: 30,
        alignSelf: "center",
    },

    deleteButton: {
        backgroundColor: "red",
        padding: 8,
        borderRadius: 5,
        marginLeft: 10,
    },

    deleteButtonText: {
        color: "white",
        textAlign: "center",
    },

    overlay: {
        position: 'absolute', // Position the overlay on the parent view with starting coordinates (0, 0, 0, 0)
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'transparent',
    },

});
