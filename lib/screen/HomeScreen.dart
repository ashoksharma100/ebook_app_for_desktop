import 'dart:convert';
import 'dart:io';
import 'dart:math';

import 'package:background_downloader/background_downloader.dart';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:desktop_webview_window/desktop_webview_window.dart';
import 'package:easy_pdf_viewer/easy_pdf_viewer.dart';
import 'package:ebook_app_for_desktop/main.dart';
import 'package:ebook_app_for_desktop/screen/BlankScreen.dart';
import 'package:ebook_app_for_desktop/screen/ExpiryScreen.dart';
import 'package:ebook_app_for_desktop/screen/WebViewCef.dart';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:get/get.dart';
import 'package:get/get_core/src/get_main.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:path_provider/path_provider.dart';
import 'package:path/path.dart' as p;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:sqflite_common/sqlite_api.dart';
//import 'package:sqlite3/common.dart';
// import 'package:sqflite_common_ffi/sqflite_ffi.dart';
import 'package:sqlite3/open.dart';
import 'package:sqlite3/sqlite3.dart' as sqlite3;

import '../Helper/ColorsRes.dart';
import '../Helper/Constatnt.dart';
import '../Helper/Services.dart';
import '../Helper/file_manager.dart';
import '../Model/BooksModel.dart';
import 'LoginScreen.dart';
import 'WebViewScreen1.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  List<Books> _books = [];
  List<Books> _allBooks = [];
  late bool loading;
  late bool logout_loading = false;
  late bool refresh_loading = false;
  bool reload = false;
  DownloadProgress? downloadProgress;
  late String doc_dir;

  Widget content = Scaffold(
      body: Center(
    child: CircularProgressIndicator(),
  ));

  @override
  void initState() {


    // Don't forget to dispose the database to avoid memory leaks
    // db.dispose();
    // TODO: implement initState
    loading = true;
    // sqli.OpenMode.readWrite();

    super.initState();
    setState(() {
      FileManager.dir_name = Dir_Name;
    });



    FileManager.loadSavedFiles();
    checkLogin();

    // manageDownloadState();

    // SystemChrome.setPreferredOrientations([
    //   DeviceOrientation.landscapeLeft,
    // ]);
  }

  manageDownloadState() {
    _books.map((book) async {
      var url = book.url;
      FileManager.files = null;
      bool downloaded = await FileManager.doesExists(url!);
      print(downloaded);

      setState(() {
        book.downloaded = downloaded;
      });
      if (FileManager.downloadProgress?.originalUrl == url) {
        book.downloading = true;
        FileManager.onDownloadProgress = onDownloadProgress;
        FileManager.onDownloadComplete = () => onDownloadComplete(book);
      }
    }).toList();
  }

  onDownloadProgress(DownloadProgress newProgress) {
    FileManager.downloadProgress = newProgress;
    if (mounted) {
      setState(() {});
    }
  }

  onDownloadComplete(Books books) {
    if (mounted) {
      setState(() {
        FileManager.downloadProgress = null;
        books.downloading = false;
        books.downloaded = true;
      });
    }

    FileManager.loadSavedFiles();
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: _onBackPressed,
      child: Scaffold(
        appBar: AppBar(
          backgroundColor: Color.fromARGB(255, 146, 135, 32),
          actions: [
            IconButton(
                onPressed: () async {
                  SharedPreferences sharedPreferences =
                      await SharedPreferences.getInstance();
                  sharedPreferences.setBool("login", false);
                  Navigator.push(context,
                      MaterialPageRoute(builder: (context) => LoginScreen()));
                },
                icon: Icon(Icons.logout))
          ],
          title: Text("Ebook App"),
        ),
        // appBar: AppBar(
        //   actions: [
        //     IconButton(onPressed: () async{
        //       SharedPreferences sharedPreferences = await SharedPreferences.getInstance();
        //       sharedPreferences.setBool("login", false);
        //
        //       Navigator.push(context, MaterialPageRoute(builder: (context)=>LoginScreenMain()));
        //
        //
        //     },
        //         icon: Icon(Icons.exit_to_app_outlined)
        //     ),
        //     IconButton(onPressed: () async{
        //
        //       // Navigator.pop(context);
        //       // Navigator.push(context, MaterialPageRoute(builder: (context)=>HomeScreen()));
        //
        //
        //     },
        //         icon: Icon(Icons.home)
        //     )
        //   ],
        // ),
        body: SafeArea(
          child: Container(
            child: Material(
              // color: ColorsRes.backgroundColor,
              child: Padding(
                padding: const EdgeInsets.all(27.0),
                child: loading == false
                  ? GridView.builder(
                    itemCount: _books.length,
                    gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                        mainAxisSpacing: 30,
                        crossAxisCount: 3,
                        childAspectRatio: MediaQuery.of(context).size.width /
                            (MediaQuery.of(context).size.height / 1.5)),
                    // padding: EdgeInsets.symmetric(horizontal: 27),
                    // physics: const BouncingScrollPhysics(
                    //     parent: AlwaysScrollableScrollPhysics()),
                    itemBuilder: (context, index) {

                      return getGridItem(context, index);
                    })
                    : Center(child: CircularProgressIndicator())
              ),
            ),
          ),
        ),
      ),
    );
  }


  void checkLogin() async {

    final connectivityResult = await (Connectivity().checkConnectivity());
    if(connectivityResult == ConnectivityResult.none){
      setState(() {
        reload = false;
      });

    }else{
      setState(() {
        reload = true;
      });

    }
    SharedPreferences sharedPreferences = await SharedPreferences.getInstance();
    if (sharedPreferences.getBool("login") == true) {
      getUserBooks(sharedPreferences.getString("user_id").toString(), reload);
    } else {
      Navigator.push(
          context, MaterialPageRoute(builder: (context) => LoginScreenMain()));
    }
  }

  void getUserBooks(String user_id, bool reload) {
    GetBooks.getBooks(user_id, reload).then((books) async {
      Directory appDocDir = await getApplicationDocumentsDirectory();

      setState(() {
        doc_dir = appDocDir.path;

        books.sort((a, b) =>
            ((a.Class ?? "1")
                    .padLeft(2, "0")
                    .compareTo((b.Class ?? "1").padLeft(2, "0")) *
                2) +
            (a.Title ?? "").compareTo(b.Title ?? ""));

        int count = 0;
        final List<DownloadTask> tasks= [];
        books.forEach((element) async{


          File image_file = await File(doc_dir+"\\"+Dir_Name+"\\image_"+element.book_id.toString()+".png");
          if(! await image_file.exists()){
            final task = DownloadTask(
                url: element.BookImageUrl.toString(),
                filename: "image_"+element.book_id.toString()+".png",
                directory: appDocDir.path+"/"+Dir_Name
            );
            // tasks. = task;

            final result = await FileDownloader().download(task);

          }
          count +=1;
          if(count == books.length){
            setState(() {




              // _allBooks = books;

              loading = false;
              refresh_loading = false;

            });
          }


        });
        _books = books;

        // print(count);

        // print(books);

      });
      manageDownloadState();
    });
  }

  Future<bool> _onBackPressed() async {
    return await showDialog(
            context: context,
            barrierDismissible: false,
            builder: (BuildContext context) => AlertDialog(
                contentPadding: EdgeInsets.zero,
                shape: const RoundedRectangleBorder(
                    borderRadius: BorderRadius.all(Radius.circular(15.0))),
                content: SizedBox(
                  height: 150,
                  width: MediaQuery.of(context).size.width,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    mainAxisSize: MainAxisSize.min,
                    children: <Widget>[
                      InkWell(
                        child: Container(
                          padding:
                              const EdgeInsets.only(top: 20.0, bottom: 20.0),
                          decoration: BoxDecoration(
                            color: ColorsRes.backgroundColor,
                            borderRadius: const BorderRadius.only(
                                topLeft: Radius.circular(15.0),
                                topRight: Radius.circular(15.0)),
                          ),
                          child: Center(
                              child: Text(
                            "Do you want to exit the App ?",
                            style: GoogleFonts.titilliumWeb(
                                fontSize: 15,
                                fontWeight: FontWeight.bold,
                                color: Colors.white),
                          )),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.only(top: 15),
                        child: Center(
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Container(
                                height: 45,
                                width: 120,
                                child: Padding(
                                  padding: const EdgeInsets.all(5.0),
                                  child: ElevatedButton(
                                    style: ButtonStyle(),
                                    onPressed: () =>
                                        Navigator.of(context).pop(false),
                                    //return false when click on "NO"
                                    child: Text('No'),
                                  ),
                                ),
                              ),
                              Container(
                                height: 45,
                                width: 120,
                                child: Padding(
                                  padding: const EdgeInsets.all(5.0),
                                  child: ElevatedButton(
                                    onPressed: () =>
                                        Navigator.of(context).pop(true),
                                    //return true when click on "Yes"
                                    child: Text('Yes'),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      )
                    ],
                  ),
                ))) ??
        false;
  }

  getImagePath(String? book_id) {
    // Directory appDocDir = await getApplicationDocumentsDirectory();
    String image_file = doc_dir+"\\"+Dir_Name+"\\image_"+book_id.toString()+".png";
    // print(image_file);
    return image_file;
  }

  Widget getGridItem(BuildContext context, int index) {

    return Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(5)),
      elevation: 5,
      child: Row(
        // mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
            Image.file(File(getImagePath(_books[index].book_id.toString()))),


          SizedBox(
            width: 15,
          ),
          Column(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                _books[index].Title.toString(),
                overflow: TextOverflow.clip,
                style: GoogleFonts.poppins(),
              ),
              Text("Class : " + _books[index].Class.toString(),
                  style: GoogleFonts.poppins()),
              Align(
                  alignment: Alignment.bottomLeft,
                  child: Row(
                    children: [
                      ElevatedButton(
                          onPressed: () async {

                            if (_books[index].downloaded) {
                              DateTime now = new DateTime.now();
                              var expire_date = DateTime.parse(_books[index].expiry.toString());
                              // print(expire_date);
                              String diff = expire_date.difference(now).toString();
                              if(diff.contains("-")){
                                // print("expired");
                                Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                        builder: (context) => ExpiryScreen()));
                              }else{
                                // print(expire_date.difference(now));
                                // updateBookStatus(_books[index].book_id.toString(),_books[index].school_id.toString());
                                Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                        builder: (context) => WebViewScreen(
                                            path: _books[index].url,
                                            book_name: _books[index].Title)));
                                // final webview = await WebviewWindow.create(
                                //   configuration: CreateConfiguration(
                                //
                                //     title: "ExampleTestWindow",
                                //     titleBarTopPadding: Platform.isMacOS ? 20 : 0,
                                //     userDataFolderWindows: await _getWebViewPath(),
                                //   ),
                                // );
                                //
                                // webview
                                //   ..setBrightness(Brightness.dark)
                                //   ..setApplicationNameForUserAgent(" WebviewExample/1.0.0")
                                //   ..launch("www.google.com")
                                //   ..addOnUrlRequestCallback((url) {
                                //     debugPrint('url: $url');
                                //     final uri = Uri.parse(url);
                                //     if (uri.path == '/login_success') {
                                //       debugPrint('login success. token: ${uri.queryParameters['token']}');
                                //       webview.close();
                                //     }
                                //   })
                                //   ..onClose.whenComplete(() {
                                //     debugPrint("on close");
                                //   });
                                // await Future.delayed(const Duration(seconds: 2));


                              }

                            }
                          },
                          child: _books[index].downloaded 
                              ? Text("View Book")
                              : Text("Click On Download Icon")),
                      Text("   "),
                      _books[index].downloading
                          ? Stack(
                              children: [
                                CircularProgressIndicator(
                                  value: FileManager.downloadProgress != null
                                      ? FileManager.downloadProgress!.progress
                                      : 100.0,
                                ),
                                Center(
                                  child: Text(
                                    "${((FileManager.downloadProgress?.progress ?? 1) * 100).toInt()}%",
                                    textScaleFactor: 0.8,
                                  ),
                                )
                              ],
                            )
                          : Center(
                              child: IconButton(
                                iconSize: 25,
                                icon: _books[index].downloaded
                                    ? const Icon(Icons.delete)
                                    : const Icon(Icons.download),
                                alignment: Alignment.center,
                                onPressed: () async {
                                  final connectivityResult = await (Connectivity().checkConnectivity());

                                    if (FileManager.occupied) {
                                      //print("Sdus");
                                      showDialog(
                                          context: context,
                                          barrierDismissible: false,
                                          builder: (BuildContext context) =>
                                              AlertDialog(
                                                  contentPadding: EdgeInsets.zero,
                                                  shape:
                                                  const RoundedRectangleBorder(
                                                      borderRadius:
                                                      BorderRadius.all(
                                                          Radius.circular(
                                                              15.0))),
                                                  content: SizedBox(
                                                    height: 200,
                                                    width: MediaQuery.of(context)
                                                        .size
                                                        .width,
                                                    child: Column(
                                                      mainAxisAlignment:
                                                      MainAxisAlignment.start,
                                                      crossAxisAlignment:
                                                      CrossAxisAlignment
                                                          .stretch,
                                                      mainAxisSize:
                                                      MainAxisSize.min,
                                                      children: <Widget>[
                                                        InkWell(
                                                          child: Container(
                                                            padding:
                                                            const EdgeInsets
                                                                .only(
                                                                top: 20.0,
                                                                bottom: 20.0),
                                                            decoration:
                                                            BoxDecoration(
                                                              color: ColorsRes
                                                                  .backgroundColor,
                                                              borderRadius: const BorderRadius
                                                                  .only(
                                                                  topLeft: Radius
                                                                      .circular(
                                                                      15.0),
                                                                  topRight: Radius
                                                                      .circular(
                                                                      15.0)),
                                                            ),
                                                            child: Center(
                                                                child: Text(
                                                                  "Error",
                                                                  style: GoogleFonts
                                                                      .titilliumWeb(
                                                                      fontSize:
                                                                      15,
                                                                      fontWeight:
                                                                      FontWeight
                                                                          .bold,
                                                                      color: Colors
                                                                          .white),
                                                                )),
                                                          ),
                                                        ),
                                                        Expanded(
                                                            child: Center(
                                                              child: Column(
                                                                children: [
                                                                  const Expanded(
                                                                      child: Center(
                                                                          child:
                                                                          Padding(
                                                                            padding:
                                                                            EdgeInsets
                                                                                .all(8.0),
                                                                            child: Text(
                                                                                "Download in process please wait!"),
                                                                          ))),
                                                                  ElevatedButton(
                                                                      onPressed: () {
                                                                        Navigator.pop(
                                                                            context);
                                                                      },
                                                                      child:
                                                                      const Text(
                                                                          "Okay"))
                                                                ],
                                                              ),
                                                            ))
                                                      ],
                                                    ),
                                                  )));
                                      return;
                                    }
                                    var url = _books[index].url.toString();

                                    var filemanager = FileManager.fromUrl(
                                        url, _books[index].Title.toString());
                                    if (_books[index].downloaded) {
                                      await filemanager.deleteFile();


                                      setState(() {
                                        _books[index].downloaded = false;
                                      });
                                    } else {
                                        if(connectivityResult != ConnectivityResult.none){
                                          _books[index].downloading = true;
                                          final data = await filemanager.download(
                                              progress: (downloaded, total) {
                                                onDownloadProgress(DownloadProgress(
                                                    url, downloaded, total!));
                                              });

                                          await filemanager.save(data);
                                          onDownloadComplete(_books[index]);
                                        }else{
                                          print("no internet");
                                        }

                                    }
                                    await FileManager.loadSavedFiles();




                                  //print('download button pressed');
                                },
                                color: ColorsRes.backgroundColor,
                              ),
                            )
                    ],
                  ))
            ],
          )
        ],
      ),
    );
  }

  void updateBookStatus(String? book_id, String? school_id) {

    final db = sqlite3.sqlite3.open('db_file.db');
    final sqlite3.ResultSet check = db.select('SELECT * FROM books WHERE book_id=$book_id');
    // print(check);
    if(check.isEmpty){

      final stmt = db.prepare('INSERT INTO books (book_id,school_id,count) VALUES (?,?,?)');
      stmt
        ..execute([book_id,school_id,'1']);

      stmt.dispose();


    }else{
      int count = int.parse(check[0]['count'].toString())+1;
      String count_ =  count.toString();

      final stmt = db.prepare('Update books set count = ? where book_id=$book_id');
      stmt.execute([count_]);
      stmt.dispose();


      // print("not empty");
    }
    db.dispose();



  }

  Future<bool> checkImageExit(int index) async{
    File image_file = await File(doc_dir+"\\"+Dir_Name+"\\image_"+_books[index].book_id.toString()+".png");
    if(await image_file.exists()){
      // print(true);
      return true;
    }else{
      return false;
    }
  }

  Future<String> _getWebViewPath() async {
    final document = await getApplicationDocumentsDirectory();
    return p.join(
      document.path,
      'desktop_webview_window',
    );
  }
}
