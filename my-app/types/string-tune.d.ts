declare global {
  interface Window {
    StringTune: {
      StringTune: {
        getInstance(): any;
        use(plugin: any): void;
        start(delay?: number): void;
        FPSTrackerVisible?: boolean;
      };
      StringLazy: any;
      StringSequence: any;
      StringLerp: any;
      StringFPSTracker: any;
      StringTuneContext?: any;
    };
  }
}

export {};
