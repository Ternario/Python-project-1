import logging
from datetime import datetime
from app.services.emailService.emailService import EmailService


class LoggerService:
    logger = logging.getLogger(__name__)
    log_format = logging.Formatter("%(levelname)s - %(asctime)s - %(name)s - %(message)s")
    handler = logging.FileHandler("errors.log")
    handler.setFormatter(log_format)
    logger.addHandler(handler)

    @staticmethod
    def compare_files(message):
        with open("errors.log", "r") as file:
            content = file.read()

        return True if str(message) in content else False

    @classmethod
    def write_critical_error_into_log_file(cls, message):
        result = LoggerService.compare_files(message)

        if result:
            return

        cls.logger.setLevel(logging.CRITICAL)
        cls.logger.critical("An exception occurred: %s", str(message), exc_info=True)

        date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        EmailService.send_email(cls.logger.level, date, str(message))

    @classmethod
    def write_error_into_log_file(cls, message):
        result = LoggerService.compare_files(message)

        if result:
            return

        cls.logger.setLevel(logging.ERROR)
        cls.logger.error("An exception occurred: %s", str(message), exc_info=True)

        date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        EmailService.send_email(cls.logger.level, date, str(message))
