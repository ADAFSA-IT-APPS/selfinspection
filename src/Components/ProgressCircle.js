import * as React from 'react';
import {
    Easing,
    TextInput,
    Animated,
    Text,
    View,
    StyleSheet,
} from 'react-native';
import Svg, { G, Circle, Rect } from 'react-native-svg';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';


const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const AnimatedView = Animated.createAnimatedComponent(View);

export default function ProgressCircle({
    percentage = 75,
    radius = 40,
    strokeWidth = 6,
    duration = 5000,
    color = "#5a6674",
    delay = 0,
    number=0,
    textColor,
    max = 100,
    circle
}) {
    const animated = React.useRef(new Animated.Value(0)).current;
    const circleRef = React.useRef();
    const inputRef = React.useRef();
    const circumference = 2 * Math.PI * radius;
    const halfCircle = radius + strokeWidth;
    const { t, i18n } = useTranslation();

    const animation = (toValue) => {
        return Animated.timing(animated, {
            delay: 1000,
            toValue,
            duration,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease),
        }).start(/* () => {
            animation(toValue === 0 ? percentage : 0);
        } */);
    };

    React.useEffect(() => {
        animation(percentage);
        animated.addListener((v) => {
            const maxPerc = 100 * v.value / max;
            const strokeDashoffset = circumference - (circumference * maxPerc) / 100;
            if (inputRef?.current) {
                inputRef.current.setNativeProps({
                    text: `${Math.round(v.value)}`,
                });
            }
            if (circleRef?.current) {
                circleRef.current.setNativeProps({
                    strokeDashoffset,
                });
            }
        }, [max, percentage]);

        return () => {
            animated.removeAllListeners();
        };
    });

    return (
        <View style={{ width: radius * 2, height: radius * 2 }}>
            <Svg
                height={radius * 2}
                width={radius * 2}
                viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
                <G
                    rotation="-90"
                    origin={`${halfCircle}, ${halfCircle}`}>
                    <Circle
                        ref={circleRef}
                        cx="50%"
                        cy="50%"
                        r={radius}
                        fill="transparent"
                        stroke={color}
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeDashoffset={circumference}
                        strokeDasharray={circumference}
                    />
                    <Circle
                        cx="50%"
                        cy="50%"
                        r={radius}
                        fill="transparent"
                        stroke='#5c6672'
                        strokeWidth={strokeWidth}
                        strokeLinejoin="round"
                        strokeOpacity=".4"
                    />
                </G>
            </Svg>
            <AnimatedView
                underlineColorAndroid="transparent"
                editable={false}
                defaultValue="108"
                style={[
                    StyleSheet.absoluteFillObject,
                    styles.text,
                ]}
            >
                <Text style={{ fontSize: radius / 5, color: textColor ?? color }}>{number}</Text>
                <Text style={{ fontSize: radius / 5, color: textColor ?? color }}>{circle == 1 ? t('Total') : ''}</Text>
                <Text style={{ fontSize: radius / 5, color: textColor ?? color }}>
                    {circle == 1 ? t('Completed') : circle == 2 ?
                        <SimpleLineIcons name="like" color='#000' size={20} /> : <SimpleLineIcons name="dislike" color='#000' size={20} />}
                </Text>
            </AnimatedView>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {fontWeight: '600', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',/* borderColor:'red',borderWidth:1  */},
});
