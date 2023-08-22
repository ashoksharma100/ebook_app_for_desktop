// import 'package:encrypt/encrypt.dart';
// import 'package:flutter/foundation.dart' hide Key;
//
// final key = Key.fromUtf8('sujeo6O8qNjuvM1gMMWC+BYXVxDtpwr7');
// final iv = IV.fromLength(4);
// final encrypter = Encrypter(AES(key));
//
// Uint8List encrypt(Uint8List bytes) {
//   final encrypted = encrypter.encryptBytes(bytes, iv: iv);
//   return encrypted.bytes;
// }
//
// Uint8List decrypt(Uint8List bytes) {
//   Encrypted encrypted = Encrypted(bytes);
//   final decrypted = encrypter.decryptBytes(encrypted, iv: iv);
//   return Uint8List.fromList(decrypted);
// }
