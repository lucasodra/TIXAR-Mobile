import { LinearGradient } from "expo-linear-gradient";
import { Pressable, Text, StyleSheet } from "react-native";

export default NextButton = ({ buttonText, enableCondition, onPressFunction }) => {
    return (
        <LinearGradient colors={enableCondition ?
            ['#FF0080', '#7928CA']
            : ['#E8ECEF', '#E8ECEF']}
            style={styles.container}
            start={[0, 0]} end={[1, 0]}>

            <Pressable style={styles.button}
                onPress={enableCondition
                    ? (() => { onPressFunction(); })
                    : (() => { console.log('button disabled') })} >

                <Text style={{
                    fontSize: 15,
                    fontFamily: 'Lato-Bold',
                    color: enableCondition ? 'white' : '#252F40',
                }}>
                    {buttonText}
                </Text>

            </Pressable>

        </LinearGradient >
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        width: '86%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: '86%',
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
});