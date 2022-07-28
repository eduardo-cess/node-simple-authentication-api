#/bin/bash
rm -f /home/application/.env
aws s3 cp s3://cess-bot-project/.env /home/application/.env