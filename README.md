# React Native Expo Boilerplate

A modern, feature-based architecture React Native boilerplate built with Expo, TypeScript, and Tailwind CSS (NativeWind).

## 🚀 Features

- ⚡ **Expo Router** - File-based routing with type-safe navigation
- 🎨 **NativeWind** - Tailwind CSS for React Native
- 🌍 **i18n Support** - Multi-language support with expo-localization and i18next
- 🎯 **Feature-Based Architecture** - Scalable folder structure for large applications
- 📱 **Cross-Platform** - iOS, Android, and Web support
- 🔥 **TypeScript** - Fully typed with strict mode enabled
- 🎭 **Theming** - Light and dark mode support
- ✨ **Code Quality** - ESLint and Prettier configured
- 🌐 **API Client** - Auto-generated OpenAPI client with axios
- 🔐 **Authentication** - Token-based auth with secure storage
- ⚡ **React Query** - Data fetching and state management with TanStack Query

## 📁 Project Structure

```
│
├── 📱 app/                     ← Expo Router (file-based routing)
│   ├── (tabs)/                 ← Tab navigator group
│   │   ├── _layout.tsx        ← Tab navigation configuration
│   │   ├── index.tsx          ← Home route (imports from features)
│   │   └── explore.tsx        ← Explore route (imports from features)
│   ├── _layout.tsx            ← Root layout with providers
│   └── modal.tsx              ← Modal route (imports from features)
│
├── 🎯 features/               ← Feature-based architecture
│   ├── tabs/                  ← Tabs feature
│   │   ├── screens/          ← Screen components
│   │   │   ├── index.ts     ← Export barrel
│   │   │   ├── home-screen.tsx
│   │   │   └── explore-screen.tsx
│   │   ├── components/      ← Feature-specific components
│   │   └── utils/           ← Feature-specific utilities
│   └── modal/                ← Modal feature
│       ├── screens/
│       │   ├── index.ts
│       │   └── modal-screen.tsx
│       ├── components/
│       └── utils/
│
├── 🧩 components/             ← Reusable components
│   ├── ui/                   ← Basic UI components (buttons, inputs, etc.)
│   │   ├── collapsible.tsx
│   │   ├── icon-symbol.tsx
│   │   ├── themed-text.tsx
│   │   └── themed-view.tsx
│   └── shared/               ← Shared components used across features
│       ├── external-link.tsx
│       ├── haptic-tab.tsx
│       ├── hello-wave.tsx
│       ├── language-switcher.tsx
│       └── parallax-scroll-view.tsx
│
├── 🌐 api-client/            ← Auto-generated API client (OpenAPI)
│   ├── client/               ← HTTP client and request handlers
│   │   ├── client.gen.ts    ← Generated client methods
│   │   ├── types.gen.ts     ← API types and interfaces
│   │   └── utils.gen.ts     ← Utility functions
│   └── core/                 ← Core API functionality
│       ├── auth.gen.ts      ← Authentication utilities
│       ├── params.gen.ts    ← Request parameter handling
│       └── pathSerializer.gen.ts ← URL path serialization
│
├── 🪝 hooks/                  ← Custom React hooks
│   ├── use-color-scheme.ts
│   ├── use-theme-color.ts
│   └── use-translation.ts    ← i18n translation hook
│
├── 📦 context/                ← React Context providers
│   └── language-context.tsx  ← Language state management
│
├── 🌐 i18n/                   ← Internationalization
│   ├── config.ts             ← i18next configuration
│   └── locales/
│       ├── en.json           ← English translations
│       └── fr.json           ← French translations
│
├── 🔧 lib/                    ← Utility functions and helpers
├── ⚙️ constants/              ← Global constants (theme, colors, fonts)
└── 🎨 assets/                 ← Images, fonts, and static assets
```

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | React Native 0.81.5, React 19.1.0 |
| **Platform** | Expo ~54.0 |
| **Navigation** | Expo Router (file-based routing) |
| **Styling** | NativeWind 4.x (Tailwind CSS) |
| **Language** | TypeScript 5.9 |
| **i18n** | expo-localization, i18next, react-i18next |
| **API Client** | Axios 1.x, OpenAPI TypeScript client |
| **State Management** | TanStack React Query 5.x |
| **Storage** | expo-secure-store |
| **Icons** | Expo Vector Icons, Expo Symbols |
| **Linting** | ESLint 9.x |
| **Formatting** | Prettier 3.x |

## 📦 Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npx expo start
```

4. Open the app in:
   - iOS Simulator: Press `i`
   - Android Emulator: Press `a`
   - Web Browser: Press `w`

## 🌍 Internationalization

The app supports multi-language out of the box with English and French translations.

### Usage

```tsx
import { useAppTranslation } from "@/hooks/use-translation";

export function MyComponent() {
  const { t, changeLanguage, currentLanguage } = useAppTranslation();

  return (
    <View>
      <ThemedText>{t("common.welcome")}</ThemedText>

      {/* With interpolation */}
      <ThemedText>{t("home.step1Description", {
        fileName: "app.tsx",
        shortcut: "Cmd+D"
      })}</ThemedText>
    </View>
  );
}
```

### Adding New Languages

1. Create a new locale file: `i18n/locales/es.json`
2. Add translations following the structure in `en.json`
3. Update `i18n/config.ts` to import and include the new language

### Language Switcher Component

```tsx
import { LanguageSwitcher } from "@/components/shared/language-switcher";

<LanguageSwitcher />
```

## 🌐 API Integration

The project includes an auto-generated API client with full TypeScript support and React Query integration.

### Configuration

The API client is configured in `lib/axios.ts`:

- **Base URL**: Set via `EXPO_PUBLIC_API_URL` environment variable (defaults to `http://localhost:8000`)
- **Authentication**: Automatically adds Bearer token from secure storage
- **Interceptors**: Handles request/response transformations
- **Ngrok Support**: Includes ngrok skip browser warning header

### Using the API Client

```tsx
import { useQuery } from "@tanstack/react-query";
import { client } from "@/api-client/client.gen";
import { useAppTranslation } from "@/hooks/use-translation";

export function UserProfile() {
  const { t } = useAppTranslation();

  const { data, isLoading, error } = useQuery({
    queryKey: ["user", "profile"],
    queryFn: () => client.GET("/user/profile"),
  });

  if (isLoading) return <ThemedText>{t("common.loading")}</ThemedText>;
  if (error) return <ThemedText>Error loading profile</ThemedText>;

  return (
    <ThemedView>
      <ThemedText>Welcome, {data?.data?.name}</ThemedText>
    </ThemedView>
  );
}
```

### Authentication

The API client automatically includes the authentication token from secure storage:

```tsx
import * as SecureStore from "expo-secure-store";

// Store token after login
await SecureStore.setItemAsync("access_token", token);

// Token is automatically added to all requests
```

### Mutations with React Query

```tsx
import { useMutation } from "@tanstack/react-query";
import { client } from "@/api-client/client.gen";

export function LoginScreen() {
  const login = useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      client.POST("/auth/login", { body: credentials }),
    onSuccess: (data) => {
      // Store token and navigate
      SecureStore.setItemAsync("access_token", data.data.token);
    },
  });

  return (
    <Button onPress={() => login.mutate({ email, password })}>
      Login
    </Button>
  );
}
```

## 🏗️ Creating New Features

1. Create a feature folder:

```bash
mkdir -p features/my-feature/{screens,components,utils}
```

2. Create your screen in `features/my-feature/screens/`:

```tsx
// features/my-feature/screens/my-screen.tsx
import { ThemedText } from "@/components/ui/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { useAppTranslation } from "@/hooks/use-translation";

export function MyScreen() {
  const { t } = useAppTranslation();

  return (
    <ThemedView>
      <ThemedText>{t("common.welcome")}</ThemedText>
    </ThemedView>
  );
}
```

3. Create an export barrel:

```ts
// features/my-feature/screens/index.ts
export { MyScreen } from './my-screen';
```

4. Import in your route file:

```tsx
// app/my-route.tsx
import { MyScreen } from "@/features/my-feature/screens";

export default MyScreen;
```

## 🎨 Styling

This project uses **NativeWind** (Tailwind CSS for React Native).

### Example

```tsx
<View className="flex-1 items-center justify-center bg-white dark:bg-black">
  <Text className="text-xl font-bold text-blue-500 dark:text-blue-300">
    Hello World
  </Text>
</View>
```

### Theming

Access theme colors in components:

```tsx
import { useThemeColor } from "@/hooks/use-theme-color";

const backgroundColor = useThemeColor({}, "background");
```

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Expo development server |
| `npm run android` | Run on Android emulator |
| `npm run ios` | Run on iOS simulator |
| `npm run web` | Run in web browser |
| `npm run lint` | Run ESLint |
| `npm run lint -- --fix` | Fix linting issues automatically |

## 🧹 Clean Slate

To start with a clean app directory:

```bash
npm run reset-project
```

This moves the current `app/` to `app-example/` and creates a blank `app/` directory.

## 📚 Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router Guide](https://docs.expo.dev/router/introduction/)
- [NativeWind Documentation](https://www.nativewind.dev/)
- [React Native Documentation](https://reactnative.dev/)

## 📄 License

This project is open source and available under the MIT License.
