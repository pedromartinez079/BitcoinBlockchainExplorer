

curl --location --request POST 'https://btc.getblock.io/mainnet/' \
--header 'x-api-key: f2599ba2-c9f4-427e-933e-53a77bffcf10' \
--header 'Content-Type: application/json' \
--data-raw '{
  "id": "getblock.io",
  "jsonrpc": "2.0",
  "method": "getbestblockhash",
  "params": []
}'

