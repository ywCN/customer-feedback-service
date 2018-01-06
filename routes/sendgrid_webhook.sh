function localtunnel {
  lt -s yw43aefwhefkla --port 5000
}
until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done