var app = {
  initialize: function() {
    this.bindEvents();
  },
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
    document.addEventListener('resume', this.onDeviceResume, false);
  },
  onDeviceReady: function() {
    cordova.plugins.permissions.requestPermission(cordova.plugins.permissions.RECORD_AUDIO, function(status) {
        console.log(status);
        console.log("permission granted");
    }, error);

    function error(er) {
        console.warn('Audio permission is not turned on');
    }

  },
  onDeviceResume: function() {
    
  }
};
app.initialize();
