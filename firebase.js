import { initializeApp } from 'firebase/app';



const firebaseConfig = {

    "type": "service_account",
    "project_id": "cis-454-group-2",
    "private_key_id": "8c88dbde5210803bfeb7b480322261bd5e9c18f9",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDQBfBZoFygfN1E\nbva0jXbvfKCneaovKjNDBjmBGNEgIUKlJlDYcIlGTPIDmv13feG99cbuJDgmLIne\n370pwKzdOLLUSvrs0Lz9XN79fnti1SIMsggPGtJSn/L0XhquxS8lyMfhWmRj6dPm\nVGwHEarwa5+WNHhuOXuDzW/Vq79sQM7S8RtLncbRKcuASjnke/yFAl46ORfS5viJ\ntJZ5VU3DbM9EPgBYZC50SYStHHQwA3APAnyWqiX3j0/ANOMq1hWDtctwr4lwFwL5\n7TGpFSXL2i/hLxvgvpRf0cy8ob6zalzNLQpNckjMJB/zNkC1Box5TdbKcdg/zDzh\nhxHPvKGpAgMBAAECggEAVAkCJoLUyHSIwnt9KEU5tdeH4wAQUwteOAZMtq061hr5\nnFPVNwqHOiIdZn13RY1R43ZlTZDOKgW2EJYcCcDvVFLyUzaTFZXhswyQfKFa4Psu\nzSgif0+bhYteD3/wkYfQ2xe4P35PrdkpJBQYq+ZkQsmHZ5t8xzJrhjw4oH3IT8dH\nshnEmHxnWOywSjP48a2Qfg6qyxvCyA0H4TgkBUlWYlmzGaFDx5PzAybYxSQ8Zkke\nnOPtdArJkAirGpmxujn5VZ0Pjnnk+K3kYmlQx7iaEsO9fns6P8mwsllFG0RJwB3I\ng7ukvIzohNTG3+Qje5gRXQ9kXcSsu5cVmPDI+LNZnQKBgQD18JLsExt1k2KED488\nuN6TjpjvTiAw9qCt6p4+wwooBxjaE2hQ3XE5I2zg45XEe0WZ67NHAyRKSLwsa0m9\nP167AchFP3Qti+36xanIeSHVJJHahtA4LhpSNk9SwPjsPhkEouAIHq4NmGV0jKZb\n981RnXZPVDolHxNcjZ5yXiBUJwKBgQDYiE+2T5Sanrb+WYLse/QutRy3iF7QN19s\nViji63P3Lha8Xp3DRnczyh5nHvJIhwTmC03y7LjAphJWJum7s3uS3YhomTQhqmfa\nquRC22gEqr78PxYFz8k9VjFYUX3mJrCco7+KCYraDiCpwBeDqPNyD4mURbcIUr6H\n97dKNk3trwKBgQDlQlFzR4x9WdqoCGkZzauOGYtu6IERo5W9Ccxh7SZ2kccU4qqH\nVyXIgcFpEj32XoNPLGx+cetOY+cl8Q1YIM6JvOuXwcLnAl3hOok+m8xyCBj+gFVx\nSWi34nCnT8O7VVe0/q+gYhkWC03oC4S4jpMS1ZoH8RgSqpk92bYuHpg8WQKBgQDO\nFCVxSJoQ8j8NIdnWAj6qeVqEXjiGiDy8GeA934L13BptWsthP15RnuqCkFRcrIv/\n+QBN0/gd+bB35/8J0k8ovsiFbFHOPKUs2vn1m2WLE4pC/jOSgmhvhOnfuWdONMJf\nwgSYdm59C3cQt65pctGHW7w/rn39YOrO8vaxna9bJwKBgQCjkpRB5C3SnmCJnl0m\ndYiHB6mw/06QgDxky7SEw2I4ue650dZPT9Udnaf+Rt+vS3mhgpKOhWVXBzlL/wty\n9kuTPMVIiTkHU2s3n37XER+B4fxreyH5ooumuZ1wseOrQCRo0vPF1AULQgzKFjz/\nF+B6xaiw9Cpul9PsuIZLTqm1KQ==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-axxwa@cis-454-group-2.iam.gserviceaccount.com",
    "client_id": "101466497023467050141",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-axxwa%40cis-454-group-2.iam.gserviceaccount.com"
};

const app = initializeApp(firebaseConfig);