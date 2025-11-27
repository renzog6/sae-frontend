// filepath: sae-frontend/lib/utils/logger.ts
type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: Record<string, any>;
  timestamp: string;
  service?: string;
  method?: string;
  userId?: string;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === "development";

  private formatMessage(
    level: LogLevel,
    message: string,
    data?: Record<string, any>
  ): string {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] ${level.toUpperCase()}:`;

    if (data) {
      return `${prefix} ${message}\n${JSON.stringify(data, null, 2)}`;
    }

    return `${prefix} ${message}`;
  }

  debug(message: string, data?: Record<string, any>) {
    if (this.isDevelopment) {
      console.debug(this.formatMessage("debug", message, data));
    }
  }

  info(message: string, data?: Record<string, any>) {
    console.info(this.formatMessage("info", message, data));
  }

  warn(message: string, data?: Record<string, any>) {
    console.warn(this.formatMessage("warn", message, data));
  }

  error(message: string, data?: Record<string, any>) {
    console.error(this.formatMessage("error", message, data));

    // En producción, enviar a servicio de logging externo
    if (!this.isDevelopment && data) {
      this.sendToLoggingService({
        level: "error",
        message,
        data,
        timestamp: new Date().toISOString(),
        service: data.service,
        method: data.method,
        userId: data.userId,
      });
    }
  }

  private sendToLoggingService(entry: LogEntry) {
    // TODO: Implementar envío a servicio externo (Sentry, LogRocket, etc.)
    // Por ahora, solo loggear que se enviaría
    console.log("📊 Would send to external logging service:", {
      level: entry.level,
      message: entry.message,
      service: entry.service,
      method: entry.method,
      timestamp: entry.timestamp,
    });
  }
}

export const logger = new Logger();
