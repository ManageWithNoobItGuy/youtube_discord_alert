YouTube to Discord Notification Bot
สคริปต์ Google Apps Script สำหรับตรวจจับวิดีโอใหม่จาก YouTube Channel และส่งการแจ้งเตือนไปยัง Discord Server โดยอัตโนมัติ.

📋 คุณสมบัติ
RSS Feed Based: ใช้การดึงข้อมูลจาก XML Feed ซึ่งรวดเร็วและไม่สิ้นเปลือง YouTube API Quota.

Smart Notification: ตรวจสอบวิดีโอล่าสุดและเปรียบเทียบกับข้อมูลเดิม เพื่อป้องกันการแจ้งเตือนซ้ำ.

Discord Integration: ส่งข้อมูลผ่าน Webhook พร้อมชื่อคลิปและลิงก์วิดีโอ.

🛠 ขั้นตอนที่ 1: การเตรียมข้อมูลพื้นฐาน
1.1 วิธีหา YouTube Channel ID
คุณจำเป็นต้องใช้รหัสช่อง (Channel ID) เพื่อระบุแหล่งข้อมูล:

ดูจาก URL: เข้าไปที่หน้าหลักของช่อง YouTube หาก URL เป็นแบบ youtube.com/channel/UCxxxxxxxxxxxx รหัสที่ต่อท้ายคือ Channel ID.

สำหรับช่องตัวเอง: ไปที่ Settings (การตั้งค่า) > Advanced settings (การตั้งค่าขั้นสูง) คุณจะเห็น "Channel ID" สามารถกดคัดลอกได้ทันที.

สำหรับช่องที่เป็น Handle (@name): ให้เข้าไปที่เว็บไซต์ commentpicker.com/youtube-channel-id แล้ววาง URL ของช่องเพื่อดึง ID ออกมา.

1.2 วิธีสร้าง Discord Webhook URL
เปิด Discord และไปที่ Server Settings ของคุณ.

เลือกเมนู Integrations > คลิก Webhooks.

คลิก New Webhook.

ตั้งชื่อบอทและเลือกห้อง (Channel) ที่ต้องการให้ข้อความไปปรากฏ.

คลิก Copy Webhook URL เก็บไว้เพื่อนำไปใช้ในสคริปต์.

💻 ขั้นตอนที่ 2: การติดตั้งใน Google Apps Script
ไปที่ Google Apps Script.

คลิก New Project (โครงการใหม่).

คัดลอก Code จากไฟล์ code.gs ไปวางแทนที่โค้ดเดิมทั้งหมด.

แก้ไขตัวแปรที่ส่วนหัวของสคริปต์:

YOUTUBE_CHANNEL_ID: วางรหัสช่องที่หามาได้.

DISCORD_WEBHOOK_URL: วาง URL ที่คัดลอกมาจาก Discord.

กดรูป 💾 Save และตั้งชื่อโครงการ.

ทดสอบโดยการกดปุ่ม Run (เรียกใช้) และกดยอมรับสิทธิ์ (Review Permissions) ในครั้งแรก.

⏰ ขั้นตอนที่ 3: การตั้งค่า Trigger เพื่อทำงานอัตโนมัติ
เพื่อให้สคริปต์ทำงานเองโดยที่คุณไม่ต้องกด Run ให้ทำตามขั้นตอนดังนี้:

ที่แถบเมนูด้านซ้ายมือ คลิกที่ไอคอนรูป นาฬิกา (Triggers).

คลิกปุ่ม + Add Trigger (เพิ่มทริกเกอร์) ที่มุมขวาล่าง.

ตั้งค่าตามรายละเอียดดังนี้:

Choose which function to run: เลือก checkNewVideo.

Choose which deployment should run: เลือก Head.

Select event source: เลือก Time-driven.

Select type of time based trigger: เลือก Minutes timer.

Select minute interval: เลือกความถี่ที่ต้องการ (แนะนำที่ Every 15 minutes หรือ Every 30 minutes).

กด Save.

📂 โครงสร้างไฟล์
code.gs: ไฟล์หลักที่จัดการการดึงข้อมูล (Fetch), การตรวจสอบความซ้ำ (Script Properties) และการส่งข้อมูล (Webhook).

หากต้องการปรับแต่งข้อความแจ้งเตือน สามารถแก้ไขได้ที่ส่วนของ payload ในฟังก์ชัน sendToDiscord.
