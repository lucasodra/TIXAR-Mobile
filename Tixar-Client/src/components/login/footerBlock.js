import { Text, View } from 'react-native';

export default function FooterBlock() {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'flex-end',
            marginBottom: '5%',
        }}>
            <Text style={{
                fontFamily: 'Lato-Regular',
                fontSize: 12,
                color: '#8F8F8F'
            }}> TIXAR
            </Text>
        </View>
    )
}