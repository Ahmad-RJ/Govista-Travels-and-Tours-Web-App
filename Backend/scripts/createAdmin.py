#!/usr/bin/env python3
"""
Script to create an admin user in the GoVista MongoDB database.

Usage:
    python createAdmin.py

Requirements:
    pip install pymongo bcrypt python-dotenv
"""

import os
import sys
from datetime import datetime
from pathlib import Path

try:
    import bcrypt
    from pymongo import MongoClient
    from dotenv import load_dotenv
except ImportError:
    print("Error: Required packages not installed.")
    print("Please run: pip install pymongo bcrypt python-dotenv")
    sys.exit(1)


def load_environment():
    """Load environment variables from .env file."""
    # Get the backend directory (parent of scripts directory)
    backend_dir = Path(__file__).parent.parent
    env_path = backend_dir / '.env'

    if not env_path.exists():
        print(f"Error: .env file not found at {env_path}")
        sys.exit(1)

    load_dotenv(env_path)
    return os.getenv('MONGODB_URI', 'mongodb://127.0.0.1:27017/govista')


def hash_password(password):
    """Hash a password using bcrypt with 10 salt rounds."""
    salt = bcrypt.gensalt(rounds=10)
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')


def create_admin_user(db):
    """Create an admin user in the database."""
    users_collection = db['users']

    # Check if admin user already exists
    existing_admin = users_collection.find_one({'role': 'admin'})

    if existing_admin:
        print("\n✓ Admin user already exists:")
        print(f"  ID: {existing_admin.get('_id')}")
        print(f"  Username: {existing_admin.get('username')}")
        print(f"  Email: {existing_admin.get('email')}")
        print(f"  Name: {existing_admin.get('name')}")
        print(f"\nPassword: admin123")
        return

    # Create new admin user
    admin_data = {
        'username': 'admin',
        'password': hash_password('admin123'),
        'email': 'admin@govista.com',
        'name': 'Admin User',
        'phone': '+92 300 1234567',
        'role': 'admin',
        'isActive': True,
        'createdAt': datetime.utcnow(),
        'updatedAt': datetime.utcnow()
    }

    try:
        result = users_collection.insert_one(admin_data)

        print("\n✅ Admin user created successfully!")
        print(f"  ID: {result.inserted_id}")
        print(f"  Username: admin")
        print(f"  Password: admin123")
        print(f"  Email: admin@govista.com")
        print(f"\n⚠️  Please change the password after first login!")

    except Exception as e:
        print(f"\n❌ Error creating admin user: {e}")
        sys.exit(1)


def main():
    """Main function to create admin user."""
    print("=" * 50)
    print("GoVista Admin User Creator")
    print("=" * 50)

    # Load MongoDB URI from environment
    mongodb_uri = load_environment()
    print(f"\nConnecting to MongoDB...")

    try:
        # Connect to MongoDB
        client = MongoClient(mongodb_uri)
        db = client['govista']

        # Test connection
        client.server_info()
        print("✓ Connected to MongoDB")

        # Create admin user
        create_admin_user(db)

        # Close connection
        client.close()

    except Exception as e:
        print(f"\n❌ Error connecting to MongoDB: {e}")
        print("\nPlease check your MONGODB_URI in the .env file.")
        sys.exit(1)


if __name__ == '__main__':
    main()
