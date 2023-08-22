import 'dart:convert';

List<Books> bookFromJson(String str) =>
    List<Books>.from(json.decode(str).map((x) => Books.fromJson(x)));

String bookToJson(List<Books> data) =>
    json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class Books {
  Books({this.Title,this.book_id, this.Class, this.BookImageUrl, this.url,this.school_id,this.expiry});

  String? Title;
  String? book_id;
  String? Class;
  String? BookImageUrl;
  String? url;
  String? school_id;
  String? expiry;

  bool downloaded = false;
  bool downloading = false;


  factory Books.fromJson(Map<String, dynamic> json) => Books(
      Title: json["Title"],
      book_id: json["book_id"],
      Class: json["Class"],
      BookImageUrl: json["BookImageUrl"],
      url: json["url"],
      school_id: json["school_id"],
    expiry: json["expiry"],

  );

  Map<String, dynamic> toJson() => {
        "Title": Title,
        "book_id": book_id,
        "Class": Class,
        "BookImageUrl": BookImageUrl,
        "url": url,
        "school_id": school_id,
    "expiry": expiry,

      };
}
