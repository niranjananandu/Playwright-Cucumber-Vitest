import fs from "fs";
import path from "path";
import { createLogger, format, transports, Logger } from "winston";

function ensureDir(dirPath: string) {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
}

function safeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9-_]/g, "_");
}

export function buildScenarioLogger(scenarioName: string): { logger: Logger; logFilePath: string } {
  const logsDir = path.join(process.cwd(), "logs");
  ensureDir(logsDir);

  const fileName = `${safeFileName(scenarioName)}.log`;
  const logFilePath = path.join(logsDir, fileName);

  const logger = createLogger({
    level: process.env.LOG_LEVEL ?? "info",
    format: format.combine(
      format.timestamp(),
      format.errors({ stack: true }),
      format.printf(({ timestamp, level, message, ...meta }) => {
        const metaString = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : "";
        return `${timestamp} [${level.toUpperCase()}] ${message}${metaString}`;
      })
    ),
    transports: [
      new transports.Console(),
      new transports.File({ filename: logFilePath })
    ]
  });

  return { logger, logFilePath };
}
