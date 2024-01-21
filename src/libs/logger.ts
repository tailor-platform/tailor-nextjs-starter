type Logger = {
  error: (msg?: unknown, ...params: unknown[]) => void;
  log: (msg?: unknown, ...params: unknown[]) => void;
};

class DevLogger {
  private readonly logger: Console;

  constructor() {
    this.logger = console;
  }

  error(msg?: unknown, ...params: unknown[]) {
    this.logger.error(msg, params);
  }

  log(msg?: unknown, ...params: unknown[]) {
    this.logger.log(msg, params);
  }
}

class NullLogger {
  error() {
    void 0;
  }

  log() {
    void 0;
  }
}

export const logger: Logger =
  process.env.NODE_ENV === "production" ? new NullLogger() : new DevLogger();
