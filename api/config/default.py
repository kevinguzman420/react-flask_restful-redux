SECRET_KEY = 'b9075a1b895b7018445dedcc730672fb299fe49919ad18aba6bfb2e2bf6e3bd49961bcf7efd3dc68c67be9a2e2bd44a4'

PROPAGATE_EXCEPTIONS = True

# Database configuration
SQLALCHEMY_DATABASE_URI = 'mysql+mysqlconnector://kevinguzman:kevinguzman@localhost:3306/reactflaskapidb'
SQLALCHEMY_TRACK_MODIFICATIONS = False
SHOW_SQLALCHEMY_LOG_MESSAGES = False
ERROR_404_HELP = False

print("IN DEFAULT CONFIGURATION")