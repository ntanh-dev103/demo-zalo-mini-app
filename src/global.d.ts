declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.svg" {
  const content: string;
  export default content;
}

interface AppConfig {
  app: {
    title: string;
    textColor: string;
    leftButton: string;
    statusBar: string;
    selfControlLoading: boolean;
    hideAndroidBottomNavigationBar: boolean;
    hideIOSSafeAreaBottom: boolean;
    actionBarHidden: boolean;
  };
  listCSS: any[];
  listSyncJS: any[];
  listAsyncJS: any[];
  template: {
    name: string;
    primaryColor: string;
    prefixCurrencySymbol: boolean;
    currencySymbol: string;
    headerLogo: string;
  };
}

declare interface Window {
  ZaloJavaScriptInterface?: {
    getStatusBarHeight: () => number;
  };
  APP_CONFIG?: AppConfig;
}
