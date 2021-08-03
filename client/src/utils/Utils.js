export default class Utils {
  static saveToken(token) {
    let timestamp = new Date().getTime();
    timestamp += 7 * 24 * 60 * 1000;
    document.cookie = `token=${token};expires=${timestamp};path=/`;
  }

  static clearToken() {
    document.cookie = `token=;Max-Age=0;`;
  }

  static getToken() {}
}
