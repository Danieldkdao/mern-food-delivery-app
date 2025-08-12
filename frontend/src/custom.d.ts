declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_API_URL: string;
    // add more env variables here if needed
  }
}

declare var process: {
  env: NodeJS.ProcessEnv;
};