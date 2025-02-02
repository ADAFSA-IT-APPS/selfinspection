#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "React/RCTI18nUtil.h"
#import "RNSplashScreen.h" 
#import <Firebase.h>
#import <UserNotifications/UserNotifications.h>
#import <RNCPushNotificationIOS.h>
// #import "RNCallKeep.h"
#import "RNFBMessagingModule.h"
#import <React/RCTLinkingManager.h>
#ifdef FB_SONARKIT_ENABLED
#import <FlipperKit/FlipperClient.h>
#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>
#import <AVFoundation/AVAudioSession.h>



static NSString *const RNCallKeepHandleStartCallNotification = @"RNCallKeepHandleStartCallNotification";
static NSString *const RNCallKeepDidReceiveStartCallAction = @"RNCallKeepDidReceiveStartCallAction";
static NSString *const RNCallKeepPerformAnswerCallAction = @"RNCallKeepPerformAnswerCallAction";
static NSString *const RNCallKeepPerformEndCallAction = @"RNCallKeepPerformEndCallAction";
static NSString *const RNCallKeepDidActivateAudioSession = @"RNCallKeepDidActivateAudioSession";
static NSString *const RNCallKeepDidDeactivateAudioSession = @"RNCallKeepDidDeactivateAudioSession";
static NSString *const RNCallKeepDidDisplayIncomingCall = @"RNCallKeepDidDisplayIncomingCall";
static NSString *const RNCallKeepDidPerformSetMutedCallAction = @"RNCallKeepDidPerformSetMutedCallAction";
static NSString *const RNCallKeepPerformPlayDTMFCallAction = @"RNCallKeepDidPerformDTMFAction";
static NSString *const RNCallKeepDidToggleHoldAction = @"RNCallKeepDidToggleHoldAction";
static NSString *const RNCallKeepProviderReset = @"RNCallKeepProviderReset";
static NSString *const RNCallKeepCheckReachability = @"RNCallKeepCheckReachability";
static NSString *const RNCallKeepDidChangeAudioRoute = @"RNCallKeepDidChangeAudioRoute";
static NSString *const RNCallKeepDidLoadWithEvents = @"RNCallKeepDidLoadWithEvents";

static void InitializeFlipper(UIApplication *application) {
  FlipperClient *client = [FlipperClient sharedClient];
  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
  [client addPlugin:[FlipperKitReactPlugin new]];
  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
  [client start];
}
#endif

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
 [FIRApp configure]; 

#ifdef FB_SONARKIT_ENABLED
  InitializeFlipper(application);
#endif
NSDictionary *appProperties = [RNFBMessagingModule addCustomPropsToUserProps:nil withLaunchOptions:launchOptions];
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"SelfInspection"
                                            initialProperties:appProperties];

  if (@available(iOS 13.0, *)) {
      rootView.backgroundColor = [UIColor systemBackgroundColor];
  } else {
      rootView.backgroundColor = [UIColor whiteColor];
  }

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  // in AppDelegate.m
  [RNSplashScreen show]; 
  [[RCTI18nUtil sharedInstance] allowRTL:YES];
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  center.delegate = self;
  return YES;
}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
 [RNCPushNotificationIOS didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}
// Required for the notification event. You must call the completion handler after handling the remote notification.
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
  [RNCPushNotificationIOS didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}
// Required for the registrationError event.
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
 [RNCPushNotificationIOS didFailToRegisterForRemoteNotificationsWithError:error];
}
// Required for localNotification event
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
didReceiveNotificationResponse:(UNNotificationResponse *)response
         withCompletionHandler:(void (^)(void))completionHandler
{
  [RNCPushNotificationIOS didReceiveNotificationResponse:response];
}
//Called when a notification is delivered to a foreground app.
-(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
{
  completionHandler(UNNotificationPresentationOptionSound | UNNotificationPresentationOptionAlert | UNNotificationPresentationOptionBadge);
}
- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

//  - (BOOL)application:(UIApplication *)application
//  continueUserActivity:(NSUserActivity *)userActivity
//   restorationHandler:(void(^)(NSArray * __nullable restorableObjects))restorationHandler
//  {
//    return [RNCallKeep application:application
//             continueUserActivity:userActivity
//               restorationHandler:restorationHandler];
//  }


- (BOOL)application:(UIApplication *)application
   openURL:(NSURL *)url
   options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  return [RCTLinkingManager application:application openURL:url options:options];
}

- (BOOL)application:(UIApplication *)application continueUserActivity:(nonnull NSUserActivity *)userActivity
 restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler
{
 return [RCTLinkingManager application:application
                  continueUserActivity:userActivity
                    restorationHandler:restorationHandler];
}
@end
