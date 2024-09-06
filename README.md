

# [Dob protocol contracts for distribution]

### 🏗️ Building

```sh
cargo b -p "dobprotocol*"
```

### ✅ Testing

Run all tests, except `gclient` ones:
```sh
cargo t -p "escrow*" -- --skip gclient
```

Run all tests:
```sh
# Download the node binary.
cargo xtask node
cargo t -p "escrow*"
```
