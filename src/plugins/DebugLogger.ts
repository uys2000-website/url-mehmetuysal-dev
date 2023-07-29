import settings from "@/settings";

declare global {
  interface Function {
    logger<T extends (...args: any[]) => any>(
      this: T,
      ...args: Parameters<typeof this>
    ): ReturnType<typeof this>;

    pLogger<T extends (...args: any[]) => Promise<any>>(
      this: T,
      ...args: Parameters<typeof this>
    ): ReturnType<typeof this>;
  }
}

type L = (type: "l" | "w" | "e", ...args: any[]) => any;

let l: L = function (t, ...args) {
  return args[args.length - 1];
};

Function.prototype.logger = function (this, ...args) {
  return this.apply(null, args);
};

Function.prototype.pLogger = function (this, ...args) {
  return this.apply(null, args) as ReturnType<typeof this>;
};

function setDebugMode(stringMode: boolean) {
  let text = `\n=======================================\n=============Debug Mode On=============\n=======================================\n`;
  if (stringMode) {
    text += `\n=======================================\n=============DebugAsString=============\n=======================================\n`;
    l = function (t, ...args) {
      const log =
        t == "l" ? console.log : t == "e" ? console.error : console.warn;
      log(args.join("  :::  "));
      return args[args.length - 1];
    };
  } else
    l = function (t, ...args) {
      const log =
        t == "l" ? console.log : t == "e" ? console.error : console.warn;
      log(...args);
      return args[args.length - 1];
    };

  Function.prototype.logger = function (this, ...args) {
    l("l", "Function", "Run", this.name, ...args);
    return l("l", "Function", "Res", this.name, this.apply(null, args));
  };

  Function.prototype.pLogger = function (this, ...args) {
    l("l", "Promise", "Run", this.name, ...args);
    return new Promise((resolve, reject) => {
      this.apply(null, args)
        .then((res) => resolve(l("l", "Promise", "Res", this.name, res)))
        .catch((err) => reject(l("l", "Promise", "Err", this.name, err)));
    }) as ReturnType<typeof this>;
  };
  console.warn(text);
}

const onNodeJS = typeof window === "undefined";
if (onNodeJS && process.env.IS_DEBUG_MODE == "true")
  setDebugMode(process.env.IS_DEBUG_WITH_STRING_MODE == "true");
else if (settings.isDebugMode) setDebugMode(settings.isDebugWithStringMode);

export default defineNuxtPlugin({});
