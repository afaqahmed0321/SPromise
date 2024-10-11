#import "AppDelegate.h"
#import <Firebase.h>
#import <React/RCTBundleURLProvider.h>
#import <StoreKit/StoreKit.h> // Required for IAP

@interface AppDelegate () <SKPaymentTransactionObserver> // Conform to SKPaymentTransactionObserver
@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // Firebase configuration
  [FIRApp configure];

  // Initialize In-App Purchases
  [self initializeIAP];

  self.moduleName = @"SnapPromise";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

// Method to initialize In-App Purchases
- (void)initializeIAP {
  if ([SKPaymentQueue canMakePayments]) {
    [[SKPaymentQueue defaultQueue] addTransactionObserver:self]; // 'self' is now a valid observer
  } else {
    NSLog(@"IAP is disabled, please enable it to make purchases.");
  }
}

// Implement SKPaymentTransactionObserver methods
- (void)paymentQueue:(SKPaymentQueue *)queue updatedTransactions:(NSArray<SKPaymentTransaction *> *)transactions {
  for (SKPaymentTransaction *transaction in transactions) {
    switch (transaction.transactionState) {
      case SKPaymentTransactionStatePurchased:
        // Handle successful purchase
        NSLog(@"Purchase successful for product: %@", transaction.payment.productIdentifier);
        [[SKPaymentQueue defaultQueue] finishTransaction:transaction];
        break;
      case SKPaymentTransactionStateFailed:
        // Handle failed transaction
        NSLog(@"Transaction failed: %@", transaction.error.localizedDescription);
        [[SKPaymentQueue defaultQueue] finishTransaction:transaction];
        break;
      case SKPaymentTransactionStateRestored:
        // Handle restored transaction
        NSLog(@"Transaction restored for product: %@", transaction.payment.productIdentifier);
        [[SKPaymentQueue defaultQueue] finishTransaction:transaction];
        break;
      default:
        break;
    }
  }
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

// Clean up the transaction observer when the app is closed
- (void)applicationWillTerminate:(UIApplication *)application {
  [[SKPaymentQueue defaultQueue] removeTransactionObserver:self];
}

@end
