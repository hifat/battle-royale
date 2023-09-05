mongosh -- "$MONGO_INITDB_DATABASE" <<EOF
    var rootUser = '$MONGO_INITDB_ROOT_USERNAME';
    var rootPassword = '$MONGO_INITDB_ROOT_PASSWORD';
    var admin = db.getSiblingDB('traning');
    admin.auth(rootUser, rootPassword);
    var user = 'traning';
    var passwd = '12345678';

    use traning
    db.createUser({
      user: user,
      pwd: passwd,
      roles: ["readWrite"]
    });
EOF
