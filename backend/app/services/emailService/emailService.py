import smtplib
from email.message import EmailMessage
from string import Template
from pathlib import Path


class EmailService:
    email = EmailMessage()

    email["from"] = "Server-bot <bot-server@gmail.com>"
    email["to"] = "test@gmail.com"
    email["subject"] = "An Error!"

    html_template = Template(Path("app/services/emailService/templates/index.html").read_text())

    @classmethod
    def send_email(cls, level, date, text):

        if level == 40:
            err_level = "ERROR"
        elif level == 50:
            err_level = "CRITICAL ERROR"
        else:
            err_level = level

        cls.html_content = cls.html_template.substitute({"level": err_level, "date": date, "text": text})

        cls.email.set_content(cls.html_content, "html")

        with smtplib.SMTP(host="localhost", port=2525) as smtp_server:
            smtp_server.ehlo()
            smtp_server.send_message(cls.email)
