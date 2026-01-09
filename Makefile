.PHONY: help clean build-android build-apk install-apk dev-android

# Variables
APP_NAME = boilerplaternexpo
BUILD_DIR = .
AAB_FILE = $(shell ls -t build-*.aab 2>/dev/null | head -n1)
APK_FILE = $(shell echo $(AAB_FILE) | sed 's/\.aab$$/.apk/')

help: ## Affiche l'aide
	@echo "Commandes disponibles pour $(APP_NAME):"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

clean: ## Nettoie les builds précédents
	@echo "🧹 Nettoyage des builds..."
	rm -f build-*.aab build-*.apk build-*.apks
	cd android && ./gradlew clean
	@echo "✅ Nettoyage terminé"

build-android: ## Build Android (génère un AAB)
	@echo "🔨 Build Android en cours..."
	npx expo run:android --variant release
	@echo "✅ Build Android terminé"

build-android-dev: ## Build Android avec profil development
	@echo "🔨 Build Android (development) en cours..."
	eas build --platform android --profile development --local
	@echo "✅ Build Android (development) terminé"

build-android-preview: ## Build Android avec profil preview (APK direct)
	@echo "🔨 Build Android (preview) en cours..."
	eas build --platform android --profile preview --local
	@echo "✅ Build Android (preview) terminé"

build-android-prod: ## Build Android avec profil production
	@echo "🔨 Build Android (production) en cours..."
	eas build --platform android --profile production --local
	@echo "✅ Build Android (production) terminé"

build-apk: ## Convertit le dernier AAB en APK
	@if [ -z "$(AAB_FILE)" ]; then \
		echo "❌ Aucun fichier AAB trouvé. Lancez d'abord 'make build-android'"; \
		exit 1; \
	fi
	@echo "📦 Conversion AAB vers APK..."
	@echo "Fichier source: $(AAB_FILE)"
	bundletool build-apks \
		--bundle="$(AAB_FILE)" \
		--output="$(shell echo $(AAB_FILE) | sed 's/\.aab$$/.apks/')" \
		--mode=universal
	@echo "🔓 Extraction de l'APK..."
	unzip -j "$(shell echo $(AAB_FILE) | sed 's/\.aab$$/.apks/')" universal.apk
	mv universal.apk "$(APK_FILE)"
	rm "$(shell echo $(AAB_FILE) | sed 's/\.aab$$/.apks/')"
	@echo "✅ APK généré: $(APK_FILE)"

install-apk: ## Installe l'APK sur le téléphone connecté
	@if [ -z "$(APK_FILE)" ] || [ ! -f "$(APK_FILE)" ]; then \
		echo "❌ Aucun fichier APK trouvé. Lancez d'abord 'make build-apk'"; \
		exit 1; \
	fi
	@echo "📱 Installation de l'APK sur le téléphone..."
	adb install -r "$(APK_FILE)"
	@echo "✅ Installation terminée"

dev-android: ## Lance le serveur de développement Android
	@echo "🚀 Lancement du serveur de dev..."
	npx expo start --android

full-build: clean build-android build-apk ## Build complet: clean + build + APK
	@echo "🎉 Build complet terminé!"
	@echo "📦 APK disponible: $(APK_FILE)"

deploy: full-build install-apk ## Build complet + installation sur téléphone
	@echo "🎉 Déploiement terminé sur le téléphone!"

deploy-testflight: ## Build iOS (production) et déploiement sur TestFlight
	@echo "🍏 Déploiement TestFlight en cours..."
	@if ! command -v eas >/dev/null 2>&1; then \
		echo "❌ EAS CLI non trouvé. Installe-le avec : npm install -g eas-cli"; \
		exit 1; \
	fi
	@echo "🔨 Build iOS ..."
	eas build --platform ios --auto-submit
	@if [ $$? -ne 0 ]; then \
		echo "❌ Build iOS échoué"; \
		exit 1; \
	fi
	@echo "✅ Déploiement sur TestFlight terminé avec succès!"

# Commandes utiles pour le debug
check-device: ## Vérifie les appareils connectés
	@echo "📱 Appareils connectés:"
	adb devices

logs: ## Affiche les logs Android
	@echo "📋 Logs Android:"
	adb logcat | grep -i $(APP_NAME)

# Informations système
info: ## Affiche les informations du projet
	@echo "ℹ️  Informations du projet:"
	@echo "Nom: $(APP_NAME)"
	@echo "Dernier AAB: $(AAB_FILE)"
	@echo "APK correspondant: $(APK_FILE)"
	@echo ""
	@echo "📋 Outils requis:"
	@which bundletool > /dev/null && echo "✅ bundletool installé" || echo "❌ bundletool manquant"
	@which adb > /dev/null && echo "✅ adb installé" || echo "❌ adb manquant"
	@which npx > /dev/null && echo "✅ npx installé" || echo "❌ npx manquant"