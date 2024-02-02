

// import React, { useState } from 'react';
// import { View, Button, Alert } from 'react-native';
// import BraintreeDropIn from 'react-native-braintree-dropin-ui';



// import Braintree from 'react-native-braintree';
// Braintree.setup('xx46k48qjn3jtnxz', 'whmw7rzvcpxnvcb4', '846186cdb6a52e1eb35c9d2c69627cd1');

// const BraintreeDropInUI = () => {
//   const [nonce, setNonce] = useState(null);
//   const Token = "eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpGVXpJMU5pSXNJbXRwWkNJNklqSXdNVGd3TkRJMk1UWXRjMkZ1WkdKdmVDSXNJbWx6Y3lJNkltaDBkSEJ6T2k4dllYQnBMbk5oYm1SaWIzZ3VZbkpoYVc1MGNtVmxaMkYwWlhkaGVTNWpiMjBpZlEuZXlKbGVIQWlPakUzTURRNE1ERXlOemdzSW1wMGFTSTZJakkxT0daaU9XWmtMVGRtT1RJdE5EZ3dZeTFpWVRNekxXVmlNR1ZpT1RobE1UQTFOQ0lzSW5OMVlpSTZJbmg0TkRack5EaHhhbTR6YW5SdWVIb2lMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwyRndhUzV6WVc1a1ltOTRMbUp5WVdsdWRISmxaV2RoZEdWM1lYa3VZMjl0SWl3aWJXVnlZMmhoYm5RaU9uc2ljSFZpYkdsalgybGtJam9pZUhnME5tczBPSEZxYmpOcWRHNTRlaUlzSW5abGNtbG1lVjlqWVhKa1gySjVYMlJsWm1GMWJIUWlPbVpoYkhObGZTd2ljbWxuYUhSeklqcGJJbTFoYm1GblpWOTJZWFZzZENKZExDSnpZMjl3WlNJNld5SkNjbUZwYm5SeVpXVTZWbUYxYkhRaVhTd2liM0IwYVc5dWN5STZlMzE5LlctTkhjejNWaDg3X1BxeGN1c3NkTmUtcnF3Tm85LXdEQjlhWnNBUGw0czlaU1ZUSTBfaFRzZGdGM3BEenk1U0xCbHlIZmJZVm80U2VPQ0Q5NVVEZmN3IiwiY29uZmlnVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzL3h4NDZrNDhxam4zanRueHovY2xpZW50X2FwaS92MS9jb25maWd1cmF0aW9uIiwiZ3JhcGhRTCI6eyJ1cmwiOiJodHRwczovL3BheW1lbnRzLnNhbmRib3guYnJhaW50cmVlLWFwaS5jb20vZ3JhcGhxbCIsImRhdGUiOiIyMDE4LTA1LTA4IiwiZmVhdHVyZXMiOlsidG9rZW5pemVfY3JlZGl0X2NhcmRzIl19LCJjbGllbnRBcGlVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMveHg0Nms0OHFqbjNqdG54ei9jbGllbnRfYXBpIiwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwibWVyY2hhbnRJZCI6Inh4NDZrNDhxam4zanRueHoiLCJhc3NldHNVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbSIsImF1dGhVcmwiOiJodHRwczovL2F1dGgudmVubW8uc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbSIsInZlbm1vIjoib2ZmIiwiY2hhbGxlbmdlcyI6W10sInRocmVlRFNlY3VyZUVuYWJsZWQiOnRydWUsImFuYWx5dGljcyI6eyJ1cmwiOiJodHRwczovL29yaWdpbi1hbmFseXRpY3Mtc2FuZC5zYW5kYm94LmJyYWludHJlZS1hcGkuY29tL3h4NDZrNDhxam4zanRueHoifSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImJpbGxpbmdBZ3JlZW1lbnRzRW5hYmxlZCI6dHJ1ZSwiZW52aXJvbm1lbnROb05ldHdvcmsiOnRydWUsInVudmV0dGVkTWVyY2hhbnQiOmZhbHNlLCJhbGxvd0h0dHAiOnRydWUsImRpc3BsYXlOYW1lIjoiQ3luYXogSW5jLiIsImNsaWVudElkIjpudWxsLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJlbnZpcm9ubWVudCI6Im9mZmxpbmUiLCJicmFpbnRyZWVDbGllbnRJZCI6Im1hc3RlcmNsaWVudDMiLCJtZXJjaGFudEFjY291bnRJZCI6ImN5bmF6aW5jIiwiY3VycmVuY3lJc29Db2RlIjoiVVNEIn19"
  

//   const showDropIn = () => {
//     BraintreeDropIn.show({
//       clientToken: Token, // Replace with your actual client token
//       vaultManager: true, // Optional: Enable card storage
//     })
//     .then((result) => {
//       console.log('DropIn result:', result);
//       // Handle payment method nonce from result
//       setNonce(result.nonce);
//     })
//     .catch((error) => {
//       console.error('DropIn error:', error);
//       // Handle errors
//     });
    
//   };
//   return (
//     <View>
//       <Button title="Make Payment" onPress={showDropIn} />
//       {nonce && <Text>Nonce: {nonce}</Text>}
//     </View>
//   );
// };

// export default BraintreeDropInUI;
