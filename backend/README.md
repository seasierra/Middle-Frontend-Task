To install dependencies:

```sh
bun install
```

To populate db:

```sh
bunx drizzle-kit push
```

To interact with orm:

```sh
bunx drizzle-kit generate # create new migration
bunx drizzle-kit migrate # apply migration
```

To run:

```sh
bun run dev
```

open http://localhost:3000
