# Cloud

## Prerequisites
These dependencies can be equal or greater.
```bash
$ node -v && npm -v && yarn -v
v15.6.0
7.4.0
1.22.10
```

## Installation
```bash
$ npx react-native init Cloud
```

## Mapbox API key
Create a `.env` file at the root level of this project and save your [Mapbox access token](https://docs.mapbox.com/help/how-mapbox-works/access-tokens/).
```env
NODE_ENV=development
MAPBOX_API_TOKEN=your_mapbox_api_key_here
```

## Development
```bash
$ yarn dev
```

## Production
APK will be present in `Cloud/android/app/build/outputs/apk/release/`.
```bash
$ cd Cloud
$ keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
$ mv my-release-key.keystore ./android/app
$ # replace **** with your password
$ cat > ./android/gradle.properties << EOF
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=****
MYAPP_RELEASE_KEY_PASSWORD=****
EOF
$ cat > ./android/app/build.gradle << EOF
android {
    
	...

    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
                storeFile file(MYAPP_RELEASE_STORE_FILE)
                storePassword MYAPP_RELEASE_STORE_PASSWORD
                keyAlias MYAPP_RELEASE_KEY_ALIAS
                keyPassword MYAPP_RELEASE_KEY_PASSWORD
            }
        }
    }
    
    ...

    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
    
    ...
}
EOF
$ cd android && ./gradlew assembleRelease
```

## Installation
```bash
$ adb install -r Cloud/android/app/build/outputs/apk/release/app-release.apk
```