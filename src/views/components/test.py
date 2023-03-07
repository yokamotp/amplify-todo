import boto3
import json
import datetime
from urllib.parse import unquote_plus
from botocore.exceptions import ClientError
dynamodb = boto3.resource('dynamodb', region_name='${AWS::Region}')
table = dynamodb.Table('${DynamoExample}')
s3 = boto3.client('s3')
def lambda_handler(event, context):
    # S3イベント通知から連携されたJSONデータのオブジェクト名、キーを取得
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = unquote_plus(event['Records'][0]['s3']['object']['key'], encoding='utf-8')
    # S3上のJSONデータを取得
    try:
        s3data = s3.get_object(
        Bucket=bucket,
        Key=key,
        ResponseContentType='application/json'
        )

        data = json.loads(s3data['Body'].read().decode('utf-8'))
    except ClientError as e:
        print(e)
    # JSONデータをDynamoDBテーブルにインポート
    with table.batch_writer() as batch:
        for row in data:
            menu = row['menu']
            id = int(row['id'])
            neta = row['neta']
        try:
            batch.put_item(
            Item={
                'menu': menu,
                'id': id,
                'neta': neta
            }
            )
        except ClientError as e:
            print(e)
