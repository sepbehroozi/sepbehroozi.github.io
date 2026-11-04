---
layout: ../../layouts/Legal.astro
title: Privacy Policy — PaperSafe
description: Privacy policy for the PaperSafe photo backup app for iPhone.
---

**Privacy Policy**

This privacy policy applies to PaperSafe: Photo Backup ("PaperSafe" or "the app"), an iPhone app built by Sep Behroozi ("I", "me"). PaperSafe backs up the photos and videos in your photo library to a Telegram chat in your own Telegram account.

**The short version**

PaperSafe has no servers of its own. The app sends me none of your data, and I don't sell or share any of it. The app has no analytics, no advertising, no tracking and no crash-reporting services. Your photos and videos go only from your iPhone to the Telegram chat you choose. The only data that can reach me is described under "What I can receive".

**Telegram**

PaperSafe is a Telegram client built on TDLib, Telegram's official client library. It connects directly to Telegram's servers. When you use it:

*   Your phone number, the login code Telegram sends you and, if you have one, your two-step verification password are sent to Telegram to sign you in. If Telegram asks for them, so are a login email address and its code. If you recover your password, so are the recovery code, your new password and its hint. They are never sent to me.
*   Telegram receives your device model, iOS version, app version and language, and sees your IP address. It can use your IP address to suggest your country on the sign-in screen. The device details appear in Telegram's list of your active sessions.
*   To show the chats you can back up to, PaperSafe reads your main Telegram chat list through TDLib, including chat names, photos and member counts. PaperSafe creates a new private group only if you ask it to.
*   Your photos and videos, including their original files, any edits you made in Photos and a small preview image, are uploaded to the Telegram chat you choose: Saved Messages, or a private channel or group you can post in.
*   Each backup message has a short technical caption that PaperSafe uses to recognize the item later. It can include an identifier for the item, a fingerprint of the file, its creation date, its iCloud identifier, an edit identifier and its original file name.
*   Original files keep the metadata your camera stored in them, such as the date and, if location was on when the photo was taken, the location. Anyone who can see the chat can download these files.

Backups are ordinary Telegram cloud messages. They are not end-to-end encrypted the way Telegram's secret chats are. What Telegram does with this data is covered by [Telegram's Privacy Policy](https://telegram.org/privacy).

Anyone who can see the chat you back up to can see your backups. If you choose a channel or group with other members, they will be able to see your photos and videos, and so will anyone who joins later; PaperSafe warns you before you pick such a chat. Depending on the chat's settings and their permissions, members may also save or forward your backups, and admins may delete them.

**What I can receive**

*   If you email me, I receive your email address and whatever you include, such as the device details the support page asks for. I use them only to answer you.
*   Apple gives app developers App Store statistics. If you chose to share analytics with app developers in iPhone Settings, Apple can also send me crash reports and diagnostics. This comes from Apple, not from code in the app.

**Data stored on your iPhone**

To work, PaperSafe keeps some data in its private storage on your iPhone:

*   Your Telegram session, TDLib's local database, which can include details of your chats and messages, and a cache of downloaded photos and videos. You can set a limit for the cache or clear it in Settings. PaperSafe asks iOS to leave this data out of iCloud and computer backups, so after restoring your iPhone from a backup you need to sign in again.
*   A backup database: which items in your library are backed up, their fingerprints and the state of uploads.
*   Your settings, such as the backup chat and whether backups may use cellular data.
*   Temporary copies of files while they are uploaded or shared. PaperSafe or iOS removes them later.

The backup database and your settings can be included in your iPhone's iCloud or computer backups if you use them. They are never sent to me.

Signing out of Telegram in PaperSafe deletes the backup database and TDLib's data, including your session and the cache, from your iPhone. Your preferences stay, except the backup chat. If your session is ended from another device instead, TDLib's data is deleted too, but the list of your library items and queued uploads stays until you sign in with a different account or delete the app.

Deleting the app deletes everything it stored on your iPhone. It doesn't delete your backups, and it doesn't end the session in Telegram; you can end it in Telegram's list of active sessions. iPhone backups made earlier keep what they already contain until they are replaced.

**Photo library access**

PaperSafe asks for access to your photo library so it can show your photos and back them up. It reads your photos and videos only to show them and to upload them to your Telegram chat. It doesn't read or back up the items in your Hidden album, and if you allow access to only some photos, only those are backed up. Hiding a photo after it was backed up doesn't remove its backup. When you save a photo from Telegram to your iPhone, PaperSafe adds it to your photo library. You can change photo access at any time in iPhone Settings.

**Notifications and background backup**

If you allow notifications, PaperSafe shows notifications on your iPhone only, for example when backups are paused because you were signed out. They are created on your device; no notification service of mine is involved. Backups can also run in the background, while iOS allows it, using the same connection to Telegram.

**Deleting your backups**

Deleting a photo on your iPhone never deletes its backup in Telegram. To delete a backup, delete its messages in Telegram; one item can be several messages, such as its original, its edit and its preview.

If the photo is still on your iPhone, PaperSafe treats it as not backed up and uploads it again while Backup is on. To remove a backup for good, delete the photo from your iPhone first, then delete the messages in Telegram. To keep the photo on your iPhone, turn Backup off first; turning it on again uploads the photo again.

If you switch to another backup chat, PaperSafe copies your backups there. The old copies stay in the previous chat, visible to anyone in it, until you delete them in Telegram.

You can also delete your Telegram account, as described by Telegram.

**Children's privacy**

PaperSafe is not directed at children under 13, and I don't knowingly collect personal information from children. Using Telegram is subject to Telegram's own age requirements.

**Changes to this privacy policy**

I may update this privacy policy from time to time. Changes are posted on this page.

This policy is effective as of 2026-11-04.

**Contact**

If you have any questions about this privacy policy, contact me at efromfb@gmail.com.
