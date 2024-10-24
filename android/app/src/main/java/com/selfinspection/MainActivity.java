package com.selfinspection;

//import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRoot;
import android.app.Activity;
import android.app.ActivityManager;
import android.app.KeyguardManager;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.view.WindowManager;

import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.ContentResolver;
import android.media.AudioAttributes;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
// import the package
// import androidx.annotation.NonNull;
import androidx.core.app.NotificationCompat;

import com.christopherdro.htmltopdf.RNHTMLtoPDFPackage;
// import io.wazo.callkeep.RNCallKeepModule; // Add these import lines

// include package


public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
/*   new MainReactPackage(),
  new RNHTMLtoPDFPackage() */

    //   @Override
    // public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
    //     super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    //     switch (requestCode) {
    //         case RNCallKeepModule.REQUEST_READ_PHONE_STATE:
    //             RNCallKeepModule.onRequestPermissionsResult(requestCode, permissions, grantResults);
    //             break;
    //     }
    // }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this);  // here
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      NotificationChannel notificationChannel = new NotificationChannel("sound_channel", "selfinspection", NotificationManager.IMPORTANCE_HIGH);
      notificationChannel.setShowBadge(true);
      notificationChannel.setDescription("");
      AudioAttributes att = new AudioAttributes.Builder()
              .setUsage(AudioAttributes.USAGE_NOTIFICATION)
              .setContentType(AudioAttributes.CONTENT_TYPE_SPEECH)
              .build();
      notificationChannel.setSound(Uri.parse(ContentResolver.SCHEME_ANDROID_RESOURCE + "://" + getPackageName() + "/raw/ring_bell"), att);
      notificationChannel.enableVibration(true);
      notificationChannel.setVibrationPattern(new long[]{400, 400});
      notificationChannel.setLockscreenVisibility(NotificationCompat.VISIBILITY_PUBLIC);
      NotificationManager manager = getSystemService(NotificationManager.class);
      manager.createNotificationChannel(notificationChannel);
    }

    super.onCreate(savedInstanceState);

  }

  @Override
  protected String getMainComponentName() {
    return "SelfInspection";
  }
}



