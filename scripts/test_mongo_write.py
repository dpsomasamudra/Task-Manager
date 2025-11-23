import os
import sys
import uuid
from datetime import datetime
from pymongo import MongoClient

uri = os.getenv("MONGO_TEST_URI", "mongodb+srv://dpsomasamudra_db_user:T7Pm1rGKI7NHTj2A@project123.tzjlkcq.mongodb.net/")
db_name = os.getenv("MONGO_TEST_DB", "Task-Manager")
coll_name = os.getenv("MONGO_TEST_COLLECTION", "connectivity_tests")

def attempt(insecure=False):
    opts = {"serverSelectionTimeoutMS": 10000}
    if insecure:
        opts["tlsAllowInvalidCertificates"] = True
    client = MongoClient(uri, **opts)
    client.admin.command("ping")
    db = client.get_database(db_name)
    coll = db.get_collection(coll_name)
    token = str(uuid.uuid4())
    doc = {"_type": "connection_test", "token": token, "ts": datetime.utcnow()}
    coll.insert_one(doc)
    found = coll.find_one({"token": token})
    return bool(found)

try:
    ok = attempt(False)
    print("WRITE_OK" if ok else "WRITE_FAILED")
except Exception:
    try:
        ok = attempt(True)
        print("WRITE_OK" if ok else "WRITE_FAILED")
    except Exception as e:
        print(f"ERROR: {e}")
        sys.exit(1)