export function base64Encode(input: string): string {
  // Convert the string to UTF-8 using unescape and encodeURIComponent
  const utf8Input = unescape(encodeURIComponent(input));
  let base64 = '';
  for (let i = 0; i < utf8Input.length; i++) {
    base64 += String.fromCharCode(utf8Input.charCodeAt(i));
  }
  return btoa(base64);
}

// Function to decode a Base64 string
export function base64Decode(input: string): string {
  const base64 = atob(input);
  let utf8 = '';
  for (let i = 0; i < base64.length; i++) {
    utf8 += '%' + ('00' + base64.charCodeAt(i).toString(16)).slice(-2);
  }
  return decodeURIComponent(escape(utf8));
}
