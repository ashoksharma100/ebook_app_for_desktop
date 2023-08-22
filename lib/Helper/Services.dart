import 'dart:convert';
import 'dart:io';

import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:path_provider/path_provider.dart';
import 'package:http/http.dart' as http;

import '../Model/BooksModel.dart';
import 'Constatnt.dart';

class GetBooks{
  static Future<List<Books>> getBooks(String userCode, bool reload) async {
    try {
      
      Directory appDocDir = await getApplicationSupportDirectory();
      // print(appDocDir);
      File file = File("${appDocDir.path}/books.json");
      // print(await file.exists());
      final connectivityResult = await (Connectivity().checkConnectivity());
      if(connectivityResult != ConnectivityResult.none){
        reload = true;

      }else{
        reload = false;
      }

      if (reload == false) {
        
        if (! await file.exists()) {

          
          final response = await http.post(
              Uri.parse(APP_URL + SubscribedBookList),
              body: {"api_key":API_KEY,"user_id": userCode});
          // print("response.body");
          await file.writeAsString(response.body);
          // print("test");
        }
      } else if (reload == true) {
        if (await file.exists()) {
          await file.delete(recursive: false);
          final response = await http.post(
              Uri.parse(APP_URL + SubscribedBookList),
              body: { "api_key":API_KEY,"user_id": userCode});
          //print(response.body);
          await file.writeAsString(response.body);
        } else {
          final response = await http.post(
              Uri.parse(APP_URL + SubscribedBookList),
              body: {"api_key":API_KEY,"user_id": userCode});
          //print(response.body);
          await file.writeAsString(response.body);
        }
      }

      var jso = json.decode(await file.readAsString()) as Map<String, dynamic>;
      // print(jso);
      var res = jso['Books'];

      List<Books> booksData = List.empty(growable: true);
      res.map((book) {
        booksData.add(Books(
            Title: book['Title'],
            book_id: book['book_id'],
            Class: book['Class'],
            BookImageUrl: book['BookImageUrl'],
            url: book['url'],
            school_id: book['school_id'],
          expiry: book['expiry'],

        ));
      }).toList();

      // final List<Books> books = bookFromJson(response.body).toList();
      return booksData;
    } catch (e) {
      return <Books>[];
    }
  }

}
class LoginService {
  static Future<dynamic> UserLogin(String email, String password) async {
    try {
      final response = await http.post(Uri.parse(APP_URL + "login.php"),
          body: {'email': email, 'password': password});
      // print(response);
      return json.decode(response.body);

    }catch (e){
      return "Email or password incorrect.";
    }

  }
}
class UploadData {
  static Future<dynamic> upload(String book_id, String school_id,String count) async {
    try {
      final response = await http.post(Uri.parse(APP_URL + "upload.php"),
          body: {'api_key': API_KEY, 'book_id': book_id,'school_id':school_id,'count':count});
      // print(response);
      return json.decode(response.body);

    }catch (e){
      return "Server error";
    }

  }
}