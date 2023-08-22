import 'dart:io';

import 'package:ebook_app_for_desktop/screen/WebViewScreen1.dart';
import 'package:flutter/material.dart';
import 'dart:typed_data';
import 'package:aes_crypt_null_safe/aes_crypt_null_safe.dart';
import 'package:path_provider/path_provider.dart';

class BlankScreen extends StatefulWidget {
  final String? path;
  final String? book_name;

  BlankScreen({this.path, this.book_name});

  @override
  State<BlankScreen> createState() =>
      _BlankScreenState(path: path, book_name: book_name);
}

class _BlankScreenState extends State<BlankScreen> {
  String? path;
  String? book_name;
  var crypt = AesCrypt();
  late bool loading;

  _BlankScreenState({this.path, this.book_name});
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    loading = true;

    crypt.setPassword('my cool password');
    crypt.setOverwriteMode(AesCryptOwMode.on);
    encryptFile();

    // setState(() {
    //   Navigator.push(context, MaterialPageRoute(builder: (context)=>WebViewScreen(path: path,book_name: book_name,)));
    // });

  }
  @override
  Widget build(BuildContext context) {
    return Container(
      child: loading
            ? CircularProgressIndicator()
            : Text("encrypted")
    );
  }

  void encryptFile() async{
    final Directory tempDir = await getTemporaryDirectory();
    crypt.encryptFileSync(tempDir.path + "/Aarambh 3.zip", tempDir.path +'/herr.aes');
    setState(() {
      loading = false;
      print("file encrypted");
    });
  }
}
