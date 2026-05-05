# 🌐 Structogen

Structogen is a multi‑platform code generation system designed to turn **JSON Schemas** into **typed class files** across multiple programming languages. It eliminates repetitive boilerplate, enforces consistency across ecosystems, and provides a unified workflow for teams working across different stacks.

Structogen consists of:

1.  **A desktop application** (Electron + Angular)
2.  **A command‑line interface (CLI)**
3.  **A shared core engine**
4.  **A plugin system for language generators**

Both the desktop app and CLI use the same underlying engine and can operate independently or together.

----------

# 🖥️ 1. Desktop Application (Electron + Angular)

### **Role in the ecosystem**

The desktop app is the **visual, user‑friendly interface** for Structogen. It is ideal for developers, architects, and technical writers who prefer an interactive environment for managing schemas and previewing generated code.

### **What it provides**

-   **Project‑based workflow**  
    A Structogen Project stores configuration such as:
    
    -   File naming conventions
    -   Header templates
    -   Language‑specific settings
    -   Output folder structure
    -   Excluded files or patterns
    -   Custom template overrides
-   **Schema management**  
    Import, edit, preview, and organize JSON Schemas.
    
-   **Live previews**  
    See how a schema translates into:
    
    -   C# classes
    -   C++ structs
    -   JavaScript/TypeScript models
    -   Python classes
    -   (and any additional languages installed via plugins)
-   **Batch generation**  
    Generate entire sets of classes for multiple languages at once.
    

### **Architectural role**

The desktop app acts as:

-   A **configuration hub**
-   A **visual editor**
-   A **preview and validation tool**
-   A **front‑end orchestrator** that delegates generation to the shared Structogen engine
-   A **plugin host**, capable of loading external language generators from a user plugin directory

----------

# 🧰 2. Command‑Line Interface (CLI)

### **Role in the ecosystem**

The CLI is designed for:

-   Automation
-   CI/CD pipelines
-   Power users
-   Integration into build systems
-   Scripted workflows

### **What it provides**

-   Generate classes from JSON Schemas using a single command
-   Use Structogen project files for consistent configuration
-   Override settings via command‑line flags
-   Integrate into Git hooks, build scripts, or deployment pipelines
-   Load external language generator plugins installed via npm

### **Architectural role**

The CLI is the **automation layer** of Structogen.  
It uses the same core engine as the desktop app, ensuring identical output across environments.

----------

# 🔧 3. Shared Core Engine

Both the desktop app and CLI rely on a **shared generation engine**, responsible for:

-   Parsing JSON Schemas
-   Mapping schema definitions to language‑specific constructs
-   Applying project configuration rules
-   Producing final class files
-   Loading and orchestrating language generator plugins

### **Built‑in generators**

Structogen ships with built‑in generators for:

-   C#
-   C++
-   JavaScript
-   TypeScript
-   Python

These are implemented as **first‑class plugins** under:

```
packages/generators/structogen-generator-*

```

They follow the same interface as external plugins.

----------

# 🔌 4. Plugin System (Extensible Language Generators)

Structogen supports a **plugin architecture** that allows developers to add support for new languages without modifying Structogen itself.

### **Plugin types**

-   **Built‑in plugins** (bundled with Structogen)
-   **External plugins** (installed via npm or placed in the user plugin directory)

### **Plugin discovery**

Structogen discovers plugins in two ways:

#### **1. Automatic discovery**

Searches for packages matching:

```
structogen-generator-*
@*/structogen-generator-*

```

#### **2. Explicit configuration**

A Structogen project file can specify plugins:

```json
{
  "plugins": [
    "@someone/structogen-generator-java",
    "@someone/structogen-generator-rust"
  ]
}

```

Explicit config overrides automatic discovery.

### **Where plugins are loaded from**

-   **CLI:** local + global `node_modules`
-   **Desktop app:** user plugin directory (`~/.structogen/plugins`)

----------

# 📁 5. Structogen Project File

A Structogen project file defines how code should be generated.

### **What it contains**

-   Target languages
-   Header templates
-   Naming conventions
-   Output directory structure
-   File exclusions
-   Custom template overrides
-   Plugin configuration

### **Architectural role**

It enables Structogen to be:

-   Repeatable
-   Shareable
-   CI/CD‑friendly
-   Version‑controlled

----------

# 🔄 6. How Everything Works Together

### **Workflow overview**

1.  User creates or imports JSON Schemas
2.  Structogen (UI or CLI) loads the project configuration
3.  The core engine interprets the schema
4.  Built‑in and external plugins provide language‑specific generation
5.  Output files are generated in the desired structure

### **Separation of concerns**

-   **Desktop UI** → interaction, previews, configuration
-   **CLI** → automation, scripting, pipelines
-   **Core engine** → schema parsing, generation logic, plugin orchestration
-   **Plugins** → language‑specific code generation
-   **Project file** → configuration

