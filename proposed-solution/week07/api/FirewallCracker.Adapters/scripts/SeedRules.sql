INSERT INTO Rules (Regex, Description, IsActive)
VALUES ('.{8,}', 'Password must be at least 8 characters long', 1),
       ('.*[A-Z].*', 'Password must include one uppercase letter', 1),
       ('.*[a-z].*', 'Password must include one lowercase letter', 1),
       ('.*[0-9].*', 'Password must include one number', 1),
       ('.*[.*#@$%&].*', 'Password must include one cyber-symbol (. * # @ $ % &)', 1),
       ('^[a-zA-Z0-9.*#@$%&]+$', 'Password must not contain invalid characters', 1);