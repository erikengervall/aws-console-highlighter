# AWS Console Highlighter

**AWS Console Highlighter** is a Chrome extension that visually highlights the AWS Management Console when logged into a specific account. This helps prevent accidental actions in the wrong AWS account by changing the navigation bar color based on the account ID.

## 🚀 Features

- Automatically highlights the AWS console navigation bar if logged into a specific account.
- Configurable via a popup where you can enter your AWS account ID.
- Supports both `1111-2222-3333` and `111122223333` input formats.
- Saves your settings using Chrome's storage.

## 🔧 Installation

### 2️⃣ Load as an Unpacked Extension

1. Open **Google Chrome**.
2. Go to `chrome://extensions/`.
3. Enable **Developer mode** (top right corner).
4. Click **“Load unpacked”** and select the cloned folder.
5. The extension should now be installed.

## 🛠 Usage

1. Click the **AWS Console Highlighter** extension icon in Chrome.
2. Enter your **AWS Account ID** (e.g., `1111-2222-3333` or `111122223333`).
3. Click **Save**.
4. When visiting `https://eu-north-1.console.aws.amazon.com/`, the top navigation bar will turn **red** if logged into the configured AWS account.

## 📝 Development

### 1️⃣ Modify the Code

- Update `popup.js` to adjust behavior.
- Modify `content.js` for additional customization.

### 2️⃣ Reload the Extension

- After making changes, go to `chrome://extensions/`, click **“Reload”** under the extension.

## 🐛 Debugging

1. Open **Developer Tools** (`F12`) in Chrome.
2. Go to the **Console** tab to check logs from `popup.js` and `content.js`.
3. If the extension doesn’t work, check for permission errors in `chrome://extensions/`.

## 📜 License

This project is licensed under the **MIT License**.

## ⭐ Contributing

Feel free to submit issues or pull requests to improve the extension!

### 🔗 Links

- [AWS Console](https://aws.amazon.com/)
- [Chrome Extension Docs](https://developer.chrome.com/docs/extensions/)
