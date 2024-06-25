const updateSubscriptionType = async (userN, subscriptionType) => {
    const userNo = userN;
    const subsType = subscriptionType;
  
    try {
      const response = await fetch(
        `https://snappromise.com:8080/api/Users/updateSubscriptionType?userNo=${userNo}&subscriptionType=${subsType}`,
        {
          method: 'POST',
          headers: {
            'Accept': 'text/plain', 
          },
        }
      );
      return response
    } catch (error) {
      console.error('Error updating password:', error.message);
    }
  };
  
  export default updateSubscriptionType;
  
  