import 'package:ebook_app_for_desktop/Helper/ColorsRes.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:math' as math;
import '../Helper/Services.dart';
import '../Helper/ColorsRes.dart';

import 'HomeScreen.dart';


class LoginScreen extends StatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
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
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        body: Container(
          child: Padding(
            padding: const EdgeInsets.all(50.0),
            child: Column(
              children: [
                Expanded(
                  child: Row(
                    children: [
                      Expanded(child: Padding(
                        padding: const EdgeInsets.all(88.0),
                        child: Image(image: AssetImage('assets/Illustration.png')),
                      )),
                      Expanded(child: Container(
                        // width: MediaQuery.of(context).size.width,

                        child: Card(
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(20)
                          ),
                          elevation: 4,
                          child: Padding(
                            padding: const EdgeInsets.all(28.0),
                            child: Column(
                              // crossAxisAlignment: CrossAxisAlignment.start,
                              // mainAxisSize: MainAxisSize.min,
                              children: [
                                // Text("Welcome to",style: GoogleFonts.poppins(fontSize: 26,fontWeight: FontWeight.w500),textAlign: TextAlign.left,),
                                Text("Orient BlackSwan",style: GoogleFonts.poppins(fontSize: 30,fontWeight: FontWeight.bold,color: Color.fromARGB(
                                    255, 99, 88, 220)),textAlign: TextAlign.center,),
                                Padding(
                                  padding: const EdgeInsets.only(top: 38.0),
                                  child: Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: [
                                      Divider(
                                          color: Color.fromRGBO(0, 0, 0, 1.0),
                                          thickness: 5
                                      ),
                                      Image(image: AssetImage('assets/obs-logo.png'),height: 30,),
                                      Divider(
                                          color: Color.fromRGBO(191, 191, 191, 1),
                                          thickness: 1
                                      )
                                    ],
                                  ),
                                ),
                                // Figma Flutter Generator OrWidget - GROUP

                                Padding(
                                  padding: const EdgeInsets.only(top: 38.0),
                                  child: TextField(
                                    controller: _controller,

                                    decoration: InputDecoration(

                                      prefixIcon: Icon(Icons.email),
                                      label: Text("Email",style: GoogleFonts.poppins(fontWeight: FontWeight.normal,fontSize: 12),),
                                      focusedBorder: OutlineInputBorder(
                                        borderSide: BorderSide(color: Colors.black),
                                        borderRadius: BorderRadius.circular(25.7),
                                      ),
                                      enabledBorder: OutlineInputBorder(
                                        borderSide: BorderSide(color: Colors.black),
                                        borderRadius: BorderRadius.circular(25.7),
                                      ),
                                    ),
                                  ),
                                ),
                                Padding(
                                  padding: const EdgeInsets.only(top: 28.0),
                                  child: TextField(
                                    obscuringCharacter: '*',
                                    obscureText: true,
                                    controller: password_controller,


                                    decoration: InputDecoration(

                                      prefixIcon: Icon(Icons.key_outlined),
                                      label: Text("Password",style: GoogleFonts.poppins(fontWeight: FontWeight.normal,fontSize: 12),),
                                      focusedBorder: OutlineInputBorder(
                                        borderSide: BorderSide(color: Colors.black),
                                        borderRadius: BorderRadius.circular(25.7),
                                      ),
                                      enabledBorder: OutlineInputBorder(
                                        borderSide: BorderSide(color: Colors.black),
                                        borderRadius: BorderRadius.circular(25.7),
                                      ),
                                    ),
                                  ),
                                ),
                                Padding(
                                  padding: const EdgeInsets.only(top: 28.0),
                                  child: loading == false
                                    ? SizedBox(
                                    width: MediaQuery.of(context).size.width,
                                    height: 45,
                                    child: ElevatedButton(

                                      style: ElevatedButton.styleFrom(
                                        primary: Color.fromARGB(
                                            255, 99, 88, 220)
                                      ),
                                        onPressed: (){
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
                                        child: Text("Login",style: GoogleFonts.poppins(fontSize: 15),)
                                    ),
                                  )
                                      : CircularProgressIndicator()
                                )

                              ],
                            ),
                          ),
                        ),
                      ))

                    ],
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(top: 8.0),
                  child: Align(
                    alignment: Alignment.bottomCenter,
                      child: Text("Powered by Digitopper")
                  ),
                )
              ],
            ),
          ),
        ),
      ),
    );
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
                            color: ColorsRes.backgroundColor,
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
    print(response['status']);

  }
}
