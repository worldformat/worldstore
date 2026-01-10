# worldstore

A minimal host for **human-editable World files**, with built-in UI, API, and history.

worldstore provides a place to store, edit, and serve World documents —
one file per user per app — without forcing early schema, CRUD UI, or database design.

## What is this?

worldstore is:

- a local or server-side service
- with a simple management UI
- exposing a minimal HTTP API
- backed by Object Storage or RDB (pluggable)
- designed around the **World Format**

It treats the World file itself as the source of truth.

No records.  
No partial updates.  
No forms required.

## Core Ideas

- **One World = One File**
- The document represents the entire state
- Editing the file *is* the operation
- History is automatic
- UI and API are thin layers over storage

worldstore does not try to be a database.
It tries to be a place where a world can exist.

## Features

- Plain-text World file storage
- Web-based editor (textarea-first)
- Optional custom UI on top of parsed World data
- Automatic history on update
- Rollback-friendly by design
- Local-first, cloud-capable

## API (minimal)

worldstore exposes a minimal HTTP API for accessing World documents.

### Raw World text

```
GET /worlds/{worldId}
```

- Returns raw World text
- No JSON schema exposed
- No partial views

### Parsed World (JSON)

```
GET /api/worlds/{worldId}/json
```

- Returns the parsed World as JSON
- Parsing is performed by worldstore
- If the World cannot be parsed, the API returns `400 Bad Request`

All write operations (create / update / delete) are currently performed
via the built-in UI.

History handling depends on the storage backend.

For local storage, worldstore manages history internally.
For object storage backends (such as GCS), history relies on native object versioning.

## Storage

worldstore is designed to be storage-agnostic in principle.

Currently supported backends:
- Local filesystem
- Google Cloud Storage (GCS)

Other backends (such as S3 or relational databases) are not implemented.
Pull requests adding new storage backends are welcome, but there is no
roadmap commitment to support them.

The storage layer is responsible for persistence and history,
not interpretation.

## Intended Use Cases

- Personal apps
- Admin panels
- Internal tools
- Low-scale, long-lived systems
- Human–AI collaborative editing workflows

Not intended for:
- High-frequency writes
- Multi-user concurrent editing
- Strong transactional guarantees

## Status

This project is early and evolving.

The design prioritizes:
- clarity over features
- stability over cleverness
- late decisions over early constraints

Breaking changes are possible.

## Related Projects

- **[World Format](https://worldformat.org)**  
  The document format used by worldstore.

- **[worldformat](https://github.com/worldformat/worldformat)**  
  The reference implementation of the World Format parser and related utilities.

- **[worldformat.org](https://github.com/worldformat/worldformat.org)**  
  Source repository for the official World Format website.

## License

MIT