import 'dart:io';

import 'package:ebook_app_for_desktop/screen/HomeScreen.dart';
import 'package:ebook_app_for_desktop/screen/LoginScreen.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:path_provider/path_provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:sqlite3/sqlite3.dart' as sqlite3;
import 'package:connectivity_plus/connectivity_plus.dart';

import 'Helper/ColorsRes.dart';
import 'Helper/Services.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  SharedPreferences preferences = await SharedPreferences.getInstance();
  runApp(MaterialApp(
    debugShowCheckedModeBanner: false,
    home: InitialScreen(preferences),
  ));
}

class InitialScreen extends StatefulWidget {
  SharedPreferences preferences;
  InitialScreen(this.preferences, {super.key});

  @override
  State<InitialScreen> createState() => _InitialScreenState();
}

class _InitialScreenState extends State<InitialScreen> {
  Widget myWidget = const Center(
    child: CircularProgressIndicator(),
  );
  @override
  void initState() {
    updateScreen();

    super.initState();
  }

  updateScreen() async {
    // final connectivityResult = await (Connectivity().checkConnectivity());
    // // print(connectivityResult);
    bool login = widget.preferences.getBool("login") ?? false;
    bool firstTime = widget.preferences.getBool("firstTime") ?? true;
    setState(() {
      // widget.preferences.setBool('firstTime', true);
      myWidget = login ? HomeScreen() : LoginScreen();
    });
    final db = sqlite3.sqlite3.open('db_file.db');


    if(firstTime){
      widget.preferences.setBool('firstTime', false);



        db.execute('''
        CREATE TABLE books (
          id INTEGER NOT NULL PRIMARY KEY,
          book_id TEXT NOT NULL,
          school_id TEXT NOT NULL,
          count INTEGER NOT NULL
        );
      ''');


    }else{
      final connectivityResult = await (Connectivity().checkConnectivity());
      if(connectivityResult != ConnectivityResult.none){
        var data = db.select("Select * from books");
        // print(data);
        data.forEach((element) async{
          // print(element['count']);
          var response = await UploadData.upload(element['book_id'].toString(), element['school_id'].toString(),element['count'].toString());
          //  (response);
        });


      }
    }

    db.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return myWidget;
  }
}

class LoginScreenMain extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreenMain> {
  late TextEditingController _controller;
  late TextEditingController password_controller;
  bool loading = false;
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    _controller = TextEditingController();
    password_controller = TextEditingController();
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: _onBackPressed,
      child: Scaffold(
        body: SafeArea(
            child: Container(
                color: ColorsRes.backgroundColor,
                child: Column(children: <Widget>[
                  Container(
                      height: 76,
                      child: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Padding(
                                padding: const EdgeInsets.all(12),
                                child: SizedBox(
                                    height: 50,
                                    width: 30,
                                    child: Align(
                                      alignment: Alignment.center,
                                      child: Text(""),
                                    )),
                              ),
                              Padding(
                                padding: const EdgeInsets.all(12),
                                child: Text("Welcome",
                                    style: GoogleFonts.titilliumWeb(
                                        fontSize: 16,
                                        color: Colors.white,
                                        decoration: TextDecoration.none)),
                              ),
                              Padding(
                                padding: const EdgeInsets.all(12),
                                child: Card(
                                  color: ColorsRes.menuBack,
                                  shape: RoundedRectangleBorder(
                                      //side: BorderSide(color: Colors.white70, width: 1),
                                      borderRadius: BorderRadius.circular(6)),
                                  child: SizedBox(
                                    height: 50,
                                    width: 30,
                                    child: Align(
                                      alignment: Alignment.center,
                                      child: IconButton(
                                        icon: const Icon(Icons.menu_rounded),
                                        color: Colors.white,
                                        iconSize: 14,
                                        alignment: Alignment.center,
                                        onPressed: () {},
                                      ),
                                    ),
                                  ),
                                ),
                              )
                            ]),
                      )),
                  Expanded(
                    child: Container(
                        child: Container(
                      width: MediaQuery.of(context).size.width,
                      height: MediaQuery.of(context).size.height - 100,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.only(
                          topLeft: Radius.circular(25),
                          topRight: Radius.circular(25),
                          bottomLeft: Radius.circular(0),
                          bottomRight: Radius.circular(0),
                        ),
                        color: Color.fromRGBO(255, 255, 255, 1),
                      ),
                      child: SingleChildScrollView(
                        child: Padding(
                          padding: const EdgeInsets.only(left: 38.0,right: 38),
                          child: Column(
                            children: <Widget>[
                              Padding(
                                padding: const EdgeInsets.only(top: 50.0),
                                child: Center(
                                  child: Container(
                                    width: 310,
                                    child: Text(""),
                                    // child: Image(
                                    //   image: AssetImage(
                                    //       'assets/images/new_logo.png'),
                                    // ),
                                  ),
                                ),
                              ),
                              Padding(
                                padding: const EdgeInsets.only(bottom: 8.0),
                                child: Align(
                                  alignment: Alignment.topLeft,
                                  child: Text(

                                    "Email Id.",
                                    style: GoogleFonts.titilliumWeb(
                                        fontSize: 18,
                                        fontWeight: FontWeight.normal),
                                  ),
                                ),
                              ),
                              TextField(
                                controller: _controller,
                                onChanged: (value) {

                                },
                                style: GoogleFonts.titilliumWeb(
                                    letterSpacing: 2,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 16),
                                decoration: InputDecoration(
                                    contentPadding: const EdgeInsets.all(20),
                                    border: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(17.0),
                                      borderSide:
                                          BorderSide(color: Colors.black38),
                                    ),
                                    isDense: true),
                                keyboardType: TextInputType.emailAddress,
                              ),
                              Padding(
                                padding: const EdgeInsets.only(bottom: 8.0,top: 15),
                                child: Align(
                                  alignment: Alignment.topLeft,
                                  child: Text(

                                    "Password",
                                    style: GoogleFonts.titilliumWeb(
                                        fontSize: 18,
                                        fontWeight: FontWeight.normal),
                                  ),
                                ),
                              ),
                              TextField(
                                obscuringCharacter: '*',
                                obscureText: true,
                                controller: password_controller,


                                onChanged: (value) {

                                },
                                style: GoogleFonts.titilliumWeb(
                                    letterSpacing: 8,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 16),
                                decoration: InputDecoration(
                                    contentPadding: const EdgeInsets.all(20),
                                    border: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(17.0),
                                      borderSide:
                                      BorderSide(color: Colors.black38),
                                    ),
                                    isDense: true),

                              ),
                              Padding(
                                padding: EdgeInsets.all(20),
                                child: loading == false
                                    ? Container(
                                        height: 55,
                                        width: 250,
                                        child: ElevatedButton(
                                          style: ButtonStyle(
                                              shape: MaterialStateProperty.all<
                                                      RoundedRectangleBorder>(
                                                  RoundedRectangleBorder(
                                                      borderRadius:
                                                          BorderRadius.circular(
                                                              37),
                                                      side: BorderSide(
                                                          color: ColorsRes
                                                              .backgroundColor)))),
                                          onPressed: () {

                                            if (_controller.text.toString() ==
                                                "") {
                                              ErrorDialog("Please Enter Email id");
                                            }else if(password_controller.text.toString() ==
                                                ""){
                                              ErrorDialog("Please Enter Password");
                                            }
                                               else {
                                              setState(() {
                                                loading = true;
                                                LoginUser(_controller.text,password_controller.text);
                                              });
                                            }

                                          },
                                          child: Text(
                                            'Submit',
                                            style: GoogleFonts.titilliumWeb(
                                                fontSize: 20,
                                                color: Colors.white),
                                          ),
                                        ),
                                      )
                                    : Center(
                                        child: CircularProgressIndicator(),
                                      ),
                              ),

                            ],
                          ),
                        ),
                      ),
                    )),
                  ),
                ]))),
      ),
    );
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

  void ErrorDialog(String msg) {

    showDialog(
        context: context,
        barrierDismissible: false,
        builder: (BuildContext
        context) =>
            AlertDialog(
                contentPadding:
                EdgeInsets.zero,
                shape: const RoundedRectangleBorder(
                    borderRadius:
                    BorderRadius.all(
                        Radius.circular(
                            15.0))),
                content: SizedBox(
                  height: 200,
                  width: MediaQuery.of(
                      context)
                      .size
                      .width,
                  child: Column(
                    mainAxisAlignment:
                    MainAxisAlignment
                        .start,
                    crossAxisAlignment:
                    CrossAxisAlignment
                        .stretch,
                    mainAxisSize:
                    MainAxisSize
                        .min,
                    children: <Widget>[
                      InkWell(
                        child:
                        Container(
                          padding: const EdgeInsets
                              .only(
                              top: 20.0,
                              bottom:
                              20.0),
                          decoration:
                          BoxDecoration(
                            color: ColorsRes
                                .backgroundColor,
                            borderRadius: const BorderRadius
                                .only(
                                topLeft:
                                Radius.circular(
                                    15.0),
                                topRight:
                                Radius.circular(15.0)),
                          ),
                          child: Center(
                              child:
                              Text(
                                "Error",
                                style: GoogleFonts.titilliumWeb(
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
                                Expanded(
                                    child: Center(
                                        child:
                                        Text(msg))),

                                Padding(
                                  padding: const EdgeInsets.only(bottom: 18.0),
                                  child: ElevatedButton(
                                      onPressed:
                                          () {
                                        Navigator.pop(
                                            context);
                                      },
                                      child: Text(
                                          "Okay")),
                                )
                              ],
                            ),
                          ))
                    ],
                  ),
                )));

  }

  void LoginUser(String email, String password) async{
    var response = await LoginService.UserLogin(email, password);
    if(response['status'] == "success"){
      setState(() {
        loading = false;
      });
      SharedPreferences sharedPreferences = await SharedPreferences.getInstance();
      sharedPreferences.setBool("login", true);
      sharedPreferences.setString("user_id", response["user_id"].toString());
      sharedPreferences.setString("name", response["name"]);
      sharedPreferences.setString("email", response["email"]);
      Navigator.push(context, MaterialPageRoute(builder: (context)=>HomeScreen()));
    }else if(response['status'] == "failed"){
      setState(() {
        loading = false;
      });
      ErrorDialog("Email or password is incorrect. Please Try Again !");

    }
    // print(response['status']);

  }
}
