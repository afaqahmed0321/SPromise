import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TransactionItem = ({ date, user, payment, paymentColor }) => {
    function getPaymentColor(payment) {
        const value = Number(payment.replace(/\$/g, ''));
        return value < 0 ? styles.paymentTextRed : styles.paymentTextGreen;
    }
    const paymentStyle = getPaymentColor(payment);
    return (
        <TouchableOpacity>
            <View style={styles.container}>
                <View style={{}}>
                    <Text style={styles.dateText}>{date}</Text>
                    <Text style={styles.userText}>{user}</Text>
                </View>
                <View style={{alignItems:'center'}}>
                    <Text style={[styles.paymentText, paymentStyle]}>{payment}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        paddingVertical: 10,
        paddingHorizontal: 30,
        flexDirection:'row',
        justifyContent: 'space-between'
    },
    header: {
        flexDirection: 'col',
        justifyContent: 'space-between',
    },
    dateText: {
        fontSize: 14,
        color: '#49454F',
    },
    paymentText: {
        fontSize: 16,
        fontWeight: '600',
        alignItems: 'center',
    },
    userText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
        color: 'black',
    },
    paymentTextRed: {
        fontSize: 16,
        fontWeight: '600',
        color: 'red',
    },

    paymentTextGreen: {
        fontSize: 16,
        fontWeight: '600',
        color: 'green',
    },
});

export default TransactionItem;
