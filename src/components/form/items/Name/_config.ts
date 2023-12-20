/**
 * 名前コンポーネント類の設定ファイル
 */
/* 名前の最大文字数 */
const firstNameLength = 15
/* 苗字の最大文字数 */
const lastNameLength = 15

/**
 * 名前（正式表記）の設定
 */
export const nameRegisterConfig = {
  /**
   * フルネームの最大文字数
   */
  fullNameLength: firstNameLength + lastNameLength,
  /**
   * 名前の最大文字数
   */
  firstNameLength: firstNameLength,
  /**
   * 苗字の最大文字数
   */
  lastNameLength: lastNameLength,
}
/**
 * 名前（ふりがな）の設定
 */
export const nameKanaConfig = {
  /**
   * フルネームの最大文字数
   */
  fullNameLength: firstNameLength + lastNameLength,
  /**
   * 名前の最大文字数
   */
  firstNameLength: firstNameLength,
  /**
   * 苗字の最大文字数
   */
  lastNameLength: lastNameLength,
}
