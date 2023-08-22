import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';


class ExpiryScreen extends StatefulWidget {
  const ExpiryScreen({Key? key}) : super(key: key);

  @override
  State<ExpiryScreen> createState() => _ExpiryScreenState();
}

class _ExpiryScreenState extends State<ExpiryScreen> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
        home: Scaffold(
          body: SafeArea(
              child: Center(
                  child: Column(
                    children: [
                      IconButton(onPressed: (){
                        Navigator.pop(context);
                      }, icon: Icon(Icons.home)),
                      Container(
                        child: Text("The Subscription for this book has Expired. Please contact your Administrator.",style: GoogleFonts.poppins(fontSize: 30,),),
                      ),
                    ],
                  )
              )
          ),
        )
    );
  }
}
