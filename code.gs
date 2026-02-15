// --- การตั้งค่า ---
const YOUTUBE_CHANNEL_ID = 'ใส่_CHANNEL_ID_ของคุณที่นี่'; // เช่น UCxxxxxxxxxxxxxxx
const DISCORD_WEBHOOK_URL = 'ใส่_WEBHOOK_URL_ที่ได้จาก_Discord';

function checkNewVideo() {
  // 1. ดึงข้อมูล RSS Feed ของช่อง (เป็นวิธีที่ง่ายกว่าใช้ YouTube API และไม่ติด Quota)
  var xmlUrl = 'https://www.youtube.com/feeds/videos.xml?channel_id=' + YOUTUBE_CHANNEL_ID;
  var xml = UrlFetchApp.fetch(xmlUrl).getContentText();
  var document = XmlService.parse(xml);
  var root = document.getRootElement();
  var atom = XmlService.getNamespace('http://www.w3.org/2005/Atom');
  var entries = root.getChildren('entry', atom);
  
  if (entries.length === 0) return; // ถ้าไม่มีวิดีโอเลยให้จบการทำงาน

  // 2. เอาข้อมูลวิดีโอล่าสุดมา
  var latestVideo = entries[0];
  var videoId = latestVideo.getChild('videoId', XmlService.getNamespace('http://www.youtube.com/xml/schemas/2015')).getText();
  var videoTitle = latestVideo.getChild('title', atom).getText();
  var videoUrl = latestVideo.getChild('link', atom).getAttribute('href').getValue();
  
  // 3. ตรวจสอบกับความจำเดิม (Script Properties) ว่าเคยแจ้งเตือนคลิปนี้ไปหรือยัง
  var scriptProperties = PropertiesService.getScriptProperties();
  var lastVideoId = scriptProperties.getProperty('lastVideoId');
  
  if (videoId !== lastVideoId) {
    // 4. ถ้าเป็นคลิปใหม่ ให้ส่งเข้า Discord
    sendToDiscord(videoTitle, videoUrl);
    
    // 5. บันทึกรหัสวิดีโอใหม่เก็บไว้กันลืม
    scriptProperties.setProperty('lastVideoId', videoId);
    Logger.log('New video found and sent: ' + videoTitle);
  } else {
    Logger.log('No new video.');
  }
}

function sendToDiscord(title, url) {
  var payload = {
    "content": "🚨 **มีคลิปใหม่มาแล้วครับ!** 🚨\n\n" + title + "\n" + url
    // คุณสามารถแก้ข้อความตรงนี้ได้ตามใจชอบ
  };

  var options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(payload)
  };

  UrlFetchApp.fetch(DISCORD_WEBHOOK_URL, options);
}
