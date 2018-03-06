# Timer

## Todos

- [ ] Won't build argon2 package in docker, may need to switch over to a bcrypt package or other. Warning message
```
phoenix_1  | ** (RuntimeError) An error occurred when loading Argon2.
phoenix_1  | Make sure you have a C compiler and Erlang 20 installed.
phoenix_1  | If you are not using Erlang 20, either upgrade to Erlang 20 or
phoenix_1  | use bcrypt_elixir (version 0.12) or pbkdf2_elixir.
phoenix_1  | See the Comeonin wiki for more information.
```
