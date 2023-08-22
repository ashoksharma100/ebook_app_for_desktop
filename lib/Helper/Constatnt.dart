const String APP_URL = "https://collins.digitopper.com/windows_app/";
const String API_KEY = "3b14e8b2788d3826a46b586f3c63203f";
const String SubscribedBookList = "book_list.php";
const String Dir_Name = "Ebook_data";
class PositionData {
  final Duration position;
  final Duration bufferedPosition;
  final Duration duration;

  PositionData(this.position, this.bufferedPosition, this.duration);
}