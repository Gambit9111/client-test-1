import CryptoJS from "crypto-js";

export function encrypt_message(message) {
  return CryptoJS.AES.encrypt(
    message,
    import.meta.env.VITE_SUPERKEY
  ).toString();
}

export function decrypt_message(message) {
  return CryptoJS.AES.decrypt(message, import.meta.env.VITE_SUPERKEY).toString(
    CryptoJS.enc.Utf8
  );
}
