Observatory
============

Observatory is meant to provide an easy way to get a high level view of your Jenkins CI pipeline.  It works by periodically checking on all jobs associated with a view and displaying them in vertical swim lanes.  By seperating the jobs into seperate swim lanes depending on their status (success, failure or pending) it makes it easy to see at a glance what is going on.

Requriements
============

Observatory was designed to be easy to setup and deploy.  It is built using node.js and all dependencies can be installed using `npm install`.

It is only known to run on OS X and Linux (specifically CentOS).

Configuration
=============

There are two config files.  One is for server side configurations while the other is for configurations on the client side.  Server side configuration changes should be made in `config/config.js` while client side configuration changes should be made to `public/js/client_config.js`.  The initial configurations assumes that the server is running on the same machine as the client, is running on localhost:3000 and it will grab jobs from a Jenkins server which is setup for development purposes running on [OpenShift](https://www.openshift.com/).

Contributions
=============

Contributing is easy (and much appreciated).  Just checkout the code and submit a pull request when you are ready.  The key area where Observatory is currently lacking is in tests.

License
=======
The MIT License (MIT)

Copyright (c) <2013> <Edward Smith>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
