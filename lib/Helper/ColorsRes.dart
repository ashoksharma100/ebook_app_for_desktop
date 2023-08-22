import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class ColorsRes {
  static const MaterialColor appColorMaterial = const MaterialColor(
    0xff2889B9,
    const <int, Color>{
      50: const Color(0xff2889B9),
      100: const Color(0xff2889B9),
      200: const Color(0xff2889B9),
      300: const Color(0xff2889B9),
      400: const Color(0xff2889B9),
      500: const Color(0xff2889B9),
      600: const Color(0xff2889B9),
      700: const Color(0xff2889B9),
      800: const Color(0xff2889B9),
      900: const Color(0xff2889B9),
    },
  );
  static Color appColor = Color(0xFF2889B9);
  //static Color appColorGradient = Color(0xff2889B9);
  //static Color yellow = Color(0xffFFCA5F);
  //static Color yellowGradient = Color(0xffFEB234);
  static Color backgroundColor = Color.fromARGB(255, 255, 145, 0);
  //static Color white = dark_mode ? Color(0xFFFFFFFF) : Color(0xFF000000);
  static Color white = Color(0xFFFFFFFF); //2
  //static Color grey1 = Color(0xFF1E1E1E);
  static Color grey = Color(0xFF333333); //1 background color
  //static Color grey1 = Color(0xFF050505);
  static Color black = Color(0xFF000000); //3
  static Color textcolor = Color(0xFF7FFFD4);
  static Color? grey1 = Colors.grey[800];
  static Color? menuBack = Color(0xFF3450A1);
  static Color? buttonBack = Color(0xFF00AD7D);
  static Color? starBack = Color(0xFFFFC529);
  static Color borderColor = Color(0xFFD4D4D4);
  static Color audioCardColor = Color(0xDBF3FBFF);
  static Color bookmarkCardColor = Color(0xFFCC0033);
  static Color highLightCardColor = Color(0xFF00AE7D);
  static Color notesCardColor = Color(0xFF663398);
  static Color TocCardColor = Color(0xFFF1F1F1);
  static Color bottomCardColor = Color(0xFFF2F2F2);
  static Color bottomBoxColor = Color(0xFFF1F1F1);
  static Color cardItemColor = Color(0xFFE6E6E6);

}
