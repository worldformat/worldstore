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

The primary API operates on raw World text.

```
GET    /worlds/{worldId}
PUT    /worlds/{worldId}
POST   /worlds
DELETE /worlds/{worldId}
```
- Body: raw World text
- No JSON schema exposed
- No partial updates

History is managed internally.

## Storage

worldstore is storage-agnostic.

Possible backends:
- Object Storage (S3 / GCS / etc.)
- Relational DB (TEXT column)
- Local filesystem (development)

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

## Related

- **World Format** — the document format used by worldstore  
  https://worldformat.org

## License

MIT