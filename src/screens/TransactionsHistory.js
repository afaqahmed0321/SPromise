import React from 'react';
import TransactionItem from '../comp/Transactions/TransactionItem';
import { TouchableOpacity, View } from 'react-native';


const TransactionsHistory = () => {
  const transactionsHistory = [
    { date: '01 Feb', user: 'John Doe', payment: '$100' },
    { date: '31 Jan', user: 'Jane Smith', payment: '-$500' },
    { date: '31 Jan', user: 'Jane Smith', payment: '$50' },
    { date: '31 Jan', user: 'Jane Smith', payment: '-$250' },
    { date: '31 Jan', user: 'Jane Smith', payment: '$570' },
  ];

  return (
    <TouchableOpacity>
      <View>
        {transactionsHistory.map((transaction) => (
          <TransactionItem
            key={transaction.date}
            date={transaction.date}
            user={transaction.user}
            payment={transaction.payment}
            paymentColor={
              Number(transaction.payment.replace(/\$/g, '')) < 0 ? 'red' : 'green'
            } 
          />
        ))}
      </View>
    </TouchableOpacity>
  );
};

export default TransactionsHistory;
