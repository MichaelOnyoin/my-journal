# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.


# Project Overview: Personal Journaling App
## Objective

<p> Create a mobile application and a backend service for personal journaling. Users
should be able to write journal entries, categorize them, and view a summary of
their entries.</p>

## Documentation 
Welcome to my-journal mobile app built using React-native and expo
### Step 1: Initialize App
```bash 
 npx create-expo-app  my-journal
```
### Step 2: Install Dependencies
```bash
npm install
```
### Step 3: Run app
```bash
npx expo start
```

### Step 4: Download Expo Go on App Stores
 
<p> N.B: Scan the QR code above with Expo Go (Android) or the Camera app (iOS) </p>

### Step 5: Explore App

## Backend Development: Was built using Supabase (supabase.com) 
<code>
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = ''
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
</code>

### Users Table : 
let { data: Users, error } = await supabase
  .from('Users')
  .select('id')
![image](https://github.com/user-attachments/assets/8d3b4f68-9a43-434e-87af-74dcb3de73e0)

  
### Journals Table
let { data: Journals, error } = await supabase
  .from('Journals')
  .select('id')
![image](https://github.com/user-attachments/assets/e89fe858-1f80-4cfe-8ec2-7be6049b1068)

## Screenshots
<img src="./assets/Screenshots/Screenshot_20240724-165041_Expo Go.jpg" width="300"><&nbsp;> <img src="./assets/Screenshots/Screenshot_20240724-165122_Expo Go.jpg" width="300">


## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
