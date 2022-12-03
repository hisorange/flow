## No Code Flow Engine

Easy to use no code flow engine for your business processes. Originally developed for the [Artgen/Core Project](https://github.com/ArtgenIO/Core).

The engine can execute any logic from a JSON schema which allows it to run visualy created business processes.
Supports event hooking and emiting, scheduling, on demand execution, HTTP and CRON triggers, and more.

Mainly used for the Artgen/Core project but can be used for any other project.

#### Extensibility

The engine can register any custom extension which can provide new logic with nodes.
With this in mind, you can easily connect it to a database too, but it's not included in the package to allow it to run in CloudFlare Worker environments.

#### Triggers

- [ ] On Demand
- [ ] HTTP
- [ ] CRON
- [ ] Event
- [ ] Schedule
- [ ] Timer

#### Nodes

- [ ] Condition rule
- [ ] Logging
- [ ] HTTP Request
- [ ] Event Emit
- [ ] String Operations
- [ ] Math Operations
- [ ] Array Operations
- [ ] Object Operations
- [ ] Date Operations
- [ ] Variable Operations
- [ ] Registers
