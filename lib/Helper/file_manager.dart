import 'dart:io';

import 'package:easy_pdf_viewer/easy_pdf_viewer.dart';
import 'package:flutter/foundation.dart';

import 'package:path_provider/path_provider.dart';

import 'Constatnt.dart';
import 'encrypter.dart';

class FileManager {
  late String url;
  late String book_name;
  static String? dir_name;

  File? encryptedFile;
  static List<String>? files;
  static String? dirPath;
  static DownloadProgress? downloadProgress;
  static Function onDownloadProgress = (DownloadProgress newProgress) {
    downloadProgress = newProgress;
  };
  static bool occupied = false;

  static Function onDownloadComplete = () {
    downloadProgress = null;
  };

  static final FileManager _fileManager = FileManager._internal();

  factory FileManager.fromUrl(url, String book_name) {
    _fileManager.url = url;
    return _fileManager;
  }

  FileManager(this.url);

  FileManager._internal();

  static String updateExtension(String fileName,
      {String newExtension = ".aes"}) {
    final extension = fileName.split(".").last;
    return fileName.replaceFirst(".$extension", newExtension);
  }

  static Future<String?> getDirPath() async {
    if (dirPath == null) {
      Directory appDocDir = await getApplicationDocumentsDirectory();
      dirPath = appDocDir.path;
    }
    return dirPath;
  }

  static convertUrl(url) async {
    final path = await getDirPath();
    String fileName = Uri.parse(url).path.replaceAll("/", "_");
    fileName = updateExtension(fileName);
    return "$path/$dir_name/$fileName";
  }

  Future<File> getEncryptedFile() async {
    var path = await convertUrl(url);
    encryptedFile = File(path);
    return encryptedFile!;
  }

  Future<Uint8List> download({Function(int, int?)? progress}) async {
    occupied = true;
    var request = await HttpClient().getUrl(Uri.parse(url));
    var response = await request.close();
    onDownloadProgress = (DownloadProgress newProgress) {
      downloadProgress = newProgress;
    };
    onDownloadComplete = () {
      downloadProgress = null;
    };
    var bytes = await consolidateHttpClientResponseBytes(response,
        onBytesReceived: (downloaded, total) {
      progress!(downloaded, total);

      onDownloadProgress(DownloadProgress(url, total, downloaded));
    });

    onDownloadComplete();
    occupied = false;
    return bytes;
  }

  Future<File> save(Uint8List data) async {
    File encryptedFile = await getEncryptedFile();
    encryptedFile = await encryptedFile.create(recursive: true);
    // final encryptedData = encrypt(data);
    await encryptedFile.writeAsBytes(data);
    log("File saved successfully");
    return await getTemporaryFile(data);
  }

  Future<File> load() async {
    File encryptedFile = await getEncryptedFile();
    Uint8List encryptedData = await encryptedFile.readAsBytes();
    // Uint8List originalData = decrypt(encryptedData);
    return await getTemporaryFile(encryptedData);
  }

  Future<bool> fileExists() async {
    File encryptedFile = await getEncryptedFile();
    return await encryptedFile.exists();
  }

  static loadSavedFiles() async {
    // print("LOADSAVEDFILES");
    Directory appDocDir = await getApplicationDocumentsDirectory();
    // print(appDocDir);
    // var docs = appDocDir.listSync();
    var docs = appDocDir.listSync();
    // print(docs);
    docs.forEach((element) {
      if (element.path.contains(Dir_Name)) {
        Directory eBook_Dir = element.absolute as Directory;
        var _docs = eBook_Dir.listSync();
        files = _docs
            .map((e) => e.path)
            .where((path) => path.contains(".aes"))
            .toList();
        // print(files);
      }
    });

    // print(files);
  }

  static doesExists(String url) async {
    // print(files);
    if (files == null) {
      await loadSavedFiles();
    }

    String convertedUrl = await convertUrl(url);
    // print(convertedUrl);
    // print(files);
    return files!.contains(convertedUrl.replaceAll("/", "\\"));
  }

  static deleteAllFiles() async {
    await loadSavedFiles();
    for (var file in files!) {
      await File(file).delete();
    }
    await loadSavedFiles();
  }

  deleteFile() async {
    occupied = true;
    File encryptedFile = await getEncryptedFile();
    await encryptedFile.delete();
    occupied = false;
    log("File Deleted Successfully");
  }

  void log(String message) {
    print(message);
  }

  Future<File> getTemporaryFile(Uint8List data) async {
    String dir = (await getTemporaryDirectory()).path;
    File temp = File("$dir/temp.file");
    await temp.writeAsBytes(data);
    return temp;
  }
}
