import { userAgentFromString } from 'next/server';

export function getUserBrowserName(header: Headers): string {
  // const header = headers();
  const browser = header.get('user-agent');

  if (browser) {
    const agent = userAgentFromString(browser);
    return agent.browser.name ?? 'unknown browser';
  } else {
    return 'unknown browser';
  }
}
