"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to2, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to2, key) && key !== except)
        __defProp(to2, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to2;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// generated/client/runtime/library.js
var require_library = __commonJS({
  "generated/client/runtime/library.js"(exports, module) {
    "use strict";
    var lu = Object.create;
    var Fr = Object.defineProperty;
    var uu = Object.getOwnPropertyDescriptor;
    var cu = Object.getOwnPropertyNames;
    var pu = Object.getPrototypeOf;
    var du = Object.prototype.hasOwnProperty;
    var Z = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
    var Ut = (e, t) => {
      for (var r in t) Fr(e, r, { get: t[r], enumerable: true });
    };
    var vo = (e, t, r, n) => {
      if (t && typeof t == "object" || typeof t == "function") for (let i of cu(t)) !du.call(e, i) && i !== r && Fr(e, i, { get: () => t[i], enumerable: !(n = uu(t, i)) || n.enumerable });
      return e;
    };
    var _ = (e, t, r) => (r = e != null ? lu(pu(e)) : {}, vo(t || !e || !e.__esModule ? Fr(r, "default", { value: e, enumerable: true }) : r, e));
    var mu = (e) => vo(Fr({}, "__esModule", { value: true }), e);
    var Wo = Z((vf, ni) => {
      "use strict";
      var P = ni.exports;
      ni.exports.default = P;
      var D = "\x1B[", Ht = "\x1B]", mt = "\x07", Jr = ";", Jo = process.env.TERM_PROGRAM === "Apple_Terminal";
      P.cursorTo = (e, t) => {
        if (typeof e != "number") throw new TypeError("The `x` argument is required");
        return typeof t != "number" ? D + (e + 1) + "G" : D + (t + 1) + ";" + (e + 1) + "H";
      };
      P.cursorMove = (e, t) => {
        if (typeof e != "number") throw new TypeError("The `x` argument is required");
        let r = "";
        return e < 0 ? r += D + -e + "D" : e > 0 && (r += D + e + "C"), t < 0 ? r += D + -t + "A" : t > 0 && (r += D + t + "B"), r;
      };
      P.cursorUp = (e = 1) => D + e + "A";
      P.cursorDown = (e = 1) => D + e + "B";
      P.cursorForward = (e = 1) => D + e + "C";
      P.cursorBackward = (e = 1) => D + e + "D";
      P.cursorLeft = D + "G";
      P.cursorSavePosition = Jo ? "\x1B7" : D + "s";
      P.cursorRestorePosition = Jo ? "\x1B8" : D + "u";
      P.cursorGetPosition = D + "6n";
      P.cursorNextLine = D + "E";
      P.cursorPrevLine = D + "F";
      P.cursorHide = D + "?25l";
      P.cursorShow = D + "?25h";
      P.eraseLines = (e) => {
        let t = "";
        for (let r = 0; r < e; r++) t += P.eraseLine + (r < e - 1 ? P.cursorUp() : "");
        return e && (t += P.cursorLeft), t;
      };
      P.eraseEndLine = D + "K";
      P.eraseStartLine = D + "1K";
      P.eraseLine = D + "2K";
      P.eraseDown = D + "J";
      P.eraseUp = D + "1J";
      P.eraseScreen = D + "2J";
      P.scrollUp = D + "S";
      P.scrollDown = D + "T";
      P.clearScreen = "\x1Bc";
      P.clearTerminal = process.platform === "win32" ? `${P.eraseScreen}${D}0f` : `${P.eraseScreen}${D}3J${D}H`;
      P.beep = mt;
      P.link = (e, t) => [Ht, "8", Jr, Jr, t, mt, e, Ht, "8", Jr, Jr, mt].join("");
      P.image = (e, t = {}) => {
        let r = `${Ht}1337;File=inline=1`;
        return t.width && (r += `;width=${t.width}`), t.height && (r += `;height=${t.height}`), t.preserveAspectRatio === false && (r += ";preserveAspectRatio=0"), r + ":" + e.toString("base64") + mt;
      };
      P.iTerm = { setCwd: (e = process.cwd()) => `${Ht}50;CurrentDir=${e}${mt}`, annotation: (e, t = {}) => {
        let r = `${Ht}1337;`, n = typeof t.x < "u", i = typeof t.y < "u";
        if ((n || i) && !(n && i && typeof t.length < "u")) throw new Error("`x`, `y` and `length` must be defined when `x` or `y` is defined");
        return e = e.replace(/\|/g, ""), r += t.isHidden ? "AddHiddenAnnotation=" : "AddAnnotation=", t.length > 0 ? r += (n ? [e, t.length, t.x, t.y] : [t.length, e]).join("|") : r += e, r + mt;
      } };
    });
    var ii = Z((Tf, Ho) => {
      "use strict";
      Ho.exports = (e, t = process.argv) => {
        let r = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", n = t.indexOf(r + e), i = t.indexOf("--");
        return n !== -1 && (i === -1 || n < i);
      };
    });
    var zo = Z((Rf, Yo) => {
      "use strict";
      var Zu = require("os"), Ko = require("tty"), fe = ii(), { env: J } = process, Je;
      fe("no-color") || fe("no-colors") || fe("color=false") || fe("color=never") ? Je = 0 : (fe("color") || fe("colors") || fe("color=true") || fe("color=always")) && (Je = 1);
      "FORCE_COLOR" in J && (J.FORCE_COLOR === "true" ? Je = 1 : J.FORCE_COLOR === "false" ? Je = 0 : Je = J.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(J.FORCE_COLOR, 10), 3));
      function oi(e) {
        return e === 0 ? false : { level: e, hasBasic: true, has256: e >= 2, has16m: e >= 3 };
      }
      function si(e, t) {
        if (Je === 0) return 0;
        if (fe("color=16m") || fe("color=full") || fe("color=truecolor")) return 3;
        if (fe("color=256")) return 2;
        if (e && !t && Je === void 0) return 0;
        let r = Je || 0;
        if (J.TERM === "dumb") return r;
        if (process.platform === "win32") {
          let n = Zu.release().split(".");
          return Number(n[0]) >= 10 && Number(n[2]) >= 10586 ? Number(n[2]) >= 14931 ? 3 : 2 : 1;
        }
        if ("CI" in J) return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((n) => n in J) || J.CI_NAME === "codeship" ? 1 : r;
        if ("TEAMCITY_VERSION" in J) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(J.TEAMCITY_VERSION) ? 1 : 0;
        if (J.COLORTERM === "truecolor") return 3;
        if ("TERM_PROGRAM" in J) {
          let n = parseInt((J.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
          switch (J.TERM_PROGRAM) {
            case "iTerm.app":
              return n >= 3 ? 3 : 2;
            case "Apple_Terminal":
              return 2;
          }
        }
        return /-256(color)?$/i.test(J.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(J.TERM) || "COLORTERM" in J ? 1 : r;
      }
      function Xu(e) {
        let t = si(e, e && e.isTTY);
        return oi(t);
      }
      Yo.exports = { supportsColor: Xu, stdout: oi(si(true, Ko.isatty(1))), stderr: oi(si(true, Ko.isatty(2))) };
    });
    var es = Z((Cf, Xo) => {
      "use strict";
      var ec = zo(), ft = ii();
      function Zo(e) {
        if (/^\d{3,4}$/.test(e)) {
          let r = /(\d{1,2})(\d{2})/.exec(e);
          return { major: 0, minor: parseInt(r[1], 10), patch: parseInt(r[2], 10) };
        }
        let t = (e || "").split(".").map((r) => parseInt(r, 10));
        return { major: t[0], minor: t[1], patch: t[2] };
      }
      function ai(e) {
        let { env: t } = process;
        if ("FORCE_HYPERLINK" in t) return !(t.FORCE_HYPERLINK.length > 0 && parseInt(t.FORCE_HYPERLINK, 10) === 0);
        if (ft("no-hyperlink") || ft("no-hyperlinks") || ft("hyperlink=false") || ft("hyperlink=never")) return false;
        if (ft("hyperlink=true") || ft("hyperlink=always") || "NETLIFY" in t) return true;
        if (!ec.supportsColor(e) || e && !e.isTTY || process.platform === "win32" || "CI" in t || "TEAMCITY_VERSION" in t) return false;
        if ("TERM_PROGRAM" in t) {
          let r = Zo(t.TERM_PROGRAM_VERSION);
          switch (t.TERM_PROGRAM) {
            case "iTerm.app":
              return r.major === 3 ? r.minor >= 1 : r.major > 3;
            case "WezTerm":
              return r.major >= 20200620;
            case "vscode":
              return r.major > 1 || r.major === 1 && r.minor >= 72;
          }
        }
        if ("VTE_VERSION" in t) {
          if (t.VTE_VERSION === "0.50.0") return false;
          let r = Zo(t.VTE_VERSION);
          return r.major > 0 || r.minor >= 50;
        }
        return false;
      }
      Xo.exports = { supportsHyperlink: ai, stdout: ai(process.stdout), stderr: ai(process.stderr) };
    });
    var rs = Z((Sf, Kt) => {
      "use strict";
      var tc = Wo(), li = es(), ts = (e, t, { target: r = "stdout", ...n } = {}) => li[r] ? tc.link(e, t) : n.fallback === false ? e : typeof n.fallback == "function" ? n.fallback(e, t) : `${e} (\u200B${t}\u200B)`;
      Kt.exports = (e, t, r = {}) => ts(e, t, r);
      Kt.exports.stderr = (e, t, r = {}) => ts(e, t, { target: "stderr", ...r });
      Kt.exports.isSupported = li.stdout;
      Kt.exports.stderr.isSupported = li.stderr;
    });
    var ci = Z((Mf, rc) => {
      rc.exports = { name: "@prisma/engines-version", version: "6.3.0-17.acc0b9dd43eb689cbd20c9470515d719db10d0b0", main: "index.js", types: "index.d.ts", license: "Apache-2.0", author: "Tim Suchanek <suchanek@prisma.io>", prisma: { enginesVersion: "acc0b9dd43eb689cbd20c9470515d719db10d0b0" }, repository: { type: "git", url: "https://github.com/prisma/engines-wrapper.git", directory: "packages/engines-version" }, devDependencies: { "@types/node": "18.19.68", typescript: "4.9.5" }, files: ["index.js", "index.d.ts"], scripts: { build: "tsc -d" } };
    });
    var pi = Z((Wr) => {
      "use strict";
      Object.defineProperty(Wr, "__esModule", { value: true });
      Wr.enginesVersion = void 0;
      Wr.enginesVersion = ci().prisma.enginesVersion;
    });
    var ss = Z((rg, oc) => {
      oc.exports = { name: "dotenv", version: "16.4.7", description: "Loads environment variables from .env file", main: "lib/main.js", types: "lib/main.d.ts", exports: { ".": { types: "./lib/main.d.ts", require: "./lib/main.js", default: "./lib/main.js" }, "./config": "./config.js", "./config.js": "./config.js", "./lib/env-options": "./lib/env-options.js", "./lib/env-options.js": "./lib/env-options.js", "./lib/cli-options": "./lib/cli-options.js", "./lib/cli-options.js": "./lib/cli-options.js", "./package.json": "./package.json" }, scripts: { "dts-check": "tsc --project tests/types/tsconfig.json", lint: "standard", pretest: "npm run lint && npm run dts-check", test: "tap run --allow-empty-coverage --disable-coverage --timeout=60000", "test:coverage": "tap run --show-full-coverage --timeout=60000 --coverage-report=lcov", prerelease: "npm test", release: "standard-version" }, repository: { type: "git", url: "git://github.com/motdotla/dotenv.git" }, funding: "https://dotenvx.com", keywords: ["dotenv", "env", ".env", "environment", "variables", "config", "settings"], readmeFilename: "README.md", license: "BSD-2-Clause", devDependencies: { "@types/node": "^18.11.3", decache: "^4.6.2", sinon: "^14.0.1", standard: "^17.0.0", "standard-version": "^9.5.0", tap: "^19.2.0", typescript: "^4.8.4" }, engines: { node: ">=12" }, browser: { fs: false } };
    });
    var cs = Z((ng, Le) => {
      "use strict";
      var gi = require("fs"), hi = require("path"), sc = require("os"), ac = require("crypto"), lc = ss(), yi = lc.version, uc = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
      function cc(e) {
        let t = {}, r = e.toString();
        r = r.replace(/\r\n?/mg, `
`);
        let n;
        for (; (n = uc.exec(r)) != null; ) {
          let i = n[1], o = n[2] || "";
          o = o.trim();
          let s = o[0];
          o = o.replace(/^(['"`])([\s\S]*)\1$/mg, "$2"), s === '"' && (o = o.replace(/\\n/g, `
`), o = o.replace(/\\r/g, "\r")), t[i] = o;
        }
        return t;
      }
      function pc(e) {
        let t = us(e), r = Q.configDotenv({ path: t });
        if (!r.parsed) {
          let s = new Error(`MISSING_DATA: Cannot parse ${t} for an unknown reason`);
          throw s.code = "MISSING_DATA", s;
        }
        let n = ls(e).split(","), i = n.length, o;
        for (let s = 0; s < i; s++) try {
          let a = n[s].trim(), l = fc(r, a);
          o = Q.decrypt(l.ciphertext, l.key);
          break;
        } catch (a) {
          if (s + 1 >= i) throw a;
        }
        return Q.parse(o);
      }
      function dc(e) {
        console.log(`[dotenv@${yi}][INFO] ${e}`);
      }
      function mc(e) {
        console.log(`[dotenv@${yi}][WARN] ${e}`);
      }
      function Hr(e) {
        console.log(`[dotenv@${yi}][DEBUG] ${e}`);
      }
      function ls(e) {
        return e && e.DOTENV_KEY && e.DOTENV_KEY.length > 0 ? e.DOTENV_KEY : process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0 ? process.env.DOTENV_KEY : "";
      }
      function fc(e, t) {
        let r;
        try {
          r = new URL(t);
        } catch (a) {
          if (a.code === "ERR_INVALID_URL") {
            let l = new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");
            throw l.code = "INVALID_DOTENV_KEY", l;
          }
          throw a;
        }
        let n = r.password;
        if (!n) {
          let a = new Error("INVALID_DOTENV_KEY: Missing key part");
          throw a.code = "INVALID_DOTENV_KEY", a;
        }
        let i = r.searchParams.get("environment");
        if (!i) {
          let a = new Error("INVALID_DOTENV_KEY: Missing environment part");
          throw a.code = "INVALID_DOTENV_KEY", a;
        }
        let o = `DOTENV_VAULT_${i.toUpperCase()}`, s = e.parsed[o];
        if (!s) {
          let a = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${o} in your .env.vault file.`);
          throw a.code = "NOT_FOUND_DOTENV_ENVIRONMENT", a;
        }
        return { ciphertext: s, key: n };
      }
      function us(e) {
        let t = null;
        if (e && e.path && e.path.length > 0) if (Array.isArray(e.path)) for (let r of e.path) gi.existsSync(r) && (t = r.endsWith(".vault") ? r : `${r}.vault`);
        else t = e.path.endsWith(".vault") ? e.path : `${e.path}.vault`;
        else t = hi.resolve(process.cwd(), ".env.vault");
        return gi.existsSync(t) ? t : null;
      }
      function as(e) {
        return e[0] === "~" ? hi.join(sc.homedir(), e.slice(1)) : e;
      }
      function gc(e) {
        dc("Loading env from encrypted .env.vault");
        let t = Q._parseVault(e), r = process.env;
        return e && e.processEnv != null && (r = e.processEnv), Q.populate(r, t, e), { parsed: t };
      }
      function hc(e) {
        let t = hi.resolve(process.cwd(), ".env"), r = "utf8", n = !!(e && e.debug);
        e && e.encoding ? r = e.encoding : n && Hr("No encoding is specified. UTF-8 is used by default");
        let i = [t];
        if (e && e.path) if (!Array.isArray(e.path)) i = [as(e.path)];
        else {
          i = [];
          for (let l of e.path) i.push(as(l));
        }
        let o, s = {};
        for (let l of i) try {
          let u = Q.parse(gi.readFileSync(l, { encoding: r }));
          Q.populate(s, u, e);
        } catch (u) {
          n && Hr(`Failed to load ${l} ${u.message}`), o = u;
        }
        let a = process.env;
        return e && e.processEnv != null && (a = e.processEnv), Q.populate(a, s, e), o ? { parsed: s, error: o } : { parsed: s };
      }
      function yc(e) {
        if (ls(e).length === 0) return Q.configDotenv(e);
        let t = us(e);
        return t ? Q._configVault(e) : (mc(`You set DOTENV_KEY but you are missing a .env.vault file at ${t}. Did you forget to build it?`), Q.configDotenv(e));
      }
      function Ec(e, t) {
        let r = Buffer.from(t.slice(-64), "hex"), n = Buffer.from(e, "base64"), i = n.subarray(0, 12), o = n.subarray(-16);
        n = n.subarray(12, -16);
        try {
          let s = ac.createDecipheriv("aes-256-gcm", r, i);
          return s.setAuthTag(o), `${s.update(n)}${s.final()}`;
        } catch (s) {
          let a = s instanceof RangeError, l = s.message === "Invalid key length", u = s.message === "Unsupported state or unable to authenticate data";
          if (a || l) {
            let c = new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");
            throw c.code = "INVALID_DOTENV_KEY", c;
          } else if (u) {
            let c = new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");
            throw c.code = "DECRYPTION_FAILED", c;
          } else throw s;
        }
      }
      function bc(e, t, r = {}) {
        let n = !!(r && r.debug), i = !!(r && r.override);
        if (typeof t != "object") {
          let o = new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
          throw o.code = "OBJECT_REQUIRED", o;
        }
        for (let o of Object.keys(t)) Object.prototype.hasOwnProperty.call(e, o) ? (i === true && (e[o] = t[o]), n && Hr(i === true ? `"${o}" is already defined and WAS overwritten` : `"${o}" is already defined and was NOT overwritten`)) : e[o] = t[o];
      }
      var Q = { configDotenv: hc, _configVault: gc, _parseVault: pc, config: yc, decrypt: Ec, parse: cc, populate: bc };
      Le.exports.configDotenv = Q.configDotenv;
      Le.exports._configVault = Q._configVault;
      Le.exports._parseVault = Q._parseVault;
      Le.exports.config = Q.config;
      Le.exports.decrypt = Q.decrypt;
      Le.exports.parse = Q.parse;
      Le.exports.populate = Q.populate;
      Le.exports = Q;
    });
    var hs = Z((cg, gs) => {
      "use strict";
      gs.exports = (e) => {
        let t = e.match(/^[ \t]*(?=\S)/gm);
        return t ? t.reduce((r, n) => Math.min(r, n.length), 1 / 0) : 0;
      };
    });
    var Es = Z((pg, ys) => {
      "use strict";
      var vc = hs();
      ys.exports = (e) => {
        let t = vc(e);
        if (t === 0) return e;
        let r = new RegExp(`^[ \\t]{${t}}`, "gm");
        return e.replace(r, "");
      };
    });
    var Pi = Z((Eg, ws) => {
      "use strict";
      ws.exports = (e, t = 1, r) => {
        if (r = { indent: " ", includeEmptyLines: false, ...r }, typeof e != "string") throw new TypeError(`Expected \`input\` to be a \`string\`, got \`${typeof e}\``);
        if (typeof t != "number") throw new TypeError(`Expected \`count\` to be a \`number\`, got \`${typeof t}\``);
        if (typeof r.indent != "string") throw new TypeError(`Expected \`options.indent\` to be a \`string\`, got \`${typeof r.indent}\``);
        if (t === 0) return e;
        let n = r.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
        return e.replace(n, r.indent.repeat(t));
      };
    });
    var Ts = Z((xg, vs) => {
      "use strict";
      vs.exports = ({ onlyFirst: e = false } = {}) => {
        let t = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"].join("|");
        return new RegExp(t, e ? void 0 : "g");
      };
    });
    var Ci = Z((Pg, Rs) => {
      "use strict";
      var kc = Ts();
      Rs.exports = (e) => typeof e == "string" ? e.replace(kc(), "") : e;
    });
    var Cs = Z((Rg, Zr) => {
      "use strict";
      Zr.exports = (e = {}) => {
        let t;
        if (e.repoUrl) t = e.repoUrl;
        else if (e.user && e.repo) t = `https://github.com/${e.user}/${e.repo}`;
        else throw new Error("You need to specify either the `repoUrl` option or both the `user` and `repo` options");
        let r = new URL(`${t}/issues/new`), n = ["body", "title", "labels", "template", "milestone", "assignee", "projects"];
        for (let i of n) {
          let o = e[i];
          if (o !== void 0) {
            if (i === "labels" || i === "projects") {
              if (!Array.isArray(o)) throw new TypeError(`The \`${i}\` option should be an array`);
              o = o.join(",");
            }
            r.searchParams.set(i, o);
          }
        }
        return r.toString();
      };
      Zr.exports.default = Zr.exports;
    });
    var Fi = Z((Lh, Hs) => {
      "use strict";
      Hs.exports = /* @__PURE__ */ function() {
        function e(t, r, n, i, o) {
          return t < r || n < r ? t > n ? n + 1 : t + 1 : i === o ? r : r + 1;
        }
        return function(t, r) {
          if (t === r) return 0;
          if (t.length > r.length) {
            var n = t;
            t = r, r = n;
          }
          for (var i = t.length, o = r.length; i > 0 && t.charCodeAt(i - 1) === r.charCodeAt(o - 1); ) i--, o--;
          for (var s = 0; s < i && t.charCodeAt(s) === r.charCodeAt(s); ) s++;
          if (i -= s, o -= s, i === 0 || o < 3) return o;
          var a = 0, l, u, c, p, d, f, g, h, O, v, C, R, k = [];
          for (l = 0; l < i; l++) k.push(l + 1), k.push(t.charCodeAt(s + l));
          for (var A = k.length - 1; a < o - 3; ) for (O = r.charCodeAt(s + (u = a)), v = r.charCodeAt(s + (c = a + 1)), C = r.charCodeAt(s + (p = a + 2)), R = r.charCodeAt(s + (d = a + 3)), f = a += 4, l = 0; l < A; l += 2) g = k[l], h = k[l + 1], u = e(g, u, c, O, h), c = e(u, c, p, v, h), p = e(c, p, d, C, h), f = e(p, d, f, R, h), k[l] = f, d = p, p = c, c = u, u = g;
          for (; a < o; ) for (O = r.charCodeAt(s + (u = a)), f = ++a, l = 0; l < A; l += 2) g = k[l], k[l] = f = e(g, u, f, O, k[l + 1]), u = g;
          return f;
        };
      }();
    });
    var Hm = {};
    Ut(Hm, { Debug: () => Hn, Decimal: () => Pe, Extensions: () => Qn, MetricsClient: () => kt, PrismaClientInitializationError: () => T, PrismaClientKnownRequestError: () => ee, PrismaClientRustPanicError: () => ce, PrismaClientUnknownRequestError: () => B, PrismaClientValidationError: () => te, Public: () => Gn, Sql: () => ae, createParam: () => ga, defineDmmfProperty: () => xa, deserializeJsonResponse: () => wt, deserializeRawResult: () => jn, dmmfToRuntimeDataModel: () => wa, empty: () => Ra, getPrismaClient: () => ou, getRuntime: () => kn, join: () => Ta, makeStrictEnum: () => su, makeTypedQueryFactory: () => Pa, objectEnumValues: () => En, raw: () => Hi, serializeJsonQuery: () => Rn, skip: () => Tn, sqltag: () => Ki, warnEnvConflicts: () => au, warnOnce: () => tr });
    module.exports = mu(Hm);
    var Qn = {};
    Ut(Qn, { defineExtension: () => To, getExtensionContext: () => Ro });
    function To(e) {
      return typeof e == "function" ? e : (t) => t.$extends(e);
    }
    function Ro(e) {
      return e;
    }
    var Gn = {};
    Ut(Gn, { validator: () => Co });
    function Co(...e) {
      return (t) => t;
    }
    var Mr = {};
    Ut(Mr, { $: () => ko, bgBlack: () => vu, bgBlue: () => Su, bgCyan: () => Iu, bgGreen: () => Ru, bgMagenta: () => Au, bgRed: () => Tu, bgWhite: () => Ou, bgYellow: () => Cu, black: () => bu, blue: () => rt, bold: () => H, cyan: () => De, dim: () => ke, gray: () => Qt, green: () => Ve, grey: () => Pu, hidden: () => yu, inverse: () => hu, italic: () => gu, magenta: () => wu, red: () => de, reset: () => fu, strikethrough: () => Eu, underline: () => X, white: () => xu, yellow: () => _e });
    var Jn;
    var So;
    var Ao;
    var Io;
    var Oo = true;
    typeof process < "u" && ({ FORCE_COLOR: Jn, NODE_DISABLE_COLORS: So, NO_COLOR: Ao, TERM: Io } = process.env || {}, Oo = process.stdout && process.stdout.isTTY);
    var ko = { enabled: !So && Ao == null && Io !== "dumb" && (Jn != null && Jn !== "0" || Oo) };
    function $(e, t) {
      let r = new RegExp(`\\x1b\\[${t}m`, "g"), n = `\x1B[${e}m`, i = `\x1B[${t}m`;
      return function(o) {
        return !ko.enabled || o == null ? o : n + (~("" + o).indexOf(i) ? o.replace(r, i + n) : o) + i;
      };
    }
    var fu = $(0, 0);
    var H = $(1, 22);
    var ke = $(2, 22);
    var gu = $(3, 23);
    var X = $(4, 24);
    var hu = $(7, 27);
    var yu = $(8, 28);
    var Eu = $(9, 29);
    var bu = $(30, 39);
    var de = $(31, 39);
    var Ve = $(32, 39);
    var _e = $(33, 39);
    var rt = $(34, 39);
    var wu = $(35, 39);
    var De = $(36, 39);
    var xu = $(37, 39);
    var Qt = $(90, 39);
    var Pu = $(90, 39);
    var vu = $(40, 49);
    var Tu = $(41, 49);
    var Ru = $(42, 49);
    var Cu = $(43, 49);
    var Su = $(44, 49);
    var Au = $(45, 49);
    var Iu = $(46, 49);
    var Ou = $(47, 49);
    var ku = 100;
    var _o = ["green", "yellow", "blue", "magenta", "cyan", "red"];
    var Gt = [];
    var Do = Date.now();
    var _u = 0;
    var Wn = typeof process < "u" ? process.env : {};
    globalThis.DEBUG ??= Wn.DEBUG ?? "";
    globalThis.DEBUG_COLORS ??= Wn.DEBUG_COLORS ? Wn.DEBUG_COLORS === "true" : true;
    var Jt = { enable(e) {
      typeof e == "string" && (globalThis.DEBUG = e);
    }, disable() {
      let e = globalThis.DEBUG;
      return globalThis.DEBUG = "", e;
    }, enabled(e) {
      let t = globalThis.DEBUG.split(",").map((i) => i.replace(/[.+?^${}()|[\]\\]/g, "\\$&")), r = t.some((i) => i === "" || i[0] === "-" ? false : e.match(RegExp(i.split("*").join(".*") + "$"))), n = t.some((i) => i === "" || i[0] !== "-" ? false : e.match(RegExp(i.slice(1).split("*").join(".*") + "$")));
      return r && !n;
    }, log: (...e) => {
      let [t, r, ...n] = e;
      (console.warn ?? console.log)(`${t} ${r}`, ...n);
    }, formatters: {} };
    function Du(e) {
      let t = { color: _o[_u++ % _o.length], enabled: Jt.enabled(e), namespace: e, log: Jt.log, extend: () => {
      } }, r = (...n) => {
        let { enabled: i, namespace: o, color: s, log: a } = t;
        if (n.length !== 0 && Gt.push([o, ...n]), Gt.length > ku && Gt.shift(), Jt.enabled(o) || i) {
          let l = n.map((c) => typeof c == "string" ? c : Nu(c)), u = `+${Date.now() - Do}ms`;
          Do = Date.now(), globalThis.DEBUG_COLORS ? a(Mr[s](H(o)), ...l, Mr[s](u)) : a(o, ...l, u);
        }
      };
      return new Proxy(r, { get: (n, i) => t[i], set: (n, i, o) => t[i] = o });
    }
    var Hn = new Proxy(Du, { get: (e, t) => Jt[t], set: (e, t, r) => Jt[t] = r });
    function Nu(e, t = 2) {
      let r = /* @__PURE__ */ new Set();
      return JSON.stringify(e, (n, i) => {
        if (typeof i == "object" && i !== null) {
          if (r.has(i)) return "[Circular *]";
          r.add(i);
        } else if (typeof i == "bigint") return i.toString();
        return i;
      }, t);
    }
    function No(e = 7500) {
      let t = Gt.map(([r, ...n]) => `${r} ${n.map((i) => typeof i == "string" ? i : JSON.stringify(i)).join(" ")}`).join(`
`);
      return t.length < e ? t : t.slice(-e);
    }
    function Lo() {
      Gt.length = 0;
    }
    var F = Hn;
    var Fo = _(require("fs"));
    function Kn() {
      let e = process.env.PRISMA_QUERY_ENGINE_LIBRARY;
      if (!(e && Fo.default.existsSync(e)) && process.arch === "ia32") throw new Error('The default query engine type (Node-API, "library") is currently not supported for 32bit Node. Please set `engineType = "binary"` in the "generator" block of your "schema.prisma" file (or use the environment variables "PRISMA_CLIENT_ENGINE_TYPE=binary" and/or "PRISMA_CLI_QUERY_ENGINE_TYPE=binary".)');
    }
    var Yn = ["darwin", "darwin-arm64", "debian-openssl-1.0.x", "debian-openssl-1.1.x", "debian-openssl-3.0.x", "rhel-openssl-1.0.x", "rhel-openssl-1.1.x", "rhel-openssl-3.0.x", "linux-arm64-openssl-1.1.x", "linux-arm64-openssl-1.0.x", "linux-arm64-openssl-3.0.x", "linux-arm-openssl-1.1.x", "linux-arm-openssl-1.0.x", "linux-arm-openssl-3.0.x", "linux-musl", "linux-musl-openssl-3.0.x", "linux-musl-arm64-openssl-1.1.x", "linux-musl-arm64-openssl-3.0.x", "linux-nixos", "linux-static-x64", "linux-static-arm64", "windows", "freebsd11", "freebsd12", "freebsd13", "freebsd14", "freebsd15", "openbsd", "netbsd", "arm"];
    var $r = "libquery_engine";
    function qr(e, t) {
      let r = t === "url";
      return e.includes("windows") ? r ? "query_engine.dll.node" : `query_engine-${e}.dll.node` : e.includes("darwin") ? r ? `${$r}.dylib.node` : `${$r}-${e}.dylib.node` : r ? `${$r}.so.node` : `${$r}-${e}.so.node`;
    }
    var Vo = _(require("child_process"));
    var ti = _(require("fs/promises"));
    var Qr = _(require("os"));
    var Ne = Symbol.for("@ts-pattern/matcher");
    var Lu = Symbol.for("@ts-pattern/isVariadic");
    var jr = "@ts-pattern/anonymous-select-key";
    var zn = (e) => !!(e && typeof e == "object");
    var Vr = (e) => e && !!e[Ne];
    var we = (e, t, r) => {
      if (Vr(e)) {
        let n = e[Ne](), { matched: i, selections: o } = n.match(t);
        return i && o && Object.keys(o).forEach((s) => r(s, o[s])), i;
      }
      if (zn(e)) {
        if (!zn(t)) return false;
        if (Array.isArray(e)) {
          if (!Array.isArray(t)) return false;
          let n = [], i = [], o = [];
          for (let s of e.keys()) {
            let a = e[s];
            Vr(a) && a[Lu] ? o.push(a) : o.length ? i.push(a) : n.push(a);
          }
          if (o.length) {
            if (o.length > 1) throw new Error("Pattern error: Using `...P.array(...)` several times in a single pattern is not allowed.");
            if (t.length < n.length + i.length) return false;
            let s = t.slice(0, n.length), a = i.length === 0 ? [] : t.slice(-i.length), l = t.slice(n.length, i.length === 0 ? 1 / 0 : -i.length);
            return n.every((u, c) => we(u, s[c], r)) && i.every((u, c) => we(u, a[c], r)) && (o.length === 0 || we(o[0], l, r));
          }
          return e.length === t.length && e.every((s, a) => we(s, t[a], r));
        }
        return Reflect.ownKeys(e).every((n) => {
          let i = e[n];
          return (n in t || Vr(o = i) && o[Ne]().matcherType === "optional") && we(i, t[n], r);
          var o;
        });
      }
      return Object.is(t, e);
    };
    var Ge = (e) => {
      var t, r, n;
      return zn(e) ? Vr(e) ? (t = (r = (n = e[Ne]()).getSelectionKeys) == null ? void 0 : r.call(n)) != null ? t : [] : Array.isArray(e) ? Wt(e, Ge) : Wt(Object.values(e), Ge) : [];
    };
    var Wt = (e, t) => e.reduce((r, n) => r.concat(t(n)), []);
    function me(e) {
      return Object.assign(e, { optional: () => Fu(e), and: (t) => j(e, t), or: (t) => Mu(e, t), select: (t) => t === void 0 ? Mo(e) : Mo(t, e) });
    }
    function Fu(e) {
      return me({ [Ne]: () => ({ match: (t) => {
        let r = {}, n = (i, o) => {
          r[i] = o;
        };
        return t === void 0 ? (Ge(e).forEach((i) => n(i, void 0)), { matched: true, selections: r }) : { matched: we(e, t, n), selections: r };
      }, getSelectionKeys: () => Ge(e), matcherType: "optional" }) });
    }
    function j(...e) {
      return me({ [Ne]: () => ({ match: (t) => {
        let r = {}, n = (i, o) => {
          r[i] = o;
        };
        return { matched: e.every((i) => we(i, t, n)), selections: r };
      }, getSelectionKeys: () => Wt(e, Ge), matcherType: "and" }) });
    }
    function Mu(...e) {
      return me({ [Ne]: () => ({ match: (t) => {
        let r = {}, n = (i, o) => {
          r[i] = o;
        };
        return Wt(e, Ge).forEach((i) => n(i, void 0)), { matched: e.some((i) => we(i, t, n)), selections: r };
      }, getSelectionKeys: () => Wt(e, Ge), matcherType: "or" }) });
    }
    function I(e) {
      return { [Ne]: () => ({ match: (t) => ({ matched: !!e(t) }) }) };
    }
    function Mo(...e) {
      let t = typeof e[0] == "string" ? e[0] : void 0, r = e.length === 2 ? e[1] : typeof e[0] == "string" ? void 0 : e[0];
      return me({ [Ne]: () => ({ match: (n) => {
        let i = { [t ?? jr]: n };
        return { matched: r === void 0 || we(r, n, (o, s) => {
          i[o] = s;
        }), selections: i };
      }, getSelectionKeys: () => [t ?? jr].concat(r === void 0 ? [] : Ge(r)) }) });
    }
    function Ee(e) {
      return typeof e == "number";
    }
    function je(e) {
      return typeof e == "string";
    }
    function Be(e) {
      return typeof e == "bigint";
    }
    var lf = me(I(function(e) {
      return true;
    }));
    var Ue = (e) => Object.assign(me(e), { startsWith: (t) => {
      return Ue(j(e, (r = t, I((n) => je(n) && n.startsWith(r)))));
      var r;
    }, endsWith: (t) => {
      return Ue(j(e, (r = t, I((n) => je(n) && n.endsWith(r)))));
      var r;
    }, minLength: (t) => Ue(j(e, ((r) => I((n) => je(n) && n.length >= r))(t))), length: (t) => Ue(j(e, ((r) => I((n) => je(n) && n.length === r))(t))), maxLength: (t) => Ue(j(e, ((r) => I((n) => je(n) && n.length <= r))(t))), includes: (t) => {
      return Ue(j(e, (r = t, I((n) => je(n) && n.includes(r)))));
      var r;
    }, regex: (t) => {
      return Ue(j(e, (r = t, I((n) => je(n) && !!n.match(r)))));
      var r;
    } });
    var uf = Ue(I(je));
    var be = (e) => Object.assign(me(e), { between: (t, r) => be(j(e, ((n, i) => I((o) => Ee(o) && n <= o && i >= o))(t, r))), lt: (t) => be(j(e, ((r) => I((n) => Ee(n) && n < r))(t))), gt: (t) => be(j(e, ((r) => I((n) => Ee(n) && n > r))(t))), lte: (t) => be(j(e, ((r) => I((n) => Ee(n) && n <= r))(t))), gte: (t) => be(j(e, ((r) => I((n) => Ee(n) && n >= r))(t))), int: () => be(j(e, I((t) => Ee(t) && Number.isInteger(t)))), finite: () => be(j(e, I((t) => Ee(t) && Number.isFinite(t)))), positive: () => be(j(e, I((t) => Ee(t) && t > 0))), negative: () => be(j(e, I((t) => Ee(t) && t < 0))) });
    var cf = be(I(Ee));
    var Qe = (e) => Object.assign(me(e), { between: (t, r) => Qe(j(e, ((n, i) => I((o) => Be(o) && n <= o && i >= o))(t, r))), lt: (t) => Qe(j(e, ((r) => I((n) => Be(n) && n < r))(t))), gt: (t) => Qe(j(e, ((r) => I((n) => Be(n) && n > r))(t))), lte: (t) => Qe(j(e, ((r) => I((n) => Be(n) && n <= r))(t))), gte: (t) => Qe(j(e, ((r) => I((n) => Be(n) && n >= r))(t))), positive: () => Qe(j(e, I((t) => Be(t) && t > 0))), negative: () => Qe(j(e, I((t) => Be(t) && t < 0))) });
    var pf = Qe(I(Be));
    var df = me(I(function(e) {
      return typeof e == "boolean";
    }));
    var mf = me(I(function(e) {
      return typeof e == "symbol";
    }));
    var ff = me(I(function(e) {
      return e == null;
    }));
    var gf = me(I(function(e) {
      return e != null;
    }));
    var Zn = class extends Error {
      constructor(t) {
        let r;
        try {
          r = JSON.stringify(t);
        } catch {
          r = t;
        }
        super(`Pattern matching error: no pattern matches value ${r}`), this.input = void 0, this.input = t;
      }
    };
    var Xn = { matched: false, value: void 0 };
    function dt(e) {
      return new ei(e, Xn);
    }
    var ei = class e {
      constructor(t, r) {
        this.input = void 0, this.state = void 0, this.input = t, this.state = r;
      }
      with(...t) {
        if (this.state.matched) return this;
        let r = t[t.length - 1], n = [t[0]], i;
        t.length === 3 && typeof t[1] == "function" ? i = t[1] : t.length > 2 && n.push(...t.slice(1, t.length - 1));
        let o = false, s = {}, a = (u, c) => {
          o = true, s[u] = c;
        }, l = !n.some((u) => we(u, this.input, a)) || i && !i(this.input) ? Xn : { matched: true, value: r(o ? jr in s ? s[jr] : s : this.input, this.input) };
        return new e(this.input, l);
      }
      when(t, r) {
        if (this.state.matched) return this;
        let n = !!t(this.input);
        return new e(this.input, n ? { matched: true, value: r(this.input, this.input) } : Xn);
      }
      otherwise(t) {
        return this.state.matched ? this.state.value : t(this.input);
      }
      exhaustive() {
        if (this.state.matched) return this.state.value;
        throw new Zn(this.input);
      }
      run() {
        return this.exhaustive();
      }
      returnType() {
        return this;
      }
    };
    var jo = require("util");
    var $u = { warn: _e("prisma:warn") };
    var qu = { warn: () => !process.env.PRISMA_DISABLE_WARNINGS };
    function Br(e, ...t) {
      qu.warn() && console.warn(`${$u.warn} ${e}`, ...t);
    }
    var Vu = (0, jo.promisify)(Vo.default.exec);
    var ne = F("prisma:get-platform");
    var ju = ["1.0.x", "1.1.x", "3.0.x"];
    async function Bo() {
      let e = Qr.default.platform(), t = process.arch;
      if (e === "freebsd") {
        let s = await Gr("freebsd-version");
        if (s && s.trim().length > 0) {
          let l = /^(\d+)\.?/.exec(s);
          if (l) return { platform: "freebsd", targetDistro: `freebsd${l[1]}`, arch: t };
        }
      }
      if (e !== "linux") return { platform: e, arch: t };
      let r = await Uu(), n = await zu(), i = Gu({ arch: t, archFromUname: n, familyDistro: r.familyDistro }), { libssl: o } = await Ju(i);
      return { platform: "linux", libssl: o, arch: t, archFromUname: n, ...r };
    }
    function Bu(e) {
      let t = /^ID="?([^"\n]*)"?$/im, r = /^ID_LIKE="?([^"\n]*)"?$/im, n = t.exec(e), i = n && n[1] && n[1].toLowerCase() || "", o = r.exec(e), s = o && o[1] && o[1].toLowerCase() || "", a = dt({ id: i, idLike: s }).with({ id: "alpine" }, ({ id: l }) => ({ targetDistro: "musl", familyDistro: l, originalDistro: l })).with({ id: "raspbian" }, ({ id: l }) => ({ targetDistro: "arm", familyDistro: "debian", originalDistro: l })).with({ id: "nixos" }, ({ id: l }) => ({ targetDistro: "nixos", originalDistro: l, familyDistro: "nixos" })).with({ id: "debian" }, { id: "ubuntu" }, ({ id: l }) => ({ targetDistro: "debian", familyDistro: "debian", originalDistro: l })).with({ id: "rhel" }, { id: "centos" }, { id: "fedora" }, ({ id: l }) => ({ targetDistro: "rhel", familyDistro: "rhel", originalDistro: l })).when(({ idLike: l }) => l.includes("debian") || l.includes("ubuntu"), ({ id: l }) => ({ targetDistro: "debian", familyDistro: "debian", originalDistro: l })).when(({ idLike: l }) => i === "arch" || l.includes("arch"), ({ id: l }) => ({ targetDistro: "debian", familyDistro: "arch", originalDistro: l })).when(({ idLike: l }) => l.includes("centos") || l.includes("fedora") || l.includes("rhel") || l.includes("suse"), ({ id: l }) => ({ targetDistro: "rhel", familyDistro: "rhel", originalDistro: l })).otherwise(({ id: l }) => ({ targetDistro: void 0, familyDistro: void 0, originalDistro: l }));
      return ne(`Found distro info:
${JSON.stringify(a, null, 2)}`), a;
    }
    async function Uu() {
      let e = "/etc/os-release";
      try {
        let t = await ti.default.readFile(e, { encoding: "utf-8" });
        return Bu(t);
      } catch {
        return { targetDistro: void 0, familyDistro: void 0, originalDistro: void 0 };
      }
    }
    function Qu(e) {
      let t = /^OpenSSL\s(\d+\.\d+)\.\d+/.exec(e);
      if (t) {
        let r = `${t[1]}.x`;
        return Uo(r);
      }
    }
    function $o(e) {
      let t = /libssl\.so\.(\d)(\.\d)?/.exec(e);
      if (t) {
        let r = `${t[1]}${t[2] ?? ".0"}.x`;
        return Uo(r);
      }
    }
    function Uo(e) {
      let t = (() => {
        if (Go(e)) return e;
        let r = e.split(".");
        return r[1] = "0", r.join(".");
      })();
      if (ju.includes(t)) return t;
    }
    function Gu(e) {
      return dt(e).with({ familyDistro: "musl" }, () => (ne('Trying platform-specific paths for "alpine"'), ["/lib", "/usr/lib"])).with({ familyDistro: "debian" }, ({ archFromUname: t }) => (ne('Trying platform-specific paths for "debian" (and "ubuntu")'), [`/usr/lib/${t}-linux-gnu`, `/lib/${t}-linux-gnu`])).with({ familyDistro: "rhel" }, () => (ne('Trying platform-specific paths for "rhel"'), ["/lib64", "/usr/lib64"])).otherwise(({ familyDistro: t, arch: r, archFromUname: n }) => (ne(`Don't know any platform-specific paths for "${t}" on ${r} (${n})`), []));
    }
    async function Ju(e) {
      let t = 'grep -v "libssl.so.0"', r = await qo(e);
      if (r) {
        ne(`Found libssl.so file using platform-specific paths: ${r}`);
        let o = $o(r);
        if (ne(`The parsed libssl version is: ${o}`), o) return { libssl: o, strategy: "libssl-specific-path" };
      }
      ne('Falling back to "ldconfig" and other generic paths');
      let n = await Gr(`ldconfig -p | sed "s/.*=>s*//" | sed "s|.*/||" | grep libssl | sort | ${t}`);
      if (n || (n = await qo(["/lib64", "/usr/lib64", "/lib", "/usr/lib"])), n) {
        ne(`Found libssl.so file using "ldconfig" or other generic paths: ${n}`);
        let o = $o(n);
        if (ne(`The parsed libssl version is: ${o}`), o) return { libssl: o, strategy: "ldconfig" };
      }
      let i = await Gr("openssl version -v");
      if (i) {
        ne(`Found openssl binary with version: ${i}`);
        let o = Qu(i);
        if (ne(`The parsed openssl version is: ${o}`), o) return { libssl: o, strategy: "openssl-binary" };
      }
      return ne("Couldn't find any version of libssl or OpenSSL in the system"), {};
    }
    async function qo(e) {
      for (let t of e) {
        let r = await Wu(t);
        if (r) return r;
      }
    }
    async function Wu(e) {
      try {
        return (await ti.default.readdir(e)).find((r) => r.startsWith("libssl.so.") && !r.startsWith("libssl.so.0"));
      } catch (t) {
        if (t.code === "ENOENT") return;
        throw t;
      }
    }
    async function nt() {
      let { binaryTarget: e } = await Qo();
      return e;
    }
    function Hu(e) {
      return e.binaryTarget !== void 0;
    }
    async function ri() {
      let { memoized: e, ...t } = await Qo();
      return t;
    }
    var Ur = {};
    async function Qo() {
      if (Hu(Ur)) return Promise.resolve({ ...Ur, memoized: true });
      let e = await Bo(), t = Ku(e);
      return Ur = { ...e, binaryTarget: t }, { ...Ur, memoized: false };
    }
    function Ku(e) {
      let { platform: t, arch: r, archFromUname: n, libssl: i, targetDistro: o, familyDistro: s, originalDistro: a } = e;
      t === "linux" && !["x64", "arm64"].includes(r) && Br(`Prisma only officially supports Linux on amd64 (x86_64) and arm64 (aarch64) system architectures (detected "${r}" instead). If you are using your own custom Prisma engines, you can ignore this warning, as long as you've compiled the engines for your system architecture "${n}".`);
      let l = "1.1.x";
      if (t === "linux" && i === void 0) {
        let c = dt({ familyDistro: s }).with({ familyDistro: "debian" }, () => "Please manually install OpenSSL via `apt-get update -y && apt-get install -y openssl` and try installing Prisma again. If you're running Prisma on Docker, add this command to your Dockerfile, or switch to an image that already has OpenSSL installed.").otherwise(() => "Please manually install OpenSSL and try installing Prisma again.");
        Br(`Prisma failed to detect the libssl/openssl version to use, and may not work as expected. Defaulting to "openssl-${l}".
${c}`);
      }
      let u = "debian";
      if (t === "linux" && o === void 0 && ne(`Distro is "${a}". Falling back to Prisma engines built for "${u}".`), t === "darwin" && r === "arm64") return "darwin-arm64";
      if (t === "darwin") return "darwin";
      if (t === "win32") return "windows";
      if (t === "freebsd") return o;
      if (t === "openbsd") return "openbsd";
      if (t === "netbsd") return "netbsd";
      if (t === "linux" && o === "nixos") return "linux-nixos";
      if (t === "linux" && r === "arm64") return `${o === "musl" ? "linux-musl-arm64" : "linux-arm64"}-openssl-${i || l}`;
      if (t === "linux" && r === "arm") return `linux-arm-openssl-${i || l}`;
      if (t === "linux" && o === "musl") {
        let c = "linux-musl";
        return !i || Go(i) ? c : `${c}-openssl-${i}`;
      }
      return t === "linux" && o && i ? `${o}-openssl-${i}` : (t !== "linux" && Br(`Prisma detected unknown OS "${t}" and may not work as expected. Defaulting to "linux".`), i ? `${u}-openssl-${i}` : o ? `${o}-openssl-${l}` : `${u}-openssl-${l}`);
    }
    async function Yu(e) {
      try {
        return await e();
      } catch {
        return;
      }
    }
    function Gr(e) {
      return Yu(async () => {
        let t = await Vu(e);
        return ne(`Command "${e}" successfully returned "${t.stdout}"`), t.stdout;
      });
    }
    async function zu() {
      var _a2;
      return typeof Qr.default.machine == "function" ? Qr.default.machine() : (_a2 = await Gr("uname -m")) == null ? void 0 : _a2.trim();
    }
    function Go(e) {
      return e.startsWith("1.");
    }
    var ns = _(rs());
    function ui(e) {
      return (0, ns.default)(e, e, { fallback: X });
    }
    var nc = _(pi());
    var q = _(require("path"));
    var ic = _(pi());
    var Wf = F("prisma:engines");
    function is() {
      return q.default.join(__dirname, "../");
    }
    var Hf = "libquery-engine";
    q.default.join(__dirname, "../query-engine-darwin");
    q.default.join(__dirname, "../query-engine-darwin-arm64");
    q.default.join(__dirname, "../query-engine-debian-openssl-1.0.x");
    q.default.join(__dirname, "../query-engine-debian-openssl-1.1.x");
    q.default.join(__dirname, "../query-engine-debian-openssl-3.0.x");
    q.default.join(__dirname, "../query-engine-linux-static-x64");
    q.default.join(__dirname, "../query-engine-linux-static-arm64");
    q.default.join(__dirname, "../query-engine-rhel-openssl-1.0.x");
    q.default.join(__dirname, "../query-engine-rhel-openssl-1.1.x");
    q.default.join(__dirname, "../query-engine-rhel-openssl-3.0.x");
    q.default.join(__dirname, "../libquery_engine-darwin.dylib.node");
    q.default.join(__dirname, "../libquery_engine-darwin-arm64.dylib.node");
    q.default.join(__dirname, "../libquery_engine-debian-openssl-1.0.x.so.node");
    q.default.join(__dirname, "../libquery_engine-debian-openssl-1.1.x.so.node");
    q.default.join(__dirname, "../libquery_engine-debian-openssl-3.0.x.so.node");
    q.default.join(__dirname, "../libquery_engine-linux-arm64-openssl-1.0.x.so.node");
    q.default.join(__dirname, "../libquery_engine-linux-arm64-openssl-1.1.x.so.node");
    q.default.join(__dirname, "../libquery_engine-linux-arm64-openssl-3.0.x.so.node");
    q.default.join(__dirname, "../libquery_engine-linux-musl.so.node");
    q.default.join(__dirname, "../libquery_engine-linux-musl-openssl-3.0.x.so.node");
    q.default.join(__dirname, "../libquery_engine-rhel-openssl-1.0.x.so.node");
    q.default.join(__dirname, "../libquery_engine-rhel-openssl-1.1.x.so.node");
    q.default.join(__dirname, "../libquery_engine-rhel-openssl-3.0.x.so.node");
    q.default.join(__dirname, "../query_engine-windows.dll.node");
    var di = _(require("fs"));
    var os = F("chmodPlusX");
    function mi(e) {
      if (process.platform === "win32") return;
      let t = di.default.statSync(e), r = t.mode | 64 | 8 | 1;
      if (t.mode === r) {
        os(`Execution permissions of ${e} are fine`);
        return;
      }
      let n = r.toString(8).slice(-3);
      os(`Have to call chmodPlusX on ${e}`), di.default.chmodSync(e, n);
    }
    function fi(e) {
      let t = e.e, r = (a) => `Prisma cannot find the required \`${a}\` system library in your system`, n = t.message.includes("cannot open shared object file"), i = `Please refer to the documentation about Prisma's system requirements: ${ui("https://pris.ly/d/system-requirements")}`, o = `Unable to require(\`${ke(e.id)}\`).`, s = dt({ message: t.message, code: t.code }).with({ code: "ENOENT" }, () => "File does not exist.").when(({ message: a }) => n && a.includes("libz"), () => `${r("libz")}. Please install it and try again.`).when(({ message: a }) => n && a.includes("libgcc_s"), () => `${r("libgcc_s")}. Please install it and try again.`).when(({ message: a }) => n && a.includes("libssl"), () => {
        let a = e.platformInfo.libssl ? `openssl-${e.platformInfo.libssl}` : "openssl";
        return `${r("libssl")}. Please install ${a} and try again.`;
      }).when(({ message: a }) => a.includes("GLIBC"), () => `Prisma has detected an incompatible version of the \`glibc\` C standard library installed in your system. This probably means your system may be too old to run Prisma. ${i}`).when(({ message: a }) => e.platformInfo.platform === "linux" && a.includes("symbol not found"), () => `The Prisma engines are not compatible with your system ${e.platformInfo.originalDistro} on (${e.platformInfo.archFromUname}) which uses the \`${e.platformInfo.binaryTarget}\` binaryTarget by default. ${i}`).otherwise(() => `The Prisma engines do not seem to be compatible with your system. ${i}`);
      return `${o}
${s}

Details: ${t.message}`;
    }
    var bi = _(cs());
    var Kr = _(require("fs"));
    var gt = _(require("path"));
    function ps(e) {
      let t = e.ignoreProcessEnv ? {} : process.env, r = (n) => {
        var _a2;
        return ((_a2 = n.match(/(.?\${(?:[a-zA-Z0-9_]+)?})/g)) == null ? void 0 : _a2.reduce(function(o, s) {
          let a = /(.?)\${([a-zA-Z0-9_]+)?}/g.exec(s);
          if (!a) return o;
          let l = a[1], u, c;
          if (l === "\\") c = a[0], u = c.replace("\\$", "$");
          else {
            let p = a[2];
            c = a[0].substring(l.length), u = Object.hasOwnProperty.call(t, p) ? t[p] : e.parsed[p] || "", u = r(u);
          }
          return o.replace(c, u);
        }, n)) ?? n;
      };
      for (let n in e.parsed) {
        let i = Object.hasOwnProperty.call(t, n) ? t[n] : e.parsed[n];
        e.parsed[n] = r(i);
      }
      for (let n in e.parsed) t[n] = e.parsed[n];
      return e;
    }
    var Ei = F("prisma:tryLoadEnv");
    function Yt({ rootEnvPath: e, schemaEnvPath: t }, r = { conflictCheck: "none" }) {
      var _a2, _b;
      let n = ds(e);
      r.conflictCheck !== "none" && wc(n, t, r.conflictCheck);
      let i = null;
      return ms(n == null ? void 0 : n.path, t) || (i = ds(t)), !n && !i && Ei("No Environment variables loaded"), (i == null ? void 0 : i.dotenvResult.error) ? console.error(de(H("Schema Env Error: ")) + i.dotenvResult.error) : { message: [n == null ? void 0 : n.message, i == null ? void 0 : i.message].filter(Boolean).join(`
`), parsed: { ...(_a2 = n == null ? void 0 : n.dotenvResult) == null ? void 0 : _a2.parsed, ...(_b = i == null ? void 0 : i.dotenvResult) == null ? void 0 : _b.parsed } };
    }
    function wc(e, t, r) {
      let n = e == null ? void 0 : e.dotenvResult.parsed, i = !ms(e == null ? void 0 : e.path, t);
      if (n && t && i && Kr.default.existsSync(t)) {
        let o = bi.default.parse(Kr.default.readFileSync(t)), s = [];
        for (let a in o) n[a] === o[a] && s.push(a);
        if (s.length > 0) {
          let a = gt.default.relative(process.cwd(), e.path), l = gt.default.relative(process.cwd(), t);
          if (r === "error") {
            let u = `There is a conflict between env var${s.length > 1 ? "s" : ""} in ${X(a)} and ${X(l)}
Conflicting env vars:
${s.map((c) => `  ${H(c)}`).join(`
`)}

We suggest to move the contents of ${X(l)} to ${X(a)} to consolidate your env vars.
`;
            throw new Error(u);
          } else if (r === "warn") {
            let u = `Conflict for env var${s.length > 1 ? "s" : ""} ${s.map((c) => H(c)).join(", ")} in ${X(a)} and ${X(l)}
Env vars from ${X(l)} overwrite the ones from ${X(a)}
      `;
            console.warn(`${_e("warn(prisma)")} ${u}`);
          }
        }
      }
    }
    function ds(e) {
      if (xc(e)) {
        Ei(`Environment variables loaded from ${e}`);
        let t = bi.default.config({ path: e, debug: process.env.DOTENV_CONFIG_DEBUG ? true : void 0 });
        return { dotenvResult: ps(t), message: ke(`Environment variables loaded from ${gt.default.relative(process.cwd(), e)}`), path: e };
      } else Ei(`Environment variables not found at ${e}`);
      return null;
    }
    function ms(e, t) {
      return e && t && gt.default.resolve(e) === gt.default.resolve(t);
    }
    function xc(e) {
      return !!(e && Kr.default.existsSync(e));
    }
    var fs = "library";
    function ht(e) {
      let t = Pc();
      return t || ((e == null ? void 0 : e.config.engineType) === "library" ? "library" : (e == null ? void 0 : e.config.engineType) === "binary" ? "binary" : (e == null ? void 0 : e.config.engineType) === "client" ? "client" : fs);
    }
    function Pc() {
      let e = process.env.PRISMA_CLIENT_ENGINE_TYPE;
      return e === "library" ? "library" : e === "binary" ? "binary" : e === "client" ? "client" : void 0;
    }
    var bs = "prisma+postgres";
    var Yr = `${bs}:`;
    function wi(e) {
      return (e == null ? void 0 : e.startsWith(`${Yr}//`)) ?? false;
    }
    var zt;
    ((t) => {
      let e;
      ((A) => (A.findUnique = "findUnique", A.findUniqueOrThrow = "findUniqueOrThrow", A.findFirst = "findFirst", A.findFirstOrThrow = "findFirstOrThrow", A.findMany = "findMany", A.create = "create", A.createMany = "createMany", A.createManyAndReturn = "createManyAndReturn", A.update = "update", A.updateMany = "updateMany", A.updateManyAndReturn = "updateManyAndReturn", A.upsert = "upsert", A.delete = "delete", A.deleteMany = "deleteMany", A.groupBy = "groupBy", A.count = "count", A.aggregate = "aggregate", A.findRaw = "findRaw", A.aggregateRaw = "aggregateRaw"))(e = t.ModelAction ||= {});
    })(zt ||= {});
    var Zt = _(require("path"));
    function xi(e) {
      return Zt.default.sep === Zt.default.posix.sep ? e : e.split(Zt.default.sep).join(Zt.default.posix.sep);
    }
    var xs = _(Pi());
    function Ti(e) {
      return String(new vi(e));
    }
    var vi = class {
      constructor(t) {
        this.config = t;
      }
      toString() {
        let { config: t } = this, r = t.provider.fromEnvVar ? `env("${t.provider.fromEnvVar}")` : t.provider.value, n = JSON.parse(JSON.stringify({ provider: r, binaryTargets: Tc(t.binaryTargets) }));
        return `generator ${t.name} {
${(0, xs.default)(Rc(n), 2)}
}`;
      }
    };
    function Tc(e) {
      let t;
      if (e.length > 0) {
        let r = e.find((n) => n.fromEnvVar !== null);
        r ? t = `env("${r.fromEnvVar}")` : t = e.map((n) => n.native ? "native" : n.value);
      } else t = void 0;
      return t;
    }
    function Rc(e) {
      let t = Object.keys(e).reduce((r, n) => Math.max(r, n.length), 0);
      return Object.entries(e).map(([r, n]) => `${r.padEnd(t)} = ${Cc(n)}`).join(`
`);
    }
    function Cc(e) {
      return JSON.parse(JSON.stringify(e, (t, r) => Array.isArray(r) ? `[${r.map((n) => JSON.stringify(n)).join(", ")}]` : JSON.stringify(r)));
    }
    var er = {};
    Ut(er, { error: () => Ic, info: () => Ac, log: () => Sc, query: () => Oc, should: () => Ps, tags: () => Xt, warn: () => Ri });
    var Xt = { error: de("prisma:error"), warn: _e("prisma:warn"), info: De("prisma:info"), query: rt("prisma:query") };
    var Ps = { warn: () => !process.env.PRISMA_DISABLE_WARNINGS };
    function Sc(...e) {
      console.log(...e);
    }
    function Ri(e, ...t) {
      Ps.warn() && console.warn(`${Xt.warn} ${e}`, ...t);
    }
    function Ac(e, ...t) {
      console.info(`${Xt.info} ${e}`, ...t);
    }
    function Ic(e, ...t) {
      console.error(`${Xt.error} ${e}`, ...t);
    }
    function Oc(e, ...t) {
      console.log(`${Xt.query} ${e}`, ...t);
    }
    function zr(e, t) {
      if (!e) throw new Error(`${t}. This should never happen. If you see this error, please, open an issue at https://pris.ly/prisma-prisma-bug-report`);
    }
    function Fe(e, t) {
      throw new Error(t);
    }
    function Si(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }
    var Ai = (e, t) => e.reduce((r, n) => (r[t(n)] = n, r), {});
    function yt(e, t) {
      let r = {};
      for (let n of Object.keys(e)) r[n] = t(e[n], n);
      return r;
    }
    function Ii(e, t) {
      if (e.length === 0) return;
      let r = e[0];
      for (let n = 1; n < e.length; n++) t(r, e[n]) < 0 && (r = e[n]);
      return r;
    }
    function w(e, t) {
      Object.defineProperty(e, "name", { value: t, configurable: true });
    }
    var Ss = /* @__PURE__ */ new Set();
    var tr = (e, t, ...r) => {
      Ss.has(e) || (Ss.add(e), Ri(t, ...r));
    };
    var T = class e extends Error {
      constructor(t, r, n) {
        super(t), this.name = "PrismaClientInitializationError", this.clientVersion = r, this.errorCode = n, Error.captureStackTrace(e);
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientInitializationError";
      }
    };
    w(T, "PrismaClientInitializationError");
    var ee = class extends Error {
      constructor(t, { code: r, clientVersion: n, meta: i, batchRequestIdx: o }) {
        super(t), this.name = "PrismaClientKnownRequestError", this.code = r, this.clientVersion = n, this.meta = i, Object.defineProperty(this, "batchRequestIdx", { value: o, enumerable: false, writable: true });
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientKnownRequestError";
      }
    };
    w(ee, "PrismaClientKnownRequestError");
    var ce = class extends Error {
      constructor(t, r) {
        super(t), this.name = "PrismaClientRustPanicError", this.clientVersion = r;
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientRustPanicError";
      }
    };
    w(ce, "PrismaClientRustPanicError");
    var B = class extends Error {
      constructor(t, { clientVersion: r, batchRequestIdx: n }) {
        super(t), this.name = "PrismaClientUnknownRequestError", this.clientVersion = r, Object.defineProperty(this, "batchRequestIdx", { value: n, writable: true, enumerable: false });
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientUnknownRequestError";
      }
    };
    w(B, "PrismaClientUnknownRequestError");
    var te = class extends Error {
      constructor(r, { clientVersion: n }) {
        super(r);
        this.name = "PrismaClientValidationError";
        this.clientVersion = n;
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientValidationError";
      }
    };
    w(te, "PrismaClientValidationError");
    var Et = 9e15;
    var Ye = 1e9;
    var Oi = "0123456789abcdef";
    var tn = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058";
    var rn = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789";
    var ki = { precision: 20, rounding: 4, modulo: 1, toExpNeg: -7, toExpPos: 21, minE: -Et, maxE: Et, crypto: false };
    var ks;
    var Me;
    var b = true;
    var on = "[DecimalError] ";
    var Ke = on + "Invalid argument: ";
    var _s = on + "Precision limit exceeded";
    var Ds = on + "crypto unavailable";
    var Ns = "[object Decimal]";
    var re = Math.floor;
    var G = Math.pow;
    var _c = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i;
    var Dc = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i;
    var Nc = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i;
    var Ls = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
    var he = 1e7;
    var E = 7;
    var Lc = 9007199254740991;
    var Fc = tn.length - 1;
    var _i = rn.length - 1;
    var m = { toStringTag: Ns };
    m.absoluteValue = m.abs = function() {
      var e = new this.constructor(this);
      return e.s < 0 && (e.s = 1), y(e);
    };
    m.ceil = function() {
      return y(new this.constructor(this), this.e + 1, 2);
    };
    m.clampedTo = m.clamp = function(e, t) {
      var r, n = this, i = n.constructor;
      if (e = new i(e), t = new i(t), !e.s || !t.s) return new i(NaN);
      if (e.gt(t)) throw Error(Ke + t);
      return r = n.cmp(e), r < 0 ? e : n.cmp(t) > 0 ? t : new i(n);
    };
    m.comparedTo = m.cmp = function(e) {
      var t, r, n, i, o = this, s = o.d, a = (e = new o.constructor(e)).d, l = o.s, u = e.s;
      if (!s || !a) return !l || !u ? NaN : l !== u ? l : s === a ? 0 : !s ^ l < 0 ? 1 : -1;
      if (!s[0] || !a[0]) return s[0] ? l : a[0] ? -u : 0;
      if (l !== u) return l;
      if (o.e !== e.e) return o.e > e.e ^ l < 0 ? 1 : -1;
      for (n = s.length, i = a.length, t = 0, r = n < i ? n : i; t < r; ++t) if (s[t] !== a[t]) return s[t] > a[t] ^ l < 0 ? 1 : -1;
      return n === i ? 0 : n > i ^ l < 0 ? 1 : -1;
    };
    m.cosine = m.cos = function() {
      var e, t, r = this, n = r.constructor;
      return r.d ? r.d[0] ? (e = n.precision, t = n.rounding, n.precision = e + Math.max(r.e, r.sd()) + E, n.rounding = 1, r = Mc(n, Vs(n, r)), n.precision = e, n.rounding = t, y(Me == 2 || Me == 3 ? r.neg() : r, e, t, true)) : new n(1) : new n(NaN);
    };
    m.cubeRoot = m.cbrt = function() {
      var e, t, r, n, i, o, s, a, l, u, c = this, p = c.constructor;
      if (!c.isFinite() || c.isZero()) return new p(c);
      for (b = false, o = c.s * G(c.s * c, 1 / 3), !o || Math.abs(o) == 1 / 0 ? (r = K(c.d), e = c.e, (o = (e - r.length + 1) % 3) && (r += o == 1 || o == -2 ? "0" : "00"), o = G(r, 1 / 3), e = re((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2)), o == 1 / 0 ? r = "5e" + e : (r = o.toExponential(), r = r.slice(0, r.indexOf("e") + 1) + e), n = new p(r), n.s = c.s) : n = new p(o.toString()), s = (e = p.precision) + 3; ; ) if (a = n, l = a.times(a).times(a), u = l.plus(c), n = M(u.plus(c).times(a), u.plus(l), s + 2, 1), K(a.d).slice(0, s) === (r = K(n.d)).slice(0, s)) if (r = r.slice(s - 3, s + 1), r == "9999" || !i && r == "4999") {
        if (!i && (y(a, e + 1, 0), a.times(a).times(a).eq(c))) {
          n = a;
          break;
        }
        s += 4, i = 1;
      } else {
        (!+r || !+r.slice(1) && r.charAt(0) == "5") && (y(n, e + 1, 1), t = !n.times(n).times(n).eq(c));
        break;
      }
      return b = true, y(n, e, p.rounding, t);
    };
    m.decimalPlaces = m.dp = function() {
      var e, t = this.d, r = NaN;
      if (t) {
        if (e = t.length - 1, r = (e - re(this.e / E)) * E, e = t[e], e) for (; e % 10 == 0; e /= 10) r--;
        r < 0 && (r = 0);
      }
      return r;
    };
    m.dividedBy = m.div = function(e) {
      return M(this, new this.constructor(e));
    };
    m.dividedToIntegerBy = m.divToInt = function(e) {
      var t = this, r = t.constructor;
      return y(M(t, new r(e), 0, 1, 1), r.precision, r.rounding);
    };
    m.equals = m.eq = function(e) {
      return this.cmp(e) === 0;
    };
    m.floor = function() {
      return y(new this.constructor(this), this.e + 1, 3);
    };
    m.greaterThan = m.gt = function(e) {
      return this.cmp(e) > 0;
    };
    m.greaterThanOrEqualTo = m.gte = function(e) {
      var t = this.cmp(e);
      return t == 1 || t === 0;
    };
    m.hyperbolicCosine = m.cosh = function() {
      var e, t, r, n, i, o = this, s = o.constructor, a = new s(1);
      if (!o.isFinite()) return new s(o.s ? 1 / 0 : NaN);
      if (o.isZero()) return a;
      r = s.precision, n = s.rounding, s.precision = r + Math.max(o.e, o.sd()) + 4, s.rounding = 1, i = o.d.length, i < 32 ? (e = Math.ceil(i / 3), t = (1 / an(4, e)).toString()) : (e = 16, t = "2.3283064365386962890625e-10"), o = bt(s, 1, o.times(t), new s(1), true);
      for (var l, u = e, c = new s(8); u--; ) l = o.times(o), o = a.minus(l.times(c.minus(l.times(c))));
      return y(o, s.precision = r, s.rounding = n, true);
    };
    m.hyperbolicSine = m.sinh = function() {
      var e, t, r, n, i = this, o = i.constructor;
      if (!i.isFinite() || i.isZero()) return new o(i);
      if (t = o.precision, r = o.rounding, o.precision = t + Math.max(i.e, i.sd()) + 4, o.rounding = 1, n = i.d.length, n < 3) i = bt(o, 2, i, i, true);
      else {
        e = 1.4 * Math.sqrt(n), e = e > 16 ? 16 : e | 0, i = i.times(1 / an(5, e)), i = bt(o, 2, i, i, true);
        for (var s, a = new o(5), l = new o(16), u = new o(20); e--; ) s = i.times(i), i = i.times(a.plus(s.times(l.times(s).plus(u))));
      }
      return o.precision = t, o.rounding = r, y(i, t, r, true);
    };
    m.hyperbolicTangent = m.tanh = function() {
      var e, t, r = this, n = r.constructor;
      return r.isFinite() ? r.isZero() ? new n(r) : (e = n.precision, t = n.rounding, n.precision = e + 7, n.rounding = 1, M(r.sinh(), r.cosh(), n.precision = e, n.rounding = t)) : new n(r.s);
    };
    m.inverseCosine = m.acos = function() {
      var e, t = this, r = t.constructor, n = t.abs().cmp(1), i = r.precision, o = r.rounding;
      return n !== -1 ? n === 0 ? t.isNeg() ? ge(r, i, o) : new r(0) : new r(NaN) : t.isZero() ? ge(r, i + 4, o).times(0.5) : (r.precision = i + 6, r.rounding = 1, t = t.asin(), e = ge(r, i + 4, o).times(0.5), r.precision = i, r.rounding = o, e.minus(t));
    };
    m.inverseHyperbolicCosine = m.acosh = function() {
      var e, t, r = this, n = r.constructor;
      return r.lte(1) ? new n(r.eq(1) ? 0 : NaN) : r.isFinite() ? (e = n.precision, t = n.rounding, n.precision = e + Math.max(Math.abs(r.e), r.sd()) + 4, n.rounding = 1, b = false, r = r.times(r).minus(1).sqrt().plus(r), b = true, n.precision = e, n.rounding = t, r.ln()) : new n(r);
    };
    m.inverseHyperbolicSine = m.asinh = function() {
      var e, t, r = this, n = r.constructor;
      return !r.isFinite() || r.isZero() ? new n(r) : (e = n.precision, t = n.rounding, n.precision = e + 2 * Math.max(Math.abs(r.e), r.sd()) + 6, n.rounding = 1, b = false, r = r.times(r).plus(1).sqrt().plus(r), b = true, n.precision = e, n.rounding = t, r.ln());
    };
    m.inverseHyperbolicTangent = m.atanh = function() {
      var e, t, r, n, i = this, o = i.constructor;
      return i.isFinite() ? i.e >= 0 ? new o(i.abs().eq(1) ? i.s / 0 : i.isZero() ? i : NaN) : (e = o.precision, t = o.rounding, n = i.sd(), Math.max(n, e) < 2 * -i.e - 1 ? y(new o(i), e, t, true) : (o.precision = r = n - i.e, i = M(i.plus(1), new o(1).minus(i), r + e, 1), o.precision = e + 4, o.rounding = 1, i = i.ln(), o.precision = e, o.rounding = t, i.times(0.5))) : new o(NaN);
    };
    m.inverseSine = m.asin = function() {
      var e, t, r, n, i = this, o = i.constructor;
      return i.isZero() ? new o(i) : (t = i.abs().cmp(1), r = o.precision, n = o.rounding, t !== -1 ? t === 0 ? (e = ge(o, r + 4, n).times(0.5), e.s = i.s, e) : new o(NaN) : (o.precision = r + 6, o.rounding = 1, i = i.div(new o(1).minus(i.times(i)).sqrt().plus(1)).atan(), o.precision = r, o.rounding = n, i.times(2)));
    };
    m.inverseTangent = m.atan = function() {
      var e, t, r, n, i, o, s, a, l, u = this, c = u.constructor, p = c.precision, d = c.rounding;
      if (u.isFinite()) {
        if (u.isZero()) return new c(u);
        if (u.abs().eq(1) && p + 4 <= _i) return s = ge(c, p + 4, d).times(0.25), s.s = u.s, s;
      } else {
        if (!u.s) return new c(NaN);
        if (p + 4 <= _i) return s = ge(c, p + 4, d).times(0.5), s.s = u.s, s;
      }
      for (c.precision = a = p + 10, c.rounding = 1, r = Math.min(28, a / E + 2 | 0), e = r; e; --e) u = u.div(u.times(u).plus(1).sqrt().plus(1));
      for (b = false, t = Math.ceil(a / E), n = 1, l = u.times(u), s = new c(u), i = u; e !== -1; ) if (i = i.times(l), o = s.minus(i.div(n += 2)), i = i.times(l), s = o.plus(i.div(n += 2)), s.d[t] !== void 0) for (e = t; s.d[e] === o.d[e] && e--; ) ;
      return r && (s = s.times(2 << r - 1)), b = true, y(s, c.precision = p, c.rounding = d, true);
    };
    m.isFinite = function() {
      return !!this.d;
    };
    m.isInteger = m.isInt = function() {
      return !!this.d && re(this.e / E) > this.d.length - 2;
    };
    m.isNaN = function() {
      return !this.s;
    };
    m.isNegative = m.isNeg = function() {
      return this.s < 0;
    };
    m.isPositive = m.isPos = function() {
      return this.s > 0;
    };
    m.isZero = function() {
      return !!this.d && this.d[0] === 0;
    };
    m.lessThan = m.lt = function(e) {
      return this.cmp(e) < 0;
    };
    m.lessThanOrEqualTo = m.lte = function(e) {
      return this.cmp(e) < 1;
    };
    m.logarithm = m.log = function(e) {
      var t, r, n, i, o, s, a, l, u = this, c = u.constructor, p = c.precision, d = c.rounding, f = 5;
      if (e == null) e = new c(10), t = true;
      else {
        if (e = new c(e), r = e.d, e.s < 0 || !r || !r[0] || e.eq(1)) return new c(NaN);
        t = e.eq(10);
      }
      if (r = u.d, u.s < 0 || !r || !r[0] || u.eq(1)) return new c(r && !r[0] ? -1 / 0 : u.s != 1 ? NaN : r ? 0 : 1 / 0);
      if (t) if (r.length > 1) o = true;
      else {
        for (i = r[0]; i % 10 === 0; ) i /= 10;
        o = i !== 1;
      }
      if (b = false, a = p + f, s = He(u, a), n = t ? nn(c, a + 10) : He(e, a), l = M(s, n, a, 1), rr(l.d, i = p, d)) do
        if (a += 10, s = He(u, a), n = t ? nn(c, a + 10) : He(e, a), l = M(s, n, a, 1), !o) {
          +K(l.d).slice(i + 1, i + 15) + 1 == 1e14 && (l = y(l, p + 1, 0));
          break;
        }
      while (rr(l.d, i += 10, d));
      return b = true, y(l, p, d);
    };
    m.minus = m.sub = function(e) {
      var t, r, n, i, o, s, a, l, u, c, p, d, f = this, g = f.constructor;
      if (e = new g(e), !f.d || !e.d) return !f.s || !e.s ? e = new g(NaN) : f.d ? e.s = -e.s : e = new g(e.d || f.s !== e.s ? f : NaN), e;
      if (f.s != e.s) return e.s = -e.s, f.plus(e);
      if (u = f.d, d = e.d, a = g.precision, l = g.rounding, !u[0] || !d[0]) {
        if (d[0]) e.s = -e.s;
        else if (u[0]) e = new g(f);
        else return new g(l === 3 ? -0 : 0);
        return b ? y(e, a, l) : e;
      }
      if (r = re(e.e / E), c = re(f.e / E), u = u.slice(), o = c - r, o) {
        for (p = o < 0, p ? (t = u, o = -o, s = d.length) : (t = d, r = c, s = u.length), n = Math.max(Math.ceil(a / E), s) + 2, o > n && (o = n, t.length = 1), t.reverse(), n = o; n--; ) t.push(0);
        t.reverse();
      } else {
        for (n = u.length, s = d.length, p = n < s, p && (s = n), n = 0; n < s; n++) if (u[n] != d[n]) {
          p = u[n] < d[n];
          break;
        }
        o = 0;
      }
      for (p && (t = u, u = d, d = t, e.s = -e.s), s = u.length, n = d.length - s; n > 0; --n) u[s++] = 0;
      for (n = d.length; n > o; ) {
        if (u[--n] < d[n]) {
          for (i = n; i && u[--i] === 0; ) u[i] = he - 1;
          --u[i], u[n] += he;
        }
        u[n] -= d[n];
      }
      for (; u[--s] === 0; ) u.pop();
      for (; u[0] === 0; u.shift()) --r;
      return u[0] ? (e.d = u, e.e = sn(u, r), b ? y(e, a, l) : e) : new g(l === 3 ? -0 : 0);
    };
    m.modulo = m.mod = function(e) {
      var t, r = this, n = r.constructor;
      return e = new n(e), !r.d || !e.s || e.d && !e.d[0] ? new n(NaN) : !e.d || r.d && !r.d[0] ? y(new n(r), n.precision, n.rounding) : (b = false, n.modulo == 9 ? (t = M(r, e.abs(), 0, 3, 1), t.s *= e.s) : t = M(r, e, 0, n.modulo, 1), t = t.times(e), b = true, r.minus(t));
    };
    m.naturalExponential = m.exp = function() {
      return Di(this);
    };
    m.naturalLogarithm = m.ln = function() {
      return He(this);
    };
    m.negated = m.neg = function() {
      var e = new this.constructor(this);
      return e.s = -e.s, y(e);
    };
    m.plus = m.add = function(e) {
      var t, r, n, i, o, s, a, l, u, c, p = this, d = p.constructor;
      if (e = new d(e), !p.d || !e.d) return !p.s || !e.s ? e = new d(NaN) : p.d || (e = new d(e.d || p.s === e.s ? p : NaN)), e;
      if (p.s != e.s) return e.s = -e.s, p.minus(e);
      if (u = p.d, c = e.d, a = d.precision, l = d.rounding, !u[0] || !c[0]) return c[0] || (e = new d(p)), b ? y(e, a, l) : e;
      if (o = re(p.e / E), n = re(e.e / E), u = u.slice(), i = o - n, i) {
        for (i < 0 ? (r = u, i = -i, s = c.length) : (r = c, n = o, s = u.length), o = Math.ceil(a / E), s = o > s ? o + 1 : s + 1, i > s && (i = s, r.length = 1), r.reverse(); i--; ) r.push(0);
        r.reverse();
      }
      for (s = u.length, i = c.length, s - i < 0 && (i = s, r = c, c = u, u = r), t = 0; i; ) t = (u[--i] = u[i] + c[i] + t) / he | 0, u[i] %= he;
      for (t && (u.unshift(t), ++n), s = u.length; u[--s] == 0; ) u.pop();
      return e.d = u, e.e = sn(u, n), b ? y(e, a, l) : e;
    };
    m.precision = m.sd = function(e) {
      var t, r = this;
      if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(Ke + e);
      return r.d ? (t = Fs(r.d), e && r.e + 1 > t && (t = r.e + 1)) : t = NaN, t;
    };
    m.round = function() {
      var e = this, t = e.constructor;
      return y(new t(e), e.e + 1, t.rounding);
    };
    m.sine = m.sin = function() {
      var e, t, r = this, n = r.constructor;
      return r.isFinite() ? r.isZero() ? new n(r) : (e = n.precision, t = n.rounding, n.precision = e + Math.max(r.e, r.sd()) + E, n.rounding = 1, r = qc(n, Vs(n, r)), n.precision = e, n.rounding = t, y(Me > 2 ? r.neg() : r, e, t, true)) : new n(NaN);
    };
    m.squareRoot = m.sqrt = function() {
      var e, t, r, n, i, o, s = this, a = s.d, l = s.e, u = s.s, c = s.constructor;
      if (u !== 1 || !a || !a[0]) return new c(!u || u < 0 && (!a || a[0]) ? NaN : a ? s : 1 / 0);
      for (b = false, u = Math.sqrt(+s), u == 0 || u == 1 / 0 ? (t = K(a), (t.length + l) % 2 == 0 && (t += "0"), u = Math.sqrt(t), l = re((l + 1) / 2) - (l < 0 || l % 2), u == 1 / 0 ? t = "5e" + l : (t = u.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + l), n = new c(t)) : n = new c(u.toString()), r = (l = c.precision) + 3; ; ) if (o = n, n = o.plus(M(s, o, r + 2, 1)).times(0.5), K(o.d).slice(0, r) === (t = K(n.d)).slice(0, r)) if (t = t.slice(r - 3, r + 1), t == "9999" || !i && t == "4999") {
        if (!i && (y(o, l + 1, 0), o.times(o).eq(s))) {
          n = o;
          break;
        }
        r += 4, i = 1;
      } else {
        (!+t || !+t.slice(1) && t.charAt(0) == "5") && (y(n, l + 1, 1), e = !n.times(n).eq(s));
        break;
      }
      return b = true, y(n, l, c.rounding, e);
    };
    m.tangent = m.tan = function() {
      var e, t, r = this, n = r.constructor;
      return r.isFinite() ? r.isZero() ? new n(r) : (e = n.precision, t = n.rounding, n.precision = e + 10, n.rounding = 1, r = r.sin(), r.s = 1, r = M(r, new n(1).minus(r.times(r)).sqrt(), e + 10, 0), n.precision = e, n.rounding = t, y(Me == 2 || Me == 4 ? r.neg() : r, e, t, true)) : new n(NaN);
    };
    m.times = m.mul = function(e) {
      var t, r, n, i, o, s, a, l, u, c = this, p = c.constructor, d = c.d, f = (e = new p(e)).d;
      if (e.s *= c.s, !d || !d[0] || !f || !f[0]) return new p(!e.s || d && !d[0] && !f || f && !f[0] && !d ? NaN : !d || !f ? e.s / 0 : e.s * 0);
      for (r = re(c.e / E) + re(e.e / E), l = d.length, u = f.length, l < u && (o = d, d = f, f = o, s = l, l = u, u = s), o = [], s = l + u, n = s; n--; ) o.push(0);
      for (n = u; --n >= 0; ) {
        for (t = 0, i = l + n; i > n; ) a = o[i] + f[n] * d[i - n - 1] + t, o[i--] = a % he | 0, t = a / he | 0;
        o[i] = (o[i] + t) % he | 0;
      }
      for (; !o[--s]; ) o.pop();
      return t ? ++r : o.shift(), e.d = o, e.e = sn(o, r), b ? y(e, p.precision, p.rounding) : e;
    };
    m.toBinary = function(e, t) {
      return Li(this, 2, e, t);
    };
    m.toDecimalPlaces = m.toDP = function(e, t) {
      var r = this, n = r.constructor;
      return r = new n(r), e === void 0 ? r : (se(e, 0, Ye), t === void 0 ? t = n.rounding : se(t, 0, 8), y(r, e + r.e + 1, t));
    };
    m.toExponential = function(e, t) {
      var r, n = this, i = n.constructor;
      return e === void 0 ? r = xe(n, true) : (se(e, 0, Ye), t === void 0 ? t = i.rounding : se(t, 0, 8), n = y(new i(n), e + 1, t), r = xe(n, true, e + 1)), n.isNeg() && !n.isZero() ? "-" + r : r;
    };
    m.toFixed = function(e, t) {
      var r, n, i = this, o = i.constructor;
      return e === void 0 ? r = xe(i) : (se(e, 0, Ye), t === void 0 ? t = o.rounding : se(t, 0, 8), n = y(new o(i), e + i.e + 1, t), r = xe(n, false, e + n.e + 1)), i.isNeg() && !i.isZero() ? "-" + r : r;
    };
    m.toFraction = function(e) {
      var t, r, n, i, o, s, a, l, u, c, p, d, f = this, g = f.d, h = f.constructor;
      if (!g) return new h(f);
      if (u = r = new h(1), n = l = new h(0), t = new h(n), o = t.e = Fs(g) - f.e - 1, s = o % E, t.d[0] = G(10, s < 0 ? E + s : s), e == null) e = o > 0 ? t : u;
      else {
        if (a = new h(e), !a.isInt() || a.lt(u)) throw Error(Ke + a);
        e = a.gt(t) ? o > 0 ? t : u : a;
      }
      for (b = false, a = new h(K(g)), c = h.precision, h.precision = o = g.length * E * 2; p = M(a, t, 0, 1, 1), i = r.plus(p.times(n)), i.cmp(e) != 1; ) r = n, n = i, i = u, u = l.plus(p.times(i)), l = i, i = t, t = a.minus(p.times(i)), a = i;
      return i = M(e.minus(r), n, 0, 1, 1), l = l.plus(i.times(u)), r = r.plus(i.times(n)), l.s = u.s = f.s, d = M(u, n, o, 1).minus(f).abs().cmp(M(l, r, o, 1).minus(f).abs()) < 1 ? [u, n] : [l, r], h.precision = c, b = true, d;
    };
    m.toHexadecimal = m.toHex = function(e, t) {
      return Li(this, 16, e, t);
    };
    m.toNearest = function(e, t) {
      var r = this, n = r.constructor;
      if (r = new n(r), e == null) {
        if (!r.d) return r;
        e = new n(1), t = n.rounding;
      } else {
        if (e = new n(e), t === void 0 ? t = n.rounding : se(t, 0, 8), !r.d) return e.s ? r : e;
        if (!e.d) return e.s && (e.s = r.s), e;
      }
      return e.d[0] ? (b = false, r = M(r, e, 0, t, 1).times(e), b = true, y(r)) : (e.s = r.s, r = e), r;
    };
    m.toNumber = function() {
      return +this;
    };
    m.toOctal = function(e, t) {
      return Li(this, 8, e, t);
    };
    m.toPower = m.pow = function(e) {
      var t, r, n, i, o, s, a = this, l = a.constructor, u = +(e = new l(e));
      if (!a.d || !e.d || !a.d[0] || !e.d[0]) return new l(G(+a, u));
      if (a = new l(a), a.eq(1)) return a;
      if (n = l.precision, o = l.rounding, e.eq(1)) return y(a, n, o);
      if (t = re(e.e / E), t >= e.d.length - 1 && (r = u < 0 ? -u : u) <= Lc) return i = Ms(l, a, r, n), e.s < 0 ? new l(1).div(i) : y(i, n, o);
      if (s = a.s, s < 0) {
        if (t < e.d.length - 1) return new l(NaN);
        if (e.d[t] & 1 || (s = 1), a.e == 0 && a.d[0] == 1 && a.d.length == 1) return a.s = s, a;
      }
      return r = G(+a, u), t = r == 0 || !isFinite(r) ? re(u * (Math.log("0." + K(a.d)) / Math.LN10 + a.e + 1)) : new l(r + "").e, t > l.maxE + 1 || t < l.minE - 1 ? new l(t > 0 ? s / 0 : 0) : (b = false, l.rounding = a.s = 1, r = Math.min(12, (t + "").length), i = Di(e.times(He(a, n + r)), n), i.d && (i = y(i, n + 5, 1), rr(i.d, n, o) && (t = n + 10, i = y(Di(e.times(He(a, t + r)), t), t + 5, 1), +K(i.d).slice(n + 1, n + 15) + 1 == 1e14 && (i = y(i, n + 1, 0)))), i.s = s, b = true, l.rounding = o, y(i, n, o));
    };
    m.toPrecision = function(e, t) {
      var r, n = this, i = n.constructor;
      return e === void 0 ? r = xe(n, n.e <= i.toExpNeg || n.e >= i.toExpPos) : (se(e, 1, Ye), t === void 0 ? t = i.rounding : se(t, 0, 8), n = y(new i(n), e, t), r = xe(n, e <= n.e || n.e <= i.toExpNeg, e)), n.isNeg() && !n.isZero() ? "-" + r : r;
    };
    m.toSignificantDigits = m.toSD = function(e, t) {
      var r = this, n = r.constructor;
      return e === void 0 ? (e = n.precision, t = n.rounding) : (se(e, 1, Ye), t === void 0 ? t = n.rounding : se(t, 0, 8)), y(new n(r), e, t);
    };
    m.toString = function() {
      var e = this, t = e.constructor, r = xe(e, e.e <= t.toExpNeg || e.e >= t.toExpPos);
      return e.isNeg() && !e.isZero() ? "-" + r : r;
    };
    m.truncated = m.trunc = function() {
      return y(new this.constructor(this), this.e + 1, 1);
    };
    m.valueOf = m.toJSON = function() {
      var e = this, t = e.constructor, r = xe(e, e.e <= t.toExpNeg || e.e >= t.toExpPos);
      return e.isNeg() ? "-" + r : r;
    };
    function K(e) {
      var t, r, n, i = e.length - 1, o = "", s = e[0];
      if (i > 0) {
        for (o += s, t = 1; t < i; t++) n = e[t] + "", r = E - n.length, r && (o += We(r)), o += n;
        s = e[t], n = s + "", r = E - n.length, r && (o += We(r));
      } else if (s === 0) return "0";
      for (; s % 10 === 0; ) s /= 10;
      return o + s;
    }
    function se(e, t, r) {
      if (e !== ~~e || e < t || e > r) throw Error(Ke + e);
    }
    function rr(e, t, r, n) {
      var i, o, s, a;
      for (o = e[0]; o >= 10; o /= 10) --t;
      return --t < 0 ? (t += E, i = 0) : (i = Math.ceil((t + 1) / E), t %= E), o = G(10, E - t), a = e[i] % o | 0, n == null ? t < 3 ? (t == 0 ? a = a / 100 | 0 : t == 1 && (a = a / 10 | 0), s = r < 4 && a == 99999 || r > 3 && a == 49999 || a == 5e4 || a == 0) : s = (r < 4 && a + 1 == o || r > 3 && a + 1 == o / 2) && (e[i + 1] / o / 100 | 0) == G(10, t - 2) - 1 || (a == o / 2 || a == 0) && (e[i + 1] / o / 100 | 0) == 0 : t < 4 ? (t == 0 ? a = a / 1e3 | 0 : t == 1 ? a = a / 100 | 0 : t == 2 && (a = a / 10 | 0), s = (n || r < 4) && a == 9999 || !n && r > 3 && a == 4999) : s = ((n || r < 4) && a + 1 == o || !n && r > 3 && a + 1 == o / 2) && (e[i + 1] / o / 1e3 | 0) == G(10, t - 3) - 1, s;
    }
    function en(e, t, r) {
      for (var n, i = [0], o, s = 0, a = e.length; s < a; ) {
        for (o = i.length; o--; ) i[o] *= t;
        for (i[0] += Oi.indexOf(e.charAt(s++)), n = 0; n < i.length; n++) i[n] > r - 1 && (i[n + 1] === void 0 && (i[n + 1] = 0), i[n + 1] += i[n] / r | 0, i[n] %= r);
      }
      return i.reverse();
    }
    function Mc(e, t) {
      var r, n, i;
      if (t.isZero()) return t;
      n = t.d.length, n < 32 ? (r = Math.ceil(n / 3), i = (1 / an(4, r)).toString()) : (r = 16, i = "2.3283064365386962890625e-10"), e.precision += r, t = bt(e, 1, t.times(i), new e(1));
      for (var o = r; o--; ) {
        var s = t.times(t);
        t = s.times(s).minus(s).times(8).plus(1);
      }
      return e.precision -= r, t;
    }
    var M = /* @__PURE__ */ function() {
      function e(n, i, o) {
        var s, a = 0, l = n.length;
        for (n = n.slice(); l--; ) s = n[l] * i + a, n[l] = s % o | 0, a = s / o | 0;
        return a && n.unshift(a), n;
      }
      function t(n, i, o, s) {
        var a, l;
        if (o != s) l = o > s ? 1 : -1;
        else for (a = l = 0; a < o; a++) if (n[a] != i[a]) {
          l = n[a] > i[a] ? 1 : -1;
          break;
        }
        return l;
      }
      function r(n, i, o, s) {
        for (var a = 0; o--; ) n[o] -= a, a = n[o] < i[o] ? 1 : 0, n[o] = a * s + n[o] - i[o];
        for (; !n[0] && n.length > 1; ) n.shift();
      }
      return function(n, i, o, s, a, l) {
        var u, c, p, d, f, g, h, O, v, C, R, k, A, ue, Bt, U, oe, Oe, Y, pt, Lr = n.constructor, Un = n.s == i.s ? 1 : -1, z = n.d, L = i.d;
        if (!z || !z[0] || !L || !L[0]) return new Lr(!n.s || !i.s || (z ? L && z[0] == L[0] : !L) ? NaN : z && z[0] == 0 || !L ? Un * 0 : Un / 0);
        for (l ? (f = 1, c = n.e - i.e) : (l = he, f = E, c = re(n.e / f) - re(i.e / f)), Y = L.length, oe = z.length, v = new Lr(Un), C = v.d = [], p = 0; L[p] == (z[p] || 0); p++) ;
        if (L[p] > (z[p] || 0) && c--, o == null ? (ue = o = Lr.precision, s = Lr.rounding) : a ? ue = o + (n.e - i.e) + 1 : ue = o, ue < 0) C.push(1), g = true;
        else {
          if (ue = ue / f + 2 | 0, p = 0, Y == 1) {
            for (d = 0, L = L[0], ue++; (p < oe || d) && ue--; p++) Bt = d * l + (z[p] || 0), C[p] = Bt / L | 0, d = Bt % L | 0;
            g = d || p < oe;
          } else {
            for (d = l / (L[0] + 1) | 0, d > 1 && (L = e(L, d, l), z = e(z, d, l), Y = L.length, oe = z.length), U = Y, R = z.slice(0, Y), k = R.length; k < Y; ) R[k++] = 0;
            pt = L.slice(), pt.unshift(0), Oe = L[0], L[1] >= l / 2 && ++Oe;
            do
              d = 0, u = t(L, R, Y, k), u < 0 ? (A = R[0], Y != k && (A = A * l + (R[1] || 0)), d = A / Oe | 0, d > 1 ? (d >= l && (d = l - 1), h = e(L, d, l), O = h.length, k = R.length, u = t(h, R, O, k), u == 1 && (d--, r(h, Y < O ? pt : L, O, l))) : (d == 0 && (u = d = 1), h = L.slice()), O = h.length, O < k && h.unshift(0), r(R, h, k, l), u == -1 && (k = R.length, u = t(L, R, Y, k), u < 1 && (d++, r(R, Y < k ? pt : L, k, l))), k = R.length) : u === 0 && (d++, R = [0]), C[p++] = d, u && R[0] ? R[k++] = z[U] || 0 : (R = [z[U]], k = 1);
            while ((U++ < oe || R[0] !== void 0) && ue--);
            g = R[0] !== void 0;
          }
          C[0] || C.shift();
        }
        if (f == 1) v.e = c, ks = g;
        else {
          for (p = 1, d = C[0]; d >= 10; d /= 10) p++;
          v.e = p + c * f - 1, y(v, a ? o + v.e + 1 : o, s, g);
        }
        return v;
      };
    }();
    function y(e, t, r, n) {
      var i, o, s, a, l, u, c, p, d, f = e.constructor;
      e: if (t != null) {
        if (p = e.d, !p) return e;
        for (i = 1, a = p[0]; a >= 10; a /= 10) i++;
        if (o = t - i, o < 0) o += E, s = t, c = p[d = 0], l = c / G(10, i - s - 1) % 10 | 0;
        else if (d = Math.ceil((o + 1) / E), a = p.length, d >= a) if (n) {
          for (; a++ <= d; ) p.push(0);
          c = l = 0, i = 1, o %= E, s = o - E + 1;
        } else break e;
        else {
          for (c = a = p[d], i = 1; a >= 10; a /= 10) i++;
          o %= E, s = o - E + i, l = s < 0 ? 0 : c / G(10, i - s - 1) % 10 | 0;
        }
        if (n = n || t < 0 || p[d + 1] !== void 0 || (s < 0 ? c : c % G(10, i - s - 1)), u = r < 4 ? (l || n) && (r == 0 || r == (e.s < 0 ? 3 : 2)) : l > 5 || l == 5 && (r == 4 || n || r == 6 && (o > 0 ? s > 0 ? c / G(10, i - s) : 0 : p[d - 1]) % 10 & 1 || r == (e.s < 0 ? 8 : 7)), t < 1 || !p[0]) return p.length = 0, u ? (t -= e.e + 1, p[0] = G(10, (E - t % E) % E), e.e = -t || 0) : p[0] = e.e = 0, e;
        if (o == 0 ? (p.length = d, a = 1, d--) : (p.length = d + 1, a = G(10, E - o), p[d] = s > 0 ? (c / G(10, i - s) % G(10, s) | 0) * a : 0), u) for (; ; ) if (d == 0) {
          for (o = 1, s = p[0]; s >= 10; s /= 10) o++;
          for (s = p[0] += a, a = 1; s >= 10; s /= 10) a++;
          o != a && (e.e++, p[0] == he && (p[0] = 1));
          break;
        } else {
          if (p[d] += a, p[d] != he) break;
          p[d--] = 0, a = 1;
        }
        for (o = p.length; p[--o] === 0; ) p.pop();
      }
      return b && (e.e > f.maxE ? (e.d = null, e.e = NaN) : e.e < f.minE && (e.e = 0, e.d = [0])), e;
    }
    function xe(e, t, r) {
      if (!e.isFinite()) return qs(e);
      var n, i = e.e, o = K(e.d), s = o.length;
      return t ? (r && (n = r - s) > 0 ? o = o.charAt(0) + "." + o.slice(1) + We(n) : s > 1 && (o = o.charAt(0) + "." + o.slice(1)), o = o + (e.e < 0 ? "e" : "e+") + e.e) : i < 0 ? (o = "0." + We(-i - 1) + o, r && (n = r - s) > 0 && (o += We(n))) : i >= s ? (o += We(i + 1 - s), r && (n = r - i - 1) > 0 && (o = o + "." + We(n))) : ((n = i + 1) < s && (o = o.slice(0, n) + "." + o.slice(n)), r && (n = r - s) > 0 && (i + 1 === s && (o += "."), o += We(n))), o;
    }
    function sn(e, t) {
      var r = e[0];
      for (t *= E; r >= 10; r /= 10) t++;
      return t;
    }
    function nn(e, t, r) {
      if (t > Fc) throw b = true, r && (e.precision = r), Error(_s);
      return y(new e(tn), t, 1, true);
    }
    function ge(e, t, r) {
      if (t > _i) throw Error(_s);
      return y(new e(rn), t, r, true);
    }
    function Fs(e) {
      var t = e.length - 1, r = t * E + 1;
      if (t = e[t], t) {
        for (; t % 10 == 0; t /= 10) r--;
        for (t = e[0]; t >= 10; t /= 10) r++;
      }
      return r;
    }
    function We(e) {
      for (var t = ""; e--; ) t += "0";
      return t;
    }
    function Ms(e, t, r, n) {
      var i, o = new e(1), s = Math.ceil(n / E + 4);
      for (b = false; ; ) {
        if (r % 2 && (o = o.times(t), Is(o.d, s) && (i = true)), r = re(r / 2), r === 0) {
          r = o.d.length - 1, i && o.d[r] === 0 && ++o.d[r];
          break;
        }
        t = t.times(t), Is(t.d, s);
      }
      return b = true, o;
    }
    function As(e) {
      return e.d[e.d.length - 1] & 1;
    }
    function $s(e, t, r) {
      for (var n, i = new e(t[0]), o = 0; ++o < t.length; ) if (n = new e(t[o]), n.s) i[r](n) && (i = n);
      else {
        i = n;
        break;
      }
      return i;
    }
    function Di(e, t) {
      var r, n, i, o, s, a, l, u = 0, c = 0, p = 0, d = e.constructor, f = d.rounding, g = d.precision;
      if (!e.d || !e.d[0] || e.e > 17) return new d(e.d ? e.d[0] ? e.s < 0 ? 0 : 1 / 0 : 1 : e.s ? e.s < 0 ? 0 : e : NaN);
      for (t == null ? (b = false, l = g) : l = t, a = new d(0.03125); e.e > -2; ) e = e.times(a), p += 5;
      for (n = Math.log(G(2, p)) / Math.LN10 * 2 + 5 | 0, l += n, r = o = s = new d(1), d.precision = l; ; ) {
        if (o = y(o.times(e), l, 1), r = r.times(++c), a = s.plus(M(o, r, l, 1)), K(a.d).slice(0, l) === K(s.d).slice(0, l)) {
          for (i = p; i--; ) s = y(s.times(s), l, 1);
          if (t == null) if (u < 3 && rr(s.d, l - n, f, u)) d.precision = l += 10, r = o = a = new d(1), c = 0, u++;
          else return y(s, d.precision = g, f, b = true);
          else return d.precision = g, s;
        }
        s = a;
      }
    }
    function He(e, t) {
      var r, n, i, o, s, a, l, u, c, p, d, f = 1, g = 10, h = e, O = h.d, v = h.constructor, C = v.rounding, R = v.precision;
      if (h.s < 0 || !O || !O[0] || !h.e && O[0] == 1 && O.length == 1) return new v(O && !O[0] ? -1 / 0 : h.s != 1 ? NaN : O ? 0 : h);
      if (t == null ? (b = false, c = R) : c = t, v.precision = c += g, r = K(O), n = r.charAt(0), Math.abs(o = h.e) < 15e14) {
        for (; n < 7 && n != 1 || n == 1 && r.charAt(1) > 3; ) h = h.times(e), r = K(h.d), n = r.charAt(0), f++;
        o = h.e, n > 1 ? (h = new v("0." + r), o++) : h = new v(n + "." + r.slice(1));
      } else return u = nn(v, c + 2, R).times(o + ""), h = He(new v(n + "." + r.slice(1)), c - g).plus(u), v.precision = R, t == null ? y(h, R, C, b = true) : h;
      for (p = h, l = s = h = M(h.minus(1), h.plus(1), c, 1), d = y(h.times(h), c, 1), i = 3; ; ) {
        if (s = y(s.times(d), c, 1), u = l.plus(M(s, new v(i), c, 1)), K(u.d).slice(0, c) === K(l.d).slice(0, c)) if (l = l.times(2), o !== 0 && (l = l.plus(nn(v, c + 2, R).times(o + ""))), l = M(l, new v(f), c, 1), t == null) if (rr(l.d, c - g, C, a)) v.precision = c += g, u = s = h = M(p.minus(1), p.plus(1), c, 1), d = y(h.times(h), c, 1), i = a = 1;
        else return y(l, v.precision = R, C, b = true);
        else return v.precision = R, l;
        l = u, i += 2;
      }
    }
    function qs(e) {
      return String(e.s * e.s / 0);
    }
    function Ni(e, t) {
      var r, n, i;
      for ((r = t.indexOf(".")) > -1 && (t = t.replace(".", "")), (n = t.search(/e/i)) > 0 ? (r < 0 && (r = n), r += +t.slice(n + 1), t = t.substring(0, n)) : r < 0 && (r = t.length), n = 0; t.charCodeAt(n) === 48; n++) ;
      for (i = t.length; t.charCodeAt(i - 1) === 48; --i) ;
      if (t = t.slice(n, i), t) {
        if (i -= n, e.e = r = r - n - 1, e.d = [], n = (r + 1) % E, r < 0 && (n += E), n < i) {
          for (n && e.d.push(+t.slice(0, n)), i -= E; n < i; ) e.d.push(+t.slice(n, n += E));
          t = t.slice(n), n = E - t.length;
        } else n -= i;
        for (; n--; ) t += "0";
        e.d.push(+t), b && (e.e > e.constructor.maxE ? (e.d = null, e.e = NaN) : e.e < e.constructor.minE && (e.e = 0, e.d = [0]));
      } else e.e = 0, e.d = [0];
      return e;
    }
    function $c(e, t) {
      var r, n, i, o, s, a, l, u, c;
      if (t.indexOf("_") > -1) {
        if (t = t.replace(/(\d)_(?=\d)/g, "$1"), Ls.test(t)) return Ni(e, t);
      } else if (t === "Infinity" || t === "NaN") return +t || (e.s = NaN), e.e = NaN, e.d = null, e;
      if (Dc.test(t)) r = 16, t = t.toLowerCase();
      else if (_c.test(t)) r = 2;
      else if (Nc.test(t)) r = 8;
      else throw Error(Ke + t);
      for (o = t.search(/p/i), o > 0 ? (l = +t.slice(o + 1), t = t.substring(2, o)) : t = t.slice(2), o = t.indexOf("."), s = o >= 0, n = e.constructor, s && (t = t.replace(".", ""), a = t.length, o = a - o, i = Ms(n, new n(r), o, o * 2)), u = en(t, r, he), c = u.length - 1, o = c; u[o] === 0; --o) u.pop();
      return o < 0 ? new n(e.s * 0) : (e.e = sn(u, c), e.d = u, b = false, s && (e = M(e, i, a * 4)), l && (e = e.times(Math.abs(l) < 54 ? G(2, l) : it.pow(2, l))), b = true, e);
    }
    function qc(e, t) {
      var r, n = t.d.length;
      if (n < 3) return t.isZero() ? t : bt(e, 2, t, t);
      r = 1.4 * Math.sqrt(n), r = r > 16 ? 16 : r | 0, t = t.times(1 / an(5, r)), t = bt(e, 2, t, t);
      for (var i, o = new e(5), s = new e(16), a = new e(20); r--; ) i = t.times(t), t = t.times(o.plus(i.times(s.times(i).minus(a))));
      return t;
    }
    function bt(e, t, r, n, i) {
      var o, s, a, l, u = 1, c = e.precision, p = Math.ceil(c / E);
      for (b = false, l = r.times(r), a = new e(n); ; ) {
        if (s = M(a.times(l), new e(t++ * t++), c, 1), a = i ? n.plus(s) : n.minus(s), n = M(s.times(l), new e(t++ * t++), c, 1), s = a.plus(n), s.d[p] !== void 0) {
          for (o = p; s.d[o] === a.d[o] && o--; ) ;
          if (o == -1) break;
        }
        o = a, a = n, n = s, s = o, u++;
      }
      return b = true, s.d.length = p + 1, s;
    }
    function an(e, t) {
      for (var r = e; --t; ) r *= e;
      return r;
    }
    function Vs(e, t) {
      var r, n = t.s < 0, i = ge(e, e.precision, 1), o = i.times(0.5);
      if (t = t.abs(), t.lte(o)) return Me = n ? 4 : 1, t;
      if (r = t.divToInt(i), r.isZero()) Me = n ? 3 : 2;
      else {
        if (t = t.minus(r.times(i)), t.lte(o)) return Me = As(r) ? n ? 2 : 3 : n ? 4 : 1, t;
        Me = As(r) ? n ? 1 : 4 : n ? 3 : 2;
      }
      return t.minus(i).abs();
    }
    function Li(e, t, r, n) {
      var i, o, s, a, l, u, c, p, d, f = e.constructor, g = r !== void 0;
      if (g ? (se(r, 1, Ye), n === void 0 ? n = f.rounding : se(n, 0, 8)) : (r = f.precision, n = f.rounding), !e.isFinite()) c = qs(e);
      else {
        for (c = xe(e), s = c.indexOf("."), g ? (i = 2, t == 16 ? r = r * 4 - 3 : t == 8 && (r = r * 3 - 2)) : i = t, s >= 0 && (c = c.replace(".", ""), d = new f(1), d.e = c.length - s, d.d = en(xe(d), 10, i), d.e = d.d.length), p = en(c, 10, i), o = l = p.length; p[--l] == 0; ) p.pop();
        if (!p[0]) c = g ? "0p+0" : "0";
        else {
          if (s < 0 ? o-- : (e = new f(e), e.d = p, e.e = o, e = M(e, d, r, n, 0, i), p = e.d, o = e.e, u = ks), s = p[r], a = i / 2, u = u || p[r + 1] !== void 0, u = n < 4 ? (s !== void 0 || u) && (n === 0 || n === (e.s < 0 ? 3 : 2)) : s > a || s === a && (n === 4 || u || n === 6 && p[r - 1] & 1 || n === (e.s < 0 ? 8 : 7)), p.length = r, u) for (; ++p[--r] > i - 1; ) p[r] = 0, r || (++o, p.unshift(1));
          for (l = p.length; !p[l - 1]; --l) ;
          for (s = 0, c = ""; s < l; s++) c += Oi.charAt(p[s]);
          if (g) {
            if (l > 1) if (t == 16 || t == 8) {
              for (s = t == 16 ? 4 : 3, --l; l % s; l++) c += "0";
              for (p = en(c, i, t), l = p.length; !p[l - 1]; --l) ;
              for (s = 1, c = "1."; s < l; s++) c += Oi.charAt(p[s]);
            } else c = c.charAt(0) + "." + c.slice(1);
            c = c + (o < 0 ? "p" : "p+") + o;
          } else if (o < 0) {
            for (; ++o; ) c = "0" + c;
            c = "0." + c;
          } else if (++o > l) for (o -= l; o--; ) c += "0";
          else o < l && (c = c.slice(0, o) + "." + c.slice(o));
        }
        c = (t == 16 ? "0x" : t == 2 ? "0b" : t == 8 ? "0o" : "") + c;
      }
      return e.s < 0 ? "-" + c : c;
    }
    function Is(e, t) {
      if (e.length > t) return e.length = t, true;
    }
    function Vc(e) {
      return new this(e).abs();
    }
    function jc(e) {
      return new this(e).acos();
    }
    function Bc(e) {
      return new this(e).acosh();
    }
    function Uc(e, t) {
      return new this(e).plus(t);
    }
    function Qc(e) {
      return new this(e).asin();
    }
    function Gc(e) {
      return new this(e).asinh();
    }
    function Jc(e) {
      return new this(e).atan();
    }
    function Wc(e) {
      return new this(e).atanh();
    }
    function Hc(e, t) {
      e = new this(e), t = new this(t);
      var r, n = this.precision, i = this.rounding, o = n + 4;
      return !e.s || !t.s ? r = new this(NaN) : !e.d && !t.d ? (r = ge(this, o, 1).times(t.s > 0 ? 0.25 : 0.75), r.s = e.s) : !t.d || e.isZero() ? (r = t.s < 0 ? ge(this, n, i) : new this(0), r.s = e.s) : !e.d || t.isZero() ? (r = ge(this, o, 1).times(0.5), r.s = e.s) : t.s < 0 ? (this.precision = o, this.rounding = 1, r = this.atan(M(e, t, o, 1)), t = ge(this, o, 1), this.precision = n, this.rounding = i, r = e.s < 0 ? r.minus(t) : r.plus(t)) : r = this.atan(M(e, t, o, 1)), r;
    }
    function Kc(e) {
      return new this(e).cbrt();
    }
    function Yc(e) {
      return y(e = new this(e), e.e + 1, 2);
    }
    function zc(e, t, r) {
      return new this(e).clamp(t, r);
    }
    function Zc(e) {
      if (!e || typeof e != "object") throw Error(on + "Object expected");
      var t, r, n, i = e.defaults === true, o = ["precision", 1, Ye, "rounding", 0, 8, "toExpNeg", -Et, 0, "toExpPos", 0, Et, "maxE", 0, Et, "minE", -Et, 0, "modulo", 0, 9];
      for (t = 0; t < o.length; t += 3) if (r = o[t], i && (this[r] = ki[r]), (n = e[r]) !== void 0) if (re(n) === n && n >= o[t + 1] && n <= o[t + 2]) this[r] = n;
      else throw Error(Ke + r + ": " + n);
      if (r = "crypto", i && (this[r] = ki[r]), (n = e[r]) !== void 0) if (n === true || n === false || n === 0 || n === 1) if (n) if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes)) this[r] = true;
      else throw Error(Ds);
      else this[r] = false;
      else throw Error(Ke + r + ": " + n);
      return this;
    }
    function Xc(e) {
      return new this(e).cos();
    }
    function ep(e) {
      return new this(e).cosh();
    }
    function js(e) {
      var t, r, n;
      function i(o) {
        var s, a, l, u = this;
        if (!(u instanceof i)) return new i(o);
        if (u.constructor = i, Os(o)) {
          u.s = o.s, b ? !o.d || o.e > i.maxE ? (u.e = NaN, u.d = null) : o.e < i.minE ? (u.e = 0, u.d = [0]) : (u.e = o.e, u.d = o.d.slice()) : (u.e = o.e, u.d = o.d ? o.d.slice() : o.d);
          return;
        }
        if (l = typeof o, l === "number") {
          if (o === 0) {
            u.s = 1 / o < 0 ? -1 : 1, u.e = 0, u.d = [0];
            return;
          }
          if (o < 0 ? (o = -o, u.s = -1) : u.s = 1, o === ~~o && o < 1e7) {
            for (s = 0, a = o; a >= 10; a /= 10) s++;
            b ? s > i.maxE ? (u.e = NaN, u.d = null) : s < i.minE ? (u.e = 0, u.d = [0]) : (u.e = s, u.d = [o]) : (u.e = s, u.d = [o]);
            return;
          } else if (o * 0 !== 0) {
            o || (u.s = NaN), u.e = NaN, u.d = null;
            return;
          }
          return Ni(u, o.toString());
        } else if (l !== "string") throw Error(Ke + o);
        return (a = o.charCodeAt(0)) === 45 ? (o = o.slice(1), u.s = -1) : (a === 43 && (o = o.slice(1)), u.s = 1), Ls.test(o) ? Ni(u, o) : $c(u, o);
      }
      if (i.prototype = m, i.ROUND_UP = 0, i.ROUND_DOWN = 1, i.ROUND_CEIL = 2, i.ROUND_FLOOR = 3, i.ROUND_HALF_UP = 4, i.ROUND_HALF_DOWN = 5, i.ROUND_HALF_EVEN = 6, i.ROUND_HALF_CEIL = 7, i.ROUND_HALF_FLOOR = 8, i.EUCLID = 9, i.config = i.set = Zc, i.clone = js, i.isDecimal = Os, i.abs = Vc, i.acos = jc, i.acosh = Bc, i.add = Uc, i.asin = Qc, i.asinh = Gc, i.atan = Jc, i.atanh = Wc, i.atan2 = Hc, i.cbrt = Kc, i.ceil = Yc, i.clamp = zc, i.cos = Xc, i.cosh = ep, i.div = tp, i.exp = rp, i.floor = np, i.hypot = ip, i.ln = op, i.log = sp, i.log10 = lp, i.log2 = ap, i.max = up, i.min = cp, i.mod = pp, i.mul = dp, i.pow = mp, i.random = fp, i.round = gp, i.sign = hp, i.sin = yp, i.sinh = Ep, i.sqrt = bp, i.sub = wp, i.sum = xp, i.tan = Pp, i.tanh = vp, i.trunc = Tp, e === void 0 && (e = {}), e && e.defaults !== true) for (n = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"], t = 0; t < n.length; ) e.hasOwnProperty(r = n[t++]) || (e[r] = this[r]);
      return i.config(e), i;
    }
    function tp(e, t) {
      return new this(e).div(t);
    }
    function rp(e) {
      return new this(e).exp();
    }
    function np(e) {
      return y(e = new this(e), e.e + 1, 3);
    }
    function ip() {
      var e, t, r = new this(0);
      for (b = false, e = 0; e < arguments.length; ) if (t = new this(arguments[e++]), t.d) r.d && (r = r.plus(t.times(t)));
      else {
        if (t.s) return b = true, new this(1 / 0);
        r = t;
      }
      return b = true, r.sqrt();
    }
    function Os(e) {
      return e instanceof it || e && e.toStringTag === Ns || false;
    }
    function op(e) {
      return new this(e).ln();
    }
    function sp(e, t) {
      return new this(e).log(t);
    }
    function ap(e) {
      return new this(e).log(2);
    }
    function lp(e) {
      return new this(e).log(10);
    }
    function up() {
      return $s(this, arguments, "lt");
    }
    function cp() {
      return $s(this, arguments, "gt");
    }
    function pp(e, t) {
      return new this(e).mod(t);
    }
    function dp(e, t) {
      return new this(e).mul(t);
    }
    function mp(e, t) {
      return new this(e).pow(t);
    }
    function fp(e) {
      var t, r, n, i, o = 0, s = new this(1), a = [];
      if (e === void 0 ? e = this.precision : se(e, 1, Ye), n = Math.ceil(e / E), this.crypto) if (crypto.getRandomValues) for (t = crypto.getRandomValues(new Uint32Array(n)); o < n; ) i = t[o], i >= 429e7 ? t[o] = crypto.getRandomValues(new Uint32Array(1))[0] : a[o++] = i % 1e7;
      else if (crypto.randomBytes) {
        for (t = crypto.randomBytes(n *= 4); o < n; ) i = t[o] + (t[o + 1] << 8) + (t[o + 2] << 16) + ((t[o + 3] & 127) << 24), i >= 214e7 ? crypto.randomBytes(4).copy(t, o) : (a.push(i % 1e7), o += 4);
        o = n / 4;
      } else throw Error(Ds);
      else for (; o < n; ) a[o++] = Math.random() * 1e7 | 0;
      for (n = a[--o], e %= E, n && e && (i = G(10, E - e), a[o] = (n / i | 0) * i); a[o] === 0; o--) a.pop();
      if (o < 0) r = 0, a = [0];
      else {
        for (r = -1; a[0] === 0; r -= E) a.shift();
        for (n = 1, i = a[0]; i >= 10; i /= 10) n++;
        n < E && (r -= E - n);
      }
      return s.e = r, s.d = a, s;
    }
    function gp(e) {
      return y(e = new this(e), e.e + 1, this.rounding);
    }
    function hp(e) {
      return e = new this(e), e.d ? e.d[0] ? e.s : 0 * e.s : e.s || NaN;
    }
    function yp(e) {
      return new this(e).sin();
    }
    function Ep(e) {
      return new this(e).sinh();
    }
    function bp(e) {
      return new this(e).sqrt();
    }
    function wp(e, t) {
      return new this(e).sub(t);
    }
    function xp() {
      var e = 0, t = arguments, r = new this(t[e]);
      for (b = false; r.s && ++e < t.length; ) r = r.plus(t[e]);
      return b = true, y(r, this.precision, this.rounding);
    }
    function Pp(e) {
      return new this(e).tan();
    }
    function vp(e) {
      return new this(e).tanh();
    }
    function Tp(e) {
      return y(e = new this(e), e.e + 1, 1);
    }
    m[Symbol.for("nodejs.util.inspect.custom")] = m.toString;
    m[Symbol.toStringTag] = "Decimal";
    var it = m.constructor = js(ki);
    tn = new it(tn);
    rn = new it(rn);
    var Pe = it;
    function wt(e) {
      return e === null ? e : Array.isArray(e) ? e.map(wt) : typeof e == "object" ? Rp(e) ? Cp(e) : yt(e, wt) : e;
    }
    function Rp(e) {
      return e !== null && typeof e == "object" && typeof e.$type == "string";
    }
    function Cp({ $type: e, value: t }) {
      switch (e) {
        case "BigInt":
          return BigInt(t);
        case "Bytes": {
          let { buffer: r, byteOffset: n, byteLength: i } = Buffer.from(t, "base64");
          return new Uint8Array(r, n, i);
        }
        case "DateTime":
          return new Date(t);
        case "Decimal":
          return new Pe(t);
        case "Json":
          return JSON.parse(t);
        default:
          Fe(t, "Unknown tagged value");
      }
    }
    function xt(e) {
      return e.substring(0, 1).toLowerCase() + e.substring(1);
    }
    function Pt(e) {
      return e instanceof Date || Object.prototype.toString.call(e) === "[object Date]";
    }
    function ln(e) {
      return e.toString() !== "Invalid Date";
    }
    function vt(e) {
      return it.isDecimal(e) ? true : e !== null && typeof e == "object" && typeof e.s == "number" && typeof e.e == "number" && typeof e.toFixed == "function" && Array.isArray(e.d);
    }
    var Ws = _(Pi());
    var Js = _(require("fs"));
    var Bs = { keyword: De, entity: De, value: (e) => H(rt(e)), punctuation: rt, directive: De, function: De, variable: (e) => H(rt(e)), string: (e) => H(Ve(e)), boolean: _e, number: De, comment: Qt };
    var Sp = (e) => e;
    var un = {};
    var Ap = 0;
    var x = { manual: un.Prism && un.Prism.manual, disableWorkerMessageHandler: un.Prism && un.Prism.disableWorkerMessageHandler, util: { encode: function(e) {
      if (e instanceof ye) {
        let t = e;
        return new ye(t.type, x.util.encode(t.content), t.alias);
      } else return Array.isArray(e) ? e.map(x.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
    }, type: function(e) {
      return Object.prototype.toString.call(e).slice(8, -1);
    }, objId: function(e) {
      return e.__id || Object.defineProperty(e, "__id", { value: ++Ap }), e.__id;
    }, clone: function e(t, r) {
      let n, i, o = x.util.type(t);
      switch (r = r || {}, o) {
        case "Object":
          if (i = x.util.objId(t), r[i]) return r[i];
          n = {}, r[i] = n;
          for (let s in t) t.hasOwnProperty(s) && (n[s] = e(t[s], r));
          return n;
        case "Array":
          return i = x.util.objId(t), r[i] ? r[i] : (n = [], r[i] = n, t.forEach(function(s, a) {
            n[a] = e(s, r);
          }), n);
        default:
          return t;
      }
    } }, languages: { extend: function(e, t) {
      let r = x.util.clone(x.languages[e]);
      for (let n in t) r[n] = t[n];
      return r;
    }, insertBefore: function(e, t, r, n) {
      n = n || x.languages;
      let i = n[e], o = {};
      for (let a in i) if (i.hasOwnProperty(a)) {
        if (a == t) for (let l in r) r.hasOwnProperty(l) && (o[l] = r[l]);
        r.hasOwnProperty(a) || (o[a] = i[a]);
      }
      let s = n[e];
      return n[e] = o, x.languages.DFS(x.languages, function(a, l) {
        l === s && a != e && (this[a] = o);
      }), o;
    }, DFS: function e(t, r, n, i) {
      i = i || {};
      let o = x.util.objId;
      for (let s in t) if (t.hasOwnProperty(s)) {
        r.call(t, s, t[s], n || s);
        let a = t[s], l = x.util.type(a);
        l === "Object" && !i[o(a)] ? (i[o(a)] = true, e(a, r, null, i)) : l === "Array" && !i[o(a)] && (i[o(a)] = true, e(a, r, s, i));
      }
    } }, plugins: {}, highlight: function(e, t, r) {
      let n = { code: e, grammar: t, language: r };
      return x.hooks.run("before-tokenize", n), n.tokens = x.tokenize(n.code, n.grammar), x.hooks.run("after-tokenize", n), ye.stringify(x.util.encode(n.tokens), n.language);
    }, matchGrammar: function(e, t, r, n, i, o, s) {
      for (let h in r) {
        if (!r.hasOwnProperty(h) || !r[h]) continue;
        if (h == s) return;
        let O = r[h];
        O = x.util.type(O) === "Array" ? O : [O];
        for (let v = 0; v < O.length; ++v) {
          let C = O[v], R = C.inside, k = !!C.lookbehind, A = !!C.greedy, ue = 0, Bt = C.alias;
          if (A && !C.pattern.global) {
            let U = C.pattern.toString().match(/[imuy]*$/)[0];
            C.pattern = RegExp(C.pattern.source, U + "g");
          }
          C = C.pattern || C;
          for (let U = n, oe = i; U < t.length; oe += t[U].length, ++U) {
            let Oe = t[U];
            if (t.length > e.length) return;
            if (Oe instanceof ye) continue;
            if (A && U != t.length - 1) {
              C.lastIndex = oe;
              var p = C.exec(e);
              if (!p) break;
              var c = p.index + (k ? p[1].length : 0), d = p.index + p[0].length, a = U, l = oe;
              for (let L = t.length; a < L && (l < d || !t[a].type && !t[a - 1].greedy); ++a) l += t[a].length, c >= l && (++U, oe = l);
              if (t[U] instanceof ye) continue;
              u = a - U, Oe = e.slice(oe, l), p.index -= oe;
            } else {
              C.lastIndex = 0;
              var p = C.exec(Oe), u = 1;
            }
            if (!p) {
              if (o) break;
              continue;
            }
            k && (ue = p[1] ? p[1].length : 0);
            var c = p.index + ue, p = p[0].slice(ue), d = c + p.length, f = Oe.slice(0, c), g = Oe.slice(d);
            let Y = [U, u];
            f && (++U, oe += f.length, Y.push(f));
            let pt = new ye(h, R ? x.tokenize(p, R) : p, Bt, p, A);
            if (Y.push(pt), g && Y.push(g), Array.prototype.splice.apply(t, Y), u != 1 && x.matchGrammar(e, t, r, U, oe, true, h), o) break;
          }
        }
      }
    }, tokenize: function(e, t) {
      let r = [e], n = t.rest;
      if (n) {
        for (let i in n) t[i] = n[i];
        delete t.rest;
      }
      return x.matchGrammar(e, r, t, 0, 0, false), r;
    }, hooks: { all: {}, add: function(e, t) {
      let r = x.hooks.all;
      r[e] = r[e] || [], r[e].push(t);
    }, run: function(e, t) {
      let r = x.hooks.all[e];
      if (!(!r || !r.length)) for (var n = 0, i; i = r[n++]; ) i(t);
    } }, Token: ye };
    x.languages.clike = { comment: [{ pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: true }, { pattern: /(^|[^\\:])\/\/.*/, lookbehind: true, greedy: true }], string: { pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: true }, "class-name": { pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i, lookbehind: true, inside: { punctuation: /[.\\]/ } }, keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/, boolean: /\b(?:true|false)\b/, function: /\w+(?=\()/, number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i, operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/, punctuation: /[{}[\];(),.:]/ };
    x.languages.javascript = x.languages.extend("clike", { "class-name": [x.languages.clike["class-name"], { pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/, lookbehind: true }], keyword: [{ pattern: /((?:^|})\s*)(?:catch|finally)\b/, lookbehind: true }, { pattern: /(^|[^.])\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/, lookbehind: true }], number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/, function: /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/, operator: /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/ });
    x.languages.javascript["class-name"][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/;
    x.languages.insertBefore("javascript", "keyword", { regex: { pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=\s*($|[\r\n,.;})\]]))/, lookbehind: true, greedy: true }, "function-variable": { pattern: /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/, alias: "function" }, parameter: [{ pattern: /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/, lookbehind: true, inside: x.languages.javascript }, { pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i, inside: x.languages.javascript }, { pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/, lookbehind: true, inside: x.languages.javascript }, { pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/, lookbehind: true, inside: x.languages.javascript }], constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/ });
    x.languages.markup && x.languages.markup.tag.addInlined("script", "javascript");
    x.languages.js = x.languages.javascript;
    x.languages.typescript = x.languages.extend("javascript", { keyword: /\b(?:abstract|as|async|await|break|case|catch|class|const|constructor|continue|debugger|declare|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|is|keyof|let|module|namespace|new|null|of|package|private|protected|public|readonly|return|require|set|static|super|switch|this|throw|try|type|typeof|var|void|while|with|yield)\b/, builtin: /\b(?:string|Function|any|number|boolean|Array|symbol|console|Promise|unknown|never)\b/ });
    x.languages.ts = x.languages.typescript;
    function ye(e, t, r, n, i) {
      this.type = e, this.content = t, this.alias = r, this.length = (n || "").length | 0, this.greedy = !!i;
    }
    ye.stringify = function(e, t) {
      return typeof e == "string" ? e : Array.isArray(e) ? e.map(function(r) {
        return ye.stringify(r, t);
      }).join("") : Ip(e.type)(e.content);
    };
    function Ip(e) {
      return Bs[e] || Sp;
    }
    function Us(e) {
      return Op(e, x.languages.javascript);
    }
    function Op(e, t) {
      return x.tokenize(e, t).map((n) => ye.stringify(n)).join("");
    }
    var Qs = _(Es());
    function Gs(e) {
      return (0, Qs.default)(e);
    }
    var cn = class e {
      static read(t) {
        let r;
        try {
          r = Js.default.readFileSync(t, "utf-8");
        } catch {
          return null;
        }
        return e.fromContent(r);
      }
      static fromContent(t) {
        let r = t.split(/\r?\n/);
        return new e(1, r);
      }
      constructor(t, r) {
        this.firstLineNumber = t, this.lines = r;
      }
      get lastLineNumber() {
        return this.firstLineNumber + this.lines.length - 1;
      }
      mapLineAt(t, r) {
        if (t < this.firstLineNumber || t > this.lines.length + this.firstLineNumber) return this;
        let n = t - this.firstLineNumber, i = [...this.lines];
        return i[n] = r(i[n]), new e(this.firstLineNumber, i);
      }
      mapLines(t) {
        return new e(this.firstLineNumber, this.lines.map((r, n) => t(r, this.firstLineNumber + n)));
      }
      lineAt(t) {
        return this.lines[t - this.firstLineNumber];
      }
      prependSymbolAt(t, r) {
        return this.mapLines((n, i) => i === t ? `${r} ${n}` : `  ${n}`);
      }
      slice(t, r) {
        let n = this.lines.slice(t - 1, r).join(`
`);
        return new e(t, Gs(n).split(`
`));
      }
      highlight() {
        let t = Us(this.toString());
        return new e(this.firstLineNumber, t.split(`
`));
      }
      toString() {
        return this.lines.join(`
`);
      }
    };
    var kp = { red: de, gray: Qt, dim: ke, bold: H, underline: X, highlightSource: (e) => e.highlight() };
    var _p = { red: (e) => e, gray: (e) => e, dim: (e) => e, bold: (e) => e, underline: (e) => e, highlightSource: (e) => e };
    function Dp({ message: e, originalMethod: t, isPanic: r, callArguments: n }) {
      return { functionName: `prisma.${t}()`, message: e, isPanic: r ?? false, callArguments: n };
    }
    function Np({ callsite: e, message: t, originalMethod: r, isPanic: n, callArguments: i }, o) {
      var _a2;
      let s = Dp({ message: t, originalMethod: r, isPanic: n, callArguments: i });
      if (!e || typeof window < "u" || process.env.NODE_ENV === "production") return s;
      let a = e.getLocation();
      if (!a || !a.lineNumber || !a.columnNumber) return s;
      let l = Math.max(1, a.lineNumber - 3), u = (_a2 = cn.read(a.fileName)) == null ? void 0 : _a2.slice(l, a.lineNumber), c = u == null ? void 0 : u.lineAt(a.lineNumber);
      if (u && c) {
        let p = Fp(c), d = Lp(c);
        if (!d) return s;
        s.functionName = `${d.code})`, s.location = a, n || (u = u.mapLineAt(a.lineNumber, (g) => g.slice(0, d.openingBraceIndex))), u = o.highlightSource(u);
        let f = String(u.lastLineNumber).length;
        if (s.contextLines = u.mapLines((g, h) => o.gray(String(h).padStart(f)) + " " + g).mapLines((g) => o.dim(g)).prependSymbolAt(a.lineNumber, o.bold(o.red("\u2192"))), i) {
          let g = p + f + 1;
          g += 2, s.callArguments = (0, Ws.default)(i, g).slice(g);
        }
      }
      return s;
    }
    function Lp(e) {
      let t = Object.keys(zt.ModelAction).join("|"), n = new RegExp(String.raw`\.(${t})\(`).exec(e);
      if (n) {
        let i = n.index + n[0].length, o = e.lastIndexOf(" ", n.index) + 1;
        return { code: e.slice(o, i), openingBraceIndex: i };
      }
      return null;
    }
    function Fp(e) {
      let t = 0;
      for (let r = 0; r < e.length; r++) {
        if (e.charAt(r) !== " ") return t;
        t++;
      }
      return t;
    }
    function Mp({ functionName: e, location: t, message: r, isPanic: n, contextLines: i, callArguments: o }, s) {
      let a = [""], l = t ? " in" : ":";
      if (n ? (a.push(s.red(`Oops, an unknown error occurred! This is ${s.bold("on us")}, you did nothing wrong.`)), a.push(s.red(`It occurred in the ${s.bold(`\`${e}\``)} invocation${l}`))) : a.push(s.red(`Invalid ${s.bold(`\`${e}\``)} invocation${l}`)), t && a.push(s.underline($p(t))), i) {
        a.push("");
        let u = [i.toString()];
        o && (u.push(o), u.push(s.dim(")"))), a.push(u.join("")), o && a.push("");
      } else a.push(""), o && a.push(o), a.push("");
      return a.push(r), a.join(`
`);
    }
    function $p(e) {
      let t = [e.fileName];
      return e.lineNumber && t.push(String(e.lineNumber)), e.columnNumber && t.push(String(e.columnNumber)), t.join(":");
    }
    function pn(e) {
      let t = e.showColors ? kp : _p, r;
      return r = Np(e, t), Mp(r, t);
    }
    var ea = _(Fi());
    function zs(e, t, r) {
      let n = Zs(e), i = qp(n), o = jp(i);
      o ? dn(o, t, r) : t.addErrorMessage(() => "Unknown error");
    }
    function Zs(e) {
      return e.errors.flatMap((t) => t.kind === "Union" ? Zs(t) : [t]);
    }
    function qp(e) {
      let t = /* @__PURE__ */ new Map(), r = [];
      for (let n of e) {
        if (n.kind !== "InvalidArgumentType") {
          r.push(n);
          continue;
        }
        let i = `${n.selectionPath.join(".")}:${n.argumentPath.join(".")}`, o = t.get(i);
        o ? t.set(i, { ...n, argument: { ...n.argument, typeNames: Vp(o.argument.typeNames, n.argument.typeNames) } }) : t.set(i, n);
      }
      return r.push(...t.values()), r;
    }
    function Vp(e, t) {
      return [...new Set(e.concat(t))];
    }
    function jp(e) {
      return Ii(e, (t, r) => {
        let n = Ks(t), i = Ks(r);
        return n !== i ? n - i : Ys(t) - Ys(r);
      });
    }
    function Ks(e) {
      let t = 0;
      return Array.isArray(e.selectionPath) && (t += e.selectionPath.length), Array.isArray(e.argumentPath) && (t += e.argumentPath.length), t;
    }
    function Ys(e) {
      switch (e.kind) {
        case "InvalidArgumentValue":
        case "ValueTooLarge":
          return 20;
        case "InvalidArgumentType":
          return 10;
        case "RequiredArgumentMissing":
          return -10;
        default:
          return 0;
      }
    }
    var pe = class {
      constructor(t, r) {
        this.name = t;
        this.value = r;
        this.isRequired = false;
      }
      makeRequired() {
        return this.isRequired = true, this;
      }
      write(t) {
        let { colors: { green: r } } = t.context;
        t.addMarginSymbol(r(this.isRequired ? "+" : "?")), t.write(r(this.name)), this.isRequired || t.write(r("?")), t.write(r(": ")), typeof this.value == "string" ? t.write(r(this.value)) : t.write(this.value);
      }
    };
    var Tt = class {
      constructor(t = 0, r) {
        this.context = r;
        this.lines = [];
        this.currentLine = "";
        this.currentIndent = 0;
        this.currentIndent = t;
      }
      write(t) {
        return typeof t == "string" ? this.currentLine += t : t.write(this), this;
      }
      writeJoined(t, r, n = (i, o) => o.write(i)) {
        let i = r.length - 1;
        for (let o = 0; o < r.length; o++) n(r[o], this), o !== i && this.write(t);
        return this;
      }
      writeLine(t) {
        return this.write(t).newLine();
      }
      newLine() {
        this.lines.push(this.indentedCurrentLine()), this.currentLine = "", this.marginSymbol = void 0;
        let t = this.afterNextNewLineCallback;
        return this.afterNextNewLineCallback = void 0, t == null ? void 0 : t(), this;
      }
      withIndent(t) {
        return this.indent(), t(this), this.unindent(), this;
      }
      afterNextNewline(t) {
        return this.afterNextNewLineCallback = t, this;
      }
      indent() {
        return this.currentIndent++, this;
      }
      unindent() {
        return this.currentIndent > 0 && this.currentIndent--, this;
      }
      addMarginSymbol(t) {
        return this.marginSymbol = t, this;
      }
      toString() {
        return this.lines.concat(this.indentedCurrentLine()).join(`
`);
      }
      getCurrentLineLength() {
        return this.currentLine.length;
      }
      indentedCurrentLine() {
        let t = this.currentLine.padStart(this.currentLine.length + 2 * this.currentIndent);
        return this.marginSymbol ? this.marginSymbol + t.slice(1) : t;
      }
    };
    var mn = class {
      constructor(t) {
        this.value = t;
      }
      write(t) {
        t.write(this.value);
      }
      markAsError() {
        this.value.markAsError();
      }
    };
    var fn = (e) => e;
    var gn = { bold: fn, red: fn, green: fn, dim: fn, enabled: false };
    var Xs = { bold: H, red: de, green: Ve, dim: ke, enabled: true };
    var Rt = { write(e) {
      e.writeLine(",");
    } };
    var ve = class {
      constructor(t) {
        this.contents = t;
        this.isUnderlined = false;
        this.color = (t2) => t2;
      }
      underline() {
        return this.isUnderlined = true, this;
      }
      setColor(t) {
        return this.color = t, this;
      }
      write(t) {
        let r = t.getCurrentLineLength();
        t.write(this.color(this.contents)), this.isUnderlined && t.afterNextNewline(() => {
          t.write(" ".repeat(r)).writeLine(this.color("~".repeat(this.contents.length)));
        });
      }
    };
    var ze = class {
      constructor() {
        this.hasError = false;
      }
      markAsError() {
        return this.hasError = true, this;
      }
    };
    var Ct = class extends ze {
      constructor() {
        super(...arguments);
        this.items = [];
      }
      addItem(r) {
        return this.items.push(new mn(r)), this;
      }
      getField(r) {
        return this.items[r];
      }
      getPrintWidth() {
        return this.items.length === 0 ? 2 : Math.max(...this.items.map((n) => n.value.getPrintWidth())) + 2;
      }
      write(r) {
        if (this.items.length === 0) {
          this.writeEmpty(r);
          return;
        }
        this.writeWithItems(r);
      }
      writeEmpty(r) {
        let n = new ve("[]");
        this.hasError && n.setColor(r.context.colors.red).underline(), r.write(n);
      }
      writeWithItems(r) {
        let { colors: n } = r.context;
        r.writeLine("[").withIndent(() => r.writeJoined(Rt, this.items).newLine()).write("]"), this.hasError && r.afterNextNewline(() => {
          r.writeLine(n.red("~".repeat(this.getPrintWidth())));
        });
      }
      asObject() {
      }
    };
    var St = class e extends ze {
      constructor() {
        super(...arguments);
        this.fields = {};
        this.suggestions = [];
      }
      addField(r) {
        this.fields[r.name] = r;
      }
      addSuggestion(r) {
        this.suggestions.push(r);
      }
      getField(r) {
        return this.fields[r];
      }
      getDeepField(r) {
        let [n, ...i] = r, o = this.getField(n);
        if (!o) return;
        let s = o;
        for (let a of i) {
          let l;
          if (s.value instanceof e ? l = s.value.getField(a) : s.value instanceof Ct && (l = s.value.getField(Number(a))), !l) return;
          s = l;
        }
        return s;
      }
      getDeepFieldValue(r) {
        var _a2;
        return r.length === 0 ? this : (_a2 = this.getDeepField(r)) == null ? void 0 : _a2.value;
      }
      hasField(r) {
        return !!this.getField(r);
      }
      removeAllFields() {
        this.fields = {};
      }
      removeField(r) {
        delete this.fields[r];
      }
      getFields() {
        return this.fields;
      }
      isEmpty() {
        return Object.keys(this.fields).length === 0;
      }
      getFieldValue(r) {
        var _a2;
        return (_a2 = this.getField(r)) == null ? void 0 : _a2.value;
      }
      getDeepSubSelectionValue(r) {
        let n = this;
        for (let i of r) {
          if (!(n instanceof e)) return;
          let o = n.getSubSelectionValue(i);
          if (!o) return;
          n = o;
        }
        return n;
      }
      getDeepSelectionParent(r) {
        let n = this.getSelectionParent();
        if (!n) return;
        let i = n;
        for (let o of r) {
          let s = i.value.getFieldValue(o);
          if (!s || !(s instanceof e)) return;
          let a = s.getSelectionParent();
          if (!a) return;
          i = a;
        }
        return i;
      }
      getSelectionParent() {
        var _a2, _b;
        let r = (_a2 = this.getField("select")) == null ? void 0 : _a2.value.asObject();
        if (r) return { kind: "select", value: r };
        let n = (_b = this.getField("include")) == null ? void 0 : _b.value.asObject();
        if (n) return { kind: "include", value: n };
      }
      getSubSelectionValue(r) {
        var _a2;
        return (_a2 = this.getSelectionParent()) == null ? void 0 : _a2.value.fields[r].value;
      }
      getPrintWidth() {
        let r = Object.values(this.fields);
        return r.length == 0 ? 2 : Math.max(...r.map((i) => i.getPrintWidth())) + 2;
      }
      write(r) {
        let n = Object.values(this.fields);
        if (n.length === 0 && this.suggestions.length === 0) {
          this.writeEmpty(r);
          return;
        }
        this.writeWithContents(r, n);
      }
      asObject() {
        return this;
      }
      writeEmpty(r) {
        let n = new ve("{}");
        this.hasError && n.setColor(r.context.colors.red).underline(), r.write(n);
      }
      writeWithContents(r, n) {
        r.writeLine("{").withIndent(() => {
          r.writeJoined(Rt, [...n, ...this.suggestions]).newLine();
        }), r.write("}"), this.hasError && r.afterNextNewline(() => {
          r.writeLine(r.context.colors.red("~".repeat(this.getPrintWidth())));
        });
      }
    };
    var W = class extends ze {
      constructor(r) {
        super();
        this.text = r;
      }
      getPrintWidth() {
        return this.text.length;
      }
      write(r) {
        let n = new ve(this.text);
        this.hasError && n.underline().setColor(r.context.colors.red), r.write(n);
      }
      asObject() {
      }
    };
    var nr = class {
      constructor() {
        this.fields = [];
      }
      addField(t, r) {
        return this.fields.push({ write(n) {
          let { green: i, dim: o } = n.context.colors;
          n.write(i(o(`${t}: ${r}`))).addMarginSymbol(i(o("+")));
        } }), this;
      }
      write(t) {
        let { colors: { green: r } } = t.context;
        t.writeLine(r("{")).withIndent(() => {
          t.writeJoined(Rt, this.fields).newLine();
        }).write(r("}")).addMarginSymbol(r("+"));
      }
    };
    function dn(e, t, r) {
      switch (e.kind) {
        case "MutuallyExclusiveFields":
          Up(e, t);
          break;
        case "IncludeOnScalar":
          Qp(e, t);
          break;
        case "EmptySelection":
          Gp(e, t, r);
          break;
        case "UnknownSelectionField":
          Kp(e, t);
          break;
        case "InvalidSelectionValue":
          Yp(e, t);
          break;
        case "UnknownArgument":
          zp(e, t);
          break;
        case "UnknownInputField":
          Zp(e, t);
          break;
        case "RequiredArgumentMissing":
          Xp(e, t);
          break;
        case "InvalidArgumentType":
          ed(e, t);
          break;
        case "InvalidArgumentValue":
          td(e, t);
          break;
        case "ValueTooLarge":
          rd(e, t);
          break;
        case "SomeFieldsMissing":
          nd(e, t);
          break;
        case "TooManyFieldsGiven":
          id(e, t);
          break;
        case "Union":
          zs(e, t, r);
          break;
        default:
          throw new Error("not implemented: " + e.kind);
      }
    }
    function Up(e, t) {
      var _a2, _b, _c2;
      let r = (_a2 = t.arguments.getDeepSubSelectionValue(e.selectionPath)) == null ? void 0 : _a2.asObject();
      r && ((_b = r.getField(e.firstField)) == null ? void 0 : _b.markAsError(), (_c2 = r.getField(e.secondField)) == null ? void 0 : _c2.markAsError()), t.addErrorMessage((n) => `Please ${n.bold("either")} use ${n.green(`\`${e.firstField}\``)} or ${n.green(`\`${e.secondField}\``)}, but ${n.red("not both")} at the same time.`);
    }
    function Qp(e, t) {
      var _a2, _b;
      let [r, n] = ir(e.selectionPath), i = e.outputType, o = (_a2 = t.arguments.getDeepSelectionParent(r)) == null ? void 0 : _a2.value;
      if (o && ((_b = o.getField(n)) == null ? void 0 : _b.markAsError(), i)) for (let s of i.fields) s.isRelation && o.addSuggestion(new pe(s.name, "true"));
      t.addErrorMessage((s) => {
        let a = `Invalid scalar field ${s.red(`\`${n}\``)} for ${s.bold("include")} statement`;
        return i ? a += ` on model ${s.bold(i.name)}. ${or(s)}` : a += ".", a += `
Note that ${s.bold("include")} statements only accept relation fields.`, a;
      });
    }
    function Gp(e, t, r) {
      var _a2, _b;
      let n = (_a2 = t.arguments.getDeepSubSelectionValue(e.selectionPath)) == null ? void 0 : _a2.asObject();
      if (n) {
        let i = (_b = n.getField("omit")) == null ? void 0 : _b.value.asObject();
        if (i) {
          Jp(e, t, i);
          return;
        }
        if (n.hasField("select")) {
          Wp(e, t);
          return;
        }
      }
      if (r == null ? void 0 : r[xt(e.outputType.name)]) {
        Hp(e, t);
        return;
      }
      t.addErrorMessage(() => `Unknown field at "${e.selectionPath.join(".")} selection"`);
    }
    function Jp(e, t, r) {
      r.removeAllFields();
      for (let n of e.outputType.fields) r.addSuggestion(new pe(n.name, "false"));
      t.addErrorMessage((n) => `The ${n.red("omit")} statement includes every field of the model ${n.bold(e.outputType.name)}. At least one field must be included in the result`);
    }
    function Wp(e, t) {
      var _a2;
      let r = e.outputType, n = (_a2 = t.arguments.getDeepSelectionParent(e.selectionPath)) == null ? void 0 : _a2.value, i = (n == null ? void 0 : n.isEmpty()) ?? false;
      n && (n.removeAllFields(), na(n, r)), t.addErrorMessage((o) => i ? `The ${o.red("`select`")} statement for type ${o.bold(r.name)} must not be empty. ${or(o)}` : `The ${o.red("`select`")} statement for type ${o.bold(r.name)} needs ${o.bold("at least one truthy value")}.`);
    }
    function Hp(e, t) {
      var _a2, _b;
      let r = new nr();
      for (let i of e.outputType.fields) i.isRelation || r.addField(i.name, "false");
      let n = new pe("omit", r).makeRequired();
      if (e.selectionPath.length === 0) t.arguments.addSuggestion(n);
      else {
        let [i, o] = ir(e.selectionPath), a = (_b = (_a2 = t.arguments.getDeepSelectionParent(i)) == null ? void 0 : _a2.value.asObject()) == null ? void 0 : _b.getField(o);
        if (a) {
          let l = (a == null ? void 0 : a.value.asObject()) ?? new St();
          l.addSuggestion(n), a.value = l;
        }
      }
      t.addErrorMessage((i) => `The global ${i.red("omit")} configuration excludes every field of the model ${i.bold(e.outputType.name)}. At least one field must be included in the result`);
    }
    function Kp(e, t) {
      let r = ia(e.selectionPath, t);
      if (r.parentKind !== "unknown") {
        r.field.markAsError();
        let n = r.parent;
        switch (r.parentKind) {
          case "select":
            na(n, e.outputType);
            break;
          case "include":
            od(n, e.outputType);
            break;
          case "omit":
            sd(n, e.outputType);
            break;
        }
      }
      t.addErrorMessage((n) => {
        let i = [`Unknown field ${n.red(`\`${r.fieldName}\``)}`];
        return r.parentKind !== "unknown" && i.push(`for ${n.bold(r.parentKind)} statement`), i.push(`on model ${n.bold(`\`${e.outputType.name}\``)}.`), i.push(or(n)), i.join(" ");
      });
    }
    function Yp(e, t) {
      let r = ia(e.selectionPath, t);
      r.parentKind !== "unknown" && r.field.value.markAsError(), t.addErrorMessage((n) => `Invalid value for selection field \`${n.red(r.fieldName)}\`: ${e.underlyingError}`);
    }
    function zp(e, t) {
      var _a2, _b;
      let r = e.argumentPath[0], n = (_a2 = t.arguments.getDeepSubSelectionValue(e.selectionPath)) == null ? void 0 : _a2.asObject();
      n && ((_b = n.getField(r)) == null ? void 0 : _b.markAsError(), ad(n, e.arguments)), t.addErrorMessage((i) => ta(i, r, e.arguments.map((o) => o.name)));
    }
    function Zp(e, t) {
      var _a2, _b, _c2;
      let [r, n] = ir(e.argumentPath), i = (_a2 = t.arguments.getDeepSubSelectionValue(e.selectionPath)) == null ? void 0 : _a2.asObject();
      if (i) {
        (_b = i.getDeepField(e.argumentPath)) == null ? void 0 : _b.markAsError();
        let o = (_c2 = i.getDeepFieldValue(r)) == null ? void 0 : _c2.asObject();
        o && oa(o, e.inputType);
      }
      t.addErrorMessage((o) => ta(o, n, e.inputType.fields.map((s) => s.name)));
    }
    function ta(e, t, r) {
      let n = [`Unknown argument \`${e.red(t)}\`.`], i = ud(t, r);
      return i && n.push(`Did you mean \`${e.green(i)}\`?`), r.length > 0 && n.push(or(e)), n.join(" ");
    }
    function Xp(e, t) {
      var _a2, _b;
      let r;
      t.addErrorMessage((l) => (r == null ? void 0 : r.value) instanceof W && r.value.text === "null" ? `Argument \`${l.green(o)}\` must not be ${l.red("null")}.` : `Argument \`${l.green(o)}\` is missing.`);
      let n = (_a2 = t.arguments.getDeepSubSelectionValue(e.selectionPath)) == null ? void 0 : _a2.asObject();
      if (!n) return;
      let [i, o] = ir(e.argumentPath), s = new nr(), a = (_b = n.getDeepFieldValue(i)) == null ? void 0 : _b.asObject();
      if (a) if (r = a.getField(o), r && a.removeField(o), e.inputTypes.length === 1 && e.inputTypes[0].kind === "object") {
        for (let l of e.inputTypes[0].fields) s.addField(l.name, l.typeNames.join(" | "));
        a.addSuggestion(new pe(o, s).makeRequired());
      } else {
        let l = e.inputTypes.map(ra).join(" | ");
        a.addSuggestion(new pe(o, l).makeRequired());
      }
    }
    function ra(e) {
      return e.kind === "list" ? `${ra(e.elementType)}[]` : e.name;
    }
    function ed(e, t) {
      var _a2, _b;
      let r = e.argument.name, n = (_a2 = t.arguments.getDeepSubSelectionValue(e.selectionPath)) == null ? void 0 : _a2.asObject();
      n && ((_b = n.getDeepFieldValue(e.argumentPath)) == null ? void 0 : _b.markAsError()), t.addErrorMessage((i) => {
        let o = hn("or", e.argument.typeNames.map((s) => i.green(s)));
        return `Argument \`${i.bold(r)}\`: Invalid value provided. Expected ${o}, provided ${i.red(e.inferredType)}.`;
      });
    }
    function td(e, t) {
      var _a2, _b;
      let r = e.argument.name, n = (_a2 = t.arguments.getDeepSubSelectionValue(e.selectionPath)) == null ? void 0 : _a2.asObject();
      n && ((_b = n.getDeepFieldValue(e.argumentPath)) == null ? void 0 : _b.markAsError()), t.addErrorMessage((i) => {
        let o = [`Invalid value for argument \`${i.bold(r)}\``];
        if (e.underlyingError && o.push(`: ${e.underlyingError}`), o.push("."), e.argument.typeNames.length > 0) {
          let s = hn("or", e.argument.typeNames.map((a) => i.green(a)));
          o.push(` Expected ${s}.`);
        }
        return o.join("");
      });
    }
    function rd(e, t) {
      var _a2, _b;
      let r = e.argument.name, n = (_a2 = t.arguments.getDeepSubSelectionValue(e.selectionPath)) == null ? void 0 : _a2.asObject(), i;
      if (n) {
        let s = (_b = n.getDeepField(e.argumentPath)) == null ? void 0 : _b.value;
        s == null ? void 0 : s.markAsError(), s instanceof W && (i = s.text);
      }
      t.addErrorMessage((o) => {
        let s = ["Unable to fit value"];
        return i && s.push(o.red(i)), s.push(`into a 64-bit signed integer for field \`${o.bold(r)}\``), s.join(" ");
      });
    }
    function nd(e, t) {
      var _a2, _b;
      let r = e.argumentPath[e.argumentPath.length - 1], n = (_a2 = t.arguments.getDeepSubSelectionValue(e.selectionPath)) == null ? void 0 : _a2.asObject();
      if (n) {
        let i = (_b = n.getDeepFieldValue(e.argumentPath)) == null ? void 0 : _b.asObject();
        i && oa(i, e.inputType);
      }
      t.addErrorMessage((i) => {
        let o = [`Argument \`${i.bold(r)}\` of type ${i.bold(e.inputType.name)} needs`];
        return e.constraints.minFieldCount === 1 ? e.constraints.requiredFields ? o.push(`${i.green("at least one of")} ${hn("or", e.constraints.requiredFields.map((s) => `\`${i.bold(s)}\``))} arguments.`) : o.push(`${i.green("at least one")} argument.`) : o.push(`${i.green(`at least ${e.constraints.minFieldCount}`)} arguments.`), o.push(or(i)), o.join(" ");
      });
    }
    function id(e, t) {
      var _a2, _b;
      let r = e.argumentPath[e.argumentPath.length - 1], n = (_a2 = t.arguments.getDeepSubSelectionValue(e.selectionPath)) == null ? void 0 : _a2.asObject(), i = [];
      if (n) {
        let o = (_b = n.getDeepFieldValue(e.argumentPath)) == null ? void 0 : _b.asObject();
        o && (o.markAsError(), i = Object.keys(o.getFields()));
      }
      t.addErrorMessage((o) => {
        let s = [`Argument \`${o.bold(r)}\` of type ${o.bold(e.inputType.name)} needs`];
        return e.constraints.minFieldCount === 1 && e.constraints.maxFieldCount == 1 ? s.push(`${o.green("exactly one")} argument,`) : e.constraints.maxFieldCount == 1 ? s.push(`${o.green("at most one")} argument,`) : s.push(`${o.green(`at most ${e.constraints.maxFieldCount}`)} arguments,`), s.push(`but you provided ${hn("and", i.map((a) => o.red(a)))}. Please choose`), e.constraints.maxFieldCount === 1 ? s.push("one.") : s.push(`${e.constraints.maxFieldCount}.`), s.join(" ");
      });
    }
    function na(e, t) {
      for (let r of t.fields) e.hasField(r.name) || e.addSuggestion(new pe(r.name, "true"));
    }
    function od(e, t) {
      for (let r of t.fields) r.isRelation && !e.hasField(r.name) && e.addSuggestion(new pe(r.name, "true"));
    }
    function sd(e, t) {
      for (let r of t.fields) !e.hasField(r.name) && !r.isRelation && e.addSuggestion(new pe(r.name, "true"));
    }
    function ad(e, t) {
      for (let r of t) e.hasField(r.name) || e.addSuggestion(new pe(r.name, r.typeNames.join(" | ")));
    }
    function ia(e, t) {
      var _a2, _b, _c2, _d2;
      let [r, n] = ir(e), i = (_a2 = t.arguments.getDeepSubSelectionValue(r)) == null ? void 0 : _a2.asObject();
      if (!i) return { parentKind: "unknown", fieldName: n };
      let o = (_b = i.getFieldValue("select")) == null ? void 0 : _b.asObject(), s = (_c2 = i.getFieldValue("include")) == null ? void 0 : _c2.asObject(), a = (_d2 = i.getFieldValue("omit")) == null ? void 0 : _d2.asObject(), l = o == null ? void 0 : o.getField(n);
      return o && l ? { parentKind: "select", parent: o, field: l, fieldName: n } : (l = s == null ? void 0 : s.getField(n), s && l ? { parentKind: "include", field: l, parent: s, fieldName: n } : (l = a == null ? void 0 : a.getField(n), a && l ? { parentKind: "omit", field: l, parent: a, fieldName: n } : { parentKind: "unknown", fieldName: n }));
    }
    function oa(e, t) {
      if (t.kind === "object") for (let r of t.fields) e.hasField(r.name) || e.addSuggestion(new pe(r.name, r.typeNames.join(" | ")));
    }
    function ir(e) {
      let t = [...e], r = t.pop();
      if (!r) throw new Error("unexpected empty path");
      return [t, r];
    }
    function or({ green: e, enabled: t }) {
      return "Available options are " + (t ? `listed in ${e("green")}` : "marked with ?") + ".";
    }
    function hn(e, t) {
      if (t.length === 1) return t[0];
      let r = [...t], n = r.pop();
      return `${r.join(", ")} ${e} ${n}`;
    }
    var ld = 3;
    function ud(e, t) {
      let r = 1 / 0, n;
      for (let i of t) {
        let o = (0, ea.default)(e, i);
        o > ld || o < r && (r = o, n = i);
      }
      return n;
    }
    function sa(e) {
      return e.substring(0, 1).toLowerCase() + e.substring(1);
    }
    var sr = class {
      constructor(t, r, n, i, o) {
        this.modelName = t, this.name = r, this.typeName = n, this.isList = i, this.isEnum = o;
      }
      _toGraphQLInputType() {
        let t = this.isList ? "List" : "", r = this.isEnum ? "Enum" : "";
        return `${t}${r}${this.typeName}FieldRefInput<${this.modelName}>`;
      }
    };
    function At(e) {
      return e instanceof sr;
    }
    var yn = Symbol();
    var Mi = /* @__PURE__ */ new WeakMap();
    var $e = class {
      constructor(t) {
        t === yn ? Mi.set(this, `Prisma.${this._getName()}`) : Mi.set(this, `new Prisma.${this._getNamespace()}.${this._getName()}()`);
      }
      _getName() {
        return this.constructor.name;
      }
      toString() {
        return Mi.get(this);
      }
    };
    var ar = class extends $e {
      _getNamespace() {
        return "NullTypes";
      }
    };
    var lr = class extends ar {
    };
    $i(lr, "DbNull");
    var ur = class extends ar {
    };
    $i(ur, "JsonNull");
    var cr = class extends ar {
    };
    $i(cr, "AnyNull");
    var En = { classes: { DbNull: lr, JsonNull: ur, AnyNull: cr }, instances: { DbNull: new lr(yn), JsonNull: new ur(yn), AnyNull: new cr(yn) } };
    function $i(e, t) {
      Object.defineProperty(e, "name", { value: t, configurable: true });
    }
    var aa = ": ";
    var bn = class {
      constructor(t, r) {
        this.name = t;
        this.value = r;
        this.hasError = false;
      }
      markAsError() {
        this.hasError = true;
      }
      getPrintWidth() {
        return this.name.length + this.value.getPrintWidth() + aa.length;
      }
      write(t) {
        let r = new ve(this.name);
        this.hasError && r.underline().setColor(t.context.colors.red), t.write(r).write(aa).write(this.value);
      }
    };
    var qi = class {
      constructor(t) {
        this.errorMessages = [];
        this.arguments = t;
      }
      write(t) {
        t.write(this.arguments);
      }
      addErrorMessage(t) {
        this.errorMessages.push(t);
      }
      renderAllMessages(t) {
        return this.errorMessages.map((r) => r(t)).join(`
`);
      }
    };
    function It(e) {
      return new qi(la(e));
    }
    function la(e) {
      let t = new St();
      for (let [r, n] of Object.entries(e)) {
        let i = new bn(r, ua(n));
        t.addField(i);
      }
      return t;
    }
    function ua(e) {
      if (typeof e == "string") return new W(JSON.stringify(e));
      if (typeof e == "number" || typeof e == "boolean") return new W(String(e));
      if (typeof e == "bigint") return new W(`${e}n`);
      if (e === null) return new W("null");
      if (e === void 0) return new W("undefined");
      if (vt(e)) return new W(`new Prisma.Decimal("${e.toFixed()}")`);
      if (e instanceof Uint8Array) return Buffer.isBuffer(e) ? new W(`Buffer.alloc(${e.byteLength})`) : new W(`new Uint8Array(${e.byteLength})`);
      if (e instanceof Date) {
        let t = ln(e) ? e.toISOString() : "Invalid Date";
        return new W(`new Date("${t}")`);
      }
      return e instanceof $e ? new W(`Prisma.${e._getName()}`) : At(e) ? new W(`prisma.${sa(e.modelName)}.$fields.${e.name}`) : Array.isArray(e) ? cd(e) : typeof e == "object" ? la(e) : new W(Object.prototype.toString.call(e));
    }
    function cd(e) {
      let t = new Ct();
      for (let r of e) t.addItem(ua(r));
      return t;
    }
    function wn(e, t) {
      let r = t === "pretty" ? Xs : gn, n = e.renderAllMessages(r), i = new Tt(0, { colors: r }).write(e).toString();
      return { message: n, args: i };
    }
    function xn({ args: e, errors: t, errorFormat: r, callsite: n, originalMethod: i, clientVersion: o, globalOmit: s }) {
      let a = It(e);
      for (let p of t) dn(p, a, s);
      let { message: l, args: u } = wn(a, r), c = pn({ message: l, callsite: n, originalMethod: i, showColors: r === "pretty", callArguments: u });
      throw new te(c, { clientVersion: o });
    }
    var Te = class {
      constructor() {
        this._map = /* @__PURE__ */ new Map();
      }
      get(t) {
        var _a2;
        return (_a2 = this._map.get(t)) == null ? void 0 : _a2.value;
      }
      set(t, r) {
        this._map.set(t, { value: r });
      }
      getOrCreate(t, r) {
        let n = this._map.get(t);
        if (n) return n.value;
        let i = r();
        return this.set(t, i), i;
      }
    };
    function pr(e) {
      let t;
      return { get() {
        return t || (t = { value: e() }), t.value;
      } };
    }
    function Re(e) {
      return e.replace(/^./, (t) => t.toLowerCase());
    }
    function pa(e, t, r) {
      let n = Re(r);
      return !t.result || !(t.result.$allModels || t.result[n]) ? e : pd({ ...e, ...ca(t.name, e, t.result.$allModels), ...ca(t.name, e, t.result[n]) });
    }
    function pd(e) {
      let t = new Te(), r = (n, i) => t.getOrCreate(n, () => i.has(n) ? [n] : (i.add(n), e[n] ? e[n].needs.flatMap((o) => r(o, i)) : [n]));
      return yt(e, (n) => ({ ...n, needs: r(n.name, /* @__PURE__ */ new Set()) }));
    }
    function ca(e, t, r) {
      return r ? yt(r, ({ needs: n, compute: i }, o) => ({ name: o, needs: n ? Object.keys(n).filter((s) => n[s]) : [], compute: dd(t, o, i) })) : {};
    }
    function dd(e, t, r) {
      var _a2;
      let n = (_a2 = e == null ? void 0 : e[t]) == null ? void 0 : _a2.compute;
      return n ? (i) => r({ ...i, [t]: n(i) }) : r;
    }
    function da(e, t) {
      if (!t) return e;
      let r = { ...e };
      for (let n of Object.values(t)) if (e[n.name]) for (let i of n.needs) r[i] = true;
      return r;
    }
    function ma(e, t) {
      if (!t) return e;
      let r = { ...e };
      for (let n of Object.values(t)) if (!e[n.name]) for (let i of n.needs) delete r[i];
      return r;
    }
    var Pn = class {
      constructor(t, r) {
        this.extension = t;
        this.previous = r;
        this.computedFieldsCache = new Te();
        this.modelExtensionsCache = new Te();
        this.queryCallbacksCache = new Te();
        this.clientExtensions = pr(() => {
          var _a2, _b;
          return this.extension.client ? { ...(_a2 = this.previous) == null ? void 0 : _a2.getAllClientExtensions(), ...this.extension.client } : (_b = this.previous) == null ? void 0 : _b.getAllClientExtensions();
        });
        this.batchCallbacks = pr(() => {
          var _a2, _b;
          let t2 = ((_a2 = this.previous) == null ? void 0 : _a2.getAllBatchQueryCallbacks()) ?? [], r2 = (_b = this.extension.query) == null ? void 0 : _b.$__internalBatch;
          return r2 ? t2.concat(r2) : t2;
        });
      }
      getAllComputedFields(t) {
        return this.computedFieldsCache.getOrCreate(t, () => {
          var _a2;
          return pa((_a2 = this.previous) == null ? void 0 : _a2.getAllComputedFields(t), this.extension, t);
        });
      }
      getAllClientExtensions() {
        return this.clientExtensions.get();
      }
      getAllModelExtensions(t) {
        return this.modelExtensionsCache.getOrCreate(t, () => {
          var _a2, _b;
          let r = Re(t);
          return !this.extension.model || !(this.extension.model[r] || this.extension.model.$allModels) ? (_a2 = this.previous) == null ? void 0 : _a2.getAllModelExtensions(t) : { ...(_b = this.previous) == null ? void 0 : _b.getAllModelExtensions(t), ...this.extension.model.$allModels, ...this.extension.model[r] };
        });
      }
      getAllQueryCallbacks(t, r) {
        return this.queryCallbacksCache.getOrCreate(`${t}:${r}`, () => {
          var _a2;
          let n = ((_a2 = this.previous) == null ? void 0 : _a2.getAllQueryCallbacks(t, r)) ?? [], i = [], o = this.extension.query;
          return !o || !(o[t] || o.$allModels || o[r] || o.$allOperations) ? n : (o[t] !== void 0 && (o[t][r] !== void 0 && i.push(o[t][r]), o[t].$allOperations !== void 0 && i.push(o[t].$allOperations)), t !== "$none" && o.$allModels !== void 0 && (o.$allModels[r] !== void 0 && i.push(o.$allModels[r]), o.$allModels.$allOperations !== void 0 && i.push(o.$allModels.$allOperations)), o[r] !== void 0 && i.push(o[r]), o.$allOperations !== void 0 && i.push(o.$allOperations), n.concat(i));
        });
      }
      getAllBatchQueryCallbacks() {
        return this.batchCallbacks.get();
      }
    };
    var Ot = class e {
      constructor(t) {
        this.head = t;
      }
      static empty() {
        return new e();
      }
      static single(t) {
        return new e(new Pn(t));
      }
      isEmpty() {
        return this.head === void 0;
      }
      append(t) {
        return new e(new Pn(t, this.head));
      }
      getAllComputedFields(t) {
        var _a2;
        return (_a2 = this.head) == null ? void 0 : _a2.getAllComputedFields(t);
      }
      getAllClientExtensions() {
        var _a2;
        return (_a2 = this.head) == null ? void 0 : _a2.getAllClientExtensions();
      }
      getAllModelExtensions(t) {
        var _a2;
        return (_a2 = this.head) == null ? void 0 : _a2.getAllModelExtensions(t);
      }
      getAllQueryCallbacks(t, r) {
        var _a2;
        return ((_a2 = this.head) == null ? void 0 : _a2.getAllQueryCallbacks(t, r)) ?? [];
      }
      getAllBatchQueryCallbacks() {
        var _a2;
        return ((_a2 = this.head) == null ? void 0 : _a2.getAllBatchQueryCallbacks()) ?? [];
      }
    };
    var vn = class {
      constructor(t) {
        this.name = t;
      }
    };
    function fa(e) {
      return e instanceof vn;
    }
    function ga(e) {
      return new vn(e);
    }
    var ha = Symbol();
    var dr = class {
      constructor(t) {
        if (t !== ha) throw new Error("Skip instance can not be constructed directly");
      }
      ifUndefined(t) {
        return t === void 0 ? Tn : t;
      }
    };
    var Tn = new dr(ha);
    function Ce(e) {
      return e instanceof dr;
    }
    var md = { findUnique: "findUnique", findUniqueOrThrow: "findUniqueOrThrow", findFirst: "findFirst", findFirstOrThrow: "findFirstOrThrow", findMany: "findMany", count: "aggregate", create: "createOne", createMany: "createMany", createManyAndReturn: "createManyAndReturn", update: "updateOne", updateMany: "updateMany", updateManyAndReturn: "updateManyAndReturn", upsert: "upsertOne", delete: "deleteOne", deleteMany: "deleteMany", executeRaw: "executeRaw", queryRaw: "queryRaw", aggregate: "aggregate", groupBy: "groupBy", runCommandRaw: "runCommandRaw", findRaw: "findRaw", aggregateRaw: "aggregateRaw" };
    var ya = "explicitly `undefined` values are not allowed";
    function Rn({ modelName: e, action: t, args: r, runtimeDataModel: n, extensions: i = Ot.empty(), callsite: o, clientMethod: s, errorFormat: a, clientVersion: l, previewFeatures: u, globalOmit: c }) {
      let p = new Vi({ runtimeDataModel: n, modelName: e, action: t, rootArgs: r, callsite: o, extensions: i, selectionPath: [], argumentPath: [], originalMethod: s, errorFormat: a, clientVersion: l, previewFeatures: u, globalOmit: c });
      return { modelName: e, action: md[t], query: mr(r, p) };
    }
    function mr({ select: e, include: t, ...r } = {}, n) {
      let i = r.omit;
      return delete r.omit, { arguments: ba(r, n), selection: fd(e, t, i, n) };
    }
    function fd(e, t, r, n) {
      return e ? (t ? n.throwValidationError({ kind: "MutuallyExclusiveFields", firstField: "include", secondField: "select", selectionPath: n.getSelectionPath() }) : r && n.throwValidationError({ kind: "MutuallyExclusiveFields", firstField: "omit", secondField: "select", selectionPath: n.getSelectionPath() }), Ed(e, n)) : gd(n, t, r);
    }
    function gd(e, t, r) {
      let n = {};
      return e.modelOrType && !e.isRawAction() && (n.$composites = true, n.$scalars = true), t && hd(n, t, e), yd(n, r, e), n;
    }
    function hd(e, t, r) {
      for (let [n, i] of Object.entries(t)) {
        if (Ce(i)) continue;
        let o = r.nestSelection(n);
        if (ji(i, o), i === false || i === void 0) {
          e[n] = false;
          continue;
        }
        let s = r.findField(n);
        if (s && s.kind !== "object" && r.throwValidationError({ kind: "IncludeOnScalar", selectionPath: r.getSelectionPath().concat(n), outputType: r.getOutputTypeDescription() }), s) {
          e[n] = mr(i === true ? {} : i, o);
          continue;
        }
        if (i === true) {
          e[n] = true;
          continue;
        }
        e[n] = mr(i, o);
      }
    }
    function yd(e, t, r) {
      let n = r.getComputedFields(), i = { ...r.getGlobalOmit(), ...t }, o = ma(i, n);
      for (let [s, a] of Object.entries(o)) {
        if (Ce(a)) continue;
        ji(a, r.nestSelection(s));
        let l = r.findField(s);
        (n == null ? void 0 : n[s]) && !l || (e[s] = !a);
      }
    }
    function Ed(e, t) {
      let r = {}, n = t.getComputedFields(), i = da(e, n);
      for (let [o, s] of Object.entries(i)) {
        if (Ce(s)) continue;
        let a = t.nestSelection(o);
        ji(s, a);
        let l = t.findField(o);
        if (!((n == null ? void 0 : n[o]) && !l)) {
          if (s === false || s === void 0 || Ce(s)) {
            r[o] = false;
            continue;
          }
          if (s === true) {
            (l == null ? void 0 : l.kind) === "object" ? r[o] = mr({}, a) : r[o] = true;
            continue;
          }
          r[o] = mr(s, a);
        }
      }
      return r;
    }
    function Ea(e, t) {
      if (e === null) return null;
      if (typeof e == "string" || typeof e == "number" || typeof e == "boolean") return e;
      if (typeof e == "bigint") return { $type: "BigInt", value: String(e) };
      if (Pt(e)) {
        if (ln(e)) return { $type: "DateTime", value: e.toISOString() };
        t.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: t.getSelectionPath(), argumentPath: t.getArgumentPath(), argument: { name: t.getArgumentName(), typeNames: ["Date"] }, underlyingError: "Provided Date object is invalid" });
      }
      if (fa(e)) return { $type: "Param", value: e.name };
      if (At(e)) return { $type: "FieldRef", value: { _ref: e.name, _container: e.modelName } };
      if (Array.isArray(e)) return bd(e, t);
      if (ArrayBuffer.isView(e)) {
        let { buffer: r, byteOffset: n, byteLength: i } = e;
        return { $type: "Bytes", value: Buffer.from(r, n, i).toString("base64") };
      }
      if (wd(e)) return e.values;
      if (vt(e)) return { $type: "Decimal", value: e.toFixed() };
      if (e instanceof $e) {
        if (e !== En.instances[e._getName()]) throw new Error("Invalid ObjectEnumValue");
        return { $type: "Enum", value: e._getName() };
      }
      if (xd(e)) return e.toJSON();
      if (typeof e == "object") return ba(e, t);
      t.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: t.getSelectionPath(), argumentPath: t.getArgumentPath(), argument: { name: t.getArgumentName(), typeNames: [] }, underlyingError: `We could not serialize ${Object.prototype.toString.call(e)} value. Serialize the object to JSON or implement a ".toJSON()" method on it` });
    }
    function ba(e, t) {
      if (e.$type) return { $type: "Raw", value: e };
      let r = {};
      for (let n in e) {
        let i = e[n], o = t.nestArgument(n);
        Ce(i) || (i !== void 0 ? r[n] = Ea(i, o) : t.isPreviewFeatureOn("strictUndefinedChecks") && t.throwValidationError({ kind: "InvalidArgumentValue", argumentPath: o.getArgumentPath(), selectionPath: t.getSelectionPath(), argument: { name: t.getArgumentName(), typeNames: [] }, underlyingError: ya }));
      }
      return r;
    }
    function bd(e, t) {
      let r = [];
      for (let n = 0; n < e.length; n++) {
        let i = t.nestArgument(String(n)), o = e[n];
        if (o === void 0 || Ce(o)) {
          let s = o === void 0 ? "undefined" : "Prisma.skip";
          t.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: i.getSelectionPath(), argumentPath: i.getArgumentPath(), argument: { name: `${t.getArgumentName()}[${n}]`, typeNames: [] }, underlyingError: `Can not use \`${s}\` value within array. Use \`null\` or filter out \`${s}\` values` });
        }
        r.push(Ea(o, i));
      }
      return r;
    }
    function wd(e) {
      return typeof e == "object" && e !== null && e.__prismaRawParameters__ === true;
    }
    function xd(e) {
      return typeof e == "object" && e !== null && typeof e.toJSON == "function";
    }
    function ji(e, t) {
      e === void 0 && t.isPreviewFeatureOn("strictUndefinedChecks") && t.throwValidationError({ kind: "InvalidSelectionValue", selectionPath: t.getSelectionPath(), underlyingError: ya });
    }
    var Vi = class e {
      constructor(t) {
        this.params = t;
        this.params.modelName && (this.modelOrType = this.params.runtimeDataModel.models[this.params.modelName] ?? this.params.runtimeDataModel.types[this.params.modelName]);
      }
      throwValidationError(t) {
        xn({ errors: [t], originalMethod: this.params.originalMethod, args: this.params.rootArgs ?? {}, callsite: this.params.callsite, errorFormat: this.params.errorFormat, clientVersion: this.params.clientVersion, globalOmit: this.params.globalOmit });
      }
      getSelectionPath() {
        return this.params.selectionPath;
      }
      getArgumentPath() {
        return this.params.argumentPath;
      }
      getArgumentName() {
        return this.params.argumentPath[this.params.argumentPath.length - 1];
      }
      getOutputTypeDescription() {
        if (!(!this.params.modelName || !this.modelOrType)) return { name: this.params.modelName, fields: this.modelOrType.fields.map((t) => ({ name: t.name, typeName: "boolean", isRelation: t.kind === "object" })) };
      }
      isRawAction() {
        return ["executeRaw", "queryRaw", "runCommandRaw", "findRaw", "aggregateRaw"].includes(this.params.action);
      }
      isPreviewFeatureOn(t) {
        return this.params.previewFeatures.includes(t);
      }
      getComputedFields() {
        if (this.params.modelName) return this.params.extensions.getAllComputedFields(this.params.modelName);
      }
      findField(t) {
        var _a2;
        return (_a2 = this.modelOrType) == null ? void 0 : _a2.fields.find((r) => r.name === t);
      }
      nestSelection(t) {
        let r = this.findField(t), n = (r == null ? void 0 : r.kind) === "object" ? r.type : void 0;
        return new e({ ...this.params, modelName: n, selectionPath: this.params.selectionPath.concat(t) });
      }
      getGlobalOmit() {
        var _a2;
        return this.params.modelName && this.shouldApplyGlobalOmit() ? ((_a2 = this.params.globalOmit) == null ? void 0 : _a2[xt(this.params.modelName)]) ?? {} : {};
      }
      shouldApplyGlobalOmit() {
        switch (this.params.action) {
          case "findFirst":
          case "findFirstOrThrow":
          case "findUniqueOrThrow":
          case "findMany":
          case "upsert":
          case "findUnique":
          case "createManyAndReturn":
          case "create":
          case "update":
          case "updateManyAndReturn":
          case "delete":
            return true;
          case "executeRaw":
          case "aggregateRaw":
          case "runCommandRaw":
          case "findRaw":
          case "createMany":
          case "deleteMany":
          case "groupBy":
          case "updateMany":
          case "count":
          case "aggregate":
          case "queryRaw":
            return false;
          default:
            Fe(this.params.action, "Unknown action");
        }
      }
      nestArgument(t) {
        return new e({ ...this.params, argumentPath: this.params.argumentPath.concat(t) });
      }
    };
    var kt = class {
      constructor(t) {
        this._engine = t;
      }
      prometheus(t) {
        return this._engine.metrics({ format: "prometheus", ...t });
      }
      json(t) {
        return this._engine.metrics({ format: "json", ...t });
      }
    };
    function wa(e) {
      return { models: Bi(e.models), enums: Bi(e.enums), types: Bi(e.types) };
    }
    function Bi(e) {
      let t = {};
      for (let { name: r, ...n } of e) t[r] = n;
      return t;
    }
    function xa(e, t) {
      let r = pr(() => Pd(t));
      Object.defineProperty(e, "dmmf", { get: () => r.get() });
    }
    function Pd(e) {
      return { datamodel: { models: Ui(e.models), enums: Ui(e.enums), types: Ui(e.types) } };
    }
    function Ui(e) {
      return Object.entries(e).map(([t, r]) => ({ name: t, ...r }));
    }
    var Qi = /* @__PURE__ */ new WeakMap();
    var Cn = "$$PrismaTypedSql";
    var Gi = class {
      constructor(t, r) {
        Qi.set(this, { sql: t, values: r }), Object.defineProperty(this, Cn, { value: Cn });
      }
      get sql() {
        return Qi.get(this).sql;
      }
      get values() {
        return Qi.get(this).values;
      }
    };
    function Pa(e) {
      return (...t) => new Gi(e, t);
    }
    function va(e) {
      return e != null && e[Cn] === Cn;
    }
    function fr(e) {
      return { ok: false, error: e, map() {
        return fr(e);
      }, flatMap() {
        return fr(e);
      } };
    }
    var Ji = class {
      constructor() {
        this.registeredErrors = [];
      }
      consumeError(t) {
        return this.registeredErrors[t];
      }
      registerNewError(t) {
        let r = 0;
        for (; this.registeredErrors[r] !== void 0; ) r++;
        return this.registeredErrors[r] = { error: t }, r;
      }
    };
    var Wi = (e) => {
      let t = new Ji(), r = Se(t, e.transactionContext.bind(e)), n = { adapterName: e.adapterName, errorRegistry: t, queryRaw: Se(t, e.queryRaw.bind(e)), executeRaw: Se(t, e.executeRaw.bind(e)), provider: e.provider, transactionContext: async (...i) => (await r(...i)).map((s) => vd(t, s)) };
      return e.getConnectionInfo && (n.getConnectionInfo = Rd(t, e.getConnectionInfo.bind(e))), n;
    };
    var vd = (e, t) => {
      let r = Se(e, t.startTransaction.bind(t));
      return { adapterName: t.adapterName, provider: t.provider, queryRaw: Se(e, t.queryRaw.bind(t)), executeRaw: Se(e, t.executeRaw.bind(t)), startTransaction: async (...n) => (await r(...n)).map((o) => Td(e, o)) };
    };
    var Td = (e, t) => ({ adapterName: t.adapterName, provider: t.provider, options: t.options, queryRaw: Se(e, t.queryRaw.bind(t)), executeRaw: Se(e, t.executeRaw.bind(t)), commit: Se(e, t.commit.bind(t)), rollback: Se(e, t.rollback.bind(t)) });
    function Se(e, t) {
      return async (...r) => {
        try {
          return await t(...r);
        } catch (n) {
          let i = e.registerNewError(n);
          return fr({ kind: "GenericJs", id: i });
        }
      };
    }
    function Rd(e, t) {
      return (...r) => {
        try {
          return t(...r);
        } catch (n) {
          let i = e.registerNewError(n);
          return fr({ kind: "GenericJs", id: i });
        }
      };
    }
    var tu = _(ci());
    var ru = require("async_hooks");
    var nu = require("events");
    var iu = _(require("fs"));
    var Nr = _(require("path"));
    var ae = class e {
      constructor(t, r) {
        if (t.length - 1 !== r.length) throw t.length === 0 ? new TypeError("Expected at least 1 string") : new TypeError(`Expected ${t.length} strings to have ${t.length - 1} values`);
        let n = r.reduce((s, a) => s + (a instanceof e ? a.values.length : 1), 0);
        this.values = new Array(n), this.strings = new Array(n + 1), this.strings[0] = t[0];
        let i = 0, o = 0;
        for (; i < r.length; ) {
          let s = r[i++], a = t[i];
          if (s instanceof e) {
            this.strings[o] += s.strings[0];
            let l = 0;
            for (; l < s.values.length; ) this.values[o++] = s.values[l++], this.strings[o] = s.strings[l];
            this.strings[o] += a;
          } else this.values[o++] = s, this.strings[o] = a;
        }
      }
      get sql() {
        let t = this.strings.length, r = 1, n = this.strings[0];
        for (; r < t; ) n += `?${this.strings[r++]}`;
        return n;
      }
      get statement() {
        let t = this.strings.length, r = 1, n = this.strings[0];
        for (; r < t; ) n += `:${r}${this.strings[r++]}`;
        return n;
      }
      get text() {
        let t = this.strings.length, r = 1, n = this.strings[0];
        for (; r < t; ) n += `$${r}${this.strings[r++]}`;
        return n;
      }
      inspect() {
        return { sql: this.sql, statement: this.statement, text: this.text, values: this.values };
      }
    };
    function Ta(e, t = ",", r = "", n = "") {
      if (e.length === 0) throw new TypeError("Expected `join([])` to be called with an array of multiple elements, but got an empty array");
      return new ae([r, ...Array(e.length - 1).fill(t), n], e);
    }
    function Hi(e) {
      return new ae([e], []);
    }
    var Ra = Hi("");
    function Ki(e, ...t) {
      return new ae(e, t);
    }
    function gr(e) {
      return { getKeys() {
        return Object.keys(e);
      }, getPropertyValue(t) {
        return e[t];
      } };
    }
    function ie(e, t) {
      return { getKeys() {
        return [e];
      }, getPropertyValue() {
        return t();
      } };
    }
    function ot(e) {
      let t = new Te();
      return { getKeys() {
        return e.getKeys();
      }, getPropertyValue(r) {
        return t.getOrCreate(r, () => e.getPropertyValue(r));
      }, getPropertyDescriptor(r) {
        var _a2;
        return (_a2 = e.getPropertyDescriptor) == null ? void 0 : _a2.call(e, r);
      } };
    }
    var Sn = { enumerable: true, configurable: true, writable: true };
    function An(e) {
      let t = new Set(e);
      return { getPrototypeOf: () => Object.prototype, getOwnPropertyDescriptor: () => Sn, has: (r, n) => t.has(n), set: (r, n, i) => t.add(n) && Reflect.set(r, n, i), ownKeys: () => [...t] };
    }
    var Ca = Symbol.for("nodejs.util.inspect.custom");
    function Ae(e, t) {
      let r = Cd(t), n = /* @__PURE__ */ new Set(), i = new Proxy(e, { get(o, s) {
        if (n.has(s)) return o[s];
        let a = r.get(s);
        return a ? a.getPropertyValue(s) : o[s];
      }, has(o, s) {
        var _a2;
        if (n.has(s)) return true;
        let a = r.get(s);
        return a ? ((_a2 = a.has) == null ? void 0 : _a2.call(a, s)) ?? true : Reflect.has(o, s);
      }, ownKeys(o) {
        let s = Sa(Reflect.ownKeys(o), r), a = Sa(Array.from(r.keys()), r);
        return [.../* @__PURE__ */ new Set([...s, ...a, ...n])];
      }, set(o, s, a) {
        var _a2, _b, _c2;
        return ((_c2 = (_b = (_a2 = r.get(s)) == null ? void 0 : _a2.getPropertyDescriptor) == null ? void 0 : _b.call(_a2, s)) == null ? void 0 : _c2.writable) === false ? false : (n.add(s), Reflect.set(o, s, a));
      }, getOwnPropertyDescriptor(o, s) {
        let a = Reflect.getOwnPropertyDescriptor(o, s);
        if (a && !a.configurable) return a;
        let l = r.get(s);
        return l ? l.getPropertyDescriptor ? { ...Sn, ...l == null ? void 0 : l.getPropertyDescriptor(s) } : Sn : a;
      }, defineProperty(o, s, a) {
        return n.add(s), Reflect.defineProperty(o, s, a);
      }, getPrototypeOf: () => Object.prototype });
      return i[Ca] = function() {
        let o = { ...this };
        return delete o[Ca], o;
      }, i;
    }
    function Cd(e) {
      let t = /* @__PURE__ */ new Map();
      for (let r of e) {
        let n = r.getKeys();
        for (let i of n) t.set(i, r);
      }
      return t;
    }
    function Sa(e, t) {
      return e.filter((r) => {
        var _a2, _b;
        return ((_b = (_a2 = t.get(r)) == null ? void 0 : _a2.has) == null ? void 0 : _b.call(_a2, r)) ?? true;
      });
    }
    function _t(e) {
      return { getKeys() {
        return e;
      }, has() {
        return false;
      }, getPropertyValue() {
      } };
    }
    function Dt(e, t) {
      return { batch: e, transaction: (t == null ? void 0 : t.kind) === "batch" ? { isolationLevel: t.options.isolationLevel } : void 0 };
    }
    function Aa(e) {
      if (e === void 0) return "";
      let t = It(e);
      return new Tt(0, { colors: gn }).write(t).toString();
    }
    var Sd = "P2037";
    function Nt({ error: e, user_facing_error: t }, r, n) {
      return t.error_code ? new ee(Ad(t, n), { code: t.error_code, clientVersion: r, meta: t.meta, batchRequestIdx: t.batch_request_idx }) : new B(e, { clientVersion: r, batchRequestIdx: t.batch_request_idx });
    }
    function Ad(e, t) {
      let r = e.message;
      return (t === "postgresql" || t === "postgres" || t === "mysql") && e.error_code === Sd && (r += `
Prisma Accelerate has built-in connection pooling to prevent such errors: https://pris.ly/client/error-accelerate`), r;
    }
    var hr = "<unknown>";
    function Ia(e) {
      var t = e.split(`
`);
      return t.reduce(function(r, n) {
        var i = kd(n) || Dd(n) || Fd(n) || Vd(n) || $d(n);
        return i && r.push(i), r;
      }, []);
    }
    var Id = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|\/|[a-z]:\\|\\\\).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;
    var Od = /\((\S*)(?::(\d+))(?::(\d+))\)/;
    function kd(e) {
      var t = Id.exec(e);
      if (!t) return null;
      var r = t[2] && t[2].indexOf("native") === 0, n = t[2] && t[2].indexOf("eval") === 0, i = Od.exec(t[2]);
      return n && i != null && (t[2] = i[1], t[3] = i[2], t[4] = i[3]), { file: r ? null : t[2], methodName: t[1] || hr, arguments: r ? [t[2]] : [], lineNumber: t[3] ? +t[3] : null, column: t[4] ? +t[4] : null };
    }
    var _d = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i;
    function Dd(e) {
      var t = _d.exec(e);
      return t ? { file: t[2], methodName: t[1] || hr, arguments: [], lineNumber: +t[3], column: t[4] ? +t[4] : null } : null;
    }
    var Nd = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i;
    var Ld = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
    function Fd(e) {
      var t = Nd.exec(e);
      if (!t) return null;
      var r = t[3] && t[3].indexOf(" > eval") > -1, n = Ld.exec(t[3]);
      return r && n != null && (t[3] = n[1], t[4] = n[2], t[5] = null), { file: t[3], methodName: t[1] || hr, arguments: t[2] ? t[2].split(",") : [], lineNumber: t[4] ? +t[4] : null, column: t[5] ? +t[5] : null };
    }
    var Md = /^\s*(?:([^@]*)(?:\((.*?)\))?@)?(\S.*?):(\d+)(?::(\d+))?\s*$/i;
    function $d(e) {
      var t = Md.exec(e);
      return t ? { file: t[3], methodName: t[1] || hr, arguments: [], lineNumber: +t[4], column: t[5] ? +t[5] : null } : null;
    }
    var qd = /^\s*at (?:((?:\[object object\])?[^\\/]+(?: \[as \S+\])?) )?\(?(.*?):(\d+)(?::(\d+))?\)?\s*$/i;
    function Vd(e) {
      var t = qd.exec(e);
      return t ? { file: t[2], methodName: t[1] || hr, arguments: [], lineNumber: +t[3], column: t[4] ? +t[4] : null } : null;
    }
    var Yi = class {
      getLocation() {
        return null;
      }
    };
    var zi = class {
      constructor() {
        this._error = new Error();
      }
      getLocation() {
        let t = this._error.stack;
        if (!t) return null;
        let n = Ia(t).find((i) => {
          if (!i.file) return false;
          let o = xi(i.file);
          return o !== "<anonymous>" && !o.includes("@prisma") && !o.includes("/packages/client/src/runtime/") && !o.endsWith("/runtime/binary.js") && !o.endsWith("/runtime/library.js") && !o.endsWith("/runtime/edge.js") && !o.endsWith("/runtime/edge-esm.js") && !o.startsWith("internal/") && !i.methodName.includes("new ") && !i.methodName.includes("getCallSite") && !i.methodName.includes("Proxy.") && i.methodName.split(".").length < 4;
        });
        return !n || !n.file ? null : { fileName: n.file, lineNumber: n.lineNumber, columnNumber: n.column };
      }
    };
    function Ze(e) {
      return e === "minimal" ? typeof $EnabledCallSite == "function" && e !== "minimal" ? new $EnabledCallSite() : new Yi() : new zi();
    }
    var Oa = { _avg: true, _count: true, _sum: true, _min: true, _max: true };
    function Lt(e = {}) {
      let t = Bd(e);
      return Object.entries(t).reduce((n, [i, o]) => (Oa[i] !== void 0 ? n.select[i] = { select: o } : n[i] = o, n), { select: {} });
    }
    function Bd(e = {}) {
      return typeof e._count == "boolean" ? { ...e, _count: { _all: e._count } } : e;
    }
    function In(e = {}) {
      return (t) => (typeof e._count == "boolean" && (t._count = t._count._all), t);
    }
    function ka(e, t) {
      let r = In(e);
      return t({ action: "aggregate", unpacker: r, argsMapper: Lt })(e);
    }
    function Ud(e = {}) {
      let { select: t, ...r } = e;
      return typeof t == "object" ? Lt({ ...r, _count: t }) : Lt({ ...r, _count: { _all: true } });
    }
    function Qd(e = {}) {
      return typeof e.select == "object" ? (t) => In(e)(t)._count : (t) => In(e)(t)._count._all;
    }
    function _a(e, t) {
      return t({ action: "count", unpacker: Qd(e), argsMapper: Ud })(e);
    }
    function Gd(e = {}) {
      let t = Lt(e);
      if (Array.isArray(t.by)) for (let r of t.by) typeof r == "string" && (t.select[r] = true);
      else typeof t.by == "string" && (t.select[t.by] = true);
      return t;
    }
    function Jd(e = {}) {
      return (t) => (typeof (e == null ? void 0 : e._count) == "boolean" && t.forEach((r) => {
        r._count = r._count._all;
      }), t);
    }
    function Da(e, t) {
      return t({ action: "groupBy", unpacker: Jd(e), argsMapper: Gd })(e);
    }
    function Na(e, t, r) {
      if (t === "aggregate") return (n) => ka(n, r);
      if (t === "count") return (n) => _a(n, r);
      if (t === "groupBy") return (n) => Da(n, r);
    }
    function La(e, t) {
      let r = t.fields.filter((i) => !i.relationName), n = Ai(r, (i) => i.name);
      return new Proxy({}, { get(i, o) {
        if (o in i || typeof o == "symbol") return i[o];
        let s = n[o];
        if (s) return new sr(e, o, s.type, s.isList, s.kind === "enum");
      }, ...An(Object.keys(n)) });
    }
    var Fa = (e) => Array.isArray(e) ? e : e.split(".");
    var Zi = (e, t) => Fa(t).reduce((r, n) => r && r[n], e);
    var Ma = (e, t, r) => Fa(t).reduceRight((n, i, o, s) => Object.assign({}, Zi(e, s.slice(0, o)), { [i]: n }), r);
    function Wd(e, t) {
      return e === void 0 || t === void 0 ? [] : [...t, "select", e];
    }
    function Hd(e, t, r) {
      return t === void 0 ? e ?? {} : Ma(t, r, e || true);
    }
    function Xi(e, t, r, n, i, o) {
      let a = e._runtimeDataModel.models[t].fields.reduce((l, u) => ({ ...l, [u.name]: u }), {});
      return (l) => {
        let u = Ze(e._errorFormat), c = Wd(n, i), p = Hd(l, o, c), d = r({ dataPath: c, callsite: u })(p), f = Kd(e, t);
        return new Proxy(d, { get(g, h) {
          if (!f.includes(h)) return g[h];
          let v = [a[h].type, r, h], C = [c, p];
          return Xi(e, ...v, ...C);
        }, ...An([...f, ...Object.getOwnPropertyNames(d)]) });
      };
    }
    function Kd(e, t) {
      return e._runtimeDataModel.models[t].fields.filter((r) => r.kind === "object").map((r) => r.name);
    }
    var Yd = ["findUnique", "findUniqueOrThrow", "findFirst", "findFirstOrThrow", "create", "update", "upsert", "delete"];
    var zd = ["aggregate", "count", "groupBy"];
    function eo(e, t) {
      let r = e._extensions.getAllModelExtensions(t) ?? {}, n = [Zd(e, t), em(e, t), gr(r), ie("name", () => t), ie("$name", () => t), ie("$parent", () => e._appliedParent)];
      return Ae({}, n);
    }
    function Zd(e, t) {
      let r = Re(t), n = Object.keys(zt.ModelAction).concat("count");
      return { getKeys() {
        return n;
      }, getPropertyValue(i) {
        let o = i, s = (a) => (l) => {
          let u = Ze(e._errorFormat);
          return e._createPrismaPromise((c) => {
            let p = { args: l, dataPath: [], action: o, model: t, clientMethod: `${r}.${i}`, jsModelName: r, transaction: c, callsite: u };
            return e._request({ ...p, ...a });
          }, { action: o, args: l, model: t });
        };
        return Yd.includes(o) ? Xi(e, t, s) : Xd(i) ? Na(e, i, s) : s({});
      } };
    }
    function Xd(e) {
      return zd.includes(e);
    }
    function em(e, t) {
      return ot(ie("fields", () => {
        let r = e._runtimeDataModel.models[t];
        return La(t, r);
      }));
    }
    function $a(e) {
      return e.replace(/^./, (t) => t.toUpperCase());
    }
    var to = Symbol();
    function yr(e) {
      let t = [tm(e), ie(to, () => e), ie("$parent", () => e._appliedParent)], r = e._extensions.getAllClientExtensions();
      return r && t.push(gr(r)), Ae(e, t);
    }
    function tm(e) {
      let t = Object.keys(e._runtimeDataModel.models), r = t.map(Re), n = [...new Set(t.concat(r))];
      return ot({ getKeys() {
        return n;
      }, getPropertyValue(i) {
        let o = $a(i);
        if (e._runtimeDataModel.models[o] !== void 0) return eo(e, o);
        if (e._runtimeDataModel.models[i] !== void 0) return eo(e, i);
      }, getPropertyDescriptor(i) {
        if (!r.includes(i)) return { enumerable: false };
      } });
    }
    function qa(e) {
      return e[to] ? e[to] : e;
    }
    function Va(e) {
      var _a2;
      if (typeof e == "function") return e(this);
      if ((_a2 = e.client) == null ? void 0 : _a2.__AccelerateEngine) {
        let r = e.client.__AccelerateEngine;
        this._originalClient._engine = new r(this._originalClient._accelerateEngineConfig);
      }
      let t = Object.create(this._originalClient, { _extensions: { value: this._extensions.append(e) }, _appliedParent: { value: this, configurable: true }, $use: { value: void 0 }, $on: { value: void 0 } });
      return yr(t);
    }
    function ja({ result: e, modelName: t, select: r, omit: n, extensions: i }) {
      let o = i.getAllComputedFields(t);
      if (!o) return e;
      let s = [], a = [];
      for (let l of Object.values(o)) {
        if (n) {
          if (n[l.name]) continue;
          let u = l.needs.filter((c) => n[c]);
          u.length > 0 && a.push(_t(u));
        } else if (r) {
          if (!r[l.name]) continue;
          let u = l.needs.filter((c) => !r[c]);
          u.length > 0 && a.push(_t(u));
        }
        rm(e, l.needs) && s.push(nm(l, Ae(e, s)));
      }
      return s.length > 0 || a.length > 0 ? Ae(e, [...s, ...a]) : e;
    }
    function rm(e, t) {
      return t.every((r) => Si(e, r));
    }
    function nm(e, t) {
      return ot(ie(e.name, () => e.compute(t)));
    }
    function On({ visitor: e, result: t, args: r, runtimeDataModel: n, modelName: i }) {
      if (Array.isArray(t)) {
        for (let s = 0; s < t.length; s++) t[s] = On({ result: t[s], args: r, modelName: i, runtimeDataModel: n, visitor: e });
        return t;
      }
      let o = e(t, i, r) ?? t;
      return r.include && Ba({ includeOrSelect: r.include, result: o, parentModelName: i, runtimeDataModel: n, visitor: e }), r.select && Ba({ includeOrSelect: r.select, result: o, parentModelName: i, runtimeDataModel: n, visitor: e }), o;
    }
    function Ba({ includeOrSelect: e, result: t, parentModelName: r, runtimeDataModel: n, visitor: i }) {
      for (let [o, s] of Object.entries(e)) {
        if (!s || t[o] == null || Ce(s)) continue;
        let l = n.models[r].fields.find((c) => c.name === o);
        if (!l || l.kind !== "object" || !l.relationName) continue;
        let u = typeof s == "object" ? s : {};
        t[o] = On({ visitor: i, result: t[o], args: u, modelName: l.type, runtimeDataModel: n });
      }
    }
    function Ua({ result: e, modelName: t, args: r, extensions: n, runtimeDataModel: i, globalOmit: o }) {
      return n.isEmpty() || e == null || typeof e != "object" || !i.models[t] ? e : On({ result: e, args: r ?? {}, modelName: t, runtimeDataModel: i, visitor: (a, l, u) => {
        let c = Re(l);
        return ja({ result: a, modelName: c, select: u.select, omit: u.select ? void 0 : { ...o == null ? void 0 : o[c], ...u.omit }, extensions: n });
      } });
    }
    function Qa(e) {
      if (e instanceof ae) return im(e);
      if (Array.isArray(e)) {
        let r = [e[0]];
        for (let n = 1; n < e.length; n++) r[n] = Er(e[n]);
        return r;
      }
      let t = {};
      for (let r in e) t[r] = Er(e[r]);
      return t;
    }
    function im(e) {
      return new ae(e.strings, e.values);
    }
    function Er(e) {
      if (typeof e != "object" || e == null || e instanceof $e || At(e)) return e;
      if (vt(e)) return new Pe(e.toFixed());
      if (Pt(e)) return /* @__PURE__ */ new Date(+e);
      if (ArrayBuffer.isView(e)) return e.slice(0);
      if (Array.isArray(e)) {
        let t = e.length, r;
        for (r = Array(t); t--; ) r[t] = Er(e[t]);
        return r;
      }
      if (typeof e == "object") {
        let t = {};
        for (let r in e) r === "__proto__" ? Object.defineProperty(t, r, { value: Er(e[r]), configurable: true, enumerable: true, writable: true }) : t[r] = Er(e[r]);
        return t;
      }
      Fe(e, "Unknown value");
    }
    function Ja(e, t, r, n = 0) {
      return e._createPrismaPromise((i) => {
        var _a2;
        let o = t.customDataProxyFetch;
        return "transaction" in t && i !== void 0 && (((_a2 = t.transaction) == null ? void 0 : _a2.kind) === "batch" && t.transaction.lock.then(), t.transaction = i), n === r.length ? e._executeRequest(t) : r[n]({ model: t.model, operation: t.model ? t.action : t.clientMethod, args: Qa(t.args ?? {}), __internalParams: t, query: (s, a = t) => {
          let l = a.customDataProxyFetch;
          return a.customDataProxyFetch = Ya(o, l), a.args = s, Ja(e, a, r, n + 1);
        } });
      });
    }
    function Wa(e, t) {
      let { jsModelName: r, action: n, clientMethod: i } = t, o = r ? n : i;
      if (e._extensions.isEmpty()) return e._executeRequest(t);
      let s = e._extensions.getAllQueryCallbacks(r ?? "$none", o);
      return Ja(e, t, s);
    }
    function Ha(e) {
      return (t) => {
        let r = { requests: t }, n = t[0].extensions.getAllBatchQueryCallbacks();
        return n.length ? Ka(r, n, 0, e) : e(r);
      };
    }
    function Ka(e, t, r, n) {
      if (r === t.length) return n(e);
      let i = e.customDataProxyFetch, o = e.requests[0].transaction;
      return t[r]({ args: { queries: e.requests.map((s) => ({ model: s.modelName, operation: s.action, args: s.args })), transaction: o ? { isolationLevel: o.kind === "batch" ? o.isolationLevel : void 0 } : void 0 }, __internalParams: e, query(s, a = e) {
        let l = a.customDataProxyFetch;
        return a.customDataProxyFetch = Ya(i, l), Ka(a, t, r + 1, n);
      } });
    }
    var Ga = (e) => e;
    function Ya(e = Ga, t = Ga) {
      return (r) => e(t(r));
    }
    var za = F("prisma:client");
    var Za = { Vercel: "vercel", "Netlify CI": "netlify" };
    function Xa({ postinstall: e, ciName: t, clientVersion: r }) {
      if (za("checkPlatformCaching:postinstall", e), za("checkPlatformCaching:ciName", t), e === true && t && t in Za) {
        let n = `Prisma has detected that this project was built on ${t}, which caches dependencies. This leads to an outdated Prisma Client because Prisma's auto-generation isn't triggered. To fix this, make sure to run the \`prisma generate\` command during the build process.

Learn how: https://pris.ly/d/${Za[t]}-build`;
        throw console.error(n), new T(n, r);
      }
    }
    function el(e, t) {
      return e ? e.datasources ? e.datasources : e.datasourceUrl ? { [t[0]]: { url: e.datasourceUrl } } : {} : {};
    }
    var om = "Cloudflare-Workers";
    var sm = "node";
    function tl() {
      var _a2, _b, _c2;
      return typeof Netlify == "object" ? "netlify" : typeof EdgeRuntime == "string" ? "edge-light" : ((_a2 = globalThis.navigator) == null ? void 0 : _a2.userAgent) === om ? "workerd" : globalThis.Deno ? "deno" : globalThis.__lagon__ ? "lagon" : ((_c2 = (_b = globalThis.process) == null ? void 0 : _b.release) == null ? void 0 : _c2.name) === sm ? "node" : globalThis.Bun ? "bun" : globalThis.fastly ? "fastly" : "unknown";
    }
    var am = { node: "Node.js", workerd: "Cloudflare Workers", deno: "Deno and Deno Deploy", netlify: "Netlify Edge Functions", "edge-light": "Edge Runtime (Vercel Edge Functions, Vercel Edge Middleware, Next.js (Pages Router) Edge API Routes, Next.js (App Router) Edge Route Handlers or Next.js Middleware)" };
    function kn() {
      let e = tl();
      return { id: e, prettyName: am[e] || e, isEdge: ["workerd", "deno", "netlify", "edge-light"].includes(e) };
    }
    var sl = _(require("fs"));
    var br = _(require("path"));
    function _n(e) {
      let { runtimeBinaryTarget: t } = e;
      return `Add "${t}" to \`binaryTargets\` in the "schema.prisma" file and run \`prisma generate\` after saving it:

${lm(e)}`;
    }
    function lm(e) {
      let { generator: t, generatorBinaryTargets: r, runtimeBinaryTarget: n } = e, i = { fromEnvVar: null, value: n }, o = [...r, i];
      return Ti({ ...t, binaryTargets: o });
    }
    function Xe(e) {
      let { runtimeBinaryTarget: t } = e;
      return `Prisma Client could not locate the Query Engine for runtime "${t}".`;
    }
    function et(e) {
      let { searchedLocations: t } = e;
      return `The following locations have been searched:
${[...new Set(t)].map((i) => `  ${i}`).join(`
`)}`;
    }
    function rl(e) {
      let { runtimeBinaryTarget: t } = e;
      return `${Xe(e)}

This happened because \`binaryTargets\` have been pinned, but the actual deployment also required "${t}".
${_n(e)}

${et(e)}`;
    }
    function Dn(e) {
      return `We would appreciate if you could take the time to share some information with us.
Please help us by answering a few questions: https://pris.ly/${e}`;
    }
    function Nn(e) {
      let { errorStack: t } = e;
      return (t == null ? void 0 : t.match(/\/\.next|\/next@|\/next\//)) ? `

We detected that you are using Next.js, learn how to fix this: https://pris.ly/d/engine-not-found-nextjs.` : "";
    }
    function nl(e) {
      let { queryEngineName: t } = e;
      return `${Xe(e)}${Nn(e)}

This is likely caused by a bundler that has not copied "${t}" next to the resulting bundle.
Ensure that "${t}" has been copied next to the bundle or in "${e.expectedLocation}".

${Dn("engine-not-found-bundler-investigation")}

${et(e)}`;
    }
    function il(e) {
      let { runtimeBinaryTarget: t, generatorBinaryTargets: r } = e, n = r.find((i) => i.native);
      return `${Xe(e)}

This happened because Prisma Client was generated for "${(n == null ? void 0 : n.value) ?? "unknown"}", but the actual deployment required "${t}".
${_n(e)}

${et(e)}`;
    }
    function ol(e) {
      let { queryEngineName: t } = e;
      return `${Xe(e)}${Nn(e)}

This is likely caused by tooling that has not copied "${t}" to the deployment folder.
Ensure that you ran \`prisma generate\` and that "${t}" has been copied to "${e.expectedLocation}".

${Dn("engine-not-found-tooling-investigation")}

${et(e)}`;
    }
    var um = F("prisma:client:engines:resolveEnginePath");
    var cm = () => new RegExp("runtime[\\\\/]library\\.m?js$");
    async function al(e, t) {
      var _a2;
      let r = { binary: process.env.PRISMA_QUERY_ENGINE_BINARY, library: process.env.PRISMA_QUERY_ENGINE_LIBRARY }[e] ?? t.prismaPath;
      if (r !== void 0) return r;
      let { enginePath: n, searchedLocations: i } = await pm(e, t);
      if (um("enginePath", n), n !== void 0 && e === "binary" && mi(n), n !== void 0) return t.prismaPath = n;
      let o = await nt(), s = ((_a2 = t.generator) == null ? void 0 : _a2.binaryTargets) ?? [], a = s.some((d) => d.native), l = !s.some((d) => d.value === o), u = __filename.match(cm()) === null, c = { searchedLocations: i, generatorBinaryTargets: s, generator: t.generator, runtimeBinaryTarget: o, queryEngineName: ll(e, o), expectedLocation: br.default.relative(process.cwd(), t.dirname), errorStack: new Error().stack }, p;
      throw a && l ? p = il(c) : l ? p = rl(c) : u ? p = nl(c) : p = ol(c), new T(p, t.clientVersion);
    }
    async function pm(engineType, config) {
      var _a2, _b;
      let binaryTarget = await nt(), searchedLocations = [], dirname = eval("__dirname"), searchLocations = [config.dirname, br.default.resolve(dirname, ".."), ((_b = (_a2 = config.generator) == null ? void 0 : _a2.output) == null ? void 0 : _b.value) ?? dirname, br.default.resolve(dirname, "../../../.prisma/client"), "/tmp/prisma-engines", config.cwd];
      __filename.includes("resolveEnginePath") && searchLocations.push(is());
      for (let e of searchLocations) {
        let t = ll(engineType, binaryTarget), r = br.default.join(e, t);
        if (searchedLocations.push(e), sl.default.existsSync(r)) return { enginePath: r, searchedLocations };
      }
      return { enginePath: void 0, searchedLocations };
    }
    function ll(e, t) {
      return e === "library" ? qr(t, "fs") : `query-engine-${t}${t === "windows" ? ".exe" : ""}`;
    }
    var ro = _(Ci());
    function ul(e) {
      return e ? e.replace(/".*"/g, '"X"').replace(/[\s:\[]([+-]?([0-9]*[.])?[0-9]+)/g, (t) => `${t[0]}5`) : "";
    }
    function cl(e) {
      return e.split(`
`).map((t) => t.replace(/^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)\s*/, "").replace(/\+\d+\s*ms$/, "")).join(`
`);
    }
    var pl = _(Cs());
    function dl({ title: e, user: t = "prisma", repo: r = "prisma", template: n = "bug_report.yml", body: i }) {
      return (0, pl.default)({ user: t, repo: r, template: n, title: e, body: i });
    }
    function ml({ version: e, binaryTarget: t, title: r, description: n, engineVersion: i, database: o, query: s }) {
      var _a2;
      let a = No(6e3 - ((s == null ? void 0 : s.length) ?? 0)), l = cl((0, ro.default)(a)), u = n ? `# Description
\`\`\`
${n}
\`\`\`` : "", c = (0, ro.default)(`Hi Prisma Team! My Prisma Client just crashed. This is the report:
## Versions

| Name            | Version            |
|-----------------|--------------------|
| Node            | ${(_a2 = process.version) == null ? void 0 : _a2.padEnd(19)}| 
| OS              | ${t == null ? void 0 : t.padEnd(19)}|
| Prisma Client   | ${e == null ? void 0 : e.padEnd(19)}|
| Query Engine    | ${i == null ? void 0 : i.padEnd(19)}|
| Database        | ${o == null ? void 0 : o.padEnd(19)}|

${u}

## Logs
\`\`\`
${l}
\`\`\`

## Client Snippet
\`\`\`ts
// PLEASE FILL YOUR CODE SNIPPET HERE
\`\`\`

## Schema
\`\`\`prisma
// PLEASE ADD YOUR SCHEMA HERE IF POSSIBLE
\`\`\`

## Prisma Engine Query
\`\`\`
${s ? ul(s) : ""}
\`\`\`
`), p = dl({ title: r, body: c });
      return `${r}

This is a non-recoverable error which probably happens when the Prisma Query Engine has a panic.

${X(p)}

If you want the Prisma team to look into it, please open the link above \u{1F64F}
To increase the chance of success, please post your schema and a snippet of
how you used Prisma Client in the issue. 
`;
    }
    function Ft({ inlineDatasources: e, overrideDatasources: t, env: r, clientVersion: n }) {
      var _a2, _b;
      let i, o = Object.keys(e)[0], s = (_a2 = e[o]) == null ? void 0 : _a2.url, a = (_b = t[o]) == null ? void 0 : _b.url;
      if (o === void 0 ? i = void 0 : a ? i = a : (s == null ? void 0 : s.value) ? i = s.value : (s == null ? void 0 : s.fromEnvVar) && (i = r[s.fromEnvVar]), (s == null ? void 0 : s.fromEnvVar) !== void 0 && i === void 0) throw new T(`error: Environment variable not found: ${s.fromEnvVar}.`, n);
      if (i === void 0) throw new T("error: Missing URL environment variable, value, or override.", n);
      return i;
    }
    var Ln = class extends Error {
      constructor(t, r) {
        super(t), this.clientVersion = r.clientVersion, this.cause = r.cause;
      }
      get [Symbol.toStringTag]() {
        return this.name;
      }
    };
    var le = class extends Ln {
      constructor(t, r) {
        super(t, r), this.isRetryable = r.isRetryable ?? true;
      }
    };
    function S(e, t) {
      return { ...e, isRetryable: t };
    }
    var Mt = class extends le {
      constructor(r) {
        super("This request must be retried", S(r, true));
        this.name = "ForcedRetryError";
        this.code = "P5001";
      }
    };
    w(Mt, "ForcedRetryError");
    var st = class extends le {
      constructor(r, n) {
        super(r, S(n, false));
        this.name = "InvalidDatasourceError";
        this.code = "P6001";
      }
    };
    w(st, "InvalidDatasourceError");
    var at = class extends le {
      constructor(r, n) {
        super(r, S(n, false));
        this.name = "NotImplementedYetError";
        this.code = "P5004";
      }
    };
    w(at, "NotImplementedYetError");
    var V = class extends le {
      constructor(t, r) {
        super(t, r), this.response = r.response;
        let n = this.response.headers.get("prisma-request-id");
        if (n) {
          let i = `(The request id was: ${n})`;
          this.message = this.message + " " + i;
        }
      }
    };
    var lt = class extends V {
      constructor(r) {
        super("Schema needs to be uploaded", S(r, true));
        this.name = "SchemaMissingError";
        this.code = "P5005";
      }
    };
    w(lt, "SchemaMissingError");
    var no = "This request could not be understood by the server";
    var wr = class extends V {
      constructor(r, n, i) {
        super(n || no, S(r, false));
        this.name = "BadRequestError";
        this.code = "P5000";
        i && (this.code = i);
      }
    };
    w(wr, "BadRequestError");
    var xr = class extends V {
      constructor(r, n) {
        super("Engine not started: healthcheck timeout", S(r, true));
        this.name = "HealthcheckTimeoutError";
        this.code = "P5013";
        this.logs = n;
      }
    };
    w(xr, "HealthcheckTimeoutError");
    var Pr = class extends V {
      constructor(r, n, i) {
        super(n, S(r, true));
        this.name = "EngineStartupError";
        this.code = "P5014";
        this.logs = i;
      }
    };
    w(Pr, "EngineStartupError");
    var vr = class extends V {
      constructor(r) {
        super("Engine version is not supported", S(r, false));
        this.name = "EngineVersionNotSupportedError";
        this.code = "P5012";
      }
    };
    w(vr, "EngineVersionNotSupportedError");
    var io = "Request timed out";
    var Tr = class extends V {
      constructor(r, n = io) {
        super(n, S(r, false));
        this.name = "GatewayTimeoutError";
        this.code = "P5009";
      }
    };
    w(Tr, "GatewayTimeoutError");
    var dm = "Interactive transaction error";
    var Rr = class extends V {
      constructor(r, n = dm) {
        super(n, S(r, false));
        this.name = "InteractiveTransactionError";
        this.code = "P5015";
      }
    };
    w(Rr, "InteractiveTransactionError");
    var mm = "Request parameters are invalid";
    var Cr = class extends V {
      constructor(r, n = mm) {
        super(n, S(r, false));
        this.name = "InvalidRequestError";
        this.code = "P5011";
      }
    };
    w(Cr, "InvalidRequestError");
    var oo = "Requested resource does not exist";
    var Sr = class extends V {
      constructor(r, n = oo) {
        super(n, S(r, false));
        this.name = "NotFoundError";
        this.code = "P5003";
      }
    };
    w(Sr, "NotFoundError");
    var so = "Unknown server error";
    var $t = class extends V {
      constructor(r, n, i) {
        super(n || so, S(r, true));
        this.name = "ServerError";
        this.code = "P5006";
        this.logs = i;
      }
    };
    w($t, "ServerError");
    var ao = "Unauthorized, check your connection string";
    var Ar = class extends V {
      constructor(r, n = ao) {
        super(n, S(r, false));
        this.name = "UnauthorizedError";
        this.code = "P5007";
      }
    };
    w(Ar, "UnauthorizedError");
    var lo = "Usage exceeded, retry again later";
    var Ir = class extends V {
      constructor(r, n = lo) {
        super(n, S(r, true));
        this.name = "UsageExceededError";
        this.code = "P5008";
      }
    };
    w(Ir, "UsageExceededError");
    async function fm(e) {
      let t;
      try {
        t = await e.text();
      } catch {
        return { type: "EmptyError" };
      }
      try {
        let r = JSON.parse(t);
        if (typeof r == "string") switch (r) {
          case "InternalDataProxyError":
            return { type: "DataProxyError", body: r };
          default:
            return { type: "UnknownTextError", body: r };
        }
        if (typeof r == "object" && r !== null) {
          if ("is_panic" in r && "message" in r && "error_code" in r) return { type: "QueryEngineError", body: r };
          if ("EngineNotStarted" in r || "InteractiveTransactionMisrouted" in r || "InvalidRequestError" in r) {
            let n = Object.values(r)[0].reason;
            return typeof n == "string" && !["SchemaMissing", "EngineVersionNotSupported"].includes(n) ? { type: "UnknownJsonError", body: r } : { type: "DataProxyError", body: r };
          }
        }
        return { type: "UnknownJsonError", body: r };
      } catch {
        return t === "" ? { type: "EmptyError" } : { type: "UnknownTextError", body: t };
      }
    }
    async function Or(e, t) {
      if (e.ok) return;
      let r = { clientVersion: t, response: e }, n = await fm(e);
      if (n.type === "QueryEngineError") throw new ee(n.body.message, { code: n.body.error_code, clientVersion: t });
      if (n.type === "DataProxyError") {
        if (n.body === "InternalDataProxyError") throw new $t(r, "Internal Data Proxy error");
        if ("EngineNotStarted" in n.body) {
          if (n.body.EngineNotStarted.reason === "SchemaMissing") return new lt(r);
          if (n.body.EngineNotStarted.reason === "EngineVersionNotSupported") throw new vr(r);
          if ("EngineStartupError" in n.body.EngineNotStarted.reason) {
            let { msg: i, logs: o } = n.body.EngineNotStarted.reason.EngineStartupError;
            throw new Pr(r, i, o);
          }
          if ("KnownEngineStartupError" in n.body.EngineNotStarted.reason) {
            let { msg: i, error_code: o } = n.body.EngineNotStarted.reason.KnownEngineStartupError;
            throw new T(i, t, o);
          }
          if ("HealthcheckTimeout" in n.body.EngineNotStarted.reason) {
            let { logs: i } = n.body.EngineNotStarted.reason.HealthcheckTimeout;
            throw new xr(r, i);
          }
        }
        if ("InteractiveTransactionMisrouted" in n.body) {
          let i = { IDParseError: "Could not parse interactive transaction ID", NoQueryEngineFoundError: "Could not find Query Engine for the specified host and transaction ID", TransactionStartError: "Could not start interactive transaction" };
          throw new Rr(r, i[n.body.InteractiveTransactionMisrouted.reason]);
        }
        if ("InvalidRequestError" in n.body) throw new Cr(r, n.body.InvalidRequestError.reason);
      }
      if (e.status === 401 || e.status === 403) throw new Ar(r, qt(ao, n));
      if (e.status === 404) return new Sr(r, qt(oo, n));
      if (e.status === 429) throw new Ir(r, qt(lo, n));
      if (e.status === 504) throw new Tr(r, qt(io, n));
      if (e.status >= 500) throw new $t(r, qt(so, n));
      if (e.status >= 400) throw new wr(r, qt(no, n));
    }
    function qt(e, t) {
      return t.type === "EmptyError" ? e : `${e}: ${JSON.stringify(t)}`;
    }
    function fl(e) {
      let t = Math.pow(2, e) * 50, r = Math.ceil(Math.random() * t) - Math.ceil(t / 2), n = t + r;
      return new Promise((i) => setTimeout(() => i(n), n));
    }
    var qe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    function gl(e) {
      let t = new TextEncoder().encode(e), r = "", n = t.byteLength, i = n % 3, o = n - i, s, a, l, u, c;
      for (let p = 0; p < o; p = p + 3) c = t[p] << 16 | t[p + 1] << 8 | t[p + 2], s = (c & 16515072) >> 18, a = (c & 258048) >> 12, l = (c & 4032) >> 6, u = c & 63, r += qe[s] + qe[a] + qe[l] + qe[u];
      return i == 1 ? (c = t[o], s = (c & 252) >> 2, a = (c & 3) << 4, r += qe[s] + qe[a] + "==") : i == 2 && (c = t[o] << 8 | t[o + 1], s = (c & 64512) >> 10, a = (c & 1008) >> 4, l = (c & 15) << 2, r += qe[s] + qe[a] + qe[l] + "="), r;
    }
    function hl(e) {
      var _a2;
      if (!!((_a2 = e.generator) == null ? void 0 : _a2.previewFeatures.some((r) => r.toLowerCase().includes("metrics")))) throw new T("The `metrics` preview feature is not yet available with Accelerate.\nPlease remove `metrics` from the `previewFeatures` in your schema.\n\nMore information about Accelerate: https://pris.ly/d/accelerate", e.clientVersion);
    }
    function gm(e) {
      return e[0] * 1e3 + e[1] / 1e6;
    }
    function uo(e) {
      return new Date(gm(e));
    }
    var yl = { "@prisma/debug": "workspace:*", "@prisma/engines-version": "6.3.0-17.acc0b9dd43eb689cbd20c9470515d719db10d0b0", "@prisma/fetch-engine": "workspace:*", "@prisma/get-platform": "workspace:*" };
    var kr = class extends le {
      constructor(r, n) {
        super(`Cannot fetch data from service:
${r}`, S(n, true));
        this.name = "RequestError";
        this.code = "P5010";
      }
    };
    w(kr, "RequestError");
    async function ut(e, t, r = (n) => n) {
      let { clientVersion: n, ...i } = t, o = r(fetch);
      try {
        return await o(e, i);
      } catch (s) {
        let a = s.message ?? "Unknown error";
        throw new kr(a, { clientVersion: n, cause: s });
      }
    }
    var ym = /^[1-9][0-9]*\.[0-9]+\.[0-9]+$/;
    var El = F("prisma:client:dataproxyEngine");
    async function Em(e, t) {
      let r = yl["@prisma/engines-version"], n = t.clientVersion ?? "unknown";
      if (process.env.PRISMA_CLIENT_DATA_PROXY_CLIENT_VERSION) return process.env.PRISMA_CLIENT_DATA_PROXY_CLIENT_VERSION;
      if (e.includes("accelerate") && n !== "0.0.0" && n !== "in-memory") return n;
      let [i, o] = (n == null ? void 0 : n.split("-")) ?? [];
      if (o === void 0 && ym.test(i)) return i;
      if (o !== void 0 || n === "0.0.0" || n === "in-memory") {
        if (e.startsWith("localhost") || e.startsWith("127.0.0.1")) return "0.0.0";
        let [s] = r.split("-") ?? [], [a, l, u] = s.split("."), c = bm(`<=${a}.${l}.${u}`), p = await ut(c, { clientVersion: n });
        if (!p.ok) throw new Error(`Failed to fetch stable Prisma version, unpkg.com status ${p.status} ${p.statusText}, response body: ${await p.text() || "<empty body>"}`);
        let d = await p.text();
        El("length of body fetched from unpkg.com", d.length);
        let f;
        try {
          f = JSON.parse(d);
        } catch (g) {
          throw console.error("JSON.parse error: body fetched from unpkg.com: ", d), g;
        }
        return f.version;
      }
      throw new at("Only `major.minor.patch` versions are supported by Accelerate.", { clientVersion: n });
    }
    async function bl(e, t) {
      let r = await Em(e, t);
      return El("version", r), r;
    }
    function bm(e) {
      return encodeURI(`https://unpkg.com/prisma@${e}/package.json`);
    }
    var wl = 3;
    var Fn = F("prisma:client:dataproxyEngine");
    var co = class {
      constructor({ apiKey: t, tracingHelper: r, logLevel: n, logQueries: i, engineHash: o }) {
        this.apiKey = t, this.tracingHelper = r, this.logLevel = n, this.logQueries = i, this.engineHash = o;
      }
      build({ traceparent: t, interactiveTransaction: r } = {}) {
        let n = { Authorization: `Bearer ${this.apiKey}`, "Prisma-Engine-Hash": this.engineHash };
        this.tracingHelper.isEnabled() && (n.traceparent = t ?? this.tracingHelper.getTraceParent()), r && (n["X-transaction-id"] = r.id);
        let i = this.buildCaptureSettings();
        return i.length > 0 && (n["X-capture-telemetry"] = i.join(", ")), n;
      }
      buildCaptureSettings() {
        let t = [];
        return this.tracingHelper.isEnabled() && t.push("tracing"), this.logLevel && t.push(this.logLevel), this.logQueries && t.push("query"), t;
      }
    };
    var _r = class {
      constructor(t) {
        this.name = "DataProxyEngine";
        hl(t), this.config = t, this.env = { ...t.env, ...typeof process < "u" ? process.env : {} }, this.inlineSchema = gl(t.inlineSchema), this.inlineDatasources = t.inlineDatasources, this.inlineSchemaHash = t.inlineSchemaHash, this.clientVersion = t.clientVersion, this.engineHash = t.engineVersion, this.logEmitter = t.logEmitter, this.tracingHelper = t.tracingHelper;
      }
      apiKey() {
        return this.headerBuilder.apiKey;
      }
      version() {
        return this.engineHash;
      }
      async start() {
        this.startPromise !== void 0 && await this.startPromise, this.startPromise = (async () => {
          let [t, r] = this.extractHostAndApiKey();
          this.host = t, this.headerBuilder = new co({ apiKey: r, tracingHelper: this.tracingHelper, logLevel: this.config.logLevel, logQueries: this.config.logQueries, engineHash: this.engineHash }), this.remoteClientVersion = await bl(t, this.config), Fn("host", this.host);
        })(), await this.startPromise;
      }
      async stop() {
      }
      propagateResponseExtensions(t) {
        var _a2, _b;
        ((_a2 = t == null ? void 0 : t.logs) == null ? void 0 : _a2.length) && t.logs.forEach((r) => {
          switch (r.level) {
            case "debug":
            case "trace":
              Fn(r);
              break;
            case "error":
            case "warn":
            case "info": {
              this.logEmitter.emit(r.level, { timestamp: uo(r.timestamp), message: r.attributes.message ?? "", target: r.target });
              break;
            }
            case "query": {
              this.logEmitter.emit("query", { query: r.attributes.query ?? "", timestamp: uo(r.timestamp), duration: r.attributes.duration_ms ?? 0, params: r.attributes.params ?? "", target: r.target });
              break;
            }
            default:
              r.level;
          }
        }), ((_b = t == null ? void 0 : t.traces) == null ? void 0 : _b.length) && this.tracingHelper.dispatchEngineSpans(t.traces);
      }
      onBeforeExit() {
        throw new Error('"beforeExit" hook is not applicable to the remote query engine');
      }
      async url(t) {
        return await this.start(), `https://${this.host}/${this.remoteClientVersion}/${this.inlineSchemaHash}/${t}`;
      }
      async uploadSchema() {
        let t = { name: "schemaUpload", internal: true };
        return this.tracingHelper.runInChildSpan(t, async () => {
          let r = await ut(await this.url("schema"), { method: "PUT", headers: this.headerBuilder.build(), body: this.inlineSchema, clientVersion: this.clientVersion });
          r.ok || Fn("schema response status", r.status);
          let n = await Or(r, this.clientVersion);
          if (n) throw this.logEmitter.emit("warn", { message: `Error while uploading schema: ${n.message}`, timestamp: /* @__PURE__ */ new Date(), target: "" }), n;
          this.logEmitter.emit("info", { message: `Schema (re)uploaded (hash: ${this.inlineSchemaHash})`, timestamp: /* @__PURE__ */ new Date(), target: "" });
        });
      }
      request(t, { traceparent: r, interactiveTransaction: n, customDataProxyFetch: i }) {
        return this.requestInternal({ body: t, traceparent: r, interactiveTransaction: n, customDataProxyFetch: i });
      }
      async requestBatch(t, { traceparent: r, transaction: n, customDataProxyFetch: i }) {
        let o = (n == null ? void 0 : n.kind) === "itx" ? n.options : void 0, s = Dt(t, n);
        return (await this.requestInternal({ body: s, customDataProxyFetch: i, interactiveTransaction: o, traceparent: r })).map((l) => (l.extensions && this.propagateResponseExtensions(l.extensions), "errors" in l ? this.convertProtocolErrorsToClientError(l.errors) : l));
      }
      requestInternal({ body: t, traceparent: r, customDataProxyFetch: n, interactiveTransaction: i }) {
        return this.withRetry({ actionGerund: "querying", callback: async ({ logHttpCall: o }) => {
          let s = i ? `${i.payload.endpoint}/graphql` : await this.url("graphql");
          o(s);
          let a = await ut(s, { method: "POST", headers: this.headerBuilder.build({ traceparent: r, interactiveTransaction: i }), body: JSON.stringify(t), clientVersion: this.clientVersion }, n);
          a.ok || Fn("graphql response status", a.status), await this.handleError(await Or(a, this.clientVersion));
          let l = await a.json();
          if (l.extensions && this.propagateResponseExtensions(l.extensions), "errors" in l) throw this.convertProtocolErrorsToClientError(l.errors);
          return "batchResult" in l ? l.batchResult : l;
        } });
      }
      async transaction(t, r, n) {
        let i = { start: "starting", commit: "committing", rollback: "rolling back" };
        return this.withRetry({ actionGerund: `${i[t]} transaction`, callback: async ({ logHttpCall: o }) => {
          if (t === "start") {
            let s = JSON.stringify({ max_wait: n.maxWait, timeout: n.timeout, isolation_level: n.isolationLevel }), a = await this.url("transaction/start");
            o(a);
            let l = await ut(a, { method: "POST", headers: this.headerBuilder.build({ traceparent: r.traceparent }), body: s, clientVersion: this.clientVersion });
            await this.handleError(await Or(l, this.clientVersion));
            let u = await l.json(), { extensions: c } = u;
            c && this.propagateResponseExtensions(c);
            let p = u.id, d = u["data-proxy"].endpoint;
            return { id: p, payload: { endpoint: d } };
          } else {
            let s = `${n.payload.endpoint}/${t}`;
            o(s);
            let a = await ut(s, { method: "POST", headers: this.headerBuilder.build({ traceparent: r.traceparent }), clientVersion: this.clientVersion });
            await this.handleError(await Or(a, this.clientVersion));
            let l = await a.json(), { extensions: u } = l;
            u && this.propagateResponseExtensions(u);
            return;
          }
        } });
      }
      extractHostAndApiKey() {
        let t = { clientVersion: this.clientVersion }, r = Object.keys(this.inlineDatasources)[0], n = Ft({ inlineDatasources: this.inlineDatasources, overrideDatasources: this.config.overrideDatasources, clientVersion: this.clientVersion, env: this.env }), i;
        try {
          i = new URL(n);
        } catch {
          throw new st(`Error validating datasource \`${r}\`: the URL must start with the protocol \`prisma://\``, t);
        }
        let { protocol: o, host: s, searchParams: a } = i;
        if (o !== "prisma:" && o !== Yr) throw new st(`Error validating datasource \`${r}\`: the URL must start with the protocol \`prisma://\``, t);
        let l = a.get("api_key");
        if (l === null || l.length < 1) throw new st(`Error validating datasource \`${r}\`: the URL must contain a valid API key`, t);
        return [s, l];
      }
      metrics() {
        throw new at("Metrics are not yet supported for Accelerate", { clientVersion: this.clientVersion });
      }
      async withRetry(t) {
        for (let r = 0; ; r++) {
          let n = (i) => {
            this.logEmitter.emit("info", { message: `Calling ${i} (n=${r})`, timestamp: /* @__PURE__ */ new Date(), target: "" });
          };
          try {
            return await t.callback({ logHttpCall: n });
          } catch (i) {
            if (!(i instanceof le) || !i.isRetryable) throw i;
            if (r >= wl) throw i instanceof Mt ? i.cause : i;
            this.logEmitter.emit("warn", { message: `Attempt ${r + 1}/${wl} failed for ${t.actionGerund}: ${i.message ?? "(unknown)"}`, timestamp: /* @__PURE__ */ new Date(), target: "" });
            let o = await fl(r);
            this.logEmitter.emit("warn", { message: `Retrying after ${o}ms`, timestamp: /* @__PURE__ */ new Date(), target: "" });
          }
        }
      }
      async handleError(t) {
        if (t instanceof lt) throw await this.uploadSchema(), new Mt({ clientVersion: this.clientVersion, cause: t });
        if (t) throw t;
      }
      convertProtocolErrorsToClientError(t) {
        return t.length === 1 ? Nt(t[0], this.config.clientVersion, this.config.activeProvider) : new B(JSON.stringify(t), { clientVersion: this.config.clientVersion });
      }
      applyPendingMigrations() {
        throw new Error("Method not implemented.");
      }
    };
    function xl(e) {
      if ((e == null ? void 0 : e.kind) === "itx") return e.options.id;
    }
    var mo = _(require("os"));
    var Pl = _(require("path"));
    var po = Symbol("PrismaLibraryEngineCache");
    function wm() {
      let e = globalThis;
      return e[po] === void 0 && (e[po] = {}), e[po];
    }
    function xm(e) {
      let t = wm();
      if (t[e] !== void 0) return t[e];
      let r = Pl.default.toNamespacedPath(e), n = { exports: {} }, i = 0;
      return process.platform !== "win32" && (i = mo.default.constants.dlopen.RTLD_LAZY | mo.default.constants.dlopen.RTLD_DEEPBIND), process.dlopen(n, r, i), t[e] = n.exports, n.exports;
    }
    var vl = { async loadLibrary(e) {
      let t = await ri(), r = await al("library", e);
      try {
        return e.tracingHelper.runInChildSpan({ name: "loadLibrary", internal: true }, () => xm(r));
      } catch (n) {
        let i = fi({ e: n, platformInfo: t, id: r });
        throw new T(i, e.clientVersion);
      }
    } };
    var fo;
    var Tl = { async loadLibrary(e) {
      let { clientVersion: t, adapter: r, engineWasm: n } = e;
      if (r === void 0) throw new T(`The \`adapter\` option for \`PrismaClient\` is required in this context (${kn().prettyName})`, t);
      if (n === void 0) throw new T("WASM engine was unexpectedly `undefined`", t);
      fo === void 0 && (fo = (async () => {
        let o = n.getRuntime(), s = await n.getQueryEngineWasmModule();
        if (s == null) throw new T("The loaded wasm module was unexpectedly `undefined` or `null` once loaded", t);
        let a = { "./query_engine_bg.js": o }, l = new WebAssembly.Instance(s, a);
        return o.__wbg_set_wasm(l.exports), o.QueryEngine;
      })());
      let i = await fo;
      return { debugPanic() {
        return Promise.reject("{}");
      }, dmmf() {
        return Promise.resolve("{}");
      }, version() {
        return { commit: "unknown", version: "unknown" };
      }, QueryEngine: i };
    } };
    var Pm = "P2036";
    var Ie = F("prisma:client:libraryEngine");
    function vm(e) {
      return e.item_type === "query" && "query" in e;
    }
    function Tm(e) {
      return "level" in e ? e.level === "error" && e.message === "PANIC" : false;
    }
    var Rl = [...Yn, "native"];
    var Rm = 0xffffffffffffffffn;
    var go = 1n;
    function Cm() {
      let e = go++;
      return go > Rm && (go = 1n), e;
    }
    var Dr = class {
      constructor(t, r) {
        var _a2;
        this.name = "LibraryEngine";
        this.libraryLoader = r ?? vl, t.engineWasm !== void 0 && (this.libraryLoader = r ?? Tl), this.config = t, this.libraryStarted = false, this.logQueries = t.logQueries ?? false, this.logLevel = t.logLevel ?? "error", this.logEmitter = t.logEmitter, this.datamodel = t.inlineSchema, this.tracingHelper = t.tracingHelper, t.enableDebugLogs && (this.logLevel = "debug");
        let n = Object.keys(t.overrideDatasources)[0], i = (_a2 = t.overrideDatasources[n]) == null ? void 0 : _a2.url;
        n !== void 0 && i !== void 0 && (this.datasourceOverrides = { [n]: i }), this.libraryInstantiationPromise = this.instantiateLibrary();
      }
      wrapEngine(t) {
        var _a2, _b, _c2;
        return { applyPendingMigrations: (_a2 = t.applyPendingMigrations) == null ? void 0 : _a2.bind(t), commitTransaction: this.withRequestId(t.commitTransaction.bind(t)), connect: this.withRequestId(t.connect.bind(t)), disconnect: this.withRequestId(t.disconnect.bind(t)), metrics: (_b = t.metrics) == null ? void 0 : _b.bind(t), query: this.withRequestId(t.query.bind(t)), rollbackTransaction: this.withRequestId(t.rollbackTransaction.bind(t)), sdlSchema: (_c2 = t.sdlSchema) == null ? void 0 : _c2.bind(t), startTransaction: this.withRequestId(t.startTransaction.bind(t)), trace: t.trace.bind(t) };
      }
      withRequestId(t) {
        return async (...r) => {
          var _a2;
          let n = Cm().toString();
          try {
            return await t(...r, n);
          } finally {
            if (this.tracingHelper.isEnabled()) {
              let i = await ((_a2 = this.engine) == null ? void 0 : _a2.trace(n));
              if (i) {
                let o = JSON.parse(i);
                this.tracingHelper.dispatchEngineSpans(o.spans);
              }
            }
          }
        };
      }
      async applyPendingMigrations() {
        throw new Error("Cannot call this method from this type of engine instance");
      }
      async transaction(t, r, n) {
        var _a2, _b, _c2;
        await this.start();
        let i = JSON.stringify(r), o;
        if (t === "start") {
          let a = JSON.stringify({ max_wait: n.maxWait, timeout: n.timeout, isolation_level: n.isolationLevel });
          o = await ((_a2 = this.engine) == null ? void 0 : _a2.startTransaction(a, i));
        } else t === "commit" ? o = await ((_b = this.engine) == null ? void 0 : _b.commitTransaction(n.id, i)) : t === "rollback" && (o = await ((_c2 = this.engine) == null ? void 0 : _c2.rollbackTransaction(n.id, i)));
        let s = this.parseEngineResponse(o);
        if (Sm(s)) {
          let a = this.getExternalAdapterError(s);
          throw a ? a.error : new ee(s.message, { code: s.error_code, clientVersion: this.config.clientVersion, meta: s.meta });
        } else if (typeof s.message == "string") throw new B(s.message, { clientVersion: this.config.clientVersion });
        return s;
      }
      async instantiateLibrary() {
        if (Ie("internalSetup"), this.libraryInstantiationPromise) return this.libraryInstantiationPromise;
        Kn(), this.binaryTarget = await this.getCurrentBinaryTarget(), await this.tracingHelper.runInChildSpan("load_engine", () => this.loadEngine()), this.version();
      }
      async getCurrentBinaryTarget() {
        {
          if (this.binaryTarget) return this.binaryTarget;
          let t = await this.tracingHelper.runInChildSpan("detect_platform", () => nt());
          if (!Rl.includes(t)) throw new T(`Unknown ${de("PRISMA_QUERY_ENGINE_LIBRARY")} ${de(H(t))}. Possible binaryTargets: ${Ve(Rl.join(", "))} or a path to the query engine library.
You may have to run ${Ve("prisma generate")} for your changes to take effect.`, this.config.clientVersion);
          return t;
        }
      }
      parseEngineResponse(t) {
        if (!t) throw new B("Response from the Engine was empty", { clientVersion: this.config.clientVersion });
        try {
          return JSON.parse(t);
        } catch {
          throw new B("Unable to JSON.parse response from engine", { clientVersion: this.config.clientVersion });
        }
      }
      async loadEngine() {
        if (!this.engine) {
          this.QueryEngineConstructor || (this.library = await this.libraryLoader.loadLibrary(this.config), this.QueryEngineConstructor = this.library.QueryEngine);
          try {
            let t = new WeakRef(this), { adapter: r } = this.config;
            r && Ie("Using driver adapter: %O", r), this.engine = this.wrapEngine(new this.QueryEngineConstructor({ datamodel: this.datamodel, env: process.env, logQueries: this.config.logQueries ?? false, ignoreEnvVarErrors: true, datasourceOverrides: this.datasourceOverrides ?? {}, logLevel: this.logLevel, configDir: this.config.cwd, engineProtocol: "json", enableTracing: this.tracingHelper.isEnabled() }, (n) => {
              var _a2;
              (_a2 = t.deref()) == null ? void 0 : _a2.logger(n);
            }, r));
          } catch (t) {
            let r = t, n = this.parseInitError(r.message);
            throw typeof n == "string" ? r : new T(n.message, this.config.clientVersion, n.error_code);
          }
        }
      }
      logger(t) {
        let r = this.parseEngineResponse(t);
        r && (r.level = (r == null ? void 0 : r.level.toLowerCase()) ?? "unknown", vm(r) ? this.logEmitter.emit("query", { timestamp: /* @__PURE__ */ new Date(), query: r.query, params: r.params, duration: Number(r.duration_ms), target: r.module_path }) : Tm(r) ? this.loggerRustPanic = new ce(ho(this, `${r.message}: ${r.reason} in ${r.file}:${r.line}:${r.column}`), this.config.clientVersion) : this.logEmitter.emit(r.level, { timestamp: /* @__PURE__ */ new Date(), message: r.message, target: r.module_path }));
      }
      parseInitError(t) {
        try {
          return JSON.parse(t);
        } catch {
        }
        return t;
      }
      parseRequestError(t) {
        try {
          return JSON.parse(t);
        } catch {
        }
        return t;
      }
      onBeforeExit() {
        throw new Error('"beforeExit" hook is not applicable to the library engine since Prisma 5.0.0, it is only relevant and implemented for the binary engine. Please add your event listener to the `process` object directly instead.');
      }
      async start() {
        if (await this.libraryInstantiationPromise, await this.libraryStoppingPromise, this.libraryStartingPromise) return Ie(`library already starting, this.libraryStarted: ${this.libraryStarted}`), this.libraryStartingPromise;
        if (this.libraryStarted) return;
        let t = async () => {
          var _a2;
          Ie("library starting");
          try {
            let r = { traceparent: this.tracingHelper.getTraceParent() };
            await ((_a2 = this.engine) == null ? void 0 : _a2.connect(JSON.stringify(r))), this.libraryStarted = true, Ie("library started");
          } catch (r) {
            let n = this.parseInitError(r.message);
            throw typeof n == "string" ? r : new T(n.message, this.config.clientVersion, n.error_code);
          } finally {
            this.libraryStartingPromise = void 0;
          }
        };
        return this.libraryStartingPromise = this.tracingHelper.runInChildSpan("connect", t), this.libraryStartingPromise;
      }
      async stop() {
        if (await this.libraryStartingPromise, await this.executingQueryPromise, this.libraryStoppingPromise) return Ie("library is already stopping"), this.libraryStoppingPromise;
        if (!this.libraryStarted) return;
        let t = async () => {
          var _a2;
          await new Promise((n) => setTimeout(n, 5)), Ie("library stopping");
          let r = { traceparent: this.tracingHelper.getTraceParent() };
          await ((_a2 = this.engine) == null ? void 0 : _a2.disconnect(JSON.stringify(r))), this.libraryStarted = false, this.libraryStoppingPromise = void 0, Ie("library stopped");
        };
        return this.libraryStoppingPromise = this.tracingHelper.runInChildSpan("disconnect", t), this.libraryStoppingPromise;
      }
      version() {
        var _a2, _b;
        return this.versionInfo = (_a2 = this.library) == null ? void 0 : _a2.version(), ((_b = this.versionInfo) == null ? void 0 : _b.version) ?? "unknown";
      }
      debugPanic(t) {
        var _a2;
        return (_a2 = this.library) == null ? void 0 : _a2.debugPanic(t);
      }
      async request(t, { traceparent: r, interactiveTransaction: n }) {
        var _a2, _b;
        Ie(`sending request, this.libraryStarted: ${this.libraryStarted}`);
        let i = JSON.stringify({ traceparent: r }), o = JSON.stringify(t);
        try {
          await this.start(), this.executingQueryPromise = (_a2 = this.engine) == null ? void 0 : _a2.query(o, i, n == null ? void 0 : n.id), this.lastQuery = o;
          let s = this.parseEngineResponse(await this.executingQueryPromise);
          if (s.errors) throw s.errors.length === 1 ? this.buildQueryError(s.errors[0]) : new B(JSON.stringify(s.errors), { clientVersion: this.config.clientVersion });
          if (this.loggerRustPanic) throw this.loggerRustPanic;
          return { data: s };
        } catch (s) {
          if (s instanceof T) throw s;
          if (s.code === "GenericFailure" && ((_b = s.message) == null ? void 0 : _b.startsWith("PANIC:"))) throw new ce(ho(this, s.message), this.config.clientVersion);
          let a = this.parseRequestError(s.message);
          throw typeof a == "string" ? s : new B(`${a.message}
${a.backtrace}`, { clientVersion: this.config.clientVersion });
        }
      }
      async requestBatch(t, { transaction: r, traceparent: n }) {
        Ie("requestBatch");
        let i = Dt(t, r);
        await this.start(), this.lastQuery = JSON.stringify(i), this.executingQueryPromise = this.engine.query(this.lastQuery, JSON.stringify({ traceparent: n }), xl(r));
        let o = await this.executingQueryPromise, s = this.parseEngineResponse(o);
        if (s.errors) throw s.errors.length === 1 ? this.buildQueryError(s.errors[0]) : new B(JSON.stringify(s.errors), { clientVersion: this.config.clientVersion });
        let { batchResult: a, errors: l } = s;
        if (Array.isArray(a)) return a.map((u) => u.errors && u.errors.length > 0 ? this.loggerRustPanic ?? this.buildQueryError(u.errors[0]) : { data: u });
        throw l && l.length === 1 ? new Error(l[0].error) : new Error(JSON.stringify(s));
      }
      buildQueryError(t) {
        if (t.user_facing_error.is_panic) return new ce(ho(this, t.user_facing_error.message), this.config.clientVersion);
        let r = this.getExternalAdapterError(t.user_facing_error);
        return r ? r.error : Nt(t, this.config.clientVersion, this.config.activeProvider);
      }
      getExternalAdapterError(t) {
        var _a2;
        if (t.error_code === Pm && this.config.adapter) {
          let r = (_a2 = t.meta) == null ? void 0 : _a2.id;
          zr(typeof r == "number", "Malformed external JS error received from the engine");
          let n = this.config.adapter.errorRegistry.consumeError(r);
          return zr(n, "External error with reported id was not registered"), n;
        }
      }
      async metrics(t) {
        await this.start();
        let r = await this.engine.metrics(JSON.stringify(t));
        return t.format === "prometheus" ? r : this.parseEngineResponse(r);
      }
    };
    function Sm(e) {
      return typeof e == "object" && e !== null && e.error_code !== void 0;
    }
    function ho(e, t) {
      var _a2;
      return ml({ binaryTarget: e.binaryTarget, title: t, version: e.config.clientVersion, engineVersion: (_a2 = e.versionInfo) == null ? void 0 : _a2.commit, database: e.config.activeProvider, query: e.lastQuery });
    }
    function Cl({ copyEngine: e = true }, t) {
      let r;
      try {
        r = Ft({ inlineDatasources: t.inlineDatasources, overrideDatasources: t.overrideDatasources, env: { ...t.env, ...process.env }, clientVersion: t.clientVersion });
      } catch {
      }
      let n = !!((r == null ? void 0 : r.startsWith("prisma://")) || wi(r));
      e && n && tr("recommend--no-engine", "In production, we recommend using `prisma generate --no-engine` (See: `prisma generate --help`)");
      let i = ht(t.generator), o = n || !e, s = !!t.adapter, a = i === "library", l = i === "binary", u = i === "client";
      if (o && s || s && false) {
        let c;
        throw e ? (r == null ? void 0 : r.startsWith("prisma://")) ? c = ["Prisma Client was configured to use the `adapter` option but the URL was a `prisma://` URL.", "Please either use the `prisma://` URL or remove the `adapter` from the Prisma Client constructor."] : c = ["Prisma Client was configured to use both the `adapter` and Accelerate, please chose one."] : c = ["Prisma Client was configured to use the `adapter` option but `prisma generate` was run with `--no-engine`.", "Please run `prisma generate` without `--no-engine` to be able to use Prisma Client with the adapter."], new te(c.join(`
`), { clientVersion: t.clientVersion });
      }
      if (o) return new _r(t);
      if (a) return new Dr(t);
      throw new te("Invalid client engine type, please use `library` or `binary`", { clientVersion: t.clientVersion });
    }
    function Mn({ generator: e }) {
      return (e == null ? void 0 : e.previewFeatures) ?? [];
    }
    var Sl = (e) => ({ command: e });
    var Al = (e) => e.strings.reduce((t, r, n) => `${t}@P${n}${r}`);
    function Vt(e) {
      try {
        return Il(e, "fast");
      } catch {
        return Il(e, "slow");
      }
    }
    function Il(e, t) {
      return JSON.stringify(e.map((r) => kl(r, t)));
    }
    function kl(e, t) {
      if (Array.isArray(e)) return e.map((r) => kl(r, t));
      if (typeof e == "bigint") return { prisma__type: "bigint", prisma__value: e.toString() };
      if (Pt(e)) return { prisma__type: "date", prisma__value: e.toJSON() };
      if (Pe.isDecimal(e)) return { prisma__type: "decimal", prisma__value: e.toJSON() };
      if (Buffer.isBuffer(e)) return { prisma__type: "bytes", prisma__value: e.toString("base64") };
      if (Am(e)) return { prisma__type: "bytes", prisma__value: Buffer.from(e).toString("base64") };
      if (ArrayBuffer.isView(e)) {
        let { buffer: r, byteOffset: n, byteLength: i } = e;
        return { prisma__type: "bytes", prisma__value: Buffer.from(r, n, i).toString("base64") };
      }
      return typeof e == "object" && t === "slow" ? _l(e) : e;
    }
    function Am(e) {
      return e instanceof ArrayBuffer || e instanceof SharedArrayBuffer ? true : typeof e == "object" && e !== null ? e[Symbol.toStringTag] === "ArrayBuffer" || e[Symbol.toStringTag] === "SharedArrayBuffer" : false;
    }
    function _l(e) {
      if (typeof e != "object" || e === null) return e;
      if (typeof e.toJSON == "function") return e.toJSON();
      if (Array.isArray(e)) return e.map(Ol);
      let t = {};
      for (let r of Object.keys(e)) t[r] = Ol(e[r]);
      return t;
    }
    function Ol(e) {
      return typeof e == "bigint" ? e.toString() : _l(e);
    }
    var Im = ["$connect", "$disconnect", "$on", "$transaction", "$use", "$extends"];
    var Dl = Im;
    var Om = /^(\s*alter\s)/i;
    var Nl = F("prisma:client");
    function yo(e, t, r, n) {
      if (!(e !== "postgresql" && e !== "cockroachdb") && r.length > 0 && Om.exec(t)) throw new Error(`Running ALTER using ${n} is not supported
Using the example below you can still execute your query with Prisma, but please note that it is vulnerable to SQL injection attacks and requires you to take care of input sanitization.

Example:
  await prisma.$executeRawUnsafe(\`ALTER USER prisma WITH PASSWORD '\${password}'\`)

More Information: https://pris.ly/d/execute-raw
`);
    }
    var Eo = ({ clientMethod: e, activeProvider: t }) => (r) => {
      let n = "", i;
      if (va(r)) n = r.sql, i = { values: Vt(r.values), __prismaRawParameters__: true };
      else if (Array.isArray(r)) {
        let [o, ...s] = r;
        n = o, i = { values: Vt(s || []), __prismaRawParameters__: true };
      } else switch (t) {
        case "sqlite":
        case "mysql": {
          n = r.sql, i = { values: Vt(r.values), __prismaRawParameters__: true };
          break;
        }
        case "cockroachdb":
        case "postgresql":
        case "postgres": {
          n = r.text, i = { values: Vt(r.values), __prismaRawParameters__: true };
          break;
        }
        case "sqlserver": {
          n = Al(r), i = { values: Vt(r.values), __prismaRawParameters__: true };
          break;
        }
        default:
          throw new Error(`The ${t} provider does not support ${e}`);
      }
      return (i == null ? void 0 : i.values) ? Nl(`prisma.${e}(${n}, ${i.values})`) : Nl(`prisma.${e}(${n})`), { query: n, parameters: i };
    };
    var Ll = { requestArgsToMiddlewareArgs(e) {
      return [e.strings, ...e.values];
    }, middlewareArgsToRequestArgs(e) {
      let [t, ...r] = e;
      return new ae(t, r);
    } };
    var Fl = { requestArgsToMiddlewareArgs(e) {
      return [e];
    }, middlewareArgsToRequestArgs(e) {
      return e[0];
    } };
    function bo(e) {
      return function(r, n) {
        let i, o = (s = e) => {
          try {
            return s === void 0 || (s == null ? void 0 : s.kind) === "itx" ? i ??= Ml(r(s)) : Ml(r(s));
          } catch (a) {
            return Promise.reject(a);
          }
        };
        return { get spec() {
          return n;
        }, then(s, a) {
          return o().then(s, a);
        }, catch(s) {
          return o().catch(s);
        }, finally(s) {
          return o().finally(s);
        }, requestTransaction(s) {
          let a = o(s);
          return a.requestTransaction ? a.requestTransaction(s) : a;
        }, [Symbol.toStringTag]: "PrismaPromise" };
      };
    }
    function Ml(e) {
      return typeof e.then == "function" ? e : Promise.resolve(e);
    }
    var km = { isEnabled() {
      return false;
    }, getTraceParent() {
      return "00-10-10-00";
    }, dispatchEngineSpans() {
    }, getActiveContext() {
    }, runInChildSpan(e, t) {
      return t();
    } };
    var wo = class {
      isEnabled() {
        return this.getGlobalTracingHelper().isEnabled();
      }
      getTraceParent(t) {
        return this.getGlobalTracingHelper().getTraceParent(t);
      }
      dispatchEngineSpans(t) {
        return this.getGlobalTracingHelper().dispatchEngineSpans(t);
      }
      getActiveContext() {
        return this.getGlobalTracingHelper().getActiveContext();
      }
      runInChildSpan(t, r) {
        return this.getGlobalTracingHelper().runInChildSpan(t, r);
      }
      getGlobalTracingHelper() {
        var _a2;
        return ((_a2 = globalThis.PRISMA_INSTRUMENTATION) == null ? void 0 : _a2.helper) ?? km;
      }
    };
    function $l() {
      return new wo();
    }
    function ql(e, t = () => {
    }) {
      let r, n = new Promise((i) => r = i);
      return { then(i) {
        return --e === 0 && r(t()), i == null ? void 0 : i(n);
      } };
    }
    function Vl(e) {
      return typeof e == "string" ? e : e.reduce((t, r) => {
        let n = typeof r == "string" ? r : r.level;
        return n === "query" ? t : t && (r === "info" || t === "info") ? "info" : n;
      }, void 0);
    }
    var $n = class {
      constructor() {
        this._middlewares = [];
      }
      use(t) {
        this._middlewares.push(t);
      }
      get(t) {
        return this._middlewares[t];
      }
      has(t) {
        return !!this._middlewares[t];
      }
      length() {
        return this._middlewares.length;
      }
    };
    var Bl = _(Ci());
    function qn(e) {
      return typeof e.batchRequestIdx == "number";
    }
    function jl(e) {
      if (e.action !== "findUnique" && e.action !== "findUniqueOrThrow") return;
      let t = [];
      return e.modelName && t.push(e.modelName), e.query.arguments && t.push(xo(e.query.arguments)), t.push(xo(e.query.selection)), t.join("");
    }
    function xo(e) {
      return `(${Object.keys(e).sort().map((r) => {
        let n = e[r];
        return typeof n == "object" && n !== null ? `(${r} ${xo(n)})` : r;
      }).join(" ")})`;
    }
    var _m = { aggregate: false, aggregateRaw: false, createMany: true, createManyAndReturn: true, createOne: true, deleteMany: true, deleteOne: true, executeRaw: true, findFirst: false, findFirstOrThrow: false, findMany: false, findRaw: false, findUnique: false, findUniqueOrThrow: false, groupBy: false, queryRaw: false, runCommandRaw: true, updateMany: true, updateManyAndReturn: true, updateOne: true, upsertOne: true };
    function Po(e) {
      return _m[e];
    }
    var Vn = class {
      constructor(t) {
        this.options = t;
        this.tickActive = false;
        this.batches = {};
      }
      request(t) {
        let r = this.options.batchBy(t);
        return r ? (this.batches[r] || (this.batches[r] = [], this.tickActive || (this.tickActive = true, process.nextTick(() => {
          this.dispatchBatches(), this.tickActive = false;
        }))), new Promise((n, i) => {
          this.batches[r].push({ request: t, resolve: n, reject: i });
        })) : this.options.singleLoader(t);
      }
      dispatchBatches() {
        for (let t in this.batches) {
          let r = this.batches[t];
          delete this.batches[t], r.length === 1 ? this.options.singleLoader(r[0].request).then((n) => {
            n instanceof Error ? r[0].reject(n) : r[0].resolve(n);
          }).catch((n) => {
            r[0].reject(n);
          }) : (r.sort((n, i) => this.options.batchOrder(n.request, i.request)), this.options.batchLoader(r.map((n) => n.request)).then((n) => {
            if (n instanceof Error) for (let i = 0; i < r.length; i++) r[i].reject(n);
            else for (let i = 0; i < r.length; i++) {
              let o = n[i];
              o instanceof Error ? r[i].reject(o) : r[i].resolve(o);
            }
          }).catch((n) => {
            for (let i = 0; i < r.length; i++) r[i].reject(n);
          }));
        }
      }
      get [Symbol.toStringTag]() {
        return "DataLoader";
      }
    };
    function ct(e, t) {
      if (t === null) return t;
      switch (e) {
        case "bigint":
          return BigInt(t);
        case "bytes": {
          let { buffer: r, byteOffset: n, byteLength: i } = Buffer.from(t, "base64");
          return new Uint8Array(r, n, i);
        }
        case "decimal":
          return new Pe(t);
        case "datetime":
        case "date":
          return new Date(t);
        case "time":
          return /* @__PURE__ */ new Date(`1970-01-01T${t}Z`);
        case "bigint-array":
          return t.map((r) => ct("bigint", r));
        case "bytes-array":
          return t.map((r) => ct("bytes", r));
        case "decimal-array":
          return t.map((r) => ct("decimal", r));
        case "datetime-array":
          return t.map((r) => ct("datetime", r));
        case "date-array":
          return t.map((r) => ct("date", r));
        case "time-array":
          return t.map((r) => ct("time", r));
        default:
          return t;
      }
    }
    function jn(e) {
      let t = [], r = Dm(e);
      for (let n = 0; n < e.rows.length; n++) {
        let i = e.rows[n], o = { ...r };
        for (let s = 0; s < i.length; s++) o[e.columns[s]] = ct(e.types[s], i[s]);
        t.push(o);
      }
      return t;
    }
    function Dm(e) {
      let t = {};
      for (let r = 0; r < e.columns.length; r++) t[e.columns[r]] = null;
      return t;
    }
    var Nm = F("prisma:client:request_handler");
    var Bn = class {
      constructor(t, r) {
        this.logEmitter = r, this.client = t, this.dataloader = new Vn({ batchLoader: Ha(async ({ requests: n, customDataProxyFetch: i }) => {
          let { transaction: o, otelParentCtx: s } = n[0], a = n.map((p) => p.protocolQuery), l = this.client._tracingHelper.getTraceParent(s), u = n.some((p) => Po(p.protocolQuery.action));
          return (await this.client._engine.requestBatch(a, { traceparent: l, transaction: Lm(o), containsWrite: u, customDataProxyFetch: i })).map((p, d) => {
            if (p instanceof Error) return p;
            try {
              return this.mapQueryEngineResult(n[d], p);
            } catch (f) {
              return f;
            }
          });
        }), singleLoader: async (n) => {
          var _a2;
          let i = ((_a2 = n.transaction) == null ? void 0 : _a2.kind) === "itx" ? Ul(n.transaction) : void 0, o = await this.client._engine.request(n.protocolQuery, { traceparent: this.client._tracingHelper.getTraceParent(), interactiveTransaction: i, isWrite: Po(n.protocolQuery.action), customDataProxyFetch: n.customDataProxyFetch });
          return this.mapQueryEngineResult(n, o);
        }, batchBy: (n) => {
          var _a2;
          return ((_a2 = n.transaction) == null ? void 0 : _a2.id) ? `transaction-${n.transaction.id}` : jl(n.protocolQuery);
        }, batchOrder(n, i) {
          var _a2, _b;
          return ((_a2 = n.transaction) == null ? void 0 : _a2.kind) === "batch" && ((_b = i.transaction) == null ? void 0 : _b.kind) === "batch" ? n.transaction.index - i.transaction.index : 0;
        } });
      }
      async request(t) {
        try {
          return await this.dataloader.request(t);
        } catch (r) {
          let { clientMethod: n, callsite: i, transaction: o, args: s, modelName: a } = t;
          this.handleAndLogRequestError({ error: r, clientMethod: n, callsite: i, transaction: o, args: s, modelName: a, globalOmit: t.globalOmit });
        }
      }
      mapQueryEngineResult({ dataPath: t, unpacker: r }, n) {
        let i = n == null ? void 0 : n.data, o = this.unpack(i, t, r);
        return process.env.PRISMA_CLIENT_GET_TIME ? { data: o } : o;
      }
      handleAndLogRequestError(t) {
        try {
          this.handleRequestError(t);
        } catch (r) {
          throw this.logEmitter && this.logEmitter.emit("error", { message: r.message, target: t.clientMethod, timestamp: /* @__PURE__ */ new Date() }), r;
        }
      }
      handleRequestError({ error: t, clientMethod: r, callsite: n, transaction: i, args: o, modelName: s, globalOmit: a }) {
        if (Nm(t), Fm(t, i)) throw t;
        if (t instanceof ee && Mm(t)) {
          let u = Ql(t.meta);
          xn({ args: o, errors: [u], callsite: n, errorFormat: this.client._errorFormat, originalMethod: r, clientVersion: this.client._clientVersion, globalOmit: a });
        }
        let l = t.message;
        if (n && (l = pn({ callsite: n, originalMethod: r, isPanic: t.isPanic, showColors: this.client._errorFormat === "pretty", message: l })), l = this.sanitizeMessage(l), t.code) {
          let u = s ? { modelName: s, ...t.meta } : t.meta;
          throw new ee(l, { code: t.code, clientVersion: this.client._clientVersion, meta: u, batchRequestIdx: t.batchRequestIdx });
        } else {
          if (t.isPanic) throw new ce(l, this.client._clientVersion);
          if (t instanceof B) throw new B(l, { clientVersion: this.client._clientVersion, batchRequestIdx: t.batchRequestIdx });
          if (t instanceof T) throw new T(l, this.client._clientVersion);
          if (t instanceof ce) throw new ce(l, this.client._clientVersion);
        }
        throw t.clientVersion = this.client._clientVersion, t;
      }
      sanitizeMessage(t) {
        return this.client._errorFormat && this.client._errorFormat !== "pretty" ? (0, Bl.default)(t) : t;
      }
      unpack(t, r, n) {
        if (!t || (t.data && (t = t.data), !t)) return t;
        let i = Object.keys(t)[0], o = Object.values(t)[0], s = r.filter((u) => u !== "select" && u !== "include"), a = Zi(o, s), l = i === "queryRaw" ? jn(a) : wt(a);
        return n ? n(l) : l;
      }
      get [Symbol.toStringTag]() {
        return "RequestHandler";
      }
    };
    function Lm(e) {
      if (e) {
        if (e.kind === "batch") return { kind: "batch", options: { isolationLevel: e.isolationLevel } };
        if (e.kind === "itx") return { kind: "itx", options: Ul(e) };
        Fe(e, "Unknown transaction kind");
      }
    }
    function Ul(e) {
      return { id: e.id, payload: e.payload };
    }
    function Fm(e, t) {
      return qn(e) && (t == null ? void 0 : t.kind) === "batch" && e.batchRequestIdx !== t.index;
    }
    function Mm(e) {
      return e.code === "P2009" || e.code === "P2012";
    }
    function Ql(e) {
      if (e.kind === "Union") return { kind: "Union", errors: e.errors.map(Ql) };
      if (Array.isArray(e.selectionPath)) {
        let [, ...t] = e.selectionPath;
        return { ...e, selectionPath: t };
      }
      return e;
    }
    var Gl = "6.3.1";
    var Jl = Gl;
    var zl = _(Fi());
    var N = class extends Error {
      constructor(t) {
        super(t + `
Read more at https://pris.ly/d/client-constructor`), this.name = "PrismaClientConstructorValidationError";
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientConstructorValidationError";
      }
    };
    w(N, "PrismaClientConstructorValidationError");
    var Wl = ["datasources", "datasourceUrl", "errorFormat", "adapter", "log", "transactionOptions", "omit", "__internal"];
    var Hl = ["pretty", "colorless", "minimal"];
    var Kl = ["info", "query", "warn", "error"];
    var qm = { datasources: (e, { datasourceNames: t }) => {
      if (e) {
        if (typeof e != "object" || Array.isArray(e)) throw new N(`Invalid value ${JSON.stringify(e)} for "datasources" provided to PrismaClient constructor`);
        for (let [r, n] of Object.entries(e)) {
          if (!t.includes(r)) {
            let i = jt(r, t) || ` Available datasources: ${t.join(", ")}`;
            throw new N(`Unknown datasource ${r} provided to PrismaClient constructor.${i}`);
          }
          if (typeof n != "object" || Array.isArray(n)) throw new N(`Invalid value ${JSON.stringify(e)} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
          if (n && typeof n == "object") for (let [i, o] of Object.entries(n)) {
            if (i !== "url") throw new N(`Invalid value ${JSON.stringify(e)} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
            if (typeof o != "string") throw new N(`Invalid value ${JSON.stringify(o)} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
          }
        }
      }
    }, adapter: (e, t) => {
      if (!e && ht(t.generator) === "client") throw new N('Using engine type "client" requires a driver adapter to be provided to PrismaClient constructor.');
      if (e === null) return;
      if (e === void 0) throw new N('"adapter" property must not be undefined, use null to conditionally disable driver adapters.');
      if (!Mn(t).includes("driverAdapters")) throw new N('"adapter" property can only be provided to PrismaClient constructor when "driverAdapters" preview feature is enabled.');
      if (ht(t.generator) === "binary") throw new N('Cannot use a driver adapter with the "binary" Query Engine. Please use the "library" Query Engine.');
    }, datasourceUrl: (e) => {
      if (typeof e < "u" && typeof e != "string") throw new N(`Invalid value ${JSON.stringify(e)} for "datasourceUrl" provided to PrismaClient constructor.
Expected string or undefined.`);
    }, errorFormat: (e) => {
      if (e) {
        if (typeof e != "string") throw new N(`Invalid value ${JSON.stringify(e)} for "errorFormat" provided to PrismaClient constructor.`);
        if (!Hl.includes(e)) {
          let t = jt(e, Hl);
          throw new N(`Invalid errorFormat ${e} provided to PrismaClient constructor.${t}`);
        }
      }
    }, log: (e) => {
      if (!e) return;
      if (!Array.isArray(e)) throw new N(`Invalid value ${JSON.stringify(e)} for "log" provided to PrismaClient constructor.`);
      function t(r) {
        if (typeof r == "string" && !Kl.includes(r)) {
          let n = jt(r, Kl);
          throw new N(`Invalid log level "${r}" provided to PrismaClient constructor.${n}`);
        }
      }
      for (let r of e) {
        t(r);
        let n = { level: t, emit: (i) => {
          let o = ["stdout", "event"];
          if (!o.includes(i)) {
            let s = jt(i, o);
            throw new N(`Invalid value ${JSON.stringify(i)} for "emit" in logLevel provided to PrismaClient constructor.${s}`);
          }
        } };
        if (r && typeof r == "object") for (let [i, o] of Object.entries(r)) if (n[i]) n[i](o);
        else throw new N(`Invalid property ${i} for "log" provided to PrismaClient constructor`);
      }
    }, transactionOptions: (e) => {
      if (!e) return;
      let t = e.maxWait;
      if (t != null && t <= 0) throw new N(`Invalid value ${t} for maxWait in "transactionOptions" provided to PrismaClient constructor. maxWait needs to be greater than 0`);
      let r = e.timeout;
      if (r != null && r <= 0) throw new N(`Invalid value ${r} for timeout in "transactionOptions" provided to PrismaClient constructor. timeout needs to be greater than 0`);
    }, omit: (e, t) => {
      if (typeof e != "object") throw new N('"omit" option is expected to be an object.');
      if (e === null) throw new N('"omit" option can not be `null`');
      let r = [];
      for (let [n, i] of Object.entries(e)) {
        let o = jm(n, t.runtimeDataModel);
        if (!o) {
          r.push({ kind: "UnknownModel", modelKey: n });
          continue;
        }
        for (let [s, a] of Object.entries(i)) {
          let l = o.fields.find((u) => u.name === s);
          if (!l) {
            r.push({ kind: "UnknownField", modelKey: n, fieldName: s });
            continue;
          }
          if (l.relationName) {
            r.push({ kind: "RelationInOmit", modelKey: n, fieldName: s });
            continue;
          }
          typeof a != "boolean" && r.push({ kind: "InvalidFieldValue", modelKey: n, fieldName: s });
        }
      }
      if (r.length > 0) throw new N(Bm(e, r));
    }, __internal: (e) => {
      if (!e) return;
      let t = ["debug", "engine", "configOverride"];
      if (typeof e != "object") throw new N(`Invalid value ${JSON.stringify(e)} for "__internal" to PrismaClient constructor`);
      for (let [r] of Object.entries(e)) if (!t.includes(r)) {
        let n = jt(r, t);
        throw new N(`Invalid property ${JSON.stringify(r)} for "__internal" provided to PrismaClient constructor.${n}`);
      }
    } };
    function Zl(e, t) {
      for (let [r, n] of Object.entries(e)) {
        if (!Wl.includes(r)) {
          let i = jt(r, Wl);
          throw new N(`Unknown property ${r} provided to PrismaClient constructor.${i}`);
        }
        qm[r](n, t);
      }
      if (e.datasourceUrl && e.datasources) throw new N('Can not use "datasourceUrl" and "datasources" options at the same time. Pick one of them');
    }
    function jt(e, t) {
      if (t.length === 0 || typeof e != "string") return "";
      let r = Vm(e, t);
      return r ? ` Did you mean "${r}"?` : "";
    }
    function Vm(e, t) {
      if (t.length === 0) return null;
      let r = t.map((i) => ({ value: i, distance: (0, zl.default)(e, i) }));
      r.sort((i, o) => i.distance < o.distance ? -1 : 1);
      let n = r[0];
      return n.distance < 3 ? n.value : null;
    }
    function jm(e, t) {
      return Yl(t.models, e) ?? Yl(t.types, e);
    }
    function Yl(e, t) {
      let r = Object.keys(e).find((n) => xt(n) === t);
      if (r) return e[r];
    }
    function Bm(e, t) {
      var _a2, _b, _c2, _d2;
      let r = It(e);
      for (let o of t) switch (o.kind) {
        case "UnknownModel":
          (_a2 = r.arguments.getField(o.modelKey)) == null ? void 0 : _a2.markAsError(), r.addErrorMessage(() => `Unknown model name: ${o.modelKey}.`);
          break;
        case "UnknownField":
          (_b = r.arguments.getDeepField([o.modelKey, o.fieldName])) == null ? void 0 : _b.markAsError(), r.addErrorMessage(() => `Model "${o.modelKey}" does not have a field named "${o.fieldName}".`);
          break;
        case "RelationInOmit":
          (_c2 = r.arguments.getDeepField([o.modelKey, o.fieldName])) == null ? void 0 : _c2.markAsError(), r.addErrorMessage(() => 'Relations are already excluded by default and can not be specified in "omit".');
          break;
        case "InvalidFieldValue":
          (_d2 = r.arguments.getDeepFieldValue([o.modelKey, o.fieldName])) == null ? void 0 : _d2.markAsError(), r.addErrorMessage(() => "Omit field option value must be a boolean.");
          break;
      }
      let { message: n, args: i } = wn(r, "colorless");
      return `Error validating "omit" option:

${i}

${n}`;
    }
    function Xl(e) {
      return e.length === 0 ? Promise.resolve([]) : new Promise((t, r) => {
        let n = new Array(e.length), i = null, o = false, s = 0, a = () => {
          o || (s++, s === e.length && (o = true, i ? r(i) : t(n)));
        }, l = (u) => {
          o || (o = true, r(u));
        };
        for (let u = 0; u < e.length; u++) e[u].then((c) => {
          n[u] = c, a();
        }, (c) => {
          if (!qn(c)) {
            l(c);
            return;
          }
          c.batchRequestIdx === u ? l(c) : (i || (i = c), a());
        });
      });
    }
    var tt = F("prisma:client");
    typeof globalThis == "object" && (globalThis.NODE_CLIENT = true);
    var Um = { requestArgsToMiddlewareArgs: (e) => e, middlewareArgsToRequestArgs: (e) => e };
    var Qm = Symbol.for("prisma.client.transaction.id");
    var Gm = { id: 0, nextId() {
      return ++this.id;
    } };
    function ou(e) {
      class t {
        constructor(n) {
          var _a2, _b, _c2, _d2, _e2, _f;
          this._originalClient = this;
          this._middlewares = new $n();
          this._createPrismaPromise = bo();
          this.$extends = Va;
          e = ((_b = (_a2 = n == null ? void 0 : n.__internal) == null ? void 0 : _a2.configOverride) == null ? void 0 : _b.call(_a2, e)) ?? e, Xa(e), n && Zl(n, e);
          let i = new nu.EventEmitter().on("error", () => {
          });
          this._extensions = Ot.empty(), this._previewFeatures = Mn(e), this._clientVersion = e.clientVersion ?? Jl, this._activeProvider = e.activeProvider, this._globalOmit = n == null ? void 0 : n.omit, this._tracingHelper = $l();
          let o = { rootEnvPath: e.relativeEnvPaths.rootEnvPath && Nr.default.resolve(e.dirname, e.relativeEnvPaths.rootEnvPath), schemaEnvPath: e.relativeEnvPaths.schemaEnvPath && Nr.default.resolve(e.dirname, e.relativeEnvPaths.schemaEnvPath) }, s;
          if (n == null ? void 0 : n.adapter) {
            s = Wi(n.adapter);
            let l = e.activeProvider === "postgresql" ? "postgres" : e.activeProvider;
            if (s.provider !== l) throw new T(`The Driver Adapter \`${s.adapterName}\`, based on \`${s.provider}\`, is not compatible with the provider \`${l}\` specified in the Prisma schema.`, this._clientVersion);
            if (n.datasources || n.datasourceUrl !== void 0) throw new T("Custom datasource configuration is not compatible with Prisma Driver Adapters. Please define the database connection string directly in the Driver Adapter configuration.", this._clientVersion);
          }
          let a = !s && Yt(o, { conflictCheck: "none" }) || ((_c2 = e.injectableEdgeEnv) == null ? void 0 : _c2.call(e));
          try {
            let l = n ?? {}, u = l.__internal ?? {}, c = u.debug === true;
            c && F.enable("prisma:client");
            let p = Nr.default.resolve(e.dirname, e.relativePath);
            iu.default.existsSync(p) || (p = e.dirname), tt("dirname", e.dirname), tt("relativePath", e.relativePath), tt("cwd", p);
            let d = u.engine || {};
            if (l.errorFormat ? this._errorFormat = l.errorFormat : process.env.NODE_ENV === "production" ? this._errorFormat = "minimal" : process.env.NO_COLOR ? this._errorFormat = "colorless" : this._errorFormat = "colorless", this._runtimeDataModel = e.runtimeDataModel, this._engineConfig = { cwd: p, dirname: e.dirname, enableDebugLogs: c, allowTriggerPanic: d.allowTriggerPanic, datamodelPath: Nr.default.join(e.dirname, e.filename ?? "schema.prisma"), prismaPath: d.binaryPath ?? void 0, engineEndpoint: d.endpoint, generator: e.generator, showColors: this._errorFormat === "pretty", logLevel: l.log && Vl(l.log), logQueries: l.log && !!(typeof l.log == "string" ? l.log === "query" : l.log.find((f) => typeof f == "string" ? f === "query" : f.level === "query")), env: (a == null ? void 0 : a.parsed) ?? {}, flags: [], engineWasm: e.engineWasm, compilerWasm: e.compilerWasm, clientVersion: e.clientVersion, engineVersion: e.engineVersion, previewFeatures: this._previewFeatures, activeProvider: e.activeProvider, inlineSchema: e.inlineSchema, overrideDatasources: el(l, e.datasourceNames), inlineDatasources: e.inlineDatasources, inlineSchemaHash: e.inlineSchemaHash, tracingHelper: this._tracingHelper, transactionOptions: { maxWait: ((_d2 = l.transactionOptions) == null ? void 0 : _d2.maxWait) ?? 2e3, timeout: ((_e2 = l.transactionOptions) == null ? void 0 : _e2.timeout) ?? 5e3, isolationLevel: (_f = l.transactionOptions) == null ? void 0 : _f.isolationLevel }, logEmitter: i, isBundled: e.isBundled, adapter: s }, this._accelerateEngineConfig = { ...this._engineConfig, accelerateUtils: { resolveDatasourceUrl: Ft, getBatchRequestPayload: Dt, prismaGraphQLToJSError: Nt, PrismaClientUnknownRequestError: B, PrismaClientInitializationError: T, PrismaClientKnownRequestError: ee, debug: F("prisma:client:accelerateEngine"), engineVersion: tu.version, clientVersion: e.clientVersion } }, tt("clientVersion", e.clientVersion), this._engine = Cl(e, this._engineConfig), this._requestHandler = new Bn(this, i), l.log) for (let f of l.log) {
              let g = typeof f == "string" ? f : f.emit === "stdout" ? f.level : null;
              g && this.$on(g, (h) => {
                er.log(`${er.tags[g] ?? ""}`, h.message || h.query);
              });
            }
            this._metrics = new kt(this._engine);
          } catch (l) {
            throw l.clientVersion = this._clientVersion, l;
          }
          return this._appliedParent = yr(this);
        }
        get [Symbol.toStringTag]() {
          return "PrismaClient";
        }
        $use(n) {
          this._middlewares.use(n);
        }
        $on(n, i) {
          n === "beforeExit" ? this._engine.onBeforeExit(i) : n && this._engineConfig.logEmitter.on(n, i);
        }
        $connect() {
          try {
            return this._engine.start();
          } catch (n) {
            throw n.clientVersion = this._clientVersion, n;
          }
        }
        async $disconnect() {
          try {
            await this._engine.stop();
          } catch (n) {
            throw n.clientVersion = this._clientVersion, n;
          } finally {
            Lo();
          }
        }
        $executeRawInternal(n, i, o, s) {
          let a = this._activeProvider;
          return this._request({ action: "executeRaw", args: o, transaction: n, clientMethod: i, argsMapper: Eo({ clientMethod: i, activeProvider: a }), callsite: Ze(this._errorFormat), dataPath: [], middlewareArgsMapper: s });
        }
        $executeRaw(n, ...i) {
          return this._createPrismaPromise((o) => {
            if (n.raw !== void 0 || n.sql !== void 0) {
              let [s, a] = eu(n, i);
              return yo(this._activeProvider, s.text, s.values, Array.isArray(n) ? "prisma.$executeRaw`<SQL>`" : "prisma.$executeRaw(sql`<SQL>`)"), this.$executeRawInternal(o, "$executeRaw", s, a);
            }
            throw new te("`$executeRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#executeraw\n", { clientVersion: this._clientVersion });
          });
        }
        $executeRawUnsafe(n, ...i) {
          return this._createPrismaPromise((o) => (yo(this._activeProvider, n, i, "prisma.$executeRawUnsafe(<SQL>, [...values])"), this.$executeRawInternal(o, "$executeRawUnsafe", [n, ...i])));
        }
        $runCommandRaw(n) {
          if (e.activeProvider !== "mongodb") throw new te(`The ${e.activeProvider} provider does not support $runCommandRaw. Use the mongodb provider.`, { clientVersion: this._clientVersion });
          return this._createPrismaPromise((i) => this._request({ args: n, clientMethod: "$runCommandRaw", dataPath: [], action: "runCommandRaw", argsMapper: Sl, callsite: Ze(this._errorFormat), transaction: i }));
        }
        async $queryRawInternal(n, i, o, s) {
          let a = this._activeProvider;
          return this._request({ action: "queryRaw", args: o, transaction: n, clientMethod: i, argsMapper: Eo({ clientMethod: i, activeProvider: a }), callsite: Ze(this._errorFormat), dataPath: [], middlewareArgsMapper: s });
        }
        $queryRaw(n, ...i) {
          return this._createPrismaPromise((o) => {
            if (n.raw !== void 0 || n.sql !== void 0) return this.$queryRawInternal(o, "$queryRaw", ...eu(n, i));
            throw new te("`$queryRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#queryraw\n", { clientVersion: this._clientVersion });
          });
        }
        $queryRawTyped(n) {
          return this._createPrismaPromise((i) => {
            if (!this._hasPreviewFlag("typedSql")) throw new te("`typedSql` preview feature must be enabled in order to access $queryRawTyped API", { clientVersion: this._clientVersion });
            return this.$queryRawInternal(i, "$queryRawTyped", n);
          });
        }
        $queryRawUnsafe(n, ...i) {
          return this._createPrismaPromise((o) => this.$queryRawInternal(o, "$queryRawUnsafe", [n, ...i]));
        }
        _transactionWithArray({ promises: n, options: i }) {
          let o = Gm.nextId(), s = ql(n.length), a = n.map((l, u) => {
            var _a2;
            if ((l == null ? void 0 : l[Symbol.toStringTag]) !== "PrismaPromise") throw new Error("All elements of the array need to be Prisma Client promises. Hint: Please make sure you are not awaiting the Prisma client calls you intended to pass in the $transaction function.");
            let c = (i == null ? void 0 : i.isolationLevel) ?? this._engineConfig.transactionOptions.isolationLevel, p = { kind: "batch", id: o, index: u, isolationLevel: c, lock: s };
            return ((_a2 = l.requestTransaction) == null ? void 0 : _a2.call(l, p)) ?? l;
          });
          return Xl(a);
        }
        async _transactionWithCallback({ callback: n, options: i }) {
          let o = { traceparent: this._tracingHelper.getTraceParent() }, s = { maxWait: (i == null ? void 0 : i.maxWait) ?? this._engineConfig.transactionOptions.maxWait, timeout: (i == null ? void 0 : i.timeout) ?? this._engineConfig.transactionOptions.timeout, isolationLevel: (i == null ? void 0 : i.isolationLevel) ?? this._engineConfig.transactionOptions.isolationLevel }, a = await this._engine.transaction("start", o, s), l;
          try {
            let u = { kind: "itx", ...a };
            l = await n(this._createItxClient(u)), await this._engine.transaction("commit", o, a);
          } catch (u) {
            throw await this._engine.transaction("rollback", o, a).catch(() => {
            }), u;
          }
          return l;
        }
        _createItxClient(n) {
          return yr(Ae(qa(this), [ie("_appliedParent", () => this._appliedParent._createItxClient(n)), ie("_createPrismaPromise", () => bo(n)), ie(Qm, () => n.id), _t(Dl)]));
        }
        $transaction(n, i) {
          var _a2;
          let o;
          typeof n == "function" ? ((_a2 = this._engineConfig.adapter) == null ? void 0 : _a2.adapterName) === "@prisma/adapter-d1" ? o = () => {
            throw new Error("Cloudflare D1 does not support interactive transactions. We recommend you to refactor your queries with that limitation in mind, and use batch transactions with `prisma.$transactions([])` where applicable.");
          } : o = () => this._transactionWithCallback({ callback: n, options: i }) : o = () => this._transactionWithArray({ promises: n, options: i });
          let s = { name: "transaction", attributes: { method: "$transaction" } };
          return this._tracingHelper.runInChildSpan(s, o);
        }
        _request(n) {
          n.otelParentCtx = this._tracingHelper.getActiveContext();
          let i = n.middlewareArgsMapper ?? Um, o = { args: i.requestArgsToMiddlewareArgs(n.args), dataPath: n.dataPath, runInTransaction: !!n.transaction, action: n.action, model: n.model }, s = { middleware: { name: "middleware", middleware: true, attributes: { method: "$use" }, active: false }, operation: { name: "operation", attributes: { method: o.action, model: o.model, name: o.model ? `${o.model}.${o.action}` : o.action } } }, a = -1, l = async (u) => {
            let c = this._middlewares.get(++a);
            if (c) return this._tracingHelper.runInChildSpan(s.middleware, (O) => c(u, (v) => (O == null ? void 0 : O.end(), l(v))));
            let { runInTransaction: p, args: d, ...f } = u, g = { ...n, ...f };
            d && (g.args = i.middlewareArgsToRequestArgs(d)), n.transaction !== void 0 && p === false && delete g.transaction;
            let h = await Wa(this, g);
            return g.model ? Ua({ result: h, modelName: g.model, args: g.args, extensions: this._extensions, runtimeDataModel: this._runtimeDataModel, globalOmit: this._globalOmit }) : h;
          };
          return this._tracingHelper.runInChildSpan(s.operation, () => new ru.AsyncResource("prisma-client-request").runInAsyncScope(() => l(o)));
        }
        async _executeRequest({ args: n, clientMethod: i, dataPath: o, callsite: s, action: a, model: l, argsMapper: u, transaction: c, unpacker: p, otelParentCtx: d, customDataProxyFetch: f }) {
          try {
            n = u ? u(n) : n;
            let g = { name: "serialize" }, h = this._tracingHelper.runInChildSpan(g, () => Rn({ modelName: l, runtimeDataModel: this._runtimeDataModel, action: a, args: n, clientMethod: i, callsite: s, extensions: this._extensions, errorFormat: this._errorFormat, clientVersion: this._clientVersion, previewFeatures: this._previewFeatures, globalOmit: this._globalOmit }));
            return F.enabled("prisma:client") && (tt("Prisma Client call:"), tt(`prisma.${i}(${Aa(n)})`), tt("Generated request:"), tt(JSON.stringify(h, null, 2) + `
`)), (c == null ? void 0 : c.kind) === "batch" && await c.lock, this._requestHandler.request({ protocolQuery: h, modelName: l, action: a, clientMethod: i, dataPath: o, callsite: s, args: n, extensions: this._extensions, transaction: c, unpacker: p, otelParentCtx: d, otelChildCtx: this._tracingHelper.getActiveContext(), globalOmit: this._globalOmit, customDataProxyFetch: f });
          } catch (g) {
            throw g.clientVersion = this._clientVersion, g;
          }
        }
        get $metrics() {
          if (!this._hasPreviewFlag("metrics")) throw new te("`metrics` preview feature must be enabled in order to access metrics API", { clientVersion: this._clientVersion });
          return this._metrics;
        }
        _hasPreviewFlag(n) {
          var _a2;
          return !!((_a2 = this._engineConfig.previewFeatures) == null ? void 0 : _a2.includes(n));
        }
        $applyPendingMigrations() {
          return this._engine.applyPendingMigrations();
        }
      }
      return t;
    }
    function eu(e, t) {
      return Jm(e) ? [new ae(e, t), Ll] : [e, Fl];
    }
    function Jm(e) {
      return Array.isArray(e) && Array.isArray(e.raw);
    }
    var Wm = /* @__PURE__ */ new Set(["toJSON", "$$typeof", "asymmetricMatch", Symbol.iterator, Symbol.toStringTag, Symbol.isConcatSpreadable, Symbol.toPrimitive]);
    function su(e) {
      return new Proxy(e, { get(t, r) {
        if (r in t) return t[r];
        if (!Wm.has(r)) throw new TypeError(`Invalid enum value: ${String(r)}`);
      } });
    }
    function au(e) {
      Yt(e, { conflictCheck: "warn" });
    }
  }
});

// generated/client/index.js
var require_client = __commonJS({
  "generated/client/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var {
      PrismaClientKnownRequestError: PrismaClientKnownRequestError2,
      PrismaClientUnknownRequestError: PrismaClientUnknownRequestError2,
      PrismaClientRustPanicError: PrismaClientRustPanicError2,
      PrismaClientInitializationError: PrismaClientInitializationError2,
      PrismaClientValidationError: PrismaClientValidationError2,
      getPrismaClient: getPrismaClient2,
      sqltag: sqltag2,
      empty: empty2,
      join: join2,
      raw: raw2,
      skip: skip2,
      Decimal: Decimal2,
      Debug: Debug2,
      objectEnumValues: objectEnumValues2,
      makeStrictEnum: makeStrictEnum2,
      Extensions: Extensions2,
      warnOnce: warnOnce2,
      defineDmmfProperty: defineDmmfProperty2,
      Public: Public2,
      getRuntime: getRuntime2,
      createParam: createParam2
    } = require_library();
    var Prisma = {};
    exports2.Prisma = Prisma;
    exports2.$Enums = {};
    Prisma.prismaVersion = {
      client: "6.3.1",
      engine: "acc0b9dd43eb689cbd20c9470515d719db10d0b0"
    };
    Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError2;
    Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError2;
    Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError2;
    Prisma.PrismaClientInitializationError = PrismaClientInitializationError2;
    Prisma.PrismaClientValidationError = PrismaClientValidationError2;
    Prisma.Decimal = Decimal2;
    Prisma.sql = sqltag2;
    Prisma.empty = empty2;
    Prisma.join = join2;
    Prisma.raw = raw2;
    Prisma.validator = Public2.validator;
    Prisma.getExtensionContext = Extensions2.getExtensionContext;
    Prisma.defineExtension = Extensions2.defineExtension;
    Prisma.DbNull = objectEnumValues2.instances.DbNull;
    Prisma.JsonNull = objectEnumValues2.instances.JsonNull;
    Prisma.AnyNull = objectEnumValues2.instances.AnyNull;
    Prisma.NullTypes = {
      DbNull: objectEnumValues2.classes.DbNull,
      JsonNull: objectEnumValues2.classes.JsonNull,
      AnyNull: objectEnumValues2.classes.AnyNull
    };
    var path = require("path");
    exports2.Prisma.TransactionIsolationLevel = makeStrictEnum2({
      ReadUncommitted: "ReadUncommitted",
      ReadCommitted: "ReadCommitted",
      RepeatableRead: "RepeatableRead",
      Serializable: "Serializable"
    });
    exports2.Prisma.AccountScalarFieldEnum = {
      type: "type",
      provider: "provider",
      providerAccountId: "providerAccountId",
      refresh_token: "refresh_token",
      access_token: "access_token",
      expires_at: "expires_at",
      token_type: "token_type",
      scope: "scope",
      id_token: "id_token",
      session_state: "session_state",
      userId: "userId",
      account_id: "account_id"
    };
    exports2.Prisma.ReferralScalarFieldEnum = {
      referral_id: "referral_id",
      referral_code: "referral_code",
      profile_id: "profile_id"
    };
    exports2.Prisma.AddressScalarFieldEnum = {
      address_id: "address_id",
      street: "street",
      city: "city",
      province: "province",
      island: "island",
      country: "country",
      profile_id: "profile_id"
    };
    exports2.Prisma.AdminScalarFieldEnum = {
      admin_id: "admin_id",
      store_id: "store_id",
      phone: "phone",
      position: "position",
      user_id: "user_id"
    };
    exports2.Prisma.StoreScalarFieldEnum = {
      store_id: "store_id",
      store_name: "store_name",
      store_address: "store_address",
      city: "city",
      lat: "lat",
      lng: "lng"
    };
    exports2.Prisma.StockScalarFieldEnum = {
      stock_id: "stock_id",
      store_id: "store_id",
      product_id: "product_id",
      quantity: "quantity"
    };
    exports2.Prisma.StockJournalScalarFieldEnum = {
      stock_journal_id: "stock_journal_id",
      store_id: "store_id",
      stock_id: "stock_id",
      product_id: "product_id",
      quantity: "quantity",
      type: "type",
      notes: "notes",
      created_at: "created_at"
    };
    exports2.Prisma.ProductScalarFieldEnum = {
      product_id: "product_id",
      product_name: "product_name",
      product_price: "product_price",
      product_category_id: "product_category_id"
    };
    exports2.Prisma.ProductImgScalarFieldEnum = {
      image_id: "image_id",
      image_url: "image_url",
      product_id: "product_id"
    };
    exports2.Prisma.ProductCategoryScalarFieldEnum = {
      product_category_id: "product_category_id",
      product_category_name: "product_category_name"
    };
    exports2.Prisma.VoucherStoreScalarFieldEnum = {
      voucher_store_id: "voucher_store_id",
      voucher_store_code: "voucher_store_code",
      voucher_store_amount_percentage: "voucher_store_amount_percentage",
      voucher_store_exact_nominal: "voucher_store_exact_nominal",
      voucher_store_minimum_buy: "voucher_store_minimum_buy",
      voucher_store_maximum_nominal: "voucher_store_maximum_nominal",
      voucher_store_startdate: "voucher_store_startdate",
      voucher_store_enddate: "voucher_store_enddate",
      created_at: "created_at",
      admin_responsible: "admin_responsible",
      store_id: "store_id"
    };
    exports2.Prisma.VoucherOngkirScalarFieldEnum = {
      voucher_ongkir_id: "voucher_ongkir_id",
      voucher_ongkir_code: "voucher_ongkir_code",
      voucher_ongkir_nominal: "voucher_ongkir_nominal",
      voucher_ongkir_startdate: "voucher_ongkir_startdate",
      voucher_ongkir_enddate: "voucher_ongkir_enddate",
      created_at: "created_at",
      admin_responsible: "admin_responsible",
      store_id: "store_id"
    };
    exports2.Prisma.VoucherProductScalarFieldEnum = {
      voucher_product_id: "voucher_product_id",
      voucher_product_code: "voucher_product_code",
      voucher_product_nominal: "voucher_product_nominal",
      voucher_product_startdate: "voucher_product_startdate",
      voucher_product_enddate: "voucher_product_enddate",
      created_at: "created_at",
      admin_responsible: "admin_responsible",
      product_id: "product_id"
    };
    exports2.Prisma.DiscountScalarFieldEnum = {
      discount_id: "discount_id",
      discount_product: "discount_product",
      discount_amount: "discount_amount",
      created_at: "created_at",
      discount_startdate: "discount_startdate",
      discount_enddate: "discount_enddate",
      isActive: "isActive"
    };
    exports2.Prisma.CartScalarFieldEnum = {
      cart_id: "cart_id",
      created_at: "created_at",
      profile_id: "profile_id"
    };
    exports2.Prisma.CartItemScalarFieldEnum = {
      cart_item_id: "cart_item_id",
      cart_id: "cart_id",
      product_id: "product_id",
      quantity: "quantity"
    };
    exports2.Prisma.OrderScalarFieldEnum = {
      order_id: "order_id",
      store_id: "store_id",
      address_id: "address_id",
      total_price: "total_price",
      status: "status",
      order_date: "order_date",
      profile_id: "profile_id"
    };
    exports2.Prisma.OrderItemScalarFieldEnum = {
      order_item_id: "order_item_id",
      order_id: "order_id",
      product_id: "product_id",
      quantity: "quantity",
      price: "price",
      subtotal: "subtotal"
    };
    exports2.Prisma.PaymentProofScalarFieldEnum = {
      payment_proof_id: "payment_proof_id",
      order_id: "order_id",
      image_url: "image_url",
      uploaded_at: "uploaded_at",
      status: "status"
    };
    exports2.Prisma.OrderCancelScalarFieldEnum = {
      order_cancel_id: "order_cancel_id",
      order_id: "order_id",
      reason: "reason",
      canceled_at: "canceled_at"
    };
    exports2.Prisma.AdminOrderScalarFieldEnum = {
      admin_order_id: "admin_order_id",
      admin_id: "admin_id",
      order_id: "order_id",
      action: "action",
      action_time: "action_time"
    };
    exports2.Prisma.ProfileScalarFieldEnum = {
      profile_id: "profile_id",
      user_id: "user_id",
      referred_id: "referred_id",
      phone: "phone",
      pfp_url: "pfp_url"
    };
    exports2.Prisma.UsersScalarFieldEnum = {
      user_id: "user_id",
      name: "name",
      email: "email",
      password: "password",
      image: "image",
      role: "role",
      email_verified: "email_verified",
      updateAt: "updateAt"
    };
    exports2.Prisma.SortOrder = {
      asc: "asc",
      desc: "desc"
    };
    exports2.Prisma.QueryMode = {
      default: "default",
      insensitive: "insensitive"
    };
    exports2.Prisma.NullsOrder = {
      first: "first",
      last: "last"
    };
    exports2.Role = exports2.$Enums.Role = {
      user: "user",
      admin: "admin",
      super_admin: "super_admin"
    };
    exports2.StockType = exports2.$Enums.StockType = {
      in: "in",
      out: "out",
      transfer: "transfer"
    };
    exports2.ActionEnum = exports2.$Enums.ActionEnum = {
      konfirmasi_pembayaran: "konfirmasi_pembayaran",
      kirim_pesanan: "kirim_pesanan",
      batalkan_pesanan: "batalkan_pesanan"
    };
    exports2.OrderStatus = exports2.$Enums.OrderStatus = {
      menunggu_pembayaran: "menunggu_pembayaran",
      menunggu_konfirmasi: "menunggu_konfirmasi",
      diproses: "diproses",
      dikirim: "dikirim",
      pesanan_dikonfirmasi: "pesanan_dikonfirmasi",
      dibatalkan: "dibatalkan"
    };
    exports2.PaymentStatus = exports2.$Enums.PaymentStatus = {
      pending: "pending",
      approved: "approved",
      rejected: "rejected"
    };
    exports2.Prisma.ModelName = {
      Account: "Account",
      Referral: "Referral",
      Address: "Address",
      Admin: "Admin",
      Store: "Store",
      Stock: "Stock",
      StockJournal: "StockJournal",
      Product: "Product",
      ProductImg: "ProductImg",
      ProductCategory: "ProductCategory",
      VoucherStore: "VoucherStore",
      VoucherOngkir: "VoucherOngkir",
      VoucherProduct: "VoucherProduct",
      Discount: "Discount",
      Cart: "Cart",
      CartItem: "CartItem",
      Order: "Order",
      OrderItem: "OrderItem",
      PaymentProof: "PaymentProof",
      OrderCancel: "OrderCancel",
      AdminOrder: "AdminOrder",
      profile: "profile",
      users: "users"
    };
    var config2 = {
      "generator": {
        "name": "client",
        "provider": {
          "fromEnvVar": null,
          "value": "prisma-client-js"
        },
        "output": {
          "value": "E:\\CODE\\finpro-alv\\finpro\\packages\\database\\generated\\client",
          "fromEnvVar": null
        },
        "config": {
          "engineType": "library"
        },
        "binaryTargets": [
          {
            "fromEnvVar": null,
            "value": "windows",
            "native": true
          }
        ],
        "previewFeatures": [],
        "sourceFilePath": "E:\\CODE\\finpro-alv\\finpro\\packages\\database\\prisma\\schema.prisma",
        "isCustomOutput": true
      },
      "relativeEnvPaths": {
        "rootEnvPath": null,
        "schemaEnvPath": "../../.env"
      },
      "relativePath": "../../prisma",
      "clientVersion": "6.3.1",
      "engineVersion": "acc0b9dd43eb689cbd20c9470515d719db10d0b0",
      "datasourceNames": [
        "db"
      ],
      "activeProvider": "postgresql",
      "postinstall": false,
      "inlineDatasources": {
        "db": {
          "url": {
            "fromEnvVar": null,
            "value": "postgresql://postgres.hsleadkzyyhrrhcpspyh:finpro2024@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
          }
        }
      },
      "inlineSchema": 'generator client {\n  provider = "prisma-client-js"\n  output   = "../generated/client"\n}\n\ndatasource db {\n  provider  = "postgresql"\n  url       = "postgresql://postgres.hsleadkzyyhrrhcpspyh:finpro2024@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"\n  directUrl = "postgresql://postgres.hsleadkzyyhrrhcpspyh:finpro2024@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"\n}\n\nmodel Account {\n  type              String\n  provider          String\n  providerAccountId String  @map("provider_account_id")\n  refresh_token     String?\n  access_token      String?\n  expires_at        Int?\n  token_type        String?\n  scope             String?\n  id_token          String?\n  session_state     String?\n  userId            String  @unique @map("user_id")\n  account_id        String  @id\n  user              users   @relation(fields: [userId], references: [user_id], onDelete: Cascade)\n\n  @@unique([provider, providerAccountId])\n  @@map("accounts")\n}\n\nmodel Referral {\n  referral_id                           Int       @id @default(autoincrement())\n  referral_code                         String\n  profile_id                            Int?      @unique\n  profile_profile_referred_idToreferral profile[] @relation("profile_referred_idToreferral")\n  profile                               profile?  @relation("UserProfileReferral", fields: [profile_id], references: [profile_id])\n\n  @@map("referral")\n}\n\nmodel Address {\n  address_id Int     @id @default(autoincrement())\n  street     String\n  city       String\n  province   String\n  island     String\n  country    String\n  profile_id Int\n  orders     Order[]\n  profile    profile @relation(fields: [profile_id], references: [profile_id])\n\n  @@map("address")\n}\n\nmodel Admin {\n  admin_id        Int              @id @default(autoincrement())\n  store_id        Int\n  phone           String\n  position        String\n  user_id         String           @unique\n  store           Store            @relation(fields: [store_id], references: [store_id])\n  user            users            @relation(fields: [user_id], references: [user_id])\n  admin_orders    AdminOrder[]\n  voucher_ongkir  VoucherOngkir[]\n  voucher_product VoucherProduct[]\n  voucher_store   VoucherStore[]\n\n  @@map("admin")\n}\n\nmodel Store {\n  store_id       Int            @id @default(autoincrement())\n  store_name     String         @unique\n  store_address  String\n  city           String\n  lat            String\n  lng            String\n  orders         Order[]\n  admin          Admin[]\n  stock          Stock[]\n  stock_journal  StockJournal[]\n  voucher_ongkir VoucherOngkir?\n  voucher_stores VoucherStore[]\n\n  @@map("store")\n}\n\nmodel Stock {\n  stock_id      Int            @id @default(autoincrement())\n  store_id      Int\n  product_id    Int            @unique\n  quantity      Int\n  product       Product        @relation(fields: [product_id], references: [product_id])\n  store         Store          @relation(fields: [store_id], references: [store_id])\n  stock_journal StockJournal[]\n\n  @@map("stock")\n}\n\nmodel StockJournal {\n  stock_journal_id Int      @id @default(autoincrement())\n  store_id         Int\n  stock_id         Int\n  product_id       String   @unique\n  quantity         Int\n  type             String\n  notes            String\n  created_at       DateTime\n  stock            Stock    @relation(fields: [stock_id], references: [stock_id])\n  store            Store    @relation(fields: [store_id], references: [store_id])\n\n  @@map("stock_journal")\n}\n\nmodel Product {\n  product_id          Int              @id @default(autoincrement())\n  product_name        String           @unique\n  product_price       Int\n  product_category_id Int\n  cart_items          CartItem[]\n  order_items         OrderItem[]\n  product_category    ProductCategory  @relation(fields: [product_category_id], references: [product_category_id])\n  product_img         ProductImg[]\n  stock               Stock?\n  voucher             VoucherProduct[]\n\n  @@map("product")\n}\n\nmodel ProductImg {\n  image_id   Int     @id @default(autoincrement())\n  image_url  String\n  product_id Int\n  product    Product @relation(fields: [product_id], references: [product_id])\n\n  @@map("product_img")\n}\n\nmodel ProductCategory {\n  product_category_id   Int       @id @default(autoincrement())\n  product_category_name String    @unique\n  product               Product[]\n\n  @@map("product_category")\n}\n\nmodel VoucherStore {\n  voucher_store_id                Int       @id @default(autoincrement())\n  voucher_store_code              String    @unique\n  voucher_store_amount_percentage Int\n  voucher_store_exact_nominal     Int\n  voucher_store_minimum_buy       Int\n  voucher_store_maximum_nominal   Int\n  voucher_store_startdate         DateTime\n  voucher_store_enddate           DateTime\n  created_at                      DateTime\n  admin_responsible               Int\n  store_id                        Int\n  admin                           Admin     @relation(fields: [admin_responsible], references: [admin_id])\n  store                           Store     @relation(fields: [store_id], references: [store_id])\n  profiles                        profile[] @relation("UserVouchers")\n\n  @@map("voucher_store")\n}\n\nmodel VoucherOngkir {\n  voucher_ongkir_id        Int      @id @default(autoincrement())\n  voucher_ongkir_code      String   @unique\n  voucher_ongkir_nominal   Int\n  voucher_ongkir_startdate DateTime\n  voucher_ongkir_enddate   DateTime\n  created_at               DateTime\n  admin_responsible        Int\n  store_id                 Int      @unique\n  admin                    Admin    @relation(fields: [admin_responsible], references: [admin_id])\n  store                    Store    @relation(fields: [store_id], references: [store_id])\n\n  @@map("voucher_ongkir")\n}\n\nmodel VoucherProduct {\n  voucher_product_id        Int      @id @default(autoincrement())\n  voucher_product_code      String   @unique\n  voucher_product_nominal   Int\n  voucher_product_startdate DateTime\n  voucher_product_enddate   DateTime\n  created_at                DateTime\n  admin_responsible         Int\n  product_id                Int\n  admin                     Admin    @relation(fields: [admin_responsible], references: [admin_id])\n  product                   Product  @relation(fields: [product_id], references: [product_id])\n\n  @@map("voucher_product")\n}\n\nmodel Discount {\n  discount_id        Int      @id @default(autoincrement())\n  discount_product   String\n  discount_amount    Int\n  created_at         DateTime\n  discount_startdate DateTime\n  discount_enddate   DateTime\n  isActive           Boolean\n\n  @@map("discount")\n}\n\nmodel Cart {\n  cart_id    Int        @id @default(autoincrement())\n  created_at DateTime\n  profile_id Int\n  cart_items CartItem[]\n  profile    profile    @relation(fields: [profile_id], references: [profile_id])\n\n  @@map("cart")\n}\n\nmodel CartItem {\n  cart_item_id Int     @id @default(autoincrement())\n  cart_id      Int\n  product_id   Int\n  quantity     Int\n  cart         Cart    @relation(fields: [cart_id], references: [cart_id])\n  product      Product @relation(fields: [product_id], references: [product_id])\n}\n\nmodel Order {\n  order_id      Int           @id @default(autoincrement())\n  store_id      Int\n  address_id    Int\n  total_price   Int\n  status        OrderStatus\n  order_date    DateTime\n  profile_id    Int\n  address       Address       @relation(fields: [address_id], references: [address_id])\n  profile       profile       @relation(fields: [profile_id], references: [profile_id])\n  store         Store         @relation(fields: [store_id], references: [store_id])\n  order_cancel  OrderCancel?\n  admin_orders  AdminOrder[]\n  order_items   OrderItem[]\n  payment_proof PaymentProof?\n}\n\nmodel OrderItem {\n  order_item_id Int     @id @default(autoincrement())\n  order_id      Int\n  product_id    Int\n  quantity      Int\n  price         Int\n  subtotal      Int\n  order         Order   @relation(fields: [order_id], references: [order_id])\n  product       Product @relation(fields: [product_id], references: [product_id])\n\n  @@map("order_item")\n}\n\nmodel PaymentProof {\n  payment_proof_id Int           @id @default(autoincrement())\n  order_id         Int           @unique\n  image_url        String\n  uploaded_at      DateTime\n  status           PaymentStatus\n  order            Order         @relation(fields: [order_id], references: [order_id])\n\n  @@map("payment_proof")\n}\n\nmodel OrderCancel {\n  order_cancel_id Int      @id @default(autoincrement())\n  order_id        Int      @unique\n  reason          String\n  canceled_at     DateTime\n  order           Order    @relation(fields: [order_id], references: [order_id])\n}\n\nmodel AdminOrder {\n  admin_order_id Int        @id @default(autoincrement())\n  admin_id       Int\n  order_id       Int\n  action         ActionEnum\n  action_time    DateTime\n  admin          Admin      @relation(fields: [admin_id], references: [admin_id])\n  order          Order      @relation(fields: [order_id], references: [order_id])\n\n  @@map("admin_order")\n}\n\nmodel profile {\n  profile_id                             Int            @id @default(autoincrement())\n  user_id                                String         @unique\n  referred_id                            Int?\n  phone                                  String?\n  pfp_url                                String?\n  orders                                 Order[]\n  Address                                Address[]\n  cart                                   Cart[]\n  referral_profile_referred_idToreferral Referral?      @relation("profile_referred_idToreferral", fields: [referred_id], references: [referral_id])\n  users                                  users          @relation(fields: [user_id], references: [user_id])\n  referral                               Referral?      @relation("UserProfileReferral")\n  voucher_store                          VoucherStore[] @relation("UserVouchers")\n}\n\nmodel users {\n  user_id        String    @id\n  name           String?\n  email          String?   @unique\n  password       String?\n  image          String?\n  role           Role      @default(user)\n  email_verified DateTime?\n  updateAt       DateTime\n  account        Account?\n  admin          Admin?\n  profile        profile?\n}\n\nenum Role {\n  user\n  admin\n  super_admin\n}\n\nenum StockType {\n  in\n  out\n  transfer\n}\n\nenum ActionEnum {\n  konfirmasi_pembayaran\n  kirim_pesanan\n  batalkan_pesanan\n}\n\nenum OrderStatus {\n  menunggu_pembayaran\n  menunggu_konfirmasi\n  diproses\n  dikirim\n  pesanan_dikonfirmasi\n  dibatalkan\n}\n\nenum PaymentStatus {\n  pending\n  approved\n  rejected\n}\n',
      "inlineSchemaHash": "d7168975f04168167e54375c241fa149928d23fd06f9b0f23d8283bc52777610",
      "copyEngine": true
    };
    var fs2 = require("fs");
    config2.dirname = __dirname;
    if (!fs2.existsSync(path.join(__dirname, "schema.prisma"))) {
      const alternativePaths = [
        "generated/client",
        "client"
      ];
      const alternativePath = alternativePaths.find((altPath) => {
        return fs2.existsSync(path.join(process.cwd(), altPath, "schema.prisma"));
      }) ?? alternativePaths[0];
      config2.dirname = path.join(process.cwd(), alternativePath);
      config2.isBundled = true;
    }
    config2.runtimeDataModel = JSON.parse('{"models":{"Account":{"dbName":"accounts","schema":null,"fields":[{"name":"type","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"provider","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"providerAccountId","dbName":"provider_account_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"refresh_token","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"access_token","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"expires_at","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"token_type","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"scope","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"id_token","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"session_state","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"userId","dbName":"user_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"account_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"user","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"users","nativeType":null,"relationName":"AccountTousers","relationFromFields":["userId"],"relationToFields":["user_id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[["provider","providerAccountId"]],"uniqueIndexes":[{"name":null,"fields":["provider","providerAccountId"]}],"isGenerated":false},"Referral":{"dbName":"referral","schema":null,"fields":[{"name":"referral_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","nativeType":null,"default":{"name":"autoincrement","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"referral_code","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"profile_id","kind":"scalar","isList":false,"isRequired":false,"isUnique":true,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"profile_profile_referred_idToreferral","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"profile","nativeType":null,"relationName":"profile_referred_idToreferral","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"profile","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"profile","nativeType":null,"relationName":"UserProfileReferral","relationFromFields":["profile_id"],"relationToFields":["profile_id"],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Address":{"dbName":"address","schema":null,"fields":[{"name":"address_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","nativeType":null,"default":{"name":"autoincrement","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"street","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"city","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"province","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"island","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"country","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"profile_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"orders","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Order","nativeType":null,"relationName":"AddressToOrder","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"profile","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"profile","nativeType":null,"relationName":"AddressToprofile","relationFromFields":["profile_id"],"relationToFields":["profile_id"],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Admin":{"dbName":"admin","schema":null,"fields":[{"name":"admin_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","nativeType":null,"default":{"name":"autoincrement","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"store_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"phone","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"position","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"user_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"store","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Store","nativeType":null,"relationName":"AdminToStore","relationFromFields":["store_id"],"relationToFields":["store_id"],"isGenerated":false,"isUpdatedAt":false},{"name":"user","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"users","nativeType":null,"relationName":"AdminTousers","relationFromFields":["user_id"],"relationToFields":["user_id"],"isGenerated":false,"isUpdatedAt":false},{"name":"admin_orders","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"AdminOrder","nativeType":null,"relationName":"AdminToAdminOrder","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"voucher_ongkir","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"VoucherOngkir","nativeType":null,"relationName":"AdminToVoucherOngkir","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"voucher_product","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"VoucherProduct","nativeType":null,"relationName":"AdminToVoucherProduct","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"voucher_store","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"VoucherStore","nativeType":null,"relationName":"AdminToVoucherStore","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Store":{"dbName":"store","schema":null,"fields":[{"name":"store_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","nativeType":null,"default":{"name":"autoincrement","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"store_name","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"store_address","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"city","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"lat","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"lng","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"orders","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Order","nativeType":null,"relationName":"OrderToStore","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"admin","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Admin","nativeType":null,"relationName":"AdminToStore","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"stock","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Stock","nativeType":null,"relationName":"StockToStore","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"stock_journal","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"StockJournal","nativeType":null,"relationName":"StockJournalToStore","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"voucher_ongkir","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"VoucherOngkir","nativeType":null,"relationName":"StoreToVoucherOngkir","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"voucher_stores","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"VoucherStore","nativeType":null,"relationName":"StoreToVoucherStore","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Stock":{"dbName":"stock","schema":null,"fields":[{"name":"stock_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","nativeType":null,"default":{"name":"autoincrement","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"store_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"product_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"quantity","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"product","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Product","nativeType":null,"relationName":"ProductToStock","relationFromFields":["product_id"],"relationToFields":["product_id"],"isGenerated":false,"isUpdatedAt":false},{"name":"store","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Store","nativeType":null,"relationName":"StockToStore","relationFromFields":["store_id"],"relationToFields":["store_id"],"isGenerated":false,"isUpdatedAt":false},{"name":"stock_journal","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"StockJournal","nativeType":null,"relationName":"StockToStockJournal","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"StockJournal":{"dbName":"stock_journal","schema":null,"fields":[{"name":"stock_journal_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","nativeType":null,"default":{"name":"autoincrement","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"store_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"stock_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"product_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"quantity","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"type","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"notes","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"created_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"stock","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Stock","nativeType":null,"relationName":"StockToStockJournal","relationFromFields":["stock_id"],"relationToFields":["stock_id"],"isGenerated":false,"isUpdatedAt":false},{"name":"store","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Store","nativeType":null,"relationName":"StockJournalToStore","relationFromFields":["store_id"],"relationToFields":["store_id"],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Product":{"dbName":"product","schema":null,"fields":[{"name":"product_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","nativeType":null,"default":{"name":"autoincrement","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"product_name","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"product_price","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"product_category_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"cart_items","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"CartItem","nativeType":null,"relationName":"CartItemToProduct","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"order_items","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"OrderItem","nativeType":null,"relationName":"OrderItemToProduct","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"product_category","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"ProductCategory","nativeType":null,"relationName":"ProductToProductCategory","relationFromFields":["product_category_id"],"relationToFields":["product_category_id"],"isGenerated":false,"isUpdatedAt":false},{"name":"product_img","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"ProductImg","nativeType":null,"relationName":"ProductToProductImg","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"stock","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Stock","nativeType":null,"relationName":"ProductToStock","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"voucher","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"VoucherProduct","nativeType":null,"relationName":"ProductToVoucherProduct","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"ProductImg":{"dbName":"product_img","schema":null,"fields":[{"name":"image_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","nativeType":null,"default":{"name":"autoincrement","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"image_url","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"product_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"product","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Product","nativeType":null,"relationName":"ProductToProductImg","relationFromFields":["product_id"],"relationToFields":["product_id"],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"ProductCategory":{"dbName":"product_category","schema":null,"fields":[{"name":"product_category_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","nativeType":null,"default":{"name":"autoincrement","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"product_category_name","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"product","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Product","nativeType":null,"relationName":"ProductToProductCategory","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"VoucherStore":{"dbName":"voucher_store","schema":null,"fields":[{"name":"voucher_store_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","nativeType":null,"default":{"name":"autoincrement","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"voucher_store_code","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"voucher_store_amount_percentage","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"voucher_store_exact_nominal","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"voucher_store_minimum_buy","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"voucher_store_maximum_nominal","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"voucher_store_startdate","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"voucher_store_enddate","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"created_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"admin_responsible","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"store_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"admin","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Admin","nativeType":null,"relationName":"AdminToVoucherStore","relationFromFields":["admin_responsible"],"relationToFields":["admin_id"],"isGenerated":false,"isUpdatedAt":false},{"name":"store","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Store","nativeType":null,"relationName":"StoreToVoucherStore","relationFromFields":["store_id"],"relationToFields":["store_id"],"isGenerated":false,"isUpdatedAt":false},{"name":"profiles","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"profile","nativeType":null,"relationName":"UserVouchers","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"VoucherOngkir":{"dbName":"voucher_ongkir","schema":null,"fields":[{"name":"voucher_ongkir_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","nativeType":null,"default":{"name":"autoincrement","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"voucher_ongkir_code","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"voucher_ongkir_nominal","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"voucher_ongkir_startdate","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"voucher_ongkir_enddate","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"created_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"admin_responsible","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"store_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"admin","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Admin","nativeType":null,"relationName":"AdminToVoucherOngkir","relationFromFields":["admin_responsible"],"relationToFields":["admin_id"],"isGenerated":false,"isUpdatedAt":false},{"name":"store","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Store","nativeType":null,"relationName":"StoreToVoucherOngkir","relationFromFields":["store_id"],"relationToFields":["store_id"],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"VoucherProduct":{"dbName":"voucher_product","schema":null,"fields":[{"name":"voucher_product_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","nativeType":null,"default":{"name":"autoincrement","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"voucher_product_code","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"voucher_product_nominal","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"voucher_product_startdate","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"voucher_product_enddate","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"created_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"admin_responsible","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"product_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"admin","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Admin","nativeType":null,"relationName":"AdminToVoucherProduct","relationFromFields":["admin_responsible"],"relationToFields":["admin_id"],"isGenerated":false,"isUpdatedAt":false},{"name":"product","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Product","nativeType":null,"relationName":"ProductToVoucherProduct","relationFromFields":["product_id"],"relationToFields":["product_id"],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Discount":{"dbName":"discount","schema":null,"fields":[{"name":"discount_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","nativeType":null,"default":{"name":"autoincrement","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"discount_product","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"discount_amount","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"created_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"discount_startdate","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"discount_enddate","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"isActive","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Boolean","nativeType":null,"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Cart":{"dbName":"cart","schema":null,"fields":[{"name":"cart_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","nativeType":null,"default":{"name":"autoincrement","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"created_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"profile_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"cart_items","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"CartItem","nativeType":null,"relationName":"CartToCartItem","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"profile","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"profile","nativeType":null,"relationName":"CartToprofile","relationFromFields":["profile_id"],"relationToFields":["profile_id"],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"CartItem":{"dbName":null,"schema":null,"fields":[{"name":"cart_item_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","nativeType":null,"default":{"name":"autoincrement","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"cart_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"product_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"quantity","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"cart","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Cart","nativeType":null,"relationName":"CartToCartItem","relationFromFields":["cart_id"],"relationToFields":["cart_id"],"isGenerated":false,"isUpdatedAt":false},{"name":"product","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Product","nativeType":null,"relationName":"CartItemToProduct","relationFromFields":["product_id"],"relationToFields":["product_id"],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Order":{"dbName":null,"schema":null,"fields":[{"name":"order_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","nativeType":null,"default":{"name":"autoincrement","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"store_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"address_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"total_price","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"status","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"OrderStatus","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"order_date","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"profile_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"address","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Address","nativeType":null,"relationName":"AddressToOrder","relationFromFields":["address_id"],"relationToFields":["address_id"],"isGenerated":false,"isUpdatedAt":false},{"name":"profile","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"profile","nativeType":null,"relationName":"OrderToprofile","relationFromFields":["profile_id"],"relationToFields":["profile_id"],"isGenerated":false,"isUpdatedAt":false},{"name":"store","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Store","nativeType":null,"relationName":"OrderToStore","relationFromFields":["store_id"],"relationToFields":["store_id"],"isGenerated":false,"isUpdatedAt":false},{"name":"order_cancel","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"OrderCancel","nativeType":null,"relationName":"OrderToOrderCancel","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"admin_orders","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"AdminOrder","nativeType":null,"relationName":"AdminOrderToOrder","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"order_items","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"OrderItem","nativeType":null,"relationName":"OrderToOrderItem","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"payment_proof","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"PaymentProof","nativeType":null,"relationName":"OrderToPaymentProof","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"OrderItem":{"dbName":"order_item","schema":null,"fields":[{"name":"order_item_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","nativeType":null,"default":{"name":"autoincrement","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"order_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"product_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"quantity","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"price","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"subtotal","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"order","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Order","nativeType":null,"relationName":"OrderToOrderItem","relationFromFields":["order_id"],"relationToFields":["order_id"],"isGenerated":false,"isUpdatedAt":false},{"name":"product","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Product","nativeType":null,"relationName":"OrderItemToProduct","relationFromFields":["product_id"],"relationToFields":["product_id"],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"PaymentProof":{"dbName":"payment_proof","schema":null,"fields":[{"name":"payment_proof_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","nativeType":null,"default":{"name":"autoincrement","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"order_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"image_url","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"uploaded_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"status","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"PaymentStatus","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"order","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Order","nativeType":null,"relationName":"OrderToPaymentProof","relationFromFields":["order_id"],"relationToFields":["order_id"],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"OrderCancel":{"dbName":null,"schema":null,"fields":[{"name":"order_cancel_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","nativeType":null,"default":{"name":"autoincrement","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"order_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"reason","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"canceled_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"order","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Order","nativeType":null,"relationName":"OrderToOrderCancel","relationFromFields":["order_id"],"relationToFields":["order_id"],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"AdminOrder":{"dbName":"admin_order","schema":null,"fields":[{"name":"admin_order_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","nativeType":null,"default":{"name":"autoincrement","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"admin_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"order_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"action","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"ActionEnum","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"action_time","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"admin","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Admin","nativeType":null,"relationName":"AdminToAdminOrder","relationFromFields":["admin_id"],"relationToFields":["admin_id"],"isGenerated":false,"isUpdatedAt":false},{"name":"order","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Order","nativeType":null,"relationName":"AdminOrderToOrder","relationFromFields":["order_id"],"relationToFields":["order_id"],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"profile":{"dbName":null,"schema":null,"fields":[{"name":"profile_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","nativeType":null,"default":{"name":"autoincrement","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"user_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"referred_id","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"phone","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"pfp_url","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"orders","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Order","nativeType":null,"relationName":"OrderToprofile","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"Address","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Address","nativeType":null,"relationName":"AddressToprofile","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"cart","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Cart","nativeType":null,"relationName":"CartToprofile","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"referral_profile_referred_idToreferral","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Referral","nativeType":null,"relationName":"profile_referred_idToreferral","relationFromFields":["referred_id"],"relationToFields":["referral_id"],"isGenerated":false,"isUpdatedAt":false},{"name":"users","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"users","nativeType":null,"relationName":"profileTousers","relationFromFields":["user_id"],"relationToFields":["user_id"],"isGenerated":false,"isUpdatedAt":false},{"name":"referral","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Referral","nativeType":null,"relationName":"UserProfileReferral","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"voucher_store","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"VoucherStore","nativeType":null,"relationName":"UserVouchers","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"users":{"dbName":null,"schema":null,"fields":[{"name":"user_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"email","kind":"scalar","isList":false,"isRequired":false,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"password","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"image","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"role","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Role","nativeType":null,"default":"user","isGenerated":false,"isUpdatedAt":false},{"name":"email_verified","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"updateAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"account","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Account","nativeType":null,"relationName":"AccountTousers","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"admin","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Admin","nativeType":null,"relationName":"AdminTousers","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"profile","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"profile","nativeType":null,"relationName":"profileTousers","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false}},"enums":{"Role":{"values":[{"name":"user","dbName":null},{"name":"admin","dbName":null},{"name":"super_admin","dbName":null}],"dbName":null},"StockType":{"values":[{"name":"in","dbName":null},{"name":"out","dbName":null},{"name":"transfer","dbName":null}],"dbName":null},"ActionEnum":{"values":[{"name":"konfirmasi_pembayaran","dbName":null},{"name":"kirim_pesanan","dbName":null},{"name":"batalkan_pesanan","dbName":null}],"dbName":null},"OrderStatus":{"values":[{"name":"menunggu_pembayaran","dbName":null},{"name":"menunggu_konfirmasi","dbName":null},{"name":"diproses","dbName":null},{"name":"dikirim","dbName":null},{"name":"pesanan_dikonfirmasi","dbName":null},{"name":"dibatalkan","dbName":null}],"dbName":null},"PaymentStatus":{"values":[{"name":"pending","dbName":null},{"name":"approved","dbName":null},{"name":"rejected","dbName":null}],"dbName":null}},"types":{}}');
    defineDmmfProperty2(exports2.Prisma, config2.runtimeDataModel);
    config2.engineWasm = void 0;
    config2.compilerWasm = void 0;
    var { warnEnvConflicts: warnEnvConflicts2 } = require_library();
    warnEnvConflicts2({
      rootEnvPath: config2.relativeEnvPaths.rootEnvPath && path.resolve(config2.dirname, config2.relativeEnvPaths.rootEnvPath),
      schemaEnvPath: config2.relativeEnvPaths.schemaEnvPath && path.resolve(config2.dirname, config2.relativeEnvPaths.schemaEnvPath)
    });
    var PrismaClient2 = getPrismaClient2(config2);
    exports2.PrismaClient = PrismaClient2;
    Object.assign(exports2, Prisma);
    path.join(__dirname, "query_engine-windows.dll.node");
    path.join(process.cwd(), "generated/client/query_engine-windows.dll.node");
    path.join(__dirname, "schema.prisma");
    path.join(process.cwd(), "generated/client/schema.prisma");
  }
});

// src/client.ts
var client_exports = {};
__export(client_exports, {
  prisma: () => prisma
});
module.exports = __toCommonJS(client_exports);
var import_client = __toESM(require_client());
__reExport(client_exports, __toESM(require_client()), module.exports);
var globalForPrisma = global;
var prisma = globalForPrisma.prisma || new import_client.PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  prisma
});
/*! Bundled license information:

decimal.js/decimal.mjs:
  (*!
   *  decimal.js v10.4.3
   *  An arbitrary-precision Decimal type for JavaScript.
   *  https://github.com/MikeMcl/decimal.js
   *  Copyright (c) 2022 Michael Mclaughlin <M8ch88l@gmail.com>
   *  MIT Licence
   *)
*/
