const updateSubscriptionType = async (userN, subscriptionType) => {
    console.log("Api Call", userN);
    console.log("Api Call", subscriptionType);
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
      console.log("Api as been run and type is now paid");
      return response
    } catch (error) {
      console.error('Error updating password:', error.message);
    }
  };
  
  export default updateSubscriptionType;
  
  