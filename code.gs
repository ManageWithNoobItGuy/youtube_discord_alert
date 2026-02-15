// --- การตั้งค่า ---
const YOUTUBE_CHANNEL_ID = 'ใส่_CHANNEL_ID_ที่นี่'; 
const DISCORD_WEBHOOK_URL = 'ใส่_WEBHOOK_URL_ที่นี่';

function checkNewVideo() {
  var xmlUrl = 'https://www.youtube.com/feeds/videos.xml?channel_id=' + YOUTUBE_CHANNEL_ID;
  var xml = UrlFetchApp.fetch(xmlUrl).getContentText();
  var document = XmlService.parse(xml);
  var root = document.getRootElement();
  var atom = XmlService.getNamespace('http://www.w3.org/2005/Atom');
  var entries = root.getChildren('entry', atom);
  
  if (entries.length === 0) return;

  var latestVideo = entries[0];
  var videoId = latestVideo.getChild('videoId', XmlService.getNamespace('http://www.youtube.com/xml/schemas/2015')).getText();
  var videoTitle = latestVideo.getChild('title', atom).getText();
  var videoUrl = latestVideo.getChild('link', atom).getAttribute('href').getValue();
  
  var scriptProperties = PropertiesService.getScriptProperties();
  var lastVideoId = scriptProperties.getProperty('lastVideoId');

  if (videoId !== lastVideoId) {
    sendToDiscord(videoTitle, videoUrl, videoId);
    scriptProperties.setProperty('lastVideoId', videoId);
  }
}

function sendToDiscord(title, url, id) {
  var payload = {
    "embeds": [{
      "title": "📺 มีวิดีโอใหม่จากช่องที่คุณติดตาม!",
      "description": "**" + title + "**\n\n[คลิกเพื่อรับชมวิดีโอ](" + url + ")",
      "color": 16711680, // สีแดง YouTube
      "image": { "url": "https://i.ytimg.com/vi/" + id + "/maxresdefault.jpg" },
      "footer": { "text": "YouTube to Discord Notifier" }
    }]
  };
  
  var options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(payload)
  };
  UrlFetchApp.fetch(DISCORD_WEBHOOK_URL, options);
}
