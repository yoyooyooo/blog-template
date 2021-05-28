export const isChrome = () => {
  if (typeof window !== 'undefined') {
    const ua = window.navigator.userAgent;
    // @ts-ignore
    return !!(ua.indexOf('Chrome') && window.chrome);
  }
  return false;
};
