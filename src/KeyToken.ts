import { Operation } from "./Enums";

/**
 * 電卓の入力キーを表す型
 */
export type KeyToken =
  | { kind: "digit"; value: number }
  | { kind: "decimal" }
  | { kind: "op"; value: Operation }
  | { kind: "equal" }
  | { kind: "clear" };