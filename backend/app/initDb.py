from app.dbConnectors.dbconfig import db_config
from app.dbConnectors.Connectors import ReadConnector, WriteConnector

read, write = db_config()

read_connector = ReadConnector(read)
write_connector = WriteConnector(write)

