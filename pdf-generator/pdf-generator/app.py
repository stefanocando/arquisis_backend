import json
import boto3
from fpdf import FPDF

s3 = boto3.client("s3")

"""
event["body"] = {
    "group": 23,
    "user_name": user_name
    "user_mail": user_mail
    "ticket_id": ticket_id
}
"""

def lambda_handler(event, context):
    event = json.loads(event["body"])
    save_to_s3(event)

    return {
        "statusCode": 200,
        "body": json.dumps({
            "url": f"https://generatedpdfsbucket.s3.amazonaws.com/{event['user_name']}_{event['ticket_id']}.pdf"
        }),
    }


def pdf_generator(content): # Content is the body of the post request
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)

    text = json.dumps(content)

    pdf.write(8, text)
    pdf_file_name = f"{content['user_name']}_{content['ticket_id']}.pdf"
    pdf.output("/tmp/" + pdf_file_name, "F")

    return pdf_file_name

def save_to_s3(content):
    pdf = pdf_generator(content)
    s3.upload_file("/tmp/" + pdf, "generatedpdfsbucket", pdf)