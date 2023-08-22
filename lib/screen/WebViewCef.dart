import 'dart:async';
import 'dart:io';

import 'package:archive/archive_io.dart';
import 'package:flutter/material.dart';
import 'package:path_provider/path_provider.dart';
import 'package:webview_cef/webview_cef.dart';

import '../Helper/Constatnt.dart';
import '../Helper/file_manager.dart';

class WebViewCef extends StatefulWidget {
  final String? path;
  final String? book_name;
  const WebViewCef({this.path, this.book_name});

  @override
  State<WebViewCef> createState() =>
      _WebViewCefState(path: path, book_name: book_name);
}

class _WebViewCefState extends State<WebViewCef> {
  String? path;
  String? book_name;
  final _controller = WebViewController();
  final _textController = TextEditingController();
  String title = "";
  late FileManager fileManager;
  _WebViewCefState({this.path, this.book_name});
  @override
  void initState() {
    WidgetsFlutterBinding.ensureInitialized();
    super.initState();
    FileManager.dir_name = Dir_Name;

    fileManager = FileManager(path.toString());
    fileManager.fileExists().then((exists) async {
      if (exists) {
        final Directory tempDir = await getTemporaryDirectory();
        if (await Directory(tempDir.path + "/" + book_name.toString())
            .exists()) {
          String url =
              tempDir.path + "/" + book_name.toString() + "/Start.html";
          initPlatformState(url);
          // final webview = await WebviewWindow.create();
          // webview.launch("https://example.com");
        } else {
          final file = await fileManager.load();
          final inputStream = InputFileStream(file.path);
          final archive = ZipDecoder().decodeBuffer(inputStream);
          String book_path_name = book_name.toString() + ".zip";

          File zip_file =
              await file.copySync(tempDir.path + "/" + book_path_name);
          extractFileToDisk(
              zip_file.path, tempDir.path + "/" + book_name.toString() + "/");
          await File(zip_file.path).delete();
          String url =
              tempDir.path + "/" + book_name.toString() + "/Start.html";
          initPlatformState(url);
        }

        // if (await Directory(tempDir.path + "/file").exists()) {
        //   Directory(tempDir.path + "/file").deleteSync(recursive: true);
        // }
        // if (await File(tempDir.path + "/file.zip").exists()) {
        //   await File(tempDir.path + "/file.zip").delete();
        // }
      }
    });
  }

  // Platform messages are asynchronous, so we initialize in an async method.
  Future<void> initPlatformState(String url) async {
    _textController.text = url;
    await _controller.initialize();
    await _controller.loadUrl(url);
    _controller.setWebviewListener(WebviewEventsListener(
      onTitleChanged: (t) {
        setState(() {
          title = t;
        });
      },
      onUrlChanged: (url) {
        _textController.text = url;
      },
    ));

    // ignore: prefer_collection_literals
    final Set<JavascriptChannel> jsChannels = [
      JavascriptChannel(
          name: 'Print',
          onMessageReceived: (JavascriptMessage message) {
            print(message.message);
            _controller.sendJavaScriptChannelCallBack(
                false,
                "{'code':'200','message':'print succeed!'}",
                message.callbackId,
                message.frameId);
          }),
    ].toSet();
    //normal JavaScriptChannels
    await _controller.setJavaScriptChannels(jsChannels);
    //also you can build your own jssdk by execute JavaScript code to CEF
    await _controller.executeJavaScript("function abc(e){console.log(e)}");
    // If the widget was removed from the tree while the asynchronous platform
    // message was in flight, we want to discard the reply rather than calling
    // setState to update our non-existent appearance.
    if (!mounted) return;
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(useMaterial3: true),
      home: Scaffold(
          body: Column(
        children: [
          SizedBox(
            height: 20,
            child: Text(title),
          ),
          Row(
            children: [
              SizedBox(
                height: 48,
                child: MaterialButton(
                  onPressed: () {
                    Navigator.of(context).pop();
                  },
                  child: const Icon(Icons.arrow_back_outlined),
                ),
              ),
            ],
          ),
          _controller.value
              ? Expanded(child: WebView(_controller))
              : const Text("not init"),
        ],
      )),
    );
  }
}
