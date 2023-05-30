package com.myapp; // replace your-apps-package-name with your app’s package name
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.Arguments;

import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.graphics.drawable.Drawable;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.io.File;

import javax.annotation.Nullable;

import com.helper.*;

public class AppListModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    public AppListModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNAndroidInstalledApps";
    }

    @ReactMethod
    public void getApps(Promise promise) {
        try {

            int flags = PackageManager.GET_META_DATA;

            PackageManager pm = this.reactContext.getPackageManager();
            List<ApplicationInfo> applications = pm.getInstalledApplications(flags);
            WritableArray list = Arguments.createArray();
            for (ApplicationInfo appInfo : applications) {
                if ((appInfo.flags & ApplicationInfo.FLAG_SYSTEM) == 1) {
                    // System application
                } else {
                    // Installed by user
                    WritableMap appInfoList = Arguments.createMap();
                    appInfoList.putString("packageName", appInfo.packageName);
                    appInfoList.putString("appName", ((String) appInfo.loadLabel(pm)).trim());
                list.pushMap(appInfoList);
                }
            }
            promise.resolve(list);

//            PackageManager pm = this.reactContext.getPackageManager();
//            List<ApplicationInfo> packages = pm.getInstalledApplications(PackageManager.GET_META_DATA);
//            WritableArray list = Arguments.createArray();
//            for (ApplicationInfo packageInfo : packages) {
//                WritableMap appInfo = Arguments.createMap();
//                appInfo.putString("packageName", packageInfo.packageName);
//                appInfo.putString("appName", ((String) packageInfo.loadLabel(pm)).trim());
//                list.pushMap(appInfo);
//            }
//            promise.resolve(list);
//            List<PackageInfo> pList = pm.getInstalledPackages(0);
//            WritableArray list = Arguments.createArray();
//            for (int i = 0; i < pList.size(); i++) {
//                PackageInfo packageInfo = pList.get(i);
//                WritableMap appInfo = Arguments.createMap();
//
//                appInfo.putString("packageName", packageInfo.packageName);
//                appInfo.putString("versionName", packageInfo.versionName);
//                appInfo.putDouble("versionCode", packageInfo.versionCode);
//                appInfo.putDouble("firstInstallTime", (packageInfo.firstInstallTime));
//                appInfo.putDouble("lastUpdateTime", (packageInfo.lastUpdateTime));
//                appInfo.putString("appName", ((String) packageInfo.applicationInfo.loadLabel(pm)).trim());
//
//                Drawable icon = pm.getApplicationIcon(packageInfo.applicationInfo);
//                appInfo.putString("icon", Utility.convert(icon));
//
//                String apkDir = packageInfo.applicationInfo.publicSourceDir;
//                appInfo.putString("apkDir", apkDir);
//
//                File file = new File(apkDir);
//                double size = file.length();
//                appInfo.putDouble("size", size);
//
//                list.pushMap(appInfo);
//            }
//            promise.resolve(list);
        } catch (Exception ex) {
            promise.reject(ex);
        }
    }

    @ReactMethod
    public void getNonSystemApps(Promise promise) {
        try {
            PackageManager pm = this.reactContext.getPackageManager();
            List<PackageInfo> pList = pm.getInstalledPackages(0);
            WritableArray list = Arguments.createArray();
            for (int i = 0; i < pList.size(); i++) {
                PackageInfo packageInfo = pList.get(i);
                WritableMap appInfo = Arguments.createMap();

                if ((packageInfo.applicationInfo.flags & ApplicationInfo.FLAG_SYSTEM) == 0) {
                    appInfo.putString("packageName", packageInfo.packageName);
                    appInfo.putString("versionName", packageInfo.versionName);
                    appInfo.putDouble("versionCode", packageInfo.versionCode);
                    appInfo.putDouble("firstInstallTime", (packageInfo.firstInstallTime));
                    appInfo.putDouble("lastUpdateTime", (packageInfo.lastUpdateTime));
                    appInfo.putString("appName", ((String) packageInfo.applicationInfo.loadLabel(pm)).trim());

                    Drawable icon = pm.getApplicationIcon(packageInfo.applicationInfo);
                    appInfo.putString("icon", Utility.convert(icon));

                    String apkDir = packageInfo.applicationInfo.publicSourceDir;
                    appInfo.putString("apkDir", apkDir);

                    File file = new File(apkDir);
                    double size = file.length();
                    appInfo.putDouble("size", size);

                    list.pushMap(appInfo);
                }
            }
            promise.resolve(list);
        } catch (Exception ex) {
            promise.reject(ex);
        }

    }

    @ReactMethod
    public void getSystemApps(Promise promise) {
        try {
            PackageManager pm = this.reactContext.getPackageManager();
            List<PackageInfo> pList = pm.getInstalledPackages(0);
            WritableArray list = Arguments.createArray();
            for (int i = 0; i < pList.size(); i++) {
                PackageInfo packageInfo = pList.get(i);
                WritableMap appInfo = Arguments.createMap();

                if ((packageInfo.applicationInfo.flags & ApplicationInfo.FLAG_SYSTEM) != 0) {
                    appInfo.putString("packageName", packageInfo.packageName);
                    appInfo.putString("versionName", packageInfo.versionName);
                    appInfo.putDouble("versionCode", packageInfo.versionCode);
                    appInfo.putDouble("firstInstallTime", (packageInfo.firstInstallTime));
                    appInfo.putDouble("lastUpdateTime", (packageInfo.lastUpdateTime));
                    appInfo.putString("appName", ((String) packageInfo.applicationInfo.loadLabel(pm)).trim());

                    Drawable icon = pm.getApplicationIcon(packageInfo.applicationInfo);
                    appInfo.putString("icon", Utility.convert(icon));

                    String apkDir = packageInfo.applicationInfo.publicSourceDir;
                    appInfo.putString("apkDir", apkDir);

                    File file = new File(apkDir);
                    double size = file.length();
                    appInfo.putDouble("size", size);

                    list.pushMap(appInfo);
                }
            }
            promise.resolve(list);
        } catch (Exception ex) {
            promise.reject(ex);
        }

    }
}