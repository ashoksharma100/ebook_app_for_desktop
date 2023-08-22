
import 'dart:io';

import 'package:flick_video_player/flick_video_player.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:path_provider/path_provider.dart';

import 'package:video_player/video_player.dart';

class Animations extends StatefulWidget {
  late final String? url;

  Animations({this.url});

  @override
  State<Animations> createState() => _AnimationsState(url:url);
}

class _AnimationsState extends State<Animations> {
  String? url;

  _AnimationsState({this.url});
  late FlickManager flickManager;


  late VideoPlayerController videoPlayerController;

  Widget content = const Scaffold(
      body: Center(
        child: CircularProgressIndicator(),
      ));

  @override
  void initState() {
    super.initState();


    
    // File file = File(url.toString());
    // if(file.exists() == true){
    // print(file);
    //
    // }
    videoPlayerController = VideoPlayerController.asset(url.toString())
      ..initialize().then((_) {
        // Ensure the first frame is shown after the video is initialized, even before the play button has been pressed.
        flickManager = FlickManager(
            videoPlayerController: videoPlayerController,
            autoPlay: false,
            autoInitialize: false);

        content = FlickVideoPlayer(
          flickManager: flickManager,

          preferredDeviceOrientation: const [
            DeviceOrientation.landscapeRight,
            DeviceOrientation.landscapeLeft
          ],


          flickVideoWithControlsFullscreen: const FlickVideoWithControls(
            controls: FlickLandscapeControls(),
            videoFit: BoxFit.contain,
          ),
        );

        setState(() {
          Future.delayed(Duration(seconds: 1), (){
            videoPlayerController.play();
          });


        });
      });



    // // videoPlayerController.initialize();
    // // print(url.toString());
    // // File file = getFileFromAsset(url.toString()) as File;
    // videoPlayerController = VideoPlayerController.asset(url.toString());
    // videoPlayerController.addListener(() {
    //   setState(() {
    //
    //   });
    // });
    // videoPlayerController.setLooping(true);
    // videoPlayerController.initialize().then((_) => setState(() {}));
    // videoPlayerController.play();



  }

  @override
  void dispose() {
    print("disposed");
    flickManager!.dispose();
    videoPlayerController.dispose();
    super.dispose();
    SystemChrome.setPreferredOrientations([
      DeviceOrientation.landscapeLeft,

    ]);
  }

  @override
  Widget build(BuildContext context) {
    final appBar = AppBar(
      elevation: 1,

      // leading: IconButton(
      //   icon: Icon(Icons.menu),
      //   onPressed: () {},
      // ),

    );
    return Scaffold(
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.of(context).pop();
        },
        child: Icon(
          Icons.arrow_back,
        ),
      ),
      body: Container(
        child: content,
      ),
      // home: Text(url.toString()),

    );
  }

  Future<File> getFileFromAsset(String path) async{
    final byteData = await rootBundle.load(path);
    final file = File('${(await getTemporaryDirectory()).path}/$path');
    await file.writeAsBytes(byteData.buffer.asUint8List(byteData.offsetInBytes, byteData.lengthInBytes));

    return file;

  }
}
