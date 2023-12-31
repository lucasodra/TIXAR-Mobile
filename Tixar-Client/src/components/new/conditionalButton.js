import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default ConditionalButton = ({
  credentialCheck,
  onPressFunction,
  borderRadius,
}) => {
  return (
    <LinearGradient
      colors={credentialCheck ? ['#FF0080', '#7928CA'] : ['#E8ECEF', '#E8ECEF']} // conditional color change
      start={[0, 0]} end={[1, 0]}
      style={[
        styles.buttonBackground,
        { borderRadius: borderRadius !== undefined ? borderRadius : 8 }, // Use the borderRadius prop if provided, otherwise default to 8
      ]}
    >

      {/* the button itself */}
      <Pressable

        // on press function
        onPress={() => {
          if (credentialCheck) {

            // link the create profile back end here
            console.log('Creating profile');
            onPressFunction();

          } else {
            // button is disabled, cannot be pressed
            console.log('button disabled');
          }
        }} >

        {/* button text */}
        <Text style={credentialCheck ? styles.textEnabled : styles.textDisabled}>
          Continue
        </Text>

      </Pressable>

    </LinearGradient >
  )
}

const styles = StyleSheet.create({

  buttonBackground: {
    // marginTop: 55,
    width: '80%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },

  textEnabled: {
    fontSize: 15,
    fontFamily: 'Lato-Bold',
    color: 'white',
  },

  textDisabled: {
    fontSize: 15,
    fontFamily: 'Lato-Bold',
    color: '#252F40',
  },

});
