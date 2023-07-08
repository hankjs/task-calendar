import electron, { ipcMain } from "electron";
import { IPCLogger } from "../interface/types";
import os from "os";
import path from "path";
import winston from "winston";
import "winston-daily-rotate-file";

export let logger: winston.Logger

export function IPCLoggerRegister() {
  const app = electron.app;
  app.setAppLogsPath(path.join(app.getPath("userData"), "logs"));
  const userDataPath = app.getPath("logs");
  const jsonWithTimestamp = winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  );

  logger = winston.createLogger({
    defaultMeta: { hostname: os.hostname() },
    format: jsonWithTimestamp,
    transports: [
      new winston.transports.File({
        filename: path.join(userDataPath, "task-calendar-error.log"),
        level: "error",
        maxsize: 1000,
      }),
      new winston.transports.DailyRotateFile({
        filename: path.join(userDataPath, "task-calendard-%DATE%.log"),
        maxFiles: "14d",
        maxSize: "20m",
      }),
    ],
  });

  //
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  //
  if (process.env.NODE_ENV !== "production") {
    logger.add(
      new winston.transports.Console({
        format: winston.format.simple(),
        level: "debug",
      })
    );
  }

  // @ts-expect-error typescript foolish
  ipcMain.handle(IPCLogger.Channel.alert, (e, ...args: IPCLogger.Args) => {
    // @ts-expect-error typescript foolish
    logger.alert.apply(logger, args);
  });
  // @ts-expect-error typescript foolish
  ipcMain.handle(IPCLogger.Channel.error, (e, ...args: IPCLogger.Args) => {
    // @ts-expect-error typescript foolish
    logger.error.apply(logger, args);
  });
  // @ts-expect-error typescript foolish
  ipcMain.handle(IPCLogger.Channel.warning, (e, ...args: IPCLogger.Args) => {
    // @ts-expect-error typescript foolish
    logger.warning.apply(logger, args);
  });
  // @ts-expect-error typescript foolish
  ipcMain.handle(IPCLogger.Channel.info, (e, ...args: IPCLogger.Args) => {
    // @ts-expect-error typescript foolish
    logger.info.apply(logger, args);
  });
  // @ts-expect-error typescript foolish
  ipcMain.handle(IPCLogger.Channel.debug, (e, ...args: IPCLogger.Args) => {
    // @ts-expect-error typescript foolish
    logger.debug.apply(logger, args);
  });
}
