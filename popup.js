document.addEventListener("DOMContentLoaded", () => {
  const LOG_PREFIX = "AWS Account Highlighter";
  console.debug(`${LOG_PREFIX} - Popup loaded`);

  const accountInput = document.getElementById("account-id");
  const saveButton = document.getElementById("save");
  const statusDiv = document.getElementById("status");

  console.log({
    accountInput,
    saveButton,
    statusDiv,
  });

  // Function to normalize account ID to "1111-2222-3333"
  function normalizeAccountId(accountId) {
    console.debug(`${LOG_PREFIX} - Normalizing input:`, accountId);

    const rawId = accountId.replace(/\D/g, ""); // Remove all non-numeric characters
    console.debug(`${LOG_PREFIX} - Raw numeric ID:`, rawId);

    if (rawId.length === 12) {
      const formattedId = `${rawId.slice(0, 4)}-${rawId.slice(
        4,
        8
      )}-${rawId.slice(8, 12)}`;
      console.debug(`${LOG_PREFIX} - Normalized Account ID:`, formattedId);
      return formattedId;
    }

    console.warn(`${LOG_PREFIX} - Invalid AWS Account ID:`, accountId);
    return accountId; // Return as-is if not a valid AWS Account ID
  }

  // Function to display status messages
  function showStatus(message, type = "info") {
    statusDiv.textContent = message;
    statusDiv.className = `status ${type}`; // Assigns a CSS class based on type (success, error, info)
    console.debug(`${LOG_PREFIX} - Status Update:`, message);
  }

  // Load stored account ID
  chrome.storage.sync.get(["awsAccountId"], (result) => {
    if (result.awsAccountId) {
      console.debug(
        `${LOG_PREFIX} - Loaded stored Account ID:`,
        result.awsAccountId
      );
      accountInput.value = result.awsAccountId;
      showStatus("Loaded stored Account ID.", "info");
    } else {
      console.debug(`${LOG_PREFIX} - No stored Account ID found`);
      showStatus("No stored Account ID found.", "info");
    }
  });

  // Save account ID on button click
  saveButton.addEventListener("click", () => {
    const rawInput = accountInput.value.trim();
    console.debug(`${LOG_PREFIX} - User entered:`, rawInput);

    const accountId = normalizeAccountId(rawInput);

    if (/^\d{4}-\d{4}-\d{4}$/.test(accountId)) {
      console.debug(`${LOG_PREFIX} - Saving normalized Account ID:`, accountId);
      chrome.storage.sync.set({ awsAccountId: accountId }, () => {
        showStatus(`Account ID saved: ${accountId}`, "success");
        console.debug(`${LOG_PREFIX} - Account ID saved successfully`);
      });
    } else {
      showStatus(
        "Invalid AWS Account ID. Please enter a 12-digit number.",
        "error"
      );
      console.error(
        `${LOG_PREFIX} - Failed to save. Invalid Account ID:`,
        rawInput
      );
    }
  });
});
