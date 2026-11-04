---
layout: ../../layouts/Legal.astro
title: Privacy Policy — TM Forwarder
description: Privacy policy for the TM Forwarder mobile application.
---

**Privacy Policy**

Effective date: 2026-11-04

This privacy policy explains what information the TM Forwarder Android app (the "app") handles, where that information goes, and what choices you have. TM Forwarder is built and operated by Sep Behroozi ("I", "me").

TM Forwarder is an independent, unofficial Telegram client. It is not affiliated with, endorsed by, or operated by Telegram.

**Summary**

*   I do not run my own servers for TM Forwarder. Your messages, chats and forwarding rules stay on your device and with Telegram.
*   The app signs in to your Telegram account so it can read messages in the chats you choose and send them to the chats you choose.
*   Your Telegram username is sent to RevenueCat, the service that manages Pro subscriptions, so the app can tell whether you have Pro.
*   The app uses Google Firebase for usage analytics, crash reports, performance monitoring, push notifications and remote configuration. Message text, chat names, chat IDs, phone numbers, login codes and passwords are never sent to analytics.
*   The app does not show ads and does not use the Android advertising ID.

**Your Telegram account**

To work, the app signs in to your Telegram account using TDLib, Telegram's official client library. When you sign in, your phone number, the login code and, if you use one, your two-step verification password are sent directly to Telegram's servers. I never receive them.

Once you are signed in, the app acts as a Telegram client on your behalf. It receives updates from your Telegram account, reads new messages in the source chats of your forwarding rules, applies your rules (for example keyword filters, text clean-up, custom text, duplicate detection and scheduling), and sends the result to your destination chats from your account. Like any Telegram app, it keeps a local copy of Telegram data, such as your chat list, messages, profile photos and login session, in an encrypted database on your device.

Your use of Telegram itself is covered by [Telegram's Privacy Policy](https://telegram.org/privacy).

**Information stored on your device**

The app stores the following on your device. It is not sent to me.

*   **Forwarding rules and settings.**
*   **Forwarding history** for the statistics screen: for each processed message, the time, the rule, the source and destination chat IDs, the content type (for example text or photo) and whether it was filtered out. History is kept for 7 days on the free tier, or for the period you choose on Pro (up to 2 years), and is then deleted automatically.
*   **Scheduled messages.** Messages waiting to be sent by a scheduled rule, including a short text preview, are kept until they are sent or the queue is cleared.
*   **Duplicate detection data.** To skip messages you have already forwarded, the app keeps fingerprints of forwarded messages. Message text is stored only as a one-way SHA-256 hash, not as readable text.
*   **Notification center.** Notifications I send about the app (see "Push notifications" below) are kept in the in-app notification center.
*   **Diagnostic log.** If you turn on debug logging, the app writes technical events (such as the service starting or stopping, errors, and chat and message IDs) to a log file. The log is designed not to include message text. It never leaves your device unless you open or share it yourself from the About screen, and you can clear it there at any time.

**Device backups**

Depending on your Android backup settings, Android may include the app's data, including the local Telegram data described above, in your device backup to your Google account. These backups are handled by Google under your Google account settings. You can turn off backup in your device settings.

**Information sent to third-party services**

The app uses the following third-party services. Each one receives only what is described here, and handles it under its own privacy policy.

*   **RevenueCat** manages Pro subscriptions. When you sign in to Telegram in the app, your Telegram username (if you have one) is sent to RevenueCat and used as your RevenueCat user ID. This happens whether or not you buy Pro. RevenueCat also receives your Google Play purchase and subscription history for the app, an app-generated identifier, and basic device information such as device model, operating system version, app version, language and country. This is used to check whether you have Pro and to restore your subscription when you reinstall the app or sign in on another device. Signing out of Telegram in the app also signs you out of RevenueCat on that device, but data already sent stays with RevenueCat until it is deleted (see "Keeping and deleting your information" below).
*   **Google Play Billing** processes payments for Pro. I never receive your payment card or other payment details.
*   **Google Analytics for Firebase** records how the app is used, so I can improve it. The app logs these events: paywall views and where they were opened from, purchase started, completed, cancelled or failed, restore purchases, hitting a free-tier limit, creating a rule (with yes/no flags for which Pro features it uses and how many), and the steps of the sign-in flow (phone, code, password, success or error, without the values you entered). It also records whether you have Pro. Firebase automatically collects an app instance ID, device model, operating system version, app version, language, approximate location (country or region) derived from your IP address, and session times. The advertising ID is not collected.
*   **Firebase Crashlytics** receives crash and error reports. A report includes the error and stack trace, device model, operating system version, app version, device state at the time (such as free memory and disk space), and a Crashlytics installation ID.
*   **Firebase Performance Monitoring** measures app start time, screen rendering and the timing of network requests, together with device model, operating system version, app version and country.
*   **Firebase Cloud Messaging** delivers push notifications. The app registers a push token and subscribes to the "App Updates" and "Promotional" notification topics according to your notification settings.
*   **Firebase Remote Config** tells the app whether an update is required. It receives an app instance ID, the app version and your device's language and country.
*   **Google Play services**, including Google Play In-App Updates and In-App Review, are used to offer app updates and ask for a rating.
*   **Telegram** receives everything a Telegram client sends: your sign-in details, the messages the app forwards on your behalf, and your device model, system language and app version.

Links to the privacy policies of these services:

*   [RevenueCat](https://www.revenuecat.com/privacy)
*   [Google Play Services and Google Play Billing](https://policies.google.com/privacy)
*   [Google Analytics for Firebase](https://firebase.google.com/policies/analytics)
*   [Firebase Crashlytics, Performance Monitoring, Cloud Messaging and Remote Config](https://firebase.google.com/support/privacy/)
*   [Telegram](https://telegram.org/privacy)

**Push notifications**

The app can show notifications about app updates and promotions. Promotional notifications are off unless you turn them on. You can turn each type on or off in the app's notification settings, and you can turn off all of the app's notifications in Android settings. The app also shows a notification while forwarding is running in the background; Android requires this.

**How I use information**

I use the information described above only to:

*   provide the app's features and Pro subscriptions;
*   fix crashes and improve performance and reliability;
*   understand, in aggregate, how the app is used, so I can improve it;
*   send you notifications you have allowed.

I do not sell your information or use it for advertising.

**Sharing**

Apart from the services listed above, I do not share your information with anyone, except where required by law, such as to comply with a subpoena or similar legal process, or when I believe in good faith that disclosure is needed to protect my rights, your safety or the safety of others, or to investigate fraud.

**International transfers**

RevenueCat, Google and Telegram may process your information in countries other than your own, including the United States. Where the law requires it, these providers use recognized safeguards such as the European Commission's Standard Contractual Clauses.

**Keeping and deleting your information**

*   **Data on your device.** Signing out of Telegram in the app deletes your forwarding rules and forwarding history. Uninstalling the app, or clearing its storage in Android settings, deletes all of the app's data from your device.
*   **Telegram data.** Messages you have forwarded stay in your Telegram chats. Your Telegram account and its data are managed by Telegram. You can delete them from within Telegram.
*   **RevenueCat data.** Your RevenueCat record (Telegram username and subscription history) is kept as long as it is needed to manage your subscription. To have it deleted, email me at the address below. If you do, the app may not be able to restore a past purchase automatically. Google Play keeps its own record of your purchases.
*   **Firebase data.** Analytics, crash and performance data is kept according to Google's retention settings for Firebase, and then deleted automatically.

**Your rights**

Depending on where you live (for example in the European Economic Area, the United Kingdom or California), you may have the right to access, correct or delete your personal data, to object to or restrict its processing, and to data portability. To use these rights, email me at the address below. Most of the app's data is stored only on your device, and you can delete it yourself as described above. I will not treat you differently for using these rights.

**Security**

Telegram data on your device is stored in an encrypted database inside the app's private storage, and the app talks to Telegram, RevenueCat and Google over encrypted connections. No method of transmission or storage is 100% secure, though, and I cannot guarantee absolute security. Keep your phone secure and do not root it. See the [Terms of Service](/tmforwarder/terms_of_service).

**Children's privacy**

The app is not intended for children under 13, or under the minimum age required by the law where you live, and you must be old enough to use Telegram. I do not knowingly collect information from children. If you believe a child has used the app and their Telegram username has been sent to RevenueCat, email me and I will have it deleted.

**Changes to this privacy policy**

I may update this privacy policy from time to time. Changes are posted on this page with a new effective date. Please check this page from time to time.

**Contact**

If you have any questions about this privacy policy, contact me at efromfb@gmail.com.
