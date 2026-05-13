"""
Отправка заявки с сайта: уведомление в Telegram и на email.
"""
import json
import os
import smtplib
import urllib.request
import urllib.parse
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


TELEGRAM_BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "")
TELEGRAM_CHAT_USERNAME = "@gleb_fomin1"
SMTP_EMAIL = "stroitelnayabrigada173@gmail.com"
SMTP_PASSWORD = os.environ.get("SMTP_PASSWORD", "")


def send_telegram(name: str, phone: str, comment: str):
    text = (
        f"📋 *Новая заявка с сайта*\n\n"
        f"👤 Имя: {name}\n"
        f"📞 Телефон: {phone}\n"
        f"💬 Комментарий: {comment or 'не указан'}"
    )
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    data = json.dumps({
        "chat_id": TELEGRAM_CHAT_USERNAME,
        "text": text,
        "parse_mode": "Markdown"
    }).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=10) as resp:
        return json.loads(resp.read())


def send_email(name: str, phone: str, comment: str):
    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Новая заявка с сайта — {name}"
    msg["From"] = SMTP_EMAIL
    msg["To"] = SMTP_EMAIL

    html = f"""
    <html><body style="font-family:Arial,sans-serif;color:#222;padding:24px">
      <h2 style="color:#f59e0b">📋 Новая заявка с сайта</h2>
      <table style="border-collapse:collapse;width:100%;max-width:480px">
        <tr><td style="padding:8px 0;color:#888;width:140px">Имя</td><td style="padding:8px 0;font-weight:bold">{name}</td></tr>
        <tr><td style="padding:8px 0;color:#888">Телефон</td><td style="padding:8px 0;font-weight:bold">{phone}</td></tr>
        <tr><td style="padding:8px 0;color:#888">Комментарий</td><td style="padding:8px 0">{comment or 'не указан'}</td></tr>
      </table>
    </body></html>
    """
    msg.attach(MIMEText(html, "html"))

    with smtplib.SMTP_SSL("smtp.gmail.com", 465, timeout=10) as server:
        server.login(SMTP_EMAIL, SMTP_PASSWORD)
        server.sendmail(SMTP_EMAIL, SMTP_EMAIL, msg.as_string())


def handler(event: dict, context) -> dict:
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    comment = body.get("comment", "").strip()

    if not name or not phone:
        return {"statusCode": 400, "headers": headers, "body": {"error": "name and phone required"}}

    errors = []

    try:
        send_telegram(name, phone, comment)
    except Exception as e:
        errors.append(f"telegram: {str(e)}")

    try:
        send_email(name, phone, comment)
    except Exception as e:
        errors.append(f"email: {str(e)}")

    if errors:
        return {"statusCode": 500, "headers": headers, "body": json.dumps({"error": "; ".join(errors)})}

    return {"statusCode": 200, "headers": headers, "body": json.dumps({"ok": True})}