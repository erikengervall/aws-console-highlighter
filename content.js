const LOG_PREFIX = "AWS Account Highlighter";

console.debug(`${LOG_PREFIX} - Content script loaded`);

let done = false;

function highlightIfAccountMatches(accountId) {
  console.debug(`${LOG_PREFIX} - Highlighting if account matches`, done);

  const accountMenu = document.getElementById("menu--account");
  const topNav = document.getElementById("awsc-top-level-nav");

  if (!accountMenu || !topNav) {
    console.debug(`${LOG_PREFIX} - Account menu or top nav not found`);
    return;
  }

  const accountText = Array.from(accountMenu.children)
    .map((child) => child.textContent.trim())
    .join(" ");

  if (accountText.includes(accountId)) {
    console.debug(`${LOG_PREFIX} - Highlighting account`, accountId);
    topNav.style.background = "red";
    done = true;
  }
}

// Fetch the stored account ID
chrome.storage.sync.get(["awsAccountId"], async (result) => {
  const accountId = result.awsAccountId || "";

  for (let i = 0; i < 10; i++) {
    if (done) {
      console.debug(`${LOG_PREFIX} - Done`);
      break;
    }
    console.debug(`${LOG_PREFIX} - Running highlightIfAccountMatches`, i);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    highlightIfAccountMatches(accountId);
  }
});
