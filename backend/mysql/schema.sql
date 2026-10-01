-- KPCT contact submissions (MySQL 8).
-- Applied by `npm run db:setup` in backend/, or run manually.
-- Columns mirror the fields the API already collects.

CREATE TABLE IF NOT EXISTS contact_submissions (
  id          CHAR(36)     NOT NULL,
  name        VARCHAR(255) NOT NULL,
  email       VARCHAR(320) NOT NULL,
  phone       VARCHAR(40)      NULL,
  subject     VARCHAR(255) NOT NULL,
  interest    VARCHAR(64)      NULL,
  message     TEXT         NOT NULL,
  source      VARCHAR(64)  NOT NULL DEFAULT 'website',
  received_at DATETIME(3)  NOT NULL,
  created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY contact_submissions_received_at_idx (received_at DESC),
  KEY contact_submissions_email_idx (email)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;
