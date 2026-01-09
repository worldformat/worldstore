# worldstore

A minimal host for **human-editable World files**, with built-in UI and history.

worldstore provides a place to store, edit, and manage World documents —
one file per user per app — without forcing early schema, CRUD UI, or database design.

## What is this?

worldstore is:

- a local or server-side service
- with a simple management UI
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
- UI is a thin layer over storage

worldstore does not try to be a database.  
It tries to be a place where a world can exist.

## Features

- Plain-text World file storage
- Web-based editor (textarea-first)
- Optional custom UI on top of parsed World data
- Automatic history on update
- Rollback-friendly by design
- Local-first, cloud-capable

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