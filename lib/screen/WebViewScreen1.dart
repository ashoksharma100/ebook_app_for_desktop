import 'dart:io';

import 'package:archive/archive_io.dart';
import 'package:desktop_webview_window/desktop_webview_window.dart';
import 'package:ebook_app_for_desktop/screen/HomeScreen.dart';
// import 'package:desktop_webview_window/desktop_webview_window.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:path_provider/path_provider.dart';
import 'package:path/path.dart' as p;
// import 'package:webview_cef/webview_cef.dart';
// import 'package:webview_universal/webview_controller/webview_controller.dart';
// import 'package:webview_universal/webview_controller/webview_controller_web.dart';
// import 'package:webview_universal/widget/webview.dart';
// import 'package:webview_universal/widget/webview.dart';

import '../Helper/Constatnt.dart';
import '../Helper/file_manager.dart';

class WebViewScreen extends StatefulWidget {
  final String? path;
  final String? book_name;

  WebViewScreen({this.path, this.book_name});

  @override
  State<WebViewScreen> createState() =>
      _WebViewScreenState(path: path, book_name: book_name);
}

class _WebViewScreenState extends State<WebViewScreen> {
  String? path;
  String? book_name;
  // late FileManager fileManager;
  // WebViewController webViewController = WebViewController();
  late FileManager fileManager;
  // final _controller = WebViewController();
  _WebViewScreenState({this.path, this.book_name});
  Widget content = Text("hell");
  late bool loading;
  String status = "Please wait while the book is getting ready to be displayed..";

  @override
  void initState() {
    super.initState();
    // loading = true;
    // List<String> args = ['web_view_title_bar','0'];
    // if (runWebViewTitleBarWidget(args)) {
    //   print("text");
    //   return;
    // }
    WidgetsFlutterBinding.ensureInitialized();
    setState(() {
      FileManager.dir_name = Dir_Name;
    });

    fileManager = FileManager(path.toString());


    fileManager.fileExists().then((exists) async {
      if (exists) {

        // final file = await fileManager.load();
        //
        // final inputStream = InputFileStream(file.path);
        // inputStream.
        // final archive = ZipDecoder().decodeBuffer(inputStream);
        // // print(archive.files.forEach((element) { }));
        //
        // archive.files.forEach((element) async{
        //   if(element.name.toString().contains("index.html")){
        //       // final webview = await WebviewWindow.create(
        //       //   configuration: CreateConfiguration(
        //       //
        //       //     title: "EbookApp",
        //       //     titleBarTopPadding: Platform.isMacOS ? 20 : 0,
        //       //     userDataFolderWindows: await _getWebViewPath(),
        //       //   ),
        //       // );
        //       //
        //       // webview.launch(element.toString());
        //     // print(archive.expand((element) => null));
        //   }
        //
        // });
        final Directory tempDir = await getTemporaryDirectory();
        if (await Directory(tempDir.path + "/" + book_name.toString()).exists()) {
            setState(() {
            // loading = false;
            status = "";
            });
            final webview = await WebviewWindow.create(
            configuration: CreateConfiguration(

              title: "EbookApp",
              titleBarTopPadding: Platform.isMacOS ? 20 : 0,
              userDataFolderWindows: await _getWebViewPath(),
              ),
            );
          // webview.launch("file:///C:/Users/CCI/AppData/Local/Temp/Demo%20Book%201/index.html?key=IGFugAzieR");
          webview.launch("file:///"+tempDir.path + "/" + book_name.toString() + "/index.html?key=IGFugAzieR");
          // webViewController.init(
          //   context: context,
          //   setState: setState,
          //   uri: Uri.file(
          //       tempDir.path + "/" + book_name.toString() + "/index.html"),
          // );
        } else
        {
          final file = await fileManager.load();

          setState(() {
            status = "Please wait.....";
          });

          print("file loaded");
          final inputStream = InputFileStream(file.path);
          final archive = ZipDecoder().decodeBuffer(inputStream);
          String book_path_name = book_name.toString() + ".zip";

          File zip_file =
              await file.copySync(tempDir.path + "/" + book_path_name);
          setState(() {
            status = "Book loading.....";
          });
          print("file copied");
          await extractFileToDisk(
              zip_file.path, tempDir.path + "/" + book_name.toString() + "/");
          print("file extracted");
          setState(() {
            status = "Book loaded!";

          });
          // await File(zip_file.path).delete();
          print("file deletd");
          setState(() {
            // loading = false;
            status = "";
          });
          final webview = await WebviewWindow.create(
            configuration: CreateConfiguration(

              title: "EbookApp",
              titleBarTopPadding: Platform.isMacOS ? 20 : 0,
              userDataFolderWindows: await _getWebViewPath(),
            ),
          );

          webview.launch("file:///"+tempDir.path + "/" + book_name.toString() + "/index.html?key=IGFugAzieR");

          // webViewController.init(
          //   context: context,
          //   setState: setState,
          //   uri: Uri.file(
          //       tempDir.path + "/" + book_name.toString() + "/index.html"),
          // );
        }

        if (await Directory(tempDir.path + "/file").exists()) {
          Directory(tempDir.path + "/file").deleteSync(recursive: true);
        }
        if (await File(tempDir.path + "/file.zip").exists()) {
          await File(tempDir.path + "/file.zip").delete();
        }
      }
    });
  }

  @override
  void dispose() {
    // TODO: implement dispose
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // return Scaffold(
    //     // appBar: AppBar(actions: [
    //     //   IconButton(
    //     //       onPressed: () {
    //     //         Navigator.pop(context);
    //     //       },
    //     //       icon: Icon(Icons.arrow_back))
    //     // ]),
    //     body: SafeArea(
    //   // child: Text("data"),
    //   child: WebView(
    //     controller: webViewController,
    //   ),
    // ));
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(useMaterial3: true),
      home: Scaffold(
          body: Column(
        children: [
          Center(
            child: IconButton(
              iconSize: 56,
                onPressed: () {
                  Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context)=>HomeScreen())
                  );
                },
                icon: Icon(Icons.home)),
          ),
          ElevatedButton(
            onPressed: (){
              Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context)=>HomeScreen())
              );
            },
              child: Text("BookShelf",style: GoogleFonts.poppins(fontSize: 34),)
          ),
          Text(status,style: GoogleFonts.poppins(fontSize: 34),),
          // SizedBox(
          //   height: 500,
          //   child: WebView(
          //     controller: webViewController,
          //   )
          // ),
        ],
      )),
    );
  }

  Future<String> _getWebViewPath() async {
    final document = await getApplicationDocumentsDirectory();
    return p.join(
      document.path,
      'desktop_webview_window',
    );
  }
}
