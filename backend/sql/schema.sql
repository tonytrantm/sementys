BEGIN;

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  profile_picture TEXT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  country TEXT,
  city TEXT,
  phone TEXT,
  email_alert BOOLEAN DEFAULT false,
  sms_alert BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS _index_users_email ON users (email);

COMMIT;

