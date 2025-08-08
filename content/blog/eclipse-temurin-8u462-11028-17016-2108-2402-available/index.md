---
title: Eclipse Temurin 8u462, 11.0.28, 17.0.16, 21.0.8 and 24.0.2 Available
date: "2025-07-23"
author: pmc
description: Adoptium is happy to announce the immediate availability of Eclipse Temurin 8u462, 11.0.28, 17.0.16, 21.0.8 and 24.0.2. As always, all binaries are thoroughly tested and available free of charge without usage restrictions on a wide range of platforms.
tags:
  - temurin
  - announcement
  - release-notes
---

Adoptium is happy to announce the immediate availability of Eclipse Temurin 8u462-b08, 11.0.28+6, 17.0.16+8, 21.0.8+9 and 24.0.2+12. As always, all binaries are thoroughly tested and available free of charge without usage restrictions on a wide range of platforms. Binaries, installers, and source code are available from the [Temurin download page](https://adoptium.net/temurin/releases), [official container images](https://hub.docker.com/_/eclipse-temurin) are available at DockerHub, and [installable packages](https://adoptium.net/installation/) are available for various operating systems.

## Fixes and Updates

This release contains the following fixes and updates.

- [Temurin 8u462 release notes](https://adoptium.net/temurin/release-notes/?version=jdk8u462-b08)

- [Temurin 11.0.28 release notes](https://adoptium.net/temurin/release-notes/?version=jdk-11.0.28+6)

- [Temurin 17.0.16 release notes](https://adoptium.net/temurin/release-notes/?version=jdk-17.0.16+8)

- [Temurin 21.0.8 release notes](https://adoptium.net/temurin/release-notes/?version=jdk-21.0.8+9)

- [Temurin 24.0.2 release notes](https://adoptium.net/temurin/release-notes/?version=jdk-24.0.2+12)

## New and Noteworthy

### Alpine default image now version 3.22

Alpine 3.22 is now the default image when pulling eclipse-temurin Docker images. Previous Alpine versions are still available by specifying a suffix of "-3.21" in Dockerfiles, e.g. `eclipse-temurin:21-alpine-3.21`.

### Ubuntu 20.04 (focal) images are no longer being produced

With Ubuntu 20.04 now out of regular support, we are no longer maintaining container images based on that version

### UBI 10 minimal images are now available

In addition to the ubi9-minimal images which were previously available, we are also publishing images based on ubi10-minimal
