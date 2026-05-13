"""
Управление галереей работ: загрузка, получение и удаление фотографий из S3.
"""
import json
import os
import base64
import uuid
import boto3
from botocore.exceptions import ClientError

BUCKET = "files"
PREFIX = "portfolio/"
ACCESS_KEY = os.environ["AWS_ACCESS_KEY_ID"]
SECRET_KEY = os.environ["AWS_SECRET_ACCESS_KEY"]

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}

CATEGORIES = ["Кровля", "Фасад", "Фундамент", "Пристройка", "Другое"]


def get_s3():
    return boto3.client(
        "s3",
        endpoint_url="https://bucket.poehali.dev",
        aws_access_key_id=ACCESS_KEY,
        aws_secret_access_key=SECRET_KEY,
    )


def cdn_url(key: str) -> str:
    return f"https://cdn.poehali.dev/projects/{ACCESS_KEY}/bucket/{key}"


def handler(event: dict, context) -> dict:
    method = event.get("httpMethod", "GET")

    if method == "OPTIONS":
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": ""}

    s3 = get_s3()

    # GET — список всех фото
    if method == "GET":
        try:
            resp = s3.list_objects_v2(Bucket=BUCKET, Prefix=PREFIX)
        except ClientError as e:
            return {"statusCode": 500, "headers": CORS_HEADERS, "body": {"error": str(e)}}

        photos = []
        for obj in resp.get("Contents", []):
            key = obj["Key"]
            if key == PREFIX:
                continue
            name = key[len(PREFIX):]
            parts = name.split("__", 2)
            category = parts[0] if len(parts) >= 2 else "Другое"
            photos.append({
                "key": key,
                "url": cdn_url(key),
                "category": category,
                "size": obj.get("Size", 0),
            })

        photos.sort(key=lambda x: x["key"], reverse=True)
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": {"photos": photos, "categories": CATEGORIES}}

    # POST — загрузка фото
    if method == "POST":
        body = json.loads(event.get("body") or "{}")
        image_b64 = body.get("image")
        category = body.get("category", "Другое").strip()
        content_type = body.get("contentType", "image/jpeg")

        if not image_b64:
            return {"statusCode": 400, "headers": CORS_HEADERS, "body": {"error": "image required"}}

        if category not in CATEGORIES:
            category = "Другое"

        ext = "jpg"
        if "png" in content_type:
            ext = "png"
        elif "webp" in content_type:
            ext = "webp"

        file_id = uuid.uuid4().hex[:12]
        key = f"{PREFIX}{category}__{file_id}.{ext}"

        image_data = base64.b64decode(image_b64)
        s3.put_object(Bucket=BUCKET, Key=key, Body=image_data, ContentType=content_type)

        return {
            "statusCode": 200,
            "headers": CORS_HEADERS,
            "body": {"ok": True, "key": key, "url": cdn_url(key), "category": category},
        }

    # DELETE — удаление фото
    if method == "DELETE":
        body = json.loads(event.get("body") or "{}")
        key = body.get("key", "").strip()

        if not key or not key.startswith(PREFIX):
            return {"statusCode": 400, "headers": CORS_HEADERS, "body": {"error": "invalid key"}}

        s3.delete_object(Bucket=BUCKET, Key=key)
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": {"ok": True}}

    return {"statusCode": 405, "headers": CORS_HEADERS, "body": {"error": "method not allowed"}}
