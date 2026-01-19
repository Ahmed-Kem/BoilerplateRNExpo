# Claude AI Assistant Guide - React Native Expo Boilerplate

This guide helps AI assistants understand the architecture, conventions, and patterns used in this React Native Expo boilerplate project.

## Project Overview

**Type**: React Native mobile application with Expo
**Architecture**: Feature-based architecture with file-based routing
**Language**: TypeScript (strict mode enabled)
**Styling**: NativeWind (Tailwind CSS for React Native)
**State Management**: TanStack React Query for server state, React Context for global state

## Key Technologies

- **Expo SDK ~54.0** - React Native development platform
- **Expo Router** - File-based navigation system
- **NativeWind 4.x** - Utility-first CSS framework
- **TanStack React Query 5.x** - Data fetching and caching
- **Axios 1.x** - HTTP client with auto-generated OpenAPI types
- **i18next** - Internationalization framework
- **expo-secure-store** - Secure token storage

## Path Aliases

The project uses path aliases defined in `tsconfig.json`:
- `@/*` - Root directory alias (e.g., `@/components/ui/themed-text`)
- `~/*` - Alternative root alias

**Always use these aliases** instead of relative paths (e.g., `../../../components`).

## Architecture Patterns

### Feature-Based Structure

The codebase follows a **feature-based architecture** where related code (screens, components, utils) is grouped by feature:

```
features/
├── tabs/
│   ├── screens/          # Tab screen components
│   ├── components/       # Feature-specific components
│   └── utils/           # Feature-specific utilities
└── modal/
    ├── screens/
    ├── components/
    └── utils/
```

**Rule**: When creating new features, follow this pattern:
1. Create a new folder under `features/`
2. Organize into `screens/`, `components/`, and `utils/`
3. Create an `index.ts` barrel file to exports public APIs
4. Import from features in your route files under `app/`

### Component Organization

```
components/
├── ui/                  # Basic, reusable UI components
│   ├── themed-text.tsx
│   ├── themed-view.tsx
│   └── ...
└── shared/              # Shared, composite components
    ├── language-switcher.tsx
    ├── hello-wave.tsx
    └── ...
```

**UI Components** (`components/ui/`): Basic, theme-aware components with minimal logic
**Shared Components** (`components/shared/`): Complex components used across features

### Route Organization

Routes live in `app/` and use **Expo Router's file-based routing**:
- `(tabs)/` - Tab navigation group
- `modal.tsx` - Modal route
- `_layout.tsx` - Root layout with providers

**Rule**: Route files should be thin and import screens from features:
```tsx
// app/index.tsx
import { HomeScreen } from "@/features/tabs/screens";

export default HomeScreen;
```

## Conventions & Best Practices

### 1. TypeScript

- **Strict mode is enabled** - All types must be explicitly defined
- Use interfaces for object shapes
- Use type aliases for union types and primitives
- Avoid `any` - use `unknown` when type is truly unknown

### 2. Components

**Functional components only** - No class components
```tsx
import { ThemedText } from "@/components/ui/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { useAppTranslation } from "@/hooks/use-translation";

export function MyComponent({ prop }: { prop: string }) {
  const { t } = useAppTranslation();

  return (
    <ThemedView>
      <ThemedText>{t("common.welcome")}</ThemedText>
    </ThemedView>
  );
}
```

**Always use ThemedText and ThemedView** for theme support:
```tsx
import { ThemedText } from "@/components/ui/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
```

### 3. Styling with NativeWind

**Use Tailwind utility classes** for styling:
```tsx
<View className="flex-1 items-center justify-center p-4 bg-white dark:bg-black">
  <Text className="text-xl font-bold text-blue-500">
    Hello World
  </Text>
</View>
```

**Dark mode support**: Use `dark:` prefix
```tsx
<Text className="text-blue-500 dark:text-blue-300">
  Adaptive text
</Text>
```

**Theme colors**: Use `useThemeColor` hook for dynamic theme colors
```tsx
const backgroundColor = useThemeColor({}, "background");
```

### 4. Internationalization (i18n)

**Always use translations** for user-facing text:
```tsx
import { useAppTranslation } from "@/hooks/use-translation";

const { t } = useAppTranslation();
<ThemedText>{t("common.welcome")}</ThemedText>
```

**With interpolation**:
```tsx
<ThemedText>
  {t("home.step1Description", {
    fileName: "app.tsx",
    shortcut: "Cmd+D"
  })}
</ThemedText>
```

**Translation keys**: Define in `i18n/locales/en.json` and `i18n/locales/fr.json`

### 5. API Integration

**Use the auto-generated API client** from `@/api-client`:
```tsx
import { client } from "@/api-client/client.gen";
import { useQuery } from "@tanstack/react-query";

const { data } = useQuery({
  queryKey: ["user", "profile"],
  queryFn: () => client.GET("/user/profile"),
});
```

**For mutations**:
```tsx
import { useMutation } from "@tanstack/react-query";

const mutation = useMutation({
  mutationFn: (body: LoginRequest) =>
    client.POST("/auth/login", { body }),
});
```

**Authentication**: Token is automatically added via interceptors
```tsx
// Store token after login
import * as SecureStore from "expo-secure-store";
await SecureStore.setItemAsync("access_token", token);
```

**API Base URL**: Configure via `EXPO_PUBLIC_API_URL` environment variable

### 6. React Query Patterns

**Query keys**: Use hierarchical arrays for cache keys
```tsx
// Good
queryKey: ["user", "profile"]
queryKey: ["posts", postId, "comments"]

// Avoid
queryKey: "userProfile"
```

**Query functions**: Use the auto-generated client
```tsx
queryFn: () => client.GET("/endpoint", { parameters: {...} })
```

### 7. File Naming

- **Components**: kebab-case (e.g., `hello-wave.tsx`)
- **Screens**: kebab-case with `-screen` suffix (e.g., `home-screen.tsx`)
- **Utilities**: kebab-case with `use-` prefix for hooks (e.g., `use-translation.ts`)
- **Types**: Use `.gen.ts` for auto-generated files

### 8. Imports

**Order imports** in this specific order:
1. React imports
2. Third-party libraries
3. Internal imports (with @ alias)
4. Relative imports
5. Types (if separate)

```tsx
import React from "react";
import { View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { ThemedText } from "@/components/ui/themed-text";
import { MyComponent } from "./my-component";
```

## Environment Variables

- **EXPO_PUBLIC_API_URL**: API base URL (defaults to `http://localhost:8000`)

Variables prefixed with `EXPO_PUBLIC_` are available in the app runtime.

## Scripts

### Development
```bash
npm start              # Start Expo dev server
npm run android        # Run on Android
npm run ios           # Run on iOS
npm run web           # Run in web browser
```

### Code Quality
```bash
npm run lint          # Run ESLint
npm run lint -- --fix # Fix linting issues
```

### API Client
```bash
npm run generate-client    # Regenerate API client from OpenAPI spec
```

### Build & Deploy (via Makefile)
```bash
make help              # Show all available commands
make build-android     # Build Android AAB
make build-apk         # Convert AAB to APK
make install-apk       # Install APK on connected device
make deploy            # Full build + install
```

## Common Tasks

### Adding a New Feature

1. Create feature directory:
```bash
mkdir -p features/my-feature/{screens,components,utils}
```

2. Create screen component:
```tsx
// features/my-feature/screens/my-screen.tsx
import { ThemedText } from "@/components/ui/themed-text";
import { ThemedView } from "@/components/ui/themed-view";

export function MyScreen() {
  return (
    <ThemedView>
      <ThemedText>My Feature</ThemedText>
    </ThemedView>
  );
}
```

3. Create barrel export:
```ts
// features/my-feature/screens/index.ts
export { MyScreen } from './my-screen';
```

4. Add route:
```tsx
// app/my-feature.tsx
import { MyScreen } from "@/features/my-feature/screens";

export default MyScreen;
```

### Adding a New Translation

1. Add to `i18n/locales/en.json`:
```json
{
  "myFeature": {
    "title": "My Feature"
  }
}
```

2. Add to `i18n/locales/fr.json`:
```json
{
  "myFeature": {
    "title": "Ma Fonctionnalité"
  }
}
```

3. Use in component:
```tsx
const { t } = useAppTranslation();
<ThemedText>{t("myFeature.title")}</ThemedText>
```

### Adding a New Language

1. Create `i18n/locales/es.json`
2. Update `i18n/config.ts`:
```ts
import es from "./locales/es.json";
i18n.addResourceBundle("es", "translation", es);
```

### Regenerating API Client

When the OpenAPI spec changes:

```bash
npm run generate-client
```

This regenerates files in `api-client/` directory.

## Important Notes

### What NOT to Do

❌ **Don't** use relative imports (e.g., `../../../components`)
✅ **Do** use path aliases (e.g., `@/components/ui/themed-text`)

❌ **Don't** create class components
✅ **Do** use functional components with hooks

❌ **Don't** use inline styles (mostly)
✅ **Do** use NativeWind utility classes

❌ **Don't** hardcode user-facing text
✅ **Do** use the `useAppTranslation` hook

❌ **Don't** fetch data without React Query
✅ **Do** use `useQuery` and `useMutation` hooks

❌ **Don't** create components in `app/` directory
✅ **Do** keep route files thin, import from features

### File Safety

**Auto-generated files** - DO NOT EDIT manually:
- `api-client/**` - Generated from OpenAPI spec
- `expo-env.d.ts` - Expo type definitions
- `nativewind-env.d.ts` - NativeWind type definitions

### Testing

Before committing changes:
1. Run `npm run lint` to check for linting errors
2. Test on iOS/Android simulators if adding UI changes
3. Test API calls with proper authentication if adding API integration

## Quick Reference

### Common Imports

```tsx
// Components
import { ThemedText } from "@/components/ui/themed-text";
import { ThemedView } from "@/components/ui/themed-view";

// Hooks
import { useAppTranslation } from "@/hooks/use-translation";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useColorScheme } from "@/hooks/use-color-scheme";

// API
import { client } from "@/api-client/client.gen";
import { useQuery, useMutation } from "@tanstack/react-query";

// Storage
import * as SecureStore from "expo-secure-store";

// Navigation
import { useRouter, useLocalSearchParams } from "expo-router";
```

### Directory Quick Access

- `app/` - Routes and navigation
- `features/` - Feature modules
- `components/` - Reusable components
- `hooks/` - Custom React hooks
- `lib/` - Utilities (axios config, etc.)
- `constants/` - Theme and app constants
- `i18n/` - Translations and i18n config
- `context/` - React Context providers
- `api-client/` - Auto-generated API client

## Getting Help

- **Expo Docs**: https://docs.expo.dev/
- **Expo Router**: https://docs.expo.dev/router/introduction/
- **NativeWind**: https://www.nativewind.dev/
- **React Query**: https://tanstack.com/query/latest
- **i18next**: https://www.i18next.com/

---

**Last Updated**: January 19th 2026
**Framework Version**: Expo ~54.0, React Native 0.81.5
