## 🌐 Structogen

### **1. Purpose and Core Idea**

Structogen is a two‑part system designed to help developers and teams **automatically generate class files** in multiple programming languages using **JSON Schemas** as the single source of truth. It aims to reduce repetitive boilerplate work, enforce consistency across languages, and make cross‑platform development more efficient.

Structogen consists of:

1.  **A desktop application** (Electron + Angular)
    
2.  **A command‑line tool** (CLI)
    

Both parts work together but can also operate independently depending on the user’s workflow.

## 🖥️ 2. The Desktop Application (Electron + Angular)

### **Role in the ecosystem**

The desktop app is the **visual, user‑friendly interface** for Structogen. It is designed for developers, architects, and technical writers who prefer a guided, interactive environment.

### **What it provides**

-   **Project-based workflow** Users can create a “Structogen Project” that stores configuration such as:
    
    -   File naming conventions
        
    -   Header templates
        
    -   Language‑specific settings
        
    -   Output folder structure
        
    -   Excluded files or patterns
        
-   **Schema management** Users can import, edit, preview, and organize JSON Schemas.
    
-   **Live previews** The UI can show how a schema will translate into:
    
    -   C# classes
        
    -   C++ structs
        
    -   Java POJOs
        
    -   JavaScript/TypeScript models
        
    -   Python classes
        
-   **Batch generation** Generate entire sets of classes for multiple languages in one action.
    

### **Architectural role**

The desktop app acts as:

-   A **configuration hub**
    
-   A **visual editor**
    
-   A **preview and validation tool**
    
-   A **front-end orchestrator** that delegates actual generation to the shared Structogen engine
    

## 🧰 3. The CLI Tool

### **Role in the ecosystem**

The CLI is designed for:

-   Automation
    
-   CI/CD pipelines
    
-   Power users
    
-   Integration into existing build systems
    

### **What it provides**

-   Generate classes from JSON Schemas using a single command
    
-   Use Structogen project files for consistent configuration
    
-   Override settings via command-line flags
    
-   Integrate into Git hooks, build scripts, or deployment pipelines
    

### **Architectural role**

The CLI is the **automation layer** of Structogen. It uses the same underlying generation engine as the desktop app, ensuring identical output regardless of how Structogen is used.

## 🔧 4. Shared Core Engine

Both the desktop app and CLI rely on a **shared generation engine**, which is responsible for:

-   Parsing JSON Schemas
    
-   Mapping schema definitions to language‑specific constructs
    
-   Applying project configuration rules
    
-   Producing final class files
    

This engine ensures:

-   Consistency across all outputs
    
-   Predictable behavior
    
-   A single place to maintain language templates and logic
    

## 📁 5. Structogen Project File (Optional)

### **Purpose**

A Structogen project file acts as a **central configuration document** that defines how code should be generated.

### **What it contains**

-   Language targets (e.g., C#, TS, Python)
    
-   Header templates (license blocks, comments, metadata)
    
-   Naming conventions
    
-   Output directory structure
    
-   File exclusions
    
-   Custom template overrides
    

### **Architectural role**

It allows Structogen to be:

-   Repeatable
    
-   Shareable across teams
    
-   CI/CD‑friendly
    
-   Version‑controlled
    

## 🔄 6. How Everything Works Together

### **Workflow overview**

1.  User creates or imports JSON Schemas
    
2.  Structogen (UI or CLI) loads the project configuration
    
3.  The shared engine interprets the schema
    
4.  Language‑specific templates are applied
    
5.  Output files are generated in the desired structure
    

### **Separation of concerns**

-   **UI** handles interaction
    
-   **CLI** handles automation
    
-   **Core engine** handles logic
    
-   **Project file** handles configuration
    

This separation keeps Structogen flexible, maintainable, and scalable.