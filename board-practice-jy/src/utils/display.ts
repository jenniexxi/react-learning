export const numberWithCommas = (
  v: number | string | null,
  n = 3,
  comma = ","
) => {
  const num = typeof v === "string" ? parseInt(v || "0", 10) : v;
  if (typeof num !== "number" || isNaN(num) || num === 0 || num === null) {
    return "0";
  }
  let reg = new RegExp("(^[+-]?\\d+)(\\d{" + n + "})");
  let s = num.toFixed(0);
  while (reg.test(s)) {
    s = s.replace(reg, "$1" + comma + "$2");
  }
  return s;
};
