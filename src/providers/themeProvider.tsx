import { ConfigProvider, theme } from 'antd';
import { PropsWithChildren } from 'react';

const appTheme = {
  algorithm: theme.darkAlgorithm,
  components: {
    Button: {
      colorPrimaryActive: 'none',
      colorPrimaryHover: 'none',
    },
  },
};

const ThemeProvider = ({ children }: PropsWithChildren) => (
  <ConfigProvider theme={appTheme}>{children}</ConfigProvider>
);

export default ThemeProvider;
