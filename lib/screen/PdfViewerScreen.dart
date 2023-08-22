
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:easy_pdf_viewer/easy_pdf_viewer.dart';
import 'package:flutter/services.dart';



class PdfViewerScreen extends StatefulWidget {

  final String? url;



  PdfViewerScreen({this.url});

  @override
  State<PdfViewerScreen> createState() => _PdfViewerScreenState(url:url);
}

class _PdfViewerScreenState extends State<PdfViewerScreen> {
  _PdfViewerScreenState({this.url});
  String? url;
  late PDFDocument document;

  bool _isLoading = true;

  DownloadProgress? downloadProgress;




  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    SystemChrome.setPreferredOrientations([
      DeviceOrientation.landscapeLeft,


    ]);
    loadDocument();

    print(url);

  }
  loadDocument() async{
    await DefaultCacheManager().emptyCache();
    // File pdf_file = File(url.toString());
    print(url.toString());

      this.document = await PDFDocument.fromAsset(url.toString());
      setState(() {
        _isLoading = false;
      });




    // PDFDocument.fromURLWithDownloadProgress(
    //     url.toString(),
    //     downloadProgress: (downloadProgress)=>setState(() {
    //       this.downloadProgress = downloadProgress;
    //
    //     }),
    //     onDownloadComplete: (document) => setState(() {
    //       this.document = document;
    //       _isLoading = false;
    //
    //     })
    // );
  }
  Widget buildprogress(){
    if(downloadProgress == null) return SizedBox();
    String parseBytesToKBs(int bytes) {
      return '${(bytes / 1000).toStringAsFixed(2)} KBs';
    }

    String progressString = parseBytesToKBs(downloadProgress!.downloaded);
    if (downloadProgress?.totalSize != null) {
      progressString += '/'+ parseBytesToKBs(downloadProgress!.totalSize ?? 0);
    }

    return Column(
      children: [
        SizedBox(height: 20),
        Text(progressString),
      ],
    );
  }
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(

        floatingActionButton: FloatingActionButton(
          onPressed: (){
            Navigator.of(context).pop();
          },
          child: Icon(Icons.arrow_back),


        ),
        body: SafeArea(
          child:_isLoading
                ? Center(child: CircularProgressIndicator(),)
                : PDFViewer(
            document: document,
          ),
        ),
      ),
    );
  }
}
