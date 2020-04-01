# Titanium Turbo Template (Next)

[![@titanium/template-turbo-next](https://img.shields.io/npm/v/@titanium/template-turbo-next.png)](https://www.npmjs.com/package/@titanium/template-turbo-next)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=brentonhouse/titanium-template-turbo-next)](https://dependabot.com)

> This template is based on the template @titanium/template-turbo-default with some modifications in preparation for the next version of the template.

## Usage

1. Install [`Geek Mobile Toolkit`](https://www.npmjs.com/package/@geek/mobile)

```
npm install -g @geek/mobile
```

2. Create new mobile project

```
mobile app:create [NAME] [TEMPLATE]
```

> If you omit `template` parameter, this template (`@titanium/template-alloy-default`) will be used.

```
mobile app:create my-new-app @titanium/template-turbo-next
```


## Current Features

* Titanium SDK 8.0.1.GA
* Updated .gitignore file
* Modifications to `tiapp.xml`:
  * Added the following iOS permissions:
    * Camera
    * Photo Library
    * Microphone
    * Apple Music
    * Wifi
  * Added iOS query schemes
  * Added iOS bundle url types
  * Disabled Appc Analytics
  * ESLint - Code Linting
  * Android theme - Added theme to start making default styles more cross-platform
  

## Roadmap

  * More updates

## Other Projects

* [Titanium Turbo](https://www.npmjs.com/package/@titanium/turbo) - Variation of **`Titanium Alloy`** that adds some enhancements and customizations for rapid development.
* [Geek Mobile Toolkit](https://www.npmjs.com/package/@geek/mobile) - Toolkit for creating, building, and managing mobile app projects.
* [Titanium Turbo Template (Default)](https://www.npmjs.com/package/@titanium/template-turbo-default) - Template for default Turbo app.  Based on the basic Alloy Template + some extra goodies.
* [Titanium Alloy Template (Basic)](https://www.npmjs.com/package/@titanium/template-alloy-basic) - Basic Alloy app.  What you get when creating new app project with Titanium CLI.
* [Titanium Alloy Template (Default)](https://www.npmjs.com/package/@titanium/template-alloy-default) - Default Alloy app.  Based on the Basic Alloy Template + some extra goodies.


> _Turbo is not an official Axway product.  It is an open-source project that is supported exclusively by the Titanium development community._

----------------------------------
Stuff our legal folk make us say:

Appcelerator, Appcelerator Titanium and associated marks and logos are 
trademarks of Appcelerator, Inc. 

Titanium is Copyright (c) 2008-2019 by Appcelerator, Inc. All Rights Reserved.

Titanium is licensed under the Apache Public License (Version 2). Please
see the the Titanium license file for the full license.

