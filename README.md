EasyDevOps
======
An easy to use DevOps tool chain use the way of the workflow.


### workflow configuration

One or more configuration files, type of these could be JSON, YAML or node module.

Configuration file must be an array of object or object that satisfy the following format.

|key|type|description|
|---|----|-----------|
|name|String|name of the workflow|
|trigger|Array|trigger of following operation|
|source|Object|source code of the project|
|handler|Array|the action to be performed when a hook event occurs|
|config|Object|(optional) could be used by above config|

following is the format of trigger and handler

|key|type|description|
|---|----|-----------|
|type|String|identity of handler [#see builtin triggers and handlers](#builtin)|
|config|Object|config of the handler|
|trick|String|(optional) mystery|

### builtin

tbd
