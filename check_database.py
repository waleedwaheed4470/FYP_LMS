#!/usr/bin/env python3
"""
Simple database status check - just list what's in Firestore
"""

import firebase_admin
from firebase_admin import credentials, firestore
import os

cred_path = 'final-year-flask-firebase-adminsdk-fbsvc-f1841f2ef4.json'

if os.path.exists(cred_path):
    cred = credentials.Certificate(cred_path)
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    
    print("=" * 60)
    print("FIRESTORE DATABASE STATUS CHECK")
    print("=" * 60)
    
    # Check subjects
    print("\nSUBJECTS IN DATABASE:")
    subjects = []
    for doc in db.collection('subjects').stream():
        subject_data = doc.to_dict()
        subjects.append(subject_data)
    
    if subjects:
        print(f"Found {len(subjects)} subject(s):\n")
        for i, subj in enumerate(subjects, 1):
            print(f"  {i}. {subj.get('subject_name', 'Unknown')}")
    else:
        print("✅ Database is CLEAN - No subjects found")
        print("   Ready for admin to create subjects!")
    
    print("\n" + "=" * 60)
    
else:
    print("❌ Firebase credentials file not found!")
